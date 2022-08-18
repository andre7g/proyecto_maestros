//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ACTIVIDADES = "obtenerActividades";
export const OBTENER_ACTIVIDAD = "obtenerActividad";
export const REGISTRAR_ACTIVIDAD = "registrarActividad";
export const ACTUALIZAR_ACTIVIDAD = "actualizarActividad";
// mutation types
export const SET_ACTIVIDADES = "setActividades";
export const SET_ACTIVIDAD  = "setActividad";

const state = {
    actividad: [],
    actividades: []
};

const getters = {
  obtenerActividad(state) {
    return state.actividades;
  }
};

const actions = {
  async [OBTENER_ACTIVIDADES](context, estadoId) {

    let endpoint = 'api/ActividadesProductivas'
    if(estadoId){
        endpoint = `api/ActividadesProductivas/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_ACTIVIDADES, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_ACTIVIDAD](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/ActividadesProductivas/`)
        .then(({ data }) => {
          context.commit(SET_ACTIVIDAD, data.data);
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
  async [REGISTRAR_ACTIVIDAD](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/ActividadesProductivas`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ACTIVIDAD, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_ACTIVIDAD](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/ActividadesProductivas/UpdateDepartamentos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_ACTIVIDAD, data.data);
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
  [SET_ACTIVIDADES](state, data) {
    state.actividades = data;
  },

  [SET_ACTIVIDAD](state, data) {
    state.actividad = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
