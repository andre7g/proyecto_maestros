//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_CONSULTORES = "obtenerConsultores";
export const OBTENER_CONSULTOR = "obtenerConsultor";
export const BUSCAR_CONSULTOR = "buscarConsultor"; 
// mutation types
export const SET_CONSULTORES = "setConsultores";
export const SET_CONSULTOR  = "setConsultor";

const state = {
    consultores: [],
    consultor: []
};

const getters = {
  obtenerConsultores(state) {
    return state.consultores;
  }
};

const actions = {
  async [OBTENER_CONSULTORES](context, estadoId) {

    let endpoint = 'api/Consultor'
    if(estadoId){
        endpoint = `api/Consultor/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_CONSULTORES, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_CONSULTOR](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Consultor/`)
        .then(({ data }) => {
          context.commit(SET_CONSULTOR, data.data);
          //console.log(this.instituciones)
          resolve(data);
        })
        .catch(error => {
          resolve(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },



  async [BUSCAR_CONSULTOR](context, parametro) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/obtener?endpoint=api/Consultor/all/${parametro}`)
        .then(({ data }) => {
          context.commit(SET_CONSULTOR, data.data);
          //console.log(this.instituciones)
          resolve(data);
        })
        .catch(error => {
          resolve(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  }




};

const mutations = {
  [SET_CONSULTORES](state, data) {
    state.consultores = data;
  },

  [SET_CONSULTOR](state, data) {
    state.consultor = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
