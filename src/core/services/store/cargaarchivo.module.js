//import axios from "axios";
import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ARCHIVOS = "obtenerArchivos";
export const OBTENER_ARCHIVO = "obtenerArchivo";
export const OBTENER_DOCUMENTOS_POR_EMPRESA_INSTITUCION = "obtenerDocumentosPorEmpresaInstitucion"
export const REGISTRAR_ARCHIVO = "registrarArchivo";
export const ACTUALIZAR_ARCHIVO = "actualizarArchivo";
export const CARGAR_ARCHIVO = "cargarArchivo";
export const CARGAR_ARCHIVOS = "cargarArchivos";
// mutation types
export const SET_ARCHIVOS = "setArchivos";
export const SET_ARCHIVO = "setArchivo";

const state = {
    archivos: [],
    archivo:[],
}

const getters = {
    obtenerArchivos(state) {
      return state.archivos;
    },
}

const actions = {
    async [OBTENER_ARCHIVOS](context) {

        return new Promise(resolve => {
            ApiService.query("apiconsume/obtener?endpoint=api/Empresas", '')
                .then(({ data }) => {
                    context.commit(SET_ARCHIVOS, data.data);
                    //console.log(data)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)

                    //context.commit(SET_ERROR, response.data.errors);
                });
        });       
    },


    
    /**
     * !Obtener los documentos legales por institución
     * Si se desea obtener los documentos de una empresa, se manda datos.empresaId y datos.socioExtranjeroId-datos.institucionEstadoId como 0
     * Aplica para los otros tipos de institucion
     * @param {*} context 
     * @param {*} datos 
     * @returns 
     */
    async [OBTENER_DOCUMENTOS_POR_EMPRESA_INSTITUCION](context, datos) {
    return new Promise(resolve => {
        ApiService.query(`apiconsume/obtener?endpoint=api/Documentos_Legales/GetDocumentosLegalesActivos/${datos.estadoId}/${datos.socioExtranjeroId}/${datos.institucionEstadoId}/${datos.empresaId}`, '')
            .then(({ data }) => {
                context.commit(SET_ARCHIVOS, data.data);
                //console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)

                //context.commit(SET_ERROR, response.data.errors);
            });
    });       
},


    async [OBTENER_ARCHIVO](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Empresas/`)
                .then(({ data }) => {
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    


    },

    //!Cargar el archivo en el servidor
    async [CARGAR_ARCHIVO](context, datos){
        
        
        //console.log(archivo)
        //console.log(datosEmpresa)
        return new Promise(resolve => {
            ApiService.uploadFile(`apiconsume/document`, datos.file, datos.path)
                .then(({ data }) => {
                    //console.log(archivo)
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    resolve(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    },


    //Cargar multiples archivos
    async [CARGAR_ARCHIVOS](context, datos){
        
        
        //console.log(archivo)
        //console.log(datosEmpresa)
        return new Promise(resolve => {
            ApiService.uploadFiles(`apiconsume/documents`, datos.files)
                .then(({ data }) => {
                    //console.log(archivo)
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    resolve(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    },




    //!Almacenar el registro del archivo en la db
    async [REGISTRAR_ARCHIVO](context, datosArchivo){
        
        
        //console.log(archivo)
        //console.log(datosArchivo)
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Documentos_Legales`, datosArchivo)
                .then(({ data }) => {
                    //console.log(archivo)
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    },
    
    async [ACTUALIZAR_ARCHIVO](context, datos){
        let id = datos.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Empresas/UpdateEmpresas/`, datos.datosEmpresa)
                .then(({ data }) => {
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    }

  }

const mutations = {
    [SET_ARCHIVOS](state, data) {
        state.archivos = data;
    },

    [SET_ARCHIVO](state, data) {
        state.archivo = data;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}