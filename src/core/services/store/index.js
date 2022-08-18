import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import profile from "./profile.module";
import cargaarchivo from "./cargaarchivo.module";

import genericoget from "./genericoget.module";

import institucion from "./instituciones/institucion.module";
import estados from "./estados/estados.module";
import categorias from "./categorias/categorias.module";
import departamentos from "./departamentos/departamentos.module";
import municipios from "./municipios/municipios.module";
import tiposinstrumento from "./tiposinstrumento/tiposinstrumento.module";
import tiposproyecto from "./tiposproyecto/tiposproyecto.module";
import actividadesproductivas from "./actividades/actividadesproductivas.module";
import subactividades from "./subactividades/subactividades.module";
import sectores from "./sectores/sectores.module";
import subsectores from "./subsectores/subsectores.module";
import consultores from "./consultores/consultores.module";
import expedientes from "./expedientes/expedientes.module";
import contactos from "./contactos/contactos.module";
import acuerdosministeriales from "./acuerdos/acuerdosministeriales.module";
import requisitos from "./requisitos/requisitos.module";
import asignacionrequisitos from "./asianacionrequisitos/asignacionrequisitos.module";
import requisitoexpediente from "./expedientes/requisitos/requisitoexpediente.module";



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    profile,
    genericoget,
    institucion,
    estados,
    categorias,
    departamentos,
    municipios,
    tiposinstrumento,
    tiposproyecto,
    actividadesproductivas,
    subactividades,
    sectores,
    subsectores,
    consultores,
    expedientes,
    contactos,
    acuerdosministeriales,
    requisitos,
    asignacionrequisitos,
    requisitoexpediente,
    cargaarchivo
  }
});
