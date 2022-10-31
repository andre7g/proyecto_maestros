//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_DIETAS_USUARIO = "obtenerDietasUsuario";
export const OBTENER_DIETA_USUARIO = "obtenerDietaUsuario";
export const REGISTRAR_DIETA_USUARIO = "registrarDietaUsuario";
export const ACTUALIZAR_DIETA_USUARIO = "actualizarDietaUsuario";
// mutation types
export const SET_DIETAS_USUARIO = "setDietasUsuario";
export const SET_DIETA_USUARIO  = "setDietaUsuario";


const state = {
    dietasUsuario: [],
    dietaUsuario: []
};

const getters = {
  obtnenerDietasUsuario(state) {
    return state.dietasUsuario;
  }
};

const actions = {
  async [OBTENER_DIETAS_USUARIO](context, estadoId) {

    let endpoint = 'api/UsuarioDietas'
    if(estadoId){
        endpoint = `api/UsuarioDietas/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_DIETAS_USUARIO, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_DIETA_USUARIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/UsuarioDietas/`)
        .then(({ data }) => {
          context.commit(SET_DIETA_USUARIO, data.data);
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
  async [REGISTRAR_DIETA_USUARIO](context, datos) {
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/UsuarioDietas`,
        datos
      )
        .then(({ data }) => {
            console.log(data);
          context.commit(SET_DIETA_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_DIETA_USUARIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/UsuarioDietas/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_DIETA_USUARIO, data.data);
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
  [SET_DIETAS_USUARIO](state, data) {
    state.dietasUsuario = data;
  },

  [SET_DIETA_USUARIO](state, data) {
    state.dietaUsuario = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
