//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_CATEGORIAS = "obtenerCategorias";
export const OBTENER_CATEGORIA = "obtenerCategoria";
export const REGISTAR_CATEGORIA = "registrarCategoria";
export const ACTUALIZAR_CATEGORIA = "actualizarCategoria";
// mutation types
export const SET_CATEGORIAS = "setCategorias";
export const SET_CATEGORIA  = "setCategoria";

const state = {
    categorias: [],
    categoria: []
};

const getters = {
  obtnenerCategorias(state) {
    return state.categorias;
  }
};

const actions = {
  async [OBTENER_CATEGORIAS](context, estadoId) {

    let endpoint = 'api/Categorias'
    if(estadoId){
        endpoint = `api/Categorias/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_CATEGORIAS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_CATEGORIA](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Categorias/`)
        .then(({ data }) => {
          context.commit(SET_CATEGORIA, data.data);
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
  async [REGISTAR_CATEGORIA](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Categorias`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_CATEGORIA, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_CATEGORIA](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Categorias/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_CATEGORIA, data.data);
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
  [SET_CATEGORIAS](state, data) {
    state.categorias = data;
  },

  [SET_CATEGORIA](state, data) {
    state.categoria = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
