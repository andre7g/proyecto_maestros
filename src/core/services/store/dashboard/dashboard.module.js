//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_CONTADORES_DASHBOARD = "obtenerContadoresDash";
export const OBTENER_RATING_DASHBOARD = "obtenerRatingDash";
// mutation types
export const SET_CONTADORES_DASHBOARD  = "setContadoresDash";
export const SET_RATING_DASHBOARD = "setRatingDash";


const state = {
    contadores: [],
    rating: []
};

const getters = {
  obtnenerContadores(state) {
    return state.contadores;
  },
  obtnenerRating(state) {
    return state.rating;
  },
};

const actions = {
  async [OBTENER_CONTADORES_DASHBOARD](context) {
    let endpoint = `api/Dashboard/getContadores`
    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_CONTADORES_DASHBOARD, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_RATING_DASHBOARD](context) {
    let endpoint = `api/Dashboard/getRating`
    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_RATING_DASHBOARD, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
};

const mutations = {
  [SET_CONTADORES_DASHBOARD](state, data) {
    state.contadores = data;
  },

  [SET_RATING_DASHBOARD](state, data) {
    state.rating = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
