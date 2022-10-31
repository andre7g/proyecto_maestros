//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_HITORIAL_USUARIOS = "obtenerHistorialUsuarios";
export const OBTENER_HITORIAL_USUARIO = "obtenerHistorialUsuario";
export const REGISTAR_HITORIAL_USUARIO = "registrarHistorialUsuario";
export const ACTUALIZAR_HITORIAL_USUARIO = "actualizarHistorialUsuario";
// mutation types
export const SET_HITORIAL_USUARIOS = "setHistorialUsuarios";
export const SET_HITORIAL_USUARIO  = "setHistorialUsuario";


const state = {
    historialUsuarios: [],
    historialUsuario: []
};

const getters = {
  obtnenerHistorialUsuarios(state) {
    return state.historialUsuarios;
  }
};

const actions = {
  async [OBTENER_HITORIAL_USUARIOS](context, usuarioId) {

    let endpoint = `api/HistorialPagos/all/${usuarioId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_HITORIAL_USUARIOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_HITORIAL_USUARIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/HistorialPagos/`)
        .then(({ data }) => {
          context.commit(SET_HITORIAL_USUARIO, data.data);
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
  async [REGISTAR_HITORIAL_USUARIO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/HistorialPagos`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_HITORIAL_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [ACTUALIZAR_HITORIAL_USUARIO](context, datos) {
    
    let id = datos.pagoId;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/HistorialPagos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_HITORIAL_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  }, 
};

const mutations = {
  [SET_HITORIAL_USUARIOS](state, data) {
    state.historialUsuarios = data;
  },

  [SET_HITORIAL_USUARIO](state, data) {
    state.historialUsuario = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
