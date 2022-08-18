//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_MUNICIPIOS = "obtenerMunicipios";
export const OBTENER_MUNICIPIO = "obtenerMunicipio";
export const REGISTRAR_MUNICIPIO = "registrarMunicipio";
export const ACTUALIZAR_MUNICIPIO = "actualizarMunicipio";
export const OBTENER_MUNICIPIOS_BY_DEPTO = "actualizarMunicipioByDepto";
// mutation types
export const SET_MUNICIPIOS = "setMunicipios";
export const SET_MUNICIPIO  = "setMunicipio";

const state = {
    municipios: [],
    municipio: []
};

const getters = {
  obtenerMunicipios(state) {
    return state.municipios;
  }
};

const actions = {
  async [OBTENER_MUNICIPIOS_BY_DEPTO](context, depto_Id) {

    let endpoint = `api/Municipios/byDepto/${depto_Id}`
    
    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_MUNICIPIOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_MUNICIPIOS](context, estadoId) {

    let endpoint = 'api/Municipios'
    if(estadoId){
        endpoint = `api/Municipios/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_MUNICIPIOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_MUNICIPIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Municipios/`)
        .then(({ data }) => {
          context.commit(SET_MUNICIPIO, data.data);
          //console.log(this.instituciones)
          resolve(data);
        })
        .catch(error => {
          resolve(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  /**
   * Registrar una institución
   * @param {*} context
   * @param {*} datos
   * @returns
   */
  async [REGISTRAR_MUNICIPIO](context, datos) {
    console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Municipios`,
        datos
      )
        .then(({ data }) => {
            console.log(data)
          context.commit(SET_MUNICIPIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_MUNICIPIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Municipios/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_MUNICIPIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  }
};

const mutations = {
  [SET_MUNICIPIOS](state, data) {
    state.municipios = data;
  },

  [SET_MUNICIPIO](state, data) {
    state.municipio = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
