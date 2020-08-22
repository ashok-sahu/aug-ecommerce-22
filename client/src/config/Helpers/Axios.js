import Axios from 'axios'
import BaseUrl from '../Api/Api'

const AxiosInst = Axios.create({
    baseURL:BaseUrl
})

export default AxiosInst