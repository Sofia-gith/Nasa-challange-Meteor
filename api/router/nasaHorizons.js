import { Router } from "express";
import axios from "axios";

const URL_NASA_GET = 'https://ssd-api.jpl.nasa.gov/sbdb_query.api'

const router = Router();

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
                        
        // calculo da massa
        const densidade_kg_m3 = 2700;
        const raio_m = 170;
        const volume_m3 = (4/3) * Math.PI * Math.pow(raio_m, 3);
        const massa_kg = densidade_kg_m3 * volume_m3;
        
        //  `parseFloat` para garantir que os valores sejam numéricos
        const apophisData = {
            name: apophis[0],
            diameter_km: parseFloat(apophis[1]),
            mass_kg: massa_kg,
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
