import axios from "axios/index";
import {API_URL} from "./constants";


export const getDollar = async () => {
    const response = await axios.get(`${API_URL}`);
    console.log(response.data[1]);
    console.log(response.data.length);

    return response.data;
};