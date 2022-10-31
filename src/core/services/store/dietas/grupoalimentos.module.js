//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_GRUPOS_ALIMENTICIOS = "obtenerGruposAlimenticios";
// mutation types
export const SET_GRUPOS_ALIMENTICIOS = "setGruposAlimenticios";


const state = {
    gruposAlimenticios: []
};

const getters = {
  obtnenerGruposAlimenticios(state) {
    return state.gruposAlimenticios;
  }
};

const actions = {
  async [OBTENER_GRUPOS_ALIMENTICIOS](context) {

    let  endpoint = `api/GruposAlimenticios`

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_GRUPOS_ALIMENTICIOS, data.data);
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
  [SET_GRUPOS_ALIMENTICIOS](state, data) {
    state.gruposAlimenticios = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
