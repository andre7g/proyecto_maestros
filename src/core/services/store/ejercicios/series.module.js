//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_SERIES_BY_RUTINA = "obtenerSeries";
export const OBTENER_SERIE = "obtenerSerie";
export const REGISTRAR_SERIE = "registrarSeries";
export const ACTUALIZAR_SERIE = "actualizarSerie";
// mutation types
export const SET_SERIES = "setSeries";
export const SET_SERIE  = "setSerie";


const state = {
    series: [],
    serie: []
};

const getters = {
  obtnenerSeries(state) {
    return state.series;
  }
};

const actions = {
  async [OBTENER_SERIES_BY_RUTINA](context, rutinaId) {

    let endpoint = `api/Series/all/${rutinaId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_SERIES, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_SERIE](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Series/`)
        .then(({ data }) => {
          context.commit(SET_SERIE, data.data);
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
  async [REGISTRAR_SERIE](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Series`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SERIE, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_SERIE](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Series/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SERIE, data.data);
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
  [SET_SERIES](state, data) {
    state.series = data;
  },

  [SET_SERIE](state, data) {
    state.serie = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
