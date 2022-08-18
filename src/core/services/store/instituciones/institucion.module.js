//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_INSTITUCIONES = "obtenerInstituciones";
export const OBTENER_INSTITUCION = "obtenerInstitucion";
export const OBTENER_INSTITUCION_DESCRIPCIONES =
  "obtenerInstitucionDescripciones";
export const REGISTAR_INSTITUCION = "registrarInstitucion";
export const ACTUALIZAR_INSTITUCION = "actualizarInstitucion";
export const RESTABLECER_PASS = "restablecerPassInstitucion";
// mutation types
export const SET_INSTITUCIONES = "setInstituciones";
export const SET_INSTITUCION = "setInstitucion";

const state = {
  instituciones: [],
  institucion: []
};

const getters = {
  obtnenerInstituciones(state) {
    return state.instituciones;
  }
};

/*const institucion = {
  id: 1,
  nombreInstitucion: "Institucion 1",
  nombreMaximaAutoridad: "Nombre de la máxima autoridad 1",
  nombreEstado: "Registrada",
  estadosId: 1
};


const instituciones = [
  {
    id: 1,
    nombreInstitucion: "Institucion 1",
    nombreMaximaAutoridad: "Nombre de la máxima autoridad 1",
    nombreEstado: "Registrada",
    estadosId: 1
  },
  {
    id: 2,
    nombreInstitucion: "Institucion 2",
    nombreMaximaAutoridad: "Nombre de la máxima autoridad 2",
    nombreEstado: "Registrada",
    estadosId: 1
  },
  {
    id: 3,
    nombreInstitucion: "Institucion 3",
    nombreMaximaAutoridad: "Nombre de la máxima autoridad 3",
    nombreEstado: "Registrada",
    estadosId: 1
  },
  {
    id: 4,
    nombreInstitucion: "Institucion 4",
    nombreMaximaAutoridad: "Nombre de la máxima autoridad 4",
    nombreEstado: "Registrada",
    estadosId: 1
  },
  {
    id: 5,
    nombreInstitucion: "Institucion 5",
    nombreMaximaAutoridad: "Nombre de la máxima autoridad 5",
    nombreEstado: "Registrada",
    estadosId: 1
  }
];*/


const actions = {
  async [OBTENER_INSTITUCIONES](context) {
    return new Promise(resolve => {

      ApiService.query("apiconsume/obtener?endpoint=Instituciones", "")
        .then(({ data }) => {
          context.commit(SET_INSTITUCIONES, data.data);

          resolve(data);
        })
        .catch(error => {
          console.log(error);

          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [OBTENER_INSTITUCION](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=Instituciones/`)
        .then(({ data }) => {
          context.commit(SET_INSTITUCION, data.data);
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
   * Obtener los datos de una institución con los valores que corresponden a cada foranea
   * @param {*} context
   * @param {*} id
   * @returns
   */
  async [OBTENER_INSTITUCION_DESCRIPCIONES](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Institucion/`)
        .then(({ data }) => {
          context.commit(SET_INSTITUCION, data.data);
          //console.log(this.instituciones)
          resolve(data);
        })
        .catch(error => {
          console.log(error);
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
  async [REGISTAR_INSTITUCION](context, datos) {
    //console.log(datosEmpresa)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=Instituciones`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_INSTITUCION, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_INSTITUCION](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=Instituciones/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_INSTITUCION, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  /**
   * Restablecer la contraseña del usuario master de la institucion
   */

  async [RESTABLECER_PASS](context, datos) {
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.put(
        `apiconsume/update/${id}?endpoint=api/Institucion/ResetPass/`,
        datos.datosInstitucion
      )
        .then(({ data }) => {
          context.commit(SET_INSTITUCION, data.data);
          resolve(data);
        })
        .catch(error => {
          resolve(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  }
};

const mutations = {
  [SET_INSTITUCIONES](state, data) {
    state.instituciones = data;
  },

  [SET_INSTITUCION](state, data) {
    state.institucion = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
