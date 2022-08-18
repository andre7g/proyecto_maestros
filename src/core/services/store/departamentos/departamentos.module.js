//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_DEPARTAMENTOS = "obtenerDepartamentos";
export const OBTENER_DEPARTAMENTO = "obtenerDepartamento";
export const REGISTRAR_DEPARTAMENTO = "registrarDepartamento";
export const ACTUALIZAR_DEPARTAMENTO = "actualizarDepartamento";
// mutation types
export const SET_DEPARTAMENTOS = "setDepartamentos";
export const SET_DEPARTAMENTO  = "setDepartamento";

const state = {
    departamentos: [],
    departamento: []
};

const getters = {
  obtenerDepartamentos(state) {
    return state.departamentos;
  }
};

const actions = {
  async [OBTENER_DEPARTAMENTOS](context, estadoId) {

    let endpoint = 'api/Departamentos'
    if(estadoId){
        endpoint = `api/Departamentos/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_DEPARTAMENTOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_DEPARTAMENTO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Departamentos/`)
        .then(({ data }) => {
          context.commit(SET_DEPARTAMENTO, data.data);
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
  async [REGISTRAR_DEPARTAMENTO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Departamentos`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_DEPARTAMENTO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_DEPARTAMENTO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Departamentos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_DEPARTAMENTO, data.data);
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
  [SET_DEPARTAMENTOS](state, data) {
    state.departamentos = data;
  },

  [SET_DEPARTAMENTO](state, data) {
    state.departamento = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
