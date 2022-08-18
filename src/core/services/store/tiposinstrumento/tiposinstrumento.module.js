//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_TIPOS_INSTRUMENTO = "obtenerTiposInstrumento";
export const OBTENER_TIPO_INSTRUMENTO = "obtenerTipoInstrumento";
export const REGISTRAR_TIPO_INSTRUMENTO = "registrarTipoInstrumento";
export const ACTUALIZAR_TIPO_INSTRUMENTO = "actualizarTipoInstrumento";
// mutation types
export const SET_TIPOS_INSTRUMENTO = "setTiposInstrumento";
export const SET_TIPO_INSTRUMENTO  = "setTipoInstrumento";

const state = {
    tiposInstrumento: [],
    tipoInstrumento: []
};

const getters = {
  obtenerTiposInstrumento(state) {
    return state.tiposInstrumento;
  }
};

const actions = {
  async [OBTENER_TIPOS_INSTRUMENTO](context, estadoId) {

    let endpoint = 'api/TiposInstrumento'
    if(estadoId){
        endpoint = `api/TiposInstrumento/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                //console.log(data)
                context.commit(SET_TIPOS_INSTRUMENTO, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_TIPO_INSTRUMENTO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/TiposInstrumento/`)
        .then(({ data }) => {
          context.commit(SET_TIPO_INSTRUMENTO, data.data);
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
  async [REGISTRAR_TIPO_INSTRUMENTO](context, datos) {
    console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/TiposInstrumento`,
        datos
      )
        .then(({ data }) => {
            console.log(data)
          context.commit(SET_TIPO_INSTRUMENTO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_TIPO_INSTRUMENTO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/TiposInstrumento/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_TIPO_INSTRUMENTO, data.data);
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
  [SET_TIPOS_INSTRUMENTO](state, data) {
    state.tiposInstrumento = data;
  },

  [SET_TIPO_INSTRUMENTO](state, data) {
    state.tipoInstrumento = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
