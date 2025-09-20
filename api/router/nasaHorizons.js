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
        
        const apophisData = {
            a_au: parseFloat(apophis[2]),
            e: parseFloat(apophis[3]),
            i_rad: !isNaN(parseFloat(apophis[4])) ? parseFloat(apophis[4]) * PI / 180 : 0,
            om_rad: !isNaN(parseFloat(apophis[5])) ? parseFloat(apophis[5]) * PI / 180 : 0,
            w_rad: !isNaN(parseFloat(apophis[6])) ? parseFloat(apophis[6]) * PI / 180 : 0,
            tp_jd: parseFloat(apophis[7]),
        };

        const a_km = apophisData.a_au * KM_PER_AU;
        const JD_now = new Date().getTime() / 86400000 + 2440587.5;
        
        // 1. CÁLCULO DA ANOMALIA EXCÊNTRICA (E)
        const n_rad_s = Math.sqrt(GM_SUN / Math.pow(a_km, 3));
        const M_rad = n_rad_s * (JD_now - apophisData.tp_jd) * 86400;
        let E = M_rad;
        for (let i = 0; i < 5; i++) {
            E = E - (E - apophisData.e * Math.sin(E) - M_rad) / (1 - apophisData.e * Math.cos(E));
        }
            
        
        return res.status(200).send(apophisData)
    })
    .catch(function (data){
        console.log("GET /apophis-data | ERRO AO exibir data do APOPHIS ");        
        console.log(data);
        return res.status(500).send("Internal Server Error");
    })
});

export default router;
