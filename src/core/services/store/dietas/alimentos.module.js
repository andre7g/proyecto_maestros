//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ALIMENTOS_BY_GRUPO = "obtenerAlimentosByGrupo";
// mutation types
export const SET_ALIMENTOS = "setAlimentos";


const state = {
    alimentos: []
};

const getters = {
  obtnenerAlimentos(state) {
    return state.alimentos;
  }
};

const actions = {
  async [OBTENER_ALIMENTOS_BY_GRUPO](context, grupoId) {

    let  endpoint = `api/AlimentosPorcion/byGrupoAlimenticio/${grupoId}`

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_ALIMENTOS, data.data);
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
  [SET_ALIMENTOS](state, data) {
    state.alimentos = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
