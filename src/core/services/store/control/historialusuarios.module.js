//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_HISTORIAL_USUARIOS_BY_USUARIO = "obtenerHistorialUsuariosByUsuario";
export const OBTENER_HISTORIAL_BY_USUARIO = "obtenerHistorialUsuarioByUsuario";
export const REGISTAR_HISTORIAL_BY_USUARIO = "registrarHistorialUsuarioByUsuario";
export const ACTUALIZAR_HISTORIAL_BY_USUARIO = "actualizarHistorialUsuarioByUsuario";
// mutation types
export const SET_HISTORIAL_USUARIO_BY_USUARIO  = "setHistorialUsuariosByUsuario";
export const SET_HISTORIAL_BY_USUARIO = "setHistorialUsuarioByUsuario";


const state = {
    historialUsuarios: [],
    historialUsuario: []
};

const getters = {
  obtnenerHistorialUsers(state) {
    return state.historialUsuarios;
  }
};

const actions = {
  async [OBTENER_HISTORIAL_USUARIOS_BY_USUARIO](context, usuarioId) {

    let endpoint = `api/HistorialUsuarios/all/${usuarioId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_HISTORIAL_USUARIO_BY_USUARIO, data.data);
                console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_HISTORIAL_BY_USUARIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/HistorialUsuarios/`)
        .then(({ data }) => {
          context.commit(SET_HISTORIAL_BY_USUARIO, data.data);
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
  async [REGISTAR_HISTORIAL_BY_USUARIO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/HistorialUsuarios`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_HISTORIAL_BY_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_HISTORIAL_BY_USUARIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/HistorialUsuarios/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_HISTORIAL_BY_USUARIO, data.data);
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
  [SET_HISTORIAL_USUARIO_BY_USUARIO](state, data) {
    state.historialUsuarios = data;
  },

  [SET_HISTORIAL_BY_USUARIO](state, data) {
    state.historialUsuario = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
