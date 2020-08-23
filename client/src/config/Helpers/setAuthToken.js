import Axios from './Axios'

const setAuthToken = token =>{
    if(token){
        // console.log(token,'token')
        Axios.defaults.headers.common['x-auth-token'] = token
    }else{
        delete Axios.defaults.headers.commom['x-auth-token']
    }
}

export default setAuthToken