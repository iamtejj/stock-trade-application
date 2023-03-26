import axios from 'axios'
const TOKEN = "cg2vfp1r01qtum0h6nj0cg2vfp1r01qtum0h6njg"
export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:TOKEN
    }
})