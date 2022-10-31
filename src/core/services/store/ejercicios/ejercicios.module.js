//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_EJERCICIOS = "obtenerEjercicios";
export const OBTENER_EJERCICIO = "obtenerEjercicio";
export const REGISTAR_EJERCICIO = "registrarEjercicio";
export const ACTUALIZAR_EJERCICIO = "actualizarEjercicio";
// mutation types
export const SET_EJERCICIOS = "setEjercicios";
export const SET_EJERCICIO  = "setEjercicio";


const state = {
    ejercicios: [],
    ejercicio: []
};

const getters = {
  obtnenerEjercicios(state) {
    return state.ejercicios;
  }
};

const actions = {
  async [OBTENER_EJERCICIOS](context, estadoId) {

    let endpoint = 'api/Ejercicio'
    if(estadoId){
        endpoint = `api/Ejercicio/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_EJERCICIOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_EJERCICIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Ejercicio/`)
        .then(({ data }) => {
          context.commit(SET_EJERCICIO, data.data);
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
  async [REGISTAR_EJERCICIO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Ejercicio`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EJERCICIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_EJERCICIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Ejercicio/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EJERCICIO, data.data);
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
  [SET_EJERCICIOS](state, data) {
    state.ejercicios = data;
  },

  [SET_EJERCICIO](state, data) {
    state.ejercicio = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
