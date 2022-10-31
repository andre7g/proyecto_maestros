//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_EJERCICIOS_SERIE_BY_SERIE = "obtenerEjerciciosSeries";
export const OBTENER_EJERCICIO_SERIE = "obtenerEjercicioSerie";
export const REGISTRAR_EJERCICIO_SERIE = "registrarEjercicioSerie";
export const ACTUALIZAR_EJERCICIO_SERIE = "actualizarEjercicioSerie";
// mutation types
export const SET_EJERCICIOS_SERIE = "setEjerciciosSerie";
export const SET_EJERCICIO_SERIE  = "setEjercicioSerie";


const state = {
    ejerciciosserie: [],
    ejercicioserie: []
};

const getters = {
  obtnenerEjerciciosSeries(state) {
    return state.ejerciciosserie;
  }
};

const actions = {
  async [OBTENER_EJERCICIOS_SERIE_BY_SERIE](context, serieId) {

    let endpoint = `api/SeriesEjercicios/all/${serieId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_EJERCICIOS_SERIE, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_EJERCICIO_SERIE](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/SeriesEjercicios/`)
        .then(({ data }) => {
          context.commit(SET_EJERCICIO_SERIE, data.data);
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
  async [REGISTRAR_EJERCICIO_SERIE](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/SeriesEjercicios`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EJERCICIO_SERIE, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_EJERCICIO_SERIE](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/SeriesEjercicios/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EJERCICIO_SERIE, data.data);
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
  [SET_EJERCICIOS_SERIE](state, data) {
    state.ejerciciosserie = data;
  },

  [SET_EJERCICIO_SERIE](state, data) {
    state.ejercicioserie = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
