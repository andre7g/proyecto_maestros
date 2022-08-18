//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_CONTACTOS = "obtenerContactos";
export const OBTENER_CONTACTOS_BY_EXPEDIENTE = "obtenerContactosByExpediente";
export const OBTENER_CONTACTO = "obtenerContacto";
export const REGISTRAR_CONTACTO = "registrarContacto";
export const ACTUALIZAR_CONTACTO = "actualizarContacto";
// mutation types
export const SET_CONTACTOS = "setContactos";
export const SET_CONTACTO = "setContacto";

const state = {
    contactos: [],
    contacto: [],
};

const getters = {
  obtenerContactos(state) {
    return state.contactos;
  },
};

const actions = {
  async [OBTENER_CONTACTOS_BY_EXPEDIENTE](context, expediente_id) {
    let endpoint = `api/TipoContacto/GetByExpediente/${expediente_id}`;

    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_CONTACTOS, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_CONTACTOS](context, estadoId) {
    let endpoint = "api/TipoContacto";
    if (estadoId) {
      endpoint = `api/TipoContacto/all/${estadoId}`;
    }

    return new Promise((resolve) => {
      ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, "")
        .then(({ data }) => {
          context.commit(SET_CONTACTOS, data.data);
          //console.log(data)
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [OBTENER_CONTACTO](context, id) {
    return new Promise((resolve) => {
      ApiService.query(
        `apiconsume/edit/${id}?endpoint=api/TipoContacto/`
      )
        .then(({ data }) => {
          context.commit(SET_CONTACTO, data.data);
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
  async [REGISTRAR_CONTACTO](context, datos) {
    //console.log(datos)
    return new Promise((resolve) => {
      ApiService.post(
        `apiconsume/create?endpoint=api/TipoContacto`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_CONTACTO, data.data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_CONTACTO](context, datos) {
    let id = datos.id;

    return new Promise((resolve) => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/TipoContacto/UpdateTipoContacto/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_CONTACTO, data.data);
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
  [SET_CONTACTOS](state, data) {
    state.contactos = data;
  },

  [SET_CONTACTO](state, data) {
    state.contacto = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
