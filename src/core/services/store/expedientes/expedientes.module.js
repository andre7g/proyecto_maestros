//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_EXPEDIENTES = "obtenerExpedientes";
export const OBTENER_EXPEDIENTE = "obtenerExpediente";
export const REGISTAR_EXPEDIENTE = "registrarExpediente";
export const ACTUALIZAR_EXPEDIENTE = "actualizarExpediente";
export const ACTUALIZAR_DIRECCION_EXPEDIENTE = "actualizarDireccionExpediente";
export const ACTUALIZAR_TIPOEMPRESA_EXPEDIENTE = "actualizarTipoEmpresaExpediente";

export const ASIGNAR_CONSULTOR_EXPEDIENTE = "asignarConsultorExpediente";
// mutation types
export const SET_EXPEDIENTES = "setExpedientes";
export const SET_EXPEDIENTE  = "setExpediente";
export const SET_CONSULTOR = "setConsultor";


const state = {
    expedientes: [],
    expediente: [],
    consultor: {}
};

const getters = {
  obtnenerExpediente(state) {
    return state.expedientes;
  }
};

const actions = {
  async [OBTENER_EXPEDIENTES](context, estadoId) {

    let endpoint = 'api/Expediente'
    if(estadoId){
        endpoint = `api/Expediente/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_EXPEDIENTES, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_EXPEDIENTE](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Expediente/`)
        .then(({ data }) => {
          context.commit(SET_EXPEDIENTE, data.data);
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
  async [REGISTAR_EXPEDIENTE](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Expediente`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EXPEDIENTE, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_EXPEDIENTE](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Expediente/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EXPEDIENTE, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [ACTUALIZAR_DIRECCION_EXPEDIENTE](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Expediente/UpdateDireccionExpediente/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EXPEDIENTE, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  async [ACTUALIZAR_TIPOEMPRESA_EXPEDIENTE](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Expediente/UpdateTipoEmpresaExpediente/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_EXPEDIENTE, data.data);
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
   async [ASIGNAR_CONSULTOR_EXPEDIENTE](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(`apiconsume/create?endpoint=api/DetalleConsultor`, datos)
        .then(({ data }) => {
          context.commit(SET_CONSULTOR, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },



  
};

const mutations = {
  [SET_EXPEDIENTES](state, data) {
    state.expedientes = data;
  },

  [SET_EXPEDIENTE](state, data) {
    state.expediente = data;
  },

  [SET_CONSULTOR](state, data){
    state.consultor = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
