//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_USUARIOS = "obtenerUsuarios";
export const OBTENER_USUARIO = "obtenerUsuario";
export const REGISTAR_USUARIO = "registrarUsuario";
export const ACTUALIZAR_USUARIO = "actualizarUsuario";
// mutation types
export const SET_USUARIOS = "setUsuarios";
export const SET_USUARIO  = "setUsuario";


const state = {
    usuarios: [],
    usuario: []
};

const getters = {
  obtnenerUsuarios(state) {
    return state.usuarios;
  }
};

const actions = {
  async [OBTENER_USUARIOS](context, estadoId) {

    let endpoint = 'api/Usuarios'
    if(estadoId){
        endpoint = `api/Usuarios/all/${estadoId}`
    }

    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
            .then(({ data }) => {
                context.commit(SET_USUARIOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
  },
  async [OBTENER_USUARIO](context, id) {
    return new Promise(resolve => {
      ApiService.query(`apiconsume/edit/${id}?endpoint=api/Usuarios/`)
        .then(({ data }) => {
          context.commit(SET_USUARIO, data.data);
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
  async [REGISTAR_USUARIO](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/Usuarios`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_USUARIO, data.data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },

  async [ACTUALIZAR_USUARIO](context, datos) {
    
    let id = datos.id;

    return new Promise(resolve => {
      ApiService.update(
        `apiconsume/update/${id}?endpoint=api/Usuarios/`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_USUARIO, data.data);
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
  [SET_USUARIOS](state, data) {
    state.usuarios = data;
  },

  [SET_USUARIO](state, data) {
    state.usuario = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
