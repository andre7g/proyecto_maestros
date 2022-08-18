//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ESTADOS = "obtenerEstados";
export const OBTENER_ESTADO = "obtenerEstado";
export const REGISTAR_ESTADO = "registrarEstado";
export const ACTUALIZAR_ESTADO = "actualizarEstado";
// mutation types
export const SET_ESTADOS = "setEstados";
export const SET_ESTADO  = "setEstado";

const state = {
  estados: [],
  estado: []
};

const getters = {
  obtnenerEstados(state) {
    return state.estados;
  }
};

const actions = {
  async [OBTENER_ESTADOS](context, estadoId) {

    let endpoint = 'api/Estados'
    if(estadoId){
        endpoint = `api/Estados/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_ESTADOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_ESTADO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=Instituciones/`)
        .then(({ data }) => {
          context.commit(SET_ESTADO, data.data);
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
  async [REGISTAR_ESTADO](context, datos) {
    //console.log(datosEmpresa)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=Instituciones`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ESTADO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_ESTADO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=Instituciones/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ESTADO, data.data);
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
  [SET_ESTADOS](state, data) {
    state.estados = data;
  },

  [SET_ESTADO](state, data) {
    state.estado = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
