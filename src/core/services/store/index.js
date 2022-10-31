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
import ejercicios from "./ejercicios/ejercicios.module";
import rutinas from "./ejercicios/rutinas.module";
import series from "./ejercicios/series.module";
import seriesejercicios from "./ejercicios/seriesejercicios.module";
import usuariorutinas from "./ejercicios/usuariorutinas.module";
import dietas from "./dietas/dietas.module";
import alimentos from "./dietas/alimentos.module";
import grupoalimentos from "./dietas/grupoalimentos.module";
import ingestas from "./dietas/ingestas.module";
import ingestaalimentos from "./dietas/ingestaalimentos.module";
import dietasusuarios from "./dietas/dietasusuarios.module";
import historialpagos from "./usuarios/historialpagos.module";



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
    historialusuarios,
    ejercicios,
    rutinas,
    series,
    seriesejercicios,
    usuariorutinas,
    dietas,
    alimentos,
    grupoalimentos,
    ingestas,
    ingestaalimentos,
    dietasusuarios,
    historialpagos
  }
});
