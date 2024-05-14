import axios from "axios";
const api = "https://api.frankfurter.app";

//simple get request
export async function getAllCurruncy() {
    return axios.get(`${api}/latest?from=USD`);
}


export async function curruncyQuery(value, from, to) {
    return axios.get(`${api}/latest?amount=${value}&from=${from}&to=${to}`);
}

// npm install axios required
// api used is https://www.frankfurter.app/docs/
// base api is `https://api.frankfurter.app/latest?from=USD`