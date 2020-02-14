import axios from 'axios';
import {apiURL} from "./constants";

const axiosImageBoard = axios.create({
    baseURL: apiURL
});

export default axiosImageBoard;
