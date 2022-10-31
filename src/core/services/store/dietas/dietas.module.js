//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_DIETAS = "obtenerDietas";
export const OBTENER_DIETA = "obtenerDieta";
export const REGISTRAR_DIETA = "registrarDieta";
export const ACTUALIZAR_DIETA = "actualizarDieta";
// mutation types
export const SET_DIETAS = "setDietas";
export const SET_DIETA  = "setDieta";


const state = {
    dietas: [],
    dieta: []
};

const getters = {
  obtnenerDietas(state) {
    return state.dietas;
  }
};

const actions = {
  async [OBTENER_DIETAS](context, estadoId) {

    let endpoint = 'api/Dietas'
    if(estadoId){
        endpoint = `api/Dietas/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_DIETAS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_DIETA](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Dietas/`)
        .then(({ data }) => {
          context.commit(SET_DIETA, data.data);
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
  async [REGISTRAR_DIETA](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Dietas`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_DIETA, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_DIETA](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Dietas/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_DIETA, data.data);
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
  [SET_DIETAS](state, data) {
    state.dietas = data;
  },

  [SET_DIETA](state, data) {
    state.dieta = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
