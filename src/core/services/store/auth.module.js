
/* eslint-disable */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
//import VuexPersistence from "vuex-persist";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";
export const RESTABLECER_PASS_BY_EMAIL = "updatePassByEmail";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_TOKEN = "setToken";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  roles: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  currentRoles(state){
    return state.roles;
  }
};

const actions = {
  async [LOGIN](context, credentials) {
    //console.log(credentials);
    
    // return new Promise(resolve => {
    //   ApiService.post(`apiconsume/create?endpoint=api/Usuarios/login`, credentials)
    //     .then(({ data }) => {
          //console.log(data.data);
         var datos = {
          status:200,
          message:"Autenticado",
          data:{
            id:1,
            roles:[{rol:"admin",rol_Id:1}],
            token:"abcd",
            usuario:"Camino"
          }
         }
        //  console.log(datos);
        //   if(datos.status==200){
            context.commit(SET_AUTH, datos.data);
            context.commit(SET_TOKEN);
            //return
          //  }
           resolve(datos);
    //     })
    //     .catch(({ response }) => {
    //       //console.log(response)
    //       context.commit(SET_ERROR, response.data.errors);
    //       resolve(response);
    //     });
    // });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
    //   ApiService.setHeader();
    //   return new Promise(resolve => {
    //     ApiService.query(`apiconsume/edit/${JwtService.getUserId()}?endpoint=api/Usuarios/VerificarUsuario/`)
    //       .then(({ data }) => {
            var datos = {
              status:200,
              message:"Verificado",
              data:{
                id:1,
                roles:[{rol:"admin",rol_Id:1}],
                token:"abcd",
                usuario:"Camino"
              }
             }
             //console.log(datos);
            //console.log(data)
            context.commit(SET_AUTH, datos.data);
            //resolve();
    //       })
    //       .catch(({ response }) => {
    //         context.commit(SET_ERROR, response.data.errors);
    //       });
    //     });
     } else {
      context.commit(PURGE_AUTH);
     }
  },
  [UPDATE_PASSWORD](context, payload) {
    const password = payload;

    return ApiService.put("password", password).then(({ data }) => {
      context.commit(SET_PASSWORD, data);
      return data;
    });
  },

   /**
     * Restablecer la contraseña a traves de correo electrónico
     * @param {*} context 
     * @param {*} correo 
     */
    async [RESTABLECER_PASS_BY_EMAIL](context, datos){
      return new Promise(resolve => {
          ApiService.post(`apiconsume/create?endpoint=api/Usuarios/ActualizarPass/Correo`, datos)
              .then(({ data }) => {
                  context.commit(SET_USUARIO, data.data);
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
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    //console.log(user);
    let rolesArray = user.roles.map( a => a.rol_Id );
    
    state.isAuthenticated = true;
    state.user = user;
    state.roles = rolesArray;
    state.errors = {};
    JwtService.saveUserId(state.user.id);
    JwtService.saveRoles(state.user.roles);
    JwtService.saveUser(state.user.usuario);
    //console.log(user);
  },

  [SET_TOKEN](state) {
    JwtService.saveToken(state.user.token);
  },

  [SET_PASSWORD](state, password) {
    state.user.password = password;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
    JwtService.destroyRoles();
  }
};



export default {
  state,
  actions,
  mutations,
  getters
};
