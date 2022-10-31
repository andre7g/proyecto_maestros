//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_INGESTAS_BY_DIETA = "obtenerIngestasByDieta";
export const OBTENER_INGESTA = "obtenerIngesta";
export const REGISTRAR_INGESTA = "registrarIngesta";
export const ACTUALIZAR_INGESTA = "actualizarIngesta";
// mutation types
export const SET_INGESTAS = "setIngestas";
export const SET_INGESTA  = "setIngesta";


const state = {
    ingestas: [],
    ingesta: []
};

const getters = {
  obtnenerIngestas(state) {
    return state.ingestas;
  }
};

const actions = {
  async [OBTENER_INGESTAS_BY_DIETA](context, dietaId) {

    let endpoint = `api/Ingestas/all/${dietaId}`
    

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_INGESTAS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_INGESTA](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Dietas/`)
        .then(({ data }) => {
          context.commit(SET_INGESTA, data.data);
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
  async [REGISTRAR_INGESTA](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Ingestas`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_INGESTA, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_INGESTA](context, datos) {
    
    let id = datos.ingestaId;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Ingestas/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_INGESTA, data.data);
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
  [SET_INGESTAS](state, data) {
    state.ingestas = data;
  },

  [SET_INGESTA](state, data) {
    state.ingesta = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
