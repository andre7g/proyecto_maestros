import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    //Vue.axios.defaults.baseURL = "http://localhost:5196";
    Vue.axios.defaults.baseURL = "http://205.209.122.7:8095";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, {Data: params} ).catch(error => {
      console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, params) {
    return Vue.axios.post(`${resource}`,  {Data:params} ).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },


  /**
   * Almacenar documentos HTTP request
   * @param resource
   * @param document
   */
   uploadFile(resource, file, path){
    let formData = new FormData();

    formData.append('Files', file);
    formData.append('path', path);
    //console.log(file)
 
    let config = {
      headers: {
        "Content-Type": undefined
      }
    };


    return Vue.axios.post(resource, formData, config
      ).catch(error=>{
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },


  
  /**
   * Almacenar documentos multiples HTTP request
   * @param resource
   * @param document
   */
   uploadFiles(resource, files){
    let formData = new FormData();
    //console.log(files)
    //formData.append('Files', files);

    for (const i of Object.keys(files)) {
      formData.append('imagesArray', files[i])
    }
   // formData.append('path', 'test');
    console.log(formData)
 
    let config = {
      headers: {
        'Content-Type': undefined
      }
    };


    return Vue.axios.post(resource, formData, config
      ).catch(error=>{
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },


  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },



  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;
