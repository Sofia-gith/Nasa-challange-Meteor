import { Router } from "express";
import axios from "axios";

const URL_NASA_GET = 'https://ssd-api.jpl.nasa.gov/sbdb_query.api'

const router = Router();

// Constantes do sistema solar
const GM_SUN = 1.3271244e11; // Constante gravitacional do Sol em km^3/s^2
const KM_PER_AU = 149597870.7; // 1 Unidade Astronômica em km
const PI = Math.PI;

// Cálculo da massa
const DENSIDADE_KG_M3 = 2700;
const RAIO_M = 170;
const VOLUME_M3 = (4/3) * PI * Math.pow(RAIO_M, 3);
const MASSA_KG = DENSIDADE_KG_M3 * VOLUME_M3;

router.get("/apophis-data", (req, res) => {
    console.log("GET /apophis-data | Entrando no AXIOS");   

    // construindo URL
    const params = new URLSearchParams();
    params.set("fields", "full_name,diameter,a,e,i,om,w,tp");
    params.set("sb-ns", "n");
    params.set("sb-group", "neo");
    const endpoint = params.toString();

    axios.get(`${URL_NASA_GET}?${endpoint}`)
    .then( response => {
        console.log("GET /apophis-data | Exibindo data");        
        let dadosRetorno = response.data.data
        const apophis = dadosRetorno.find(item => item[0].includes("Apophis"));       
        
        if (!apophis) {
            return res.status(404).send("Apophis data not found.");
        }
        
        //  `parseFloat` para garantir que os valores sejam numéricos
        const apophisData = {
            name: apophis[0],
            diameter_km: parseFloat(apophis[1]),
            mass_kg: MASSA_KG,
            // Elementos Orbitais
            a_au: parseFloat(apophis[2]), // semi-eixo maior (au)
            e: parseFloat(apophis[3]), // excentricidade
            i_deg: parseFloat(apophis[4]), // inclinação (graus)
            om_deg: parseFloat(apophis[5]), // longitude do nó ascendente (graus)
            w_deg: parseFloat(apophis[6]), // argumento do periélio (graus)
            tp_jd: parseFloat(apophis[7]), // tempo de passagem pelo periélio (dias julianos)
        };
            
        
        return res.status(200).send(apophisData)
    })
    .catch(function (data){
        console.log("GET /apophis-data | ERRO AO exibir data do APOPHIS ");        
        console.log(data);
        return res.status(500).send("Internal Server Error");
    })
});

export default router;
