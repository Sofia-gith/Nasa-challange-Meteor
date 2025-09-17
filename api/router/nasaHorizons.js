import { Router } from "express";
import axios from "axios";

const URL_NASA_GET = 'https://ssd.jpl.nasa.gov/api/horizons.api'
const endpoint = `
format=json&
COMMAND='SB'&
OBJ_DATA='YES'
`

const router = Router();

router.get("/horizons", (req, res) => {
    axios.get(`${URL_NASA_GET}?${endpoint}`)
    .then(function (data) {
        console.log("GET /horizons | Exibindo data");        
        console.log(data.data)
        return res.status(200).json(data.data)
    })
    .catch(function (data){
        console.log(data);
    })   

});

export default router;
