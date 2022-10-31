//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_RUTINAS_USUARIO_BY_USUARIO = "obtenerRutinasUsuario";
export const OBTENER_RUTINA_USUARIO = "obtenerRutinaUsuario";
export const REGISTAR_RUTINA_USUARIO = "registrarRutinaUsuario";
export const ACTUALIZAR_RUTINA_USUARIO = "actualizarRutinaUsuario";
// mutation types
export const SET_RUTINAS_USUARIO = "setRutinasUsuario";
export const SET_RUTINA_USUARIO  = "setRutinaUsuario";


const state = {
    rutinasUsuario: [],
    rutinaUsuario: []
};

const getters = {
  obtnenerRutinasUsuario(state) {
    return state.rutinasUsuario;
  }
};

const actions = {
  async [OBTENER_RUTINAS_USUARIO_BY_USUARIO](context, estadoId) {

    let endpoint = `api/UsuarioRutina/all/${estadoId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_RUTINAS_USUARIO, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_RUTINA_USUARIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/UsuarioRutina/`)
        .then(({ data }) => {
          context.commit(SET_RUTINA_USUARIO, data.data);
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
  async [REGISTAR_RUTINA_USUARIO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/UsuarioRutina`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_RUTINA_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_RUTINA_USUARIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/UsuarioRutina/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_RUTINA_USUARIO, data.data);
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
  [SET_RUTINAS_USUARIO](state, data) {
    state.rutinasUsuario = data;
  },

  [SET_RUTINA_USUARIO](state, data) {
    state.rutinaUsuario = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
