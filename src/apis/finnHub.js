import axios from 'axios'

const TOKEN = import.meta.env.VITE_REACT_API_TOKEN;

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:TOKEN
    }
})