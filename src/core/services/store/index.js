import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import profile from "./profile.module";
//import cargaarchivo from "./cargaarchivo.module";
import genericoget from "./genericoget.module";
import usuarios from "./usuarios/usuarios.module";
import historialusuarios from "./control/historialusuarios.module";



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    profile,
    genericoget,
    usuarios,
    historialusuarios
  }
});
