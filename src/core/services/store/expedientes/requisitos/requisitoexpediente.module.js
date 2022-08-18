//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const REGISTAR_REQUISITO_EXPEDIENTE = "registrarRequisitoExpediente";
export const OBTENER_REQUISITOS_EXPEDIENTE = "obtenerRequisitosExpediente";
export const OBTENER_REQUISITOS_EXPEDIENTE_BY_CATEGORIA_TIPOINSTRUMENTO = "obtenerRequisitosExpedienteCategoriaInstrumento";


export const SET_REQUISITOS_EXPEDIENTE = "setRequisitosExpediente";
export const SET_REQUISITO_EXPEDIENTE = "setRequisitoExpediente";


const state = {
    requisitosExpediente: [],
    requisitoExpediente: []
};

const getters = {
  obtnenerRequisito(state) {
    return state.requisitosExpediente;
  }
};

const actions = {


  /**
   * Registrar un requisito de expediente
   * @param {*} context
   * @param {*} datos
   * @returns
   */
   async [REGISTAR_REQUISITO_EXPEDIENTE](context, datos) {
    //console.log(datos)
    return new Promise(resolve => {
      ApiService.post(
        `apiconsume/create?endpoint=api/RequisitosExpediente`,
        datos
      )
        .then(({ data }) => {
          context.commit(SET_REQUISITO_EXPEDIENTE, data.data);
          resolve(data);
        })
        .catch(error => {
          resolve({ 
            status: 400,
            message: error
          });
          //context.commit(SET_ERROR, response.data.errors);
        });
    });
  },



    async [OBTENER_REQUISITOS_EXPEDIENTE](context, parametros) {

        let endpoint = `api/RequisitosExpediente/all/${parametros.expedienteId}/${parametros.estadoId}`
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_REQUISITOS_EXPEDIENTE, data.data);
                    //console.log(data)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)

                    //context.commit(SET_ERROR, response.data.errors);
                });
        });       
    },


    async [OBTENER_REQUISITOS_EXPEDIENTE_BY_CATEGORIA_TIPOINSTRUMENTO](context, parametros) {

      let endpoint = `api/RequisitosExpediente/documentos/${parametros.categoriaId}/${parametros.tipoInstrumentoId}/${parametros.expedienteId}`
      
      return new Promise(resolve => {
          ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
              .then(({ data }) => {
                  context.commit(SET_REQUISITOS_EXPEDIENTE, data.data);
                  //console.log(data)
                  resolve(data)
              })
              .catch((error) => {
                  console.log(error)

                  //context.commit(SET_ERROR, response.data.errors);
              });
      });       
  }

};

const mutations = {
  [SET_REQUISITOS_EXPEDIENTE](state, data) {
    state.requisitosExpediente = data;
  },

  [SET_REQUISITO_EXPEDIENTE](state, data) {
    state.requisitoExpediente = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
