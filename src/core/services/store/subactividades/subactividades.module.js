//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_SUBACTIVIDADES = "obtenerSubActividades";
export const OBTENER_SUBACTIVIDADES_BY_ACTIVIDAD = "obtenerSubActividadesByActividad";
export const OBTENER_SUBACTIVIDAD = "obtenerSubActividad";
export const REGISTRAR_SUBACTIVIDAD = "registrarSubActividad";
export const ACTUALIZAR_SUBACTIVIDAD = "actualizarSubActividad";
// mutation types
export const SET_SUBACTIVIDADES = "setSubActividades";
export const SET_SUBACTIVIDAD = "setSubActividad";

const state = {
  subactividad: [],
  subactividades: [],
};

const getters = {
  obtenerSubActividad(state) {
    return state.subactividades;
  },
};

const actions = {
  async [OBTENER_SUBACTIVIDADES_BY_ACTIVIDAD](context, actividad_id) {
    let endpoint = `api/SubActividadesProductivas/byActividad/${actividad_id}`;

    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_SUBACTIVIDADES, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_SUBACTIVIDADES](context, estadoId) {
    let endpoint = "api/SubActividadesProductivas";
    if (estadoId) {
      endpoint = `api/SubActividadesProductivas/all/${estadoId}`;
    }

    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_SUBACTIVIDADES, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_SUBACTIVIDAD](context, id) {
    return new Promise((resolve) => {
      ApiService.query(
        `apiconsume/edit/${id}?endpoint=api/SubActividadesProductivas/`
      )
        .then(({ data }) => {
          context.commit(SET_SUBACTIVIDAD, data.data);
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
  async [REGISTRAR_SUBACTIVIDAD](context, datos) {
    //console.log(datos)
    return new Promise((resolve) => {
      ApiService.post(
        `apiconsume/create?endpoint=api/SubActividadesProductivas`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SUBACTIVIDAD, data.data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_SUBACTIVIDAD](context, datos) {
    let id = datos.id;

    return new Promise((resolve) => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/SubActividadesProductivas/UpdateDepartamentos/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_SUBACTIVIDAD, data.data);
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
  [SET_SUBACTIVIDADES](state, data) {
    state.subactividades = data;
  },

  [SET_SUBACTIVIDAD](state, data) {
    state.subactividad = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
