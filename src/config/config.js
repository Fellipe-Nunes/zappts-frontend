import axios from 'axios'
import { getToken } from './auth'

const clientHttp = axios.create({
    baseURL: `http://localhost:3001` || process.env.REACT_APP_API_URL
})

clientHttp.defaults.headers['Content-Type'] = 'application/json'

if (getToken()) {
    clientHttp.defaults.headers['x-auth-token'] = getToken()
}


export {
    clientHttp
}
