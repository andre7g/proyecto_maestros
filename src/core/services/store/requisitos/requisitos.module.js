//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_REQUISITOS = "obtenerRequisitos";
export const OBTENER_REQUISITO = "obtenerRequisito";
export const REGISTAR_REQUISITO = "registrarRequisito";
export const ACTUALIZAR_REQUISITO = "actualizaRequisito";
export const OBTENER_REQUISITOS_BY_CATEGORIA_T = "actualizaRequisitoByCategoriaT";
// mutation types
export const SET_REQUISITOS = "setRequisitos";
export const SET_REQUISITO  = "setRequisito";

const state = {
    requisitos: [],
    requisito: []
};

const getters = {
  obtnenerRequisito(state) {
    return state.requisitos;
  }
};

const actions = {
  async [OBTENER_REQUISITOS](context, estadoId) {

    let endpoint = 'api/Requisitos'
    if(estadoId){
        endpoint = `api/Requisitos/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_REQUISITOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_REQUISITOS_BY_CATEGORIA_T](context, datos) {

    let endpoint = `api/Requisitos/allByCategoriaTipoI/${datos.categoriaId}/${datos.tipoInstrumentoId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_REQUISITOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_REQUISITO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Requisitos/`)
        .then(({ data }) => {
          context.commit(SET_REQUISITO, data.data);
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
  async [REGISTAR_REQUISITO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Requisitos`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_REQUISITO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_REQUISITO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Requisitos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_REQUISITO, data.data);
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
  [SET_REQUISITOS](state, data) {
    state.requisitos = data;
  },

  [SET_REQUISITO](state, data) {
    state.requisito = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
