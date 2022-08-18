//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ACUERDOS = "obtenerAcuerdos";
export const OBTENER_ACUERDO = "obtenerAcuerdo";
export const REGISTAR_ACUERDO = "registrarAcuerdo";
export const ACTUALIZAR_ACUERDO = "actualizarAcuerdo";
// mutation types
export const SET_ACUERDOS = "setAcuerdos";
export const SET_ACUERDO  = "setAcuerdo";

const state = {
    acuerdos: [],
    acuerdo: []
};

const getters = {
  obtnenerAcuerdos(state) {
    return state.acuerdos;
  }
};

const actions = {
  async [OBTENER_ACUERDOS](context, estadoId) {

    let endpoint = 'api/AcuerdoMinisterial'
    if(estadoId){
        endpoint = `api/AcuerdoMinisterial/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_ACUERDOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_ACUERDO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/AcuerdoMinisterial/`)
        .then(({ data }) => {
          context.commit(SET_ACUERDO, data.data);
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
  async [REGISTAR_ACUERDO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/AcuerdoMinisterial`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ACUERDO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_ACUERDO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/AcuerdoMinisterial/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ACUERDO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  }
};

const mutations = {
  [SET_ACUERDOS](state, data) {
    state.acuerdos = data;
  },

  [SET_ACUERDO](state, data) {
    state.acuerdo = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
