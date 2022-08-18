//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_SECTORES = "obtenerSectores";
export const OBTENER_SECTOR = "obtenerSector";
export const REGISTRAR_SECTOR = "registrarSector";
export const ACTUALIZAR_SECTOR = "actualizarSector";
// mutation types
export const SET_SECTORES = "setSectores";
export const SET_SECTOR  = "setSector";

const state = {
    sectores: [],
    sector: []
};

const getters = {
  obtenerSectores(state) {
    return state.sectores;
  }
};

const actions = {
  async [OBTENER_SECTORES](context, estadoId) {

    let endpoint = 'api/Sector'
    if(estadoId){
        endpoint = `api/Sector/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_SECTORES, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_SECTOR](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Sector/`)
        .then(({ data }) => {
          context.commit(SET_SECTOR, data.data);
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
  async [REGISTRAR_SECTOR](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Sector`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SECTOR, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_SECTOR](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Sector/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SECTOR, data.data);
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
  [SET_SECTORES](state, data) {
    state.sectores = data;
  },

  [SET_SECTOR](state, data) {
    state.sector = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
