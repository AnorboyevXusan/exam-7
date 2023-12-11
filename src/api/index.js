import axios from "axios";


const API = 'https://api.choynak.org/api/00f42c09a4474a6d8c411fb572377cd0'

export const $api = axios.create({
    baseURL: API
})