import axios from 'axios';
const API_BASE_URL = "http://localhost:8082/v0.0/";//'http://34.195.141.117:8083/v0.0/';
const API_BASE_URL_WITH_OUT_VERSION = 'http://34.195.141.117:8083/';
const googleAPIKey = 'AIzaSyBaq7mc_lts3Xensjk7JvnUU1q8dNG0avo';
class ApiService {

    /*Externale API*/
    getExternalAPI(urlSegment) {
        return axios.get(urlSegment);
    }

    /*Get API*/
    getAPI(urlSegment) {
        return axios.get(API_BASE_URL+urlSegment);
    }
    /*Get API With Authentication header */
    getAPIWithAccessToken(urlSegment) {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Authorization': 'JWT '+accessToken
        }
        return axios.get(API_BASE_URL+urlSegment, {headers: headers});
    }
    /*Post API Without Authentication header */
    postAPI(urlSegment, formdata) {        
        const headers = {
            'Content-Type': 'application/json'           
        }
        return axios.post(API_BASE_URL+urlSegment, formdata, {headers: headers});
    }
    /*Post API With Authentication header */
    postAPIWithAccessToken(urlSegment, formdata){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }
        return axios.post(API_BASE_URL+urlSegment, formdata, {headers: headers});
    } 

    /*PUt API With Authentication header */
    putAPIWithAccessToken(urlSegment, formdata){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }
        return axios.put(API_BASE_URL+urlSegment, formdata, {headers: headers});
    } 

    /*Delete API With Authentication header and Without parameter */
    deleteAPIWithAccessToken(urlSegment, formdata = {}){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }
        return axios.delete(API_BASE_URL+urlSegment, {headers: headers, data: formdata});
    } 
    /* Check user logged in or not */
    getAuth(){
        let accessToken = localStorage.getItem("accessToken");        
        if(accessToken === '' || accessToken === null)
          return false;
        else
          return true;
    }
    /*Get API Url*/
    getAPIUrl(){
        return API_BASE_URL_WITH_OUT_VERSION;
    }

    getGoogleAPIKey() {
        return googleAPIKey;
    }
}

export default new ApiService();
