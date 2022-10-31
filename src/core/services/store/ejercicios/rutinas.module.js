//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_RUTINAS = "obtenerRutinas";
export const OBTENER_RUTINA = "obtenerRutina";
export const REGISTRAR_RUTINA = "registrarRutina";
export const ACTUALIZAR_RUTINA = "actualizarRutina";
// mutation types
export const SET_RUTINAS = "setRutinas";
export const SET_RUTINA  = "setRutina";


const state = {
    rutinas: [],
    rutina: []
};

const getters = {
  obtnenerRutinas(state) {
    return state.rutinas;
  }
};

const actions = {
  async [OBTENER_RUTINAS](context, estadoId) {

    let endpoint = 'api/Rutina'
    if(estadoId){
        endpoint = `api/Rutina/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_RUTINAS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_RUTINA](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Rutina/`)
        .then(({ data }) => {
          context.commit(SET_RUTINA, data.data);
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
  async [REGISTRAR_RUTINA](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Rutina`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_RUTINA, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_RUTINA](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Rutina/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_RUTINA, data.data);
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
  [SET_RUTINAS](state, data) {
    state.rutinas = data;
  },

  [SET_RUTINA](state, data) {
    state.rutina = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
