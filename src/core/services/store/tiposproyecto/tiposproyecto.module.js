//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_TIPOS_PROYECTO = "obtenerTiposProyecto";
export const OBTENER_TIPO_PROYECTO = "obtenerTipoProyecto";
export const REGISTRAR_TIPO_PROYECTO = "registrarTipoProyecto";
export const ACTUALIZAR_TIPO_PROYECTO = "actualizarTipoProyecto";
// mutation types
export const SET_TIPOS_PROYECTO = "setTiposProyecto";
export const SET_TIPO_PROYECTO  = "setTipoProyecto";

const state = {
    tiposProyecto: [],
    tipoProyecto: []
};

const getters = {
  obtenerProyecto(state) {
    return state.tiposProyecto;
  }
};

const actions = {
  async [OBTENER_TIPOS_PROYECTO](context, estadoId) {

    let endpoint = 'api/TiposProyecto'
    if(estadoId){
        endpoint = `api/TiposProyecto/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                //console.log(data)
                context.commit(SET_TIPOS_PROYECTO, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_TIPO_PROYECTO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/TiposProyecto/`)
        .then(({ data }) => {
          context.commit(SET_TIPO_PROYECTO, data.data);
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
  async [REGISTRAR_TIPO_PROYECTO](context, datos) {
    console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/TiposProyecto`,
        datos
      )
        .then(({ data }) => {
            console.log(data)
          context.commit(SET_TIPO_PROYECTO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_TIPO_PROYECTO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/TiposProyecto/UpdateTiposProyecto/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_TIPO_PROYECTO, data.data);
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
  [SET_TIPOS_PROYECTO](state, data) {
    state.tiposProyecto = data;
  },

  [SET_TIPO_PROYECTO](state, data) {
    state.tipoProyecto = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
