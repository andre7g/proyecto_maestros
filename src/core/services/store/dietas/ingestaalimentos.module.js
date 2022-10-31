//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ALIMENTOS_BY_INGESTAS = "obtenerAlimentosByIngestas";
// mutation types
export const SET_ALIMENTOS_BY_INGESTAS = "setAlimentosByIngestas";


const state = {
    alimentosByIngestas: []
};

const getters = {
  obtnenerAlimentosByIngestas(state) {
    return state.alimentosByIngestas;
  }
};

const actions = {
  async [OBTENER_ALIMENTOS_BY_INGESTAS](context,ingestaId) {

    let  endpoint = `api/IngestaAlimentos/all/${ingestaId}`
    console.log(endpoint);

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_ALIMENTOS_BY_INGESTAS, data.data);
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
  [SET_ALIMENTOS_BY_INGESTAS](state, data) {
    state.alimentosByIngestas = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
