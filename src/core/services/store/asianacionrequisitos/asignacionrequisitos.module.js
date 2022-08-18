//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_REQUISITOS_BY_ACUERDO = "obtenerRequisitosByAcuerdo";
export const OBTENER_REQUISITO_ASIGNACION_BY_ACUERDO = "obtenerRequisitoAsignacionByAcuerdo";
export const REGISTAR_REQUISITO_BY_ACUERDO = "registrarRequisitoByAcuerdo";
export const ACTUALIZAR_REQUISITO_BY_ACUERDO = "actualizaRequisitoByAcuerdo";
// mutation types
export const SET_REQUISITOS_BY_ACUERDO = "setRequisitosByAcuerdo";
export const SET_REQUISITO_BY_ACUERDO  = "setRequisitoByAcuerdo";

const state = {
    requisitosByAcuerdo: [],
    requisitoByAcuerdo: []
};

const getters = {
  obtnenerRequisitosByAcuerdo(state) {
    return state.requisitosByAcuerdo;
  }
};

const actions = {
  async [OBTENER_REQUISITOS_BY_ACUERDO](context, datos) {

    let endpoint = `api/AsigAcuerdoRequisitos/all/${datos.EstadoId}/${datos.AcuerdoId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_REQUISITOS_BY_ACUERDO, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_REQUISITO_ASIGNACION_BY_ACUERDO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/AsigAcuerdoRequisitos/`)
        .then(({ data }) => {
          context.commit(SET_REQUISITO_BY_ACUERDO, data.data);
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
  async [REGISTAR_REQUISITO_BY_ACUERDO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/AsigAcuerdoRequisitos`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_REQUISITO_BY_ACUERDO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_REQUISITO_BY_ACUERDO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/AsigAcuerdoRequisitos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_REQUISITO_BY_ACUERDO, data.data);
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
  [SET_REQUISITOS_BY_ACUERDO](state, data) {
    state.requisitosByAcuerdo = data;
  },

  [SET_REQUISITO_BY_ACUERDO](state, data) {
    state.requisitoByAcuerdo = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
