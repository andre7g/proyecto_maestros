//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_SUBSECTORES = "obtenerSubSectores";
export const OBTENER_SUBSECTORES_BY_SECTOR = "obtenerSubSectoresBySector";
export const OBTENER_SUBSECTOR = "obtenerSubSector";
export const REGISTRAR_SUBSECTOR = "registrarSubSector";
export const ACTUALIZAR_SUBSECTOR = "actualizarSubSector";
// mutation types
export const SET_SUBSECTORES = "setSubSectores";
export const SET_SUBSECTOR = "setSubSector";

const state = {
    subSectores: [],
    subSector: [],
};

const getters = {
  obtenerSubSectores(state) {
    return state.subactividades;
  },
};

const actions = {
  async [OBTENER_SUBSECTORES_BY_SECTOR](context, sector_id) {
    let endpoint = `api/SubSector/bySector/${sector_id}`;
    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_SUBSECTORES, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_SUBSECTORES](context, estadoId) {
    let endpoint = "api/SubSector";
    if (estadoId) {
      endpoint = `api/SubSector/all/${estadoId}`;
    }

    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_SUBSECTOR, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_SUBSECTOR](context, id) {
    return new Promise((resolve) => {
      ApiService.query(
        `apiconsume/edit/${id}?endpoint=api/SubSector/`
      )
        .then(({ data }) => {
          context.commit(SET_SUBSECTOR, data.data);
          //console.log(this.instituciones)
          resolve(data);
        })
        .catch((error) => {
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
  async [REGISTRAR_SUBSECTOR](context, datos) {
    //console.log(datos)
    return new Promise((resolve) => {
      ApiService.post(
        `apiconsume/create?endpoint=api/SubSector`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SUBSECTOR, data.data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_SUBSECTOR](context, datos) {
    let id = datos.id;

    return new Promise((resolve) => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/SubSector/UpdateDepartamentos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SUBSECTOR, data.data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
};

const mutations = {
  [SET_SUBSECTORES](state, data) {
    state.subSectores = data;
  },

  [SET_SUBSECTOR](state, data) {
    state.subSector = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
