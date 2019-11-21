import axios from 'axios'

const setHeaders = (token) => {

    token ? axios.defaults.headers.common["Authorization"] = token :
        delete axios.defaults.headers.common["Authorization"];

}

export default setHeaders;