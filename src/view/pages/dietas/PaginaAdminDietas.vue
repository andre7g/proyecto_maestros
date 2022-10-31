<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Dietas | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color="#C6E2CF"
              class="mb-2 float-right teal--text"
              @click="modalNuevo"
            >
              <v-icon left>fas fa-user-plus</v-icon> Nueva Dieta
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="col-md-12 m-0 p-0">
          <v-divider></v-divider>
        </v-row>
      </v-card-title>
      <v-card-text class="pl-0 pr-0">
        <v-data-table
          class="elevation-0"
          :headers="headers"
          :items="items"
          :search="filtro"
          :loading="tableLoading"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-page-first',
            lastIcon: 'mdi-page-last',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right',
            'items-per-page-text': 'Registros por página',
            pageText: '{0}-{1} de {2}',
          }"
        >
          <template v-slot:top>
            <!-- v-container, v-col and v-row are just for decoration purposes. -->
            <v-container fluid>
              <v-row>
                <v-col cols="6" md="6" sm="6" xs="6">
                  <v-text-field
                    autocomplete="off"
                    append-icon="mdi-magnify"
                    dense
                    filled
                    color="blue-grey darken-2"
                    v-model="filtro"
                    label="Buscar"
                    maxlength="100"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="6" sm="6" xs="6">
                  <v-select
                    v-model="selectEstado"
                    :items="estados"
                    :loading="false"
                    dense
                    filled
                    label="Estado"
                    :no-data-text="'No existen estados registrados'"
                    menu-props="auto"
                    return-object
                  ></v-select>
                </v-col>

                <v-col cols="2" md="2" sm="12" xs="6" class="d-none">
                  <v-btn
                    class="ma-0 white--text d-none"
                    medium
                    color="light-blue darken-2"
                  >
                    <v-icon left>mdi-magnify</v-icon> Buscar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.tipo }}</td>
              <td>
                <v-chip
                  class="ma-2 font-weight-medium"
                  label
                  :color="
                    item.estadosId === 1
                      ? 'teal'
                      : item.estadosId === 2
                      ? 'pink'
                      : 'pink'
                  "
                  :text-color="
                    item.estadosId === 1
                      ? 'white'
                      : item.estadosId === 2
                      ? 'white'
                      : 'pink darken-1'
                  "
                  small
                >
                  {{ item.estado }}
                </v-chip>
              </td>
              <td>
                <v-btn
                  class="
                    ma-2
                    teal--text
                    lighten-2--text
                    font-weight-medium
                    text-capitalize
                  "
                  small
                  depressed
                  color="#C6E2CF"
                  @click="obtenerDatosItem(item.id)"
                >
                  <v-icon left>mdi-pencil</v-icon> Actualizar
                </v-btn>
                <v-btn
                  class="
                    ma-2
                    teal--text
                    lighten-2--text
                    font-weight-medium
                    text-capitalize
                  "
                  small
                  depressed
                  color="#C6E2CF"
                  @click="modalIngestas(item.id)"
                >
                  <v-icon left>fas fa-plus</v-icon> Agregar Alimentos
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
      <!-- <template v-slot:html>
            {{ code4.html }}
          </template>
          <template v-slot:js>
            {{ code4.js }}
          </template> -->
    </v-card>

    <!--begin:: modal registro-->
    <v-dialog
      v-model="dialogRegistro"
      max-width="600"
      transition="scroll-y-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          {{ modalTitle }}

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnRegistroLoading"
            @click="
              dialogRegistro = false;
              resetForm();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="d-none"></v-divider>

        <v-card-text class="pl-8 pr-8 pt-5">
          <v-form
            ref="form"
            v-on:submit.prevent="registrarItem"
            v-model="validForm"
          >
            <v-row>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.nombre"
                  label="Nombre de la Dieta"
                  :rules="[
                    required('Nombre de la Dieta'),
                    maxLengthForm100('Nombre de la Dieta'),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-textarea
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.descripcion"
                  label="Descripción de la Dieta"
                  :rules="[
                    required('Descripción de la Dieta'),
                    maxLengthForm1000('Descripción de la Dieta'),
                  ]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItem.tiposDietasId"
                  :items="tiposDieta"
                  class="required"
                  dense
                  filled
                  label="Tipo de Dieta"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Tipo de Dieta')]"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="2" sm="4" class="pt-0 pb-0">
                <label class="grey--text body-2 mb-0 font-weight-medium"
                  >Estado</label
                >
                <template>
                  <v-switch
                    class="pt-0 mt-1"
                    color="teal"
                    v-model="switchItemEstado"
                    inset
                    :label="switchItemEstado ? 'Activo' : 'Inactivo'"
                  >
                  </v-switch>
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn
                  color="grey lighten-5"
                  elevation="0"
                  class="mb-2 float-right grey lighten-5"
                  @click="
                    dialogRegistro = false;
                    resetForm();
                  "
                  :disabled="btnRegistroLoading"
                >
                  Cancelar
                </v-btn>
                <!--:disabled="!validDocForm" type="submit"-->
                <v-btn
                  color="#C6E2CF"
                  class="mb-2 float-right teal--text"
                  type="submit"
                  :elevation="0"
                  :disabled="!validForm"
                  :loading="btnRegistroLoading"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <div style="flex: 1 1 auto"></div>
      </v-card>
    </v-dialog>
    <!--end:: modal registro-->
    <!--begin:: modal registro-->
    <v-dialog
      v-model="dialogRegistroIngestas"
      persistent
      scrollable
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-card-title>
          Registrar Alimentos

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnRegistroIngestaLoading"
            @click="
              dialogRegistroIngestas = false;
              resetFormIngestas();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="d-none"></v-divider>

        <v-card-text class="pl-8 pr-8 pt-5">
          <v-form
            ref="form"
            v-on:submit.prevent="registrarItemIngesta"
            v-model="validFormIngestas"
          >
            <v-row>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItemIngestas.nombre"
                  label="Nombre de la Ingesta"
                  :rules="[
                    required('Nombre de la Ingesta'),
                    maxLengthForm100('Nombre de la Ingesta'),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItemIngestas.descripcion"
                  label="Descripción de la Ingesta"
                  :rules="[
                    required('Descripción de la Ingesta'),
                    maxLengthForm1000('Descripción de la Ingesta'),
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <h4>Agregar alimentos de la Ingesta</h4>
            <v-row>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  :loading="grupoAlimentosDdlLoading"
                  v-model="grupoAlimentoId"
                  :items="grupoalimentos"
                  class="required"
                  dense
                  filled
                  label="Grupo Alimenticio"
                  item-text="grupo"
                  item-value="id"
                  :rules="[selectRequired('Grupo Alimenticio')]"
                  @change="obtenerItemsAlimentos"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="pt-4 pb-0">
                <v-select
                  :loading="alimentosDdlLoading"
                  v-model="alimentoId"
                  :items="alimentos"
                  class="required"
                  dense
                  filled
                  label="Alimento"
                  :rules="[selectRequired('Alimento')]"
                  menu-props="auto"
                  return-object
                  :no-data-text="'No existen estados registrados'"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="cantidadAlimentos"
                  label="Cantidad"
                  v-mask="'##'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="8" sm="12" class="pt-4 pb-0">
                <v-chip class="ma-2" color="green" text-color="white">
                  <v-avatar left class="green darken-4 p-2" large>
                    <v-icon>fas fa-balance-scale</v-icon>
                  </v-avatar>
                  {{ caloriasTotales }} Kilocalorias
                </v-chip>
                <v-chip class="ma-2" color="amber darken-1" text-color="white">
                  <v-avatar left class="amber darken-3 p-2" large>
                    <v-icon>fas fa-balance-scale</v-icon>
                  </v-avatar>
                  {{ proteinasTotales }}g Proteínas
                </v-chip>
                <v-chip class="ma-2" color="amber darken-3" text-color="white">
                  <v-avatar left class="amber darken-4 p-2" large>
                    <v-icon>fas fa-balance-scale</v-icon>
                  </v-avatar>
                  {{ grasasTotales }}g Grasas
                </v-chip>
                <v-chip class="ma-2" color="amber darken-4" text-color="white">
                  <v-avatar left class="deep-orange darken-4 p-2" large>
                    <v-icon>fas fa-balance-scale</v-icon>
                  </v-avatar>
                  {{ carbosTotales }}g Carbohidratos
                </v-chip>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="pt-4 pb-0">
                <v-btn
                  color="#C6E2CF"
                  class="mb-2 float-right teal--text"
                  :elevation="0"
                  :loading="btnAgregarAlimentoLoading"
                  @click="agregarAlimento"
                >
                  Agregar Alimento
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-data-table
                  class="elevation-0"
                  :headers="headersAlimentos"
                  :items="itemsAlimentos"
                  :loading="tableLoading"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-page-first',
                    lastIcon: 'mdi-page-last',
                    prevIcon: 'mdi-chevron-left',
                    nextIcon: 'mdi-chevron-right',
                    'items-per-page-text': 'Registros por página',
                    pageText: '{0}-{1} de {2}',
                  }"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.nombre }}</td>
                      <td>{{ item.cantidad }}</td>
                      <td>{{ item.energia_KcaL }}</td>
                      <td>{{ item.proteina_g }}</td>
                      <td>{{ item.grasaTotal_g }}</td>
                      <td>{{ item.carbohidratos_g }}</td>
                      <td>
                        <v-btn
                          class="
                                ma-2
                                red--text
                                lighten-2--text
                                font-weight-medium
                                text-capitalize
                            "
                          small
                          depressed
                          color="red lighten-4"
                          @click="eliminarItemAlimento(item)"
                        >
                          <v-icon left>fas fa-window-close</v-icon> Eliminar
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="grey lighten-5"
                  elevation="0"
                  class="mb-2 float-right grey lighten-5"
                  @click="
                    dialogRegistroIngestas = false;
                    resetFormIngestas();
                  "
                  :disabled="btnRegistroIngestaLoading"
                >
                  Cancelar
                </v-btn>
                <!--:disabled="!validDocForm" type="submit"-->
                <v-btn
                  color="#C6E2CF"
                  class="mb-2 float-right teal--text"
                  type="submit"
                  :elevation="0"
                  :disabled="!validFormIngestas"
                  :loading="btnRegistroIngestaLoading"
                >
                  Guardar Ingesta
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="col-md-12 m-0 p-0">
            <v-divider></v-divider>
          </v-row>
          <h2>Ingestas</h2>
          <v-row class="col-md-12">
            <v-expansion-panels focusable>
              <v-expansion-panel
                class="mt-2"
                v-for="(ingesta, i) in ingestas"
                :key="i"
              >
                <v-expansion-panel-header disable-icon-rotate color="#C6E2CF">
                  <v-chip color="#C6E2CF" text-color="#009688">
                    <v-avatar left color="#009688" large>
                      <v-icon color="#FFF">fas fa-apple-alt</v-icon>
                    </v-avatar>
                    {{ ingesta.nombre }} - {{ ingesta.energia_KcaL }} kcal
                  </v-chip>
                  <template v-slot:actions>
                    <!--v-icon
                      :color="
                        ingesta.tipoEjercicioId === 1
                          ? 'red'
                          : ingesta.tipoEjercicioId === 2
                          ? 'black'
                          : ingesta.tipoEjercicioId === 3
                          ? 'teal'
                          : 'red accent-4'
                      "
                    >
                      {{
                        seingestarie.tipoEjercicioId === 1
                          ? "fas fa-burn"
                          : ingesta.tipoEjercicioId === 2
                          ? "fas fa-dumbbell"
                          : ingesta.tipoEjercicioId === 3
                          ? "fas fa-running"
                          : "fas fa-exclamation-triangle"
                      }}
                    </!--v-icon-->
                  </template>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-card-text class="pl-0 pr-0">
                    <v-row class="mb-2">
                      <v-col cols="12" md="10" sm="12" class="pt-4 pb-0">
                        <v-chip
                          class="ma-2"
                          color="amber darken-1"
                          text-color="white"
                        >
                          <v-avatar left class="amber darken-3 p-2" large>
                            <v-icon>fas fa-balance-scale</v-icon>
                          </v-avatar>
                          {{ ingesta.proteina_g }}g Proteínas
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          color="amber darken-3"
                          text-color="white"
                        >
                          <v-avatar left class="amber darken-4 p-2" large>
                            <v-icon>fas fa-balance-scale</v-icon>
                          </v-avatar>
                          {{ ingesta.grasaTotal_g }}g Grasas
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          color="amber darken-4"
                          text-color="white"
                        >
                          <v-avatar left class="deep-orange darken-4 p-2" large>
                            <v-icon>fas fa-balance-scale</v-icon>
                          </v-avatar>
                          {{ ingesta.carbohidratos_g }}g Carbohidratos
                        </v-chip>
                      </v-col>
                      <v-col cols="12" md="2" sm="12" class="pt-4 pb-0">
                        <v-btn
                          class="
                                ma-2
                                red--text
                                lighten-2--text
                                font-weight-medium
                                text-capitalize
                                float-end
                            "
                          color="red lighten-4"
                          @click="eliminarIngesta(ingesta.id)"
                        >
                          <v-icon left>fas fa-window-close</v-icon> Eliminar
                        </v-btn>
                      </v-col>
                    </v-row>
                    <Ingesta :ingesta="ingesta" />
                  </v-card-text>
                  <v-row class="col-md-12 m-0 p-0">
                    <v-divider></v-divider>
                  </v-row>
                  <v-card-actions> </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <!--Fin:: Dialgo para almacenamiento de documentos-->
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--end:: modal registro-->
    <!--Dialog loader -->
    <DialogLoader
      :dialogVisible="dialogLoaderVisible"
      :text="dialogLoaderText"
    ></DialogLoader>
    <!---->

    <!--Inicio:: Snack alert-->
    <SnackAlert ref="snackalert"></SnackAlert>
    <!-- Fin:: Snack alert-->
  </div>
</template>

<script>
import Vue from "vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";

import {
  OBTENER_DIETAS,
  REGISTRAR_DIETA,
  OBTENER_DIETA,
  ACTUALIZAR_DIETA,
} from "@/core/services/store/dietas/dietas.module";
import Ingesta from "@/view/components/dietas/CardIngesta.vue";
import { OBTENER_ALIMENTOS_BY_GRUPO } from "@/core/services/store/dietas/alimentos.module";
import { OBTENER_GRUPOS_ALIMENTICIOS } from "@/core/services/store/dietas/grupoalimentos.module";
import {
  REGISTRAR_INGESTA,
  OBTENER_INGESTAS_BY_DIETA,
  ACTUALIZAR_INGESTA,
} from "@/core/services/store/dietas/ingestas.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "AdminDietas",
  data() {
    return {
      itemName: "Dieta",
      validForm: false,
      tableLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nueva dieta",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: "",
      items: [],
      ingestas: [],
      datosItem: {
        id: 0,
        nombre: "",
        descripcion: "",
        tiposDietasId: "",
        estadosId: 1,
      },
      datosItemIngestas: {
        dietasId: 0,
        nombre: "",
        descripcion: "",
        proteina_g: 0,
        grasaTotal_g: 0,
        carbohidratos_g: 0,
        energia_KcaL: 0,
        listaAlimentos: [],
      },
      tiposDieta: [
        { value: 1, text: "Bajar de peso" },
        { value: 2, text: "Subir de peso" },
        { value: 3, text: "Masa muscular" },
        { value: 4, text: "Mantener peso" },
      ],
      estados: [
        { text: "Todos", value: null },
        { id: 1, text: "Activo" },
        { id: 2, text: "Inactivo" },
      ],
      ...validations,
      dialogRegistroIngestas: false,
      btnRegistroIngestaLoading: false,
      validFormIngestas: false,
      alimentos: [],
      grupoalimentos: [],
      alimentosDdlLoading: false,
      grupoAlimentosDdlLoading: false,
      alimentoId: 0,
      grupoAlimentoId: 0,
      btnAgregarAlimentoLoading: false,
      caloriasTotales: 0,
      proteinasTotales: 0,
      grasasTotales: 0,
      carbosTotales: 0,
      itemsAlimentos: [],
      cantidadAlimentos: 1,
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
    Ingesta,
  },
  methods: {
    agregarAlimento() {
      let cantidad = parseInt(this.cantidadAlimentos);

      if (cantidad === 0) {
        this.$refs.snackalert.SnackbarShow(
          "warning",
          "Alerta",
          "Ingresa la cantidad del alimento."
        );
        return;
      }

      if (this.alimentoId !== 0) {
        let kilocalorias = parseInt(cantidad * this.alimentoId.energia_KcaL);
        let proteinas = (
          cantidad * parseFloat(this.alimentoId.proteina_g)
        ).toFixed(2);
        let grasas = (
          cantidad * parseFloat(this.alimentoId.grasaTotal_g)
        ).toFixed(2);
        let carbos = (
          cantidad * parseFloat(this.alimentoId.carbohidratos_g)
        ).toFixed(2);

        this.caloriasTotales = parseInt(this.caloriasTotales + kilocalorias);
        this.proteinasTotales = (
          parseFloat(proteinas) + parseFloat(this.proteinasTotales)
        ).toFixed(2);
        this.grasasTotales = (
          parseFloat(grasas) + parseFloat(this.grasasTotales)
        ).toFixed(2);
        this.carbosTotales = (
          parseFloat(carbos) + parseFloat(this.carbosTotales)
        ).toFixed(2);
        // let proteinasTotales = parseFloat(this.proteinasTotales + proteinas);
        // let grasasTotales = parseFloat(this.grasasTotales+ grasas);
        // let carbosTotales = parseFloat(this.carbosTotales + carbos);

        // this.proteinasTotales = proteinasTotales.toFixed(2);
        // this.grasasTotales = grasasTotales.toFixed(2);
        // this.carbosTotales = carbosTotales.toFixed(2);

        this.itemsAlimentos.push({
          nombre: this.alimentoId.text,
          cantidad: cantidad,
          proteina_g: proteinas,
          grasaTotal_g: grasas,
          carbohidratos_g: carbos,
          energia_KcaL: kilocalorias,
          alimentosPorcion_Id: this.alimentoId.id,
        });
      } else {
        this.$refs.snackalert.SnackbarShow(
          "warning",
          "Alerta",
          "Selecciona un alimento."
        );
      }
    },
    eliminarItemAlimento(elemento) {
      this.caloriasTotales = parseInt(
        this.caloriasTotales - elemento.energia_KcaL
      );
      this.proteinasTotales = parseFloat(
        this.proteinasTotales - elemento.proteina_g
      ).toFixed(2);
      this.grasasTotales = parseFloat(
        this.grasasTotales - elemento.grasaTotal_g
      ).toFixed(2);
      this.carbosTotales = parseFloat(
        this.carbosTotales - elemento.carbohidratos_g
      ).toFixed(2);

      let index = this.itemsAlimentos.indexOf(elemento);
      //console.log(index);
      this.itemsAlimentos.splice(index, 1);
    },
    filtroEstado(value) {
      if (!this.selectEstado.value) {
        return true;
      }
      return value === this.selectEstado.text;
    },
    modalNuevo() {
      this.accion = 1;
      this.modalTitle = `Registrar ${this.itemName}`;
      this.btnRegistroText = `Registrar ${this.itemName}`;
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },
    modalIngestas(Id) {
      this.datosItemIngestas.dietasId = Id;
      this.dialogRegistroIngestas = true;
      this.obtenerItemsIngestas();
    },
    resetForm() {
      this.datosItem = {
        id: 0,
        nombre: "",
        descripcion: "",
        tiposDietasId: "",
        estadosId: 1,
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },
    resetFormIngestas() {
      this.datosItemIngestas.nombre = "";
      this.datosItemIngestas.descripcion = "";
      this.datosItemIngestas.proteina_g = 0;
      this.datosItemIngestas.grasaTotal_g = 0;
      this.datosItemIngestas.carbohidratos_g = 0;
      this.datosItemIngestas.energia_KcaL = 0;
      this.datosItemIngestas.listaAlimentos = [];

      this.caloriasTotales = 0;
      this.proteinasTotales = 0;
      this.grasasTotales = 0;
      this.carbosTotales = 0;
      this.itemsAlimentos = [];
      this.cantidadAlimentos = 1;
      this.grupoAlimentoId = 0;
      this.alimentos = [];
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_DIETAS)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.dietas.dietas;
            //console.log(this.items);
          }
          this.tableLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /// Obtener los items alimentos
    async obtenerItemsAlimentos() {
      this.alimentos = [];
      this.alimentosDdlLoading = true;

      this.$store
        .dispatch(OBTENER_ALIMENTOS_BY_GRUPO, this.grupoAlimentoId)
        .then((res) => {
          if (res.status === 200) {
            this.alimentos = this.$store.state.alimentos.alimentos;
            //console.log(this.items);
          }
          this.alimentosDdlLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.alimentosDdlLoading = false;
        });
    },
    /// Obtener los items grupos alimentos
    async obtenerItemsGruposAlimentos() {
      this.grupoalimentos = [];
      this.grupoAlimentosDdlLoading = true;

      this.$store
        .dispatch(OBTENER_GRUPOS_ALIMENTICIOS)
        .then((res) => {
          if (res.status === 200) {
            this.grupoalimentos = this.$store.state.grupoalimentos.gruposAlimenticios;
            console.log(this.grupoalimentos);
          }
          this.grupoAlimentosDdlLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.grupoAlimentosDdlLoading = false;
        });
    },
    /// Obtener los items series
    async obtenerItemsIngestas() {
      this.dialogLoaderVisible = true;
      this.ingestas = [];
      await this.$store
        .dispatch(OBTENER_INGESTAS_BY_DIETA, this.datosItemIngestas.dietasId)
        .then((res) => {
          if (res.status === 200) {
            this.ingestas = this.$store.state.ingestas.ingestas;
            console.log(this.ingestas);
          }
          this.dialogLoaderVisible = false;
        })
        .catch(() => {
          this.dialogLoaderVisible = false;
        });
    },
    //Registro de categorias
    registrarItem() {
      this.dialogLoaderVisible = true;
      this.btnRegistroLoading = true;
      this.switchItemEstado
        ? (this.datosItem.estadosId = 1)
        : (this.datosItem.estadosId = 2);
      //?Si accion es 1 se realiza el registro
      if (this.accion === 1) {
        this.$store
          .dispatch(REGISTRAR_DIETA, this.datosItem)
          .then((res) => {
            this.btnLoading = false;
            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
              this.obtenerItems();
              this.dialogRegistro = false;
              this.resetForm();
            } else {
              this.$refs.snackalert.SnackbarShow(
                "warning",
                "Alerta",
                res.message
              );
            }
            this.dialogLoaderVisible = false;
            this.btnRegistroLoading = false;
          })
          .catch(() => {
            this.dialogLoaderVisible = false;
            this.btnRegistroLoading = false;
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              `Ha ocurrido un error durante el registro.`
            );
          });
      }
      //?Si accion es 2 se realiza la actualizacion
      else {
        this.$store
          .dispatch(ACTUALIZAR_DIETA, this.datosItem)
          .then((res) => {
            //console.log(res);
            //this.btnLoading = false;
            this.dialogLoaderVisible = false;
            this.btnRegistroLoading = false;

            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
              this.dialogRegistro = false;
              this.obtenerItems();
              this.resetForm();
            } else {
              this.$refs.snackalert.SnackbarShow(
                "warning",
                "Alerta",
                res.message
              );
            }
          })
          .catch(() => {
            this.dialogLoaderVisible = false;
            this.btnRegistroLoading = false;
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              `Ha ocurrido un error durante el registro.`
            );
          });
      }
    },
    //Registro de categorias
    async registrarItemIngesta() {
      console.log(this.itemsAlimentos.length);
      if (this.itemsAlimentos.length === 0) {
        this.$refs.snackalert.SnackbarShow("warning", "Alerta", "Debe ingresar alilmentos a la Ingesta.");
        return;
      }

      this.datosItemIngestas.proteina_g = this.proteinasTotales;
      this.datosItemIngestas.grasaTotal_g = this.grasasTotales;
      this.datosItemIngestas.carbohidratos_g = this.carbosTotales;
      this.datosItemIngestas.energia_KcaL = this.caloriasTotales;
      this.datosItemIngestas.listaAlimentos = this.itemsAlimentos;

      this.dialogLoaderVisible = true;
      await this.$store
        .dispatch(REGISTRAR_INGESTA, this.datosItemIngestas)
        .then((res) => {
          if (res.status === 200) {
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
            this.resetFormIngestas();
            this.obtenerItemsIngestas();
          } else {
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              res.message
            );
          }
          this.dialogLoaderVisible = false;
        })
        .catch(() => {
          this.dialogLoaderVisible = false;
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `Ha ocurrido un error durante el registro.`
          );
        });
    },
    //Registro de categorias
    async eliminarIngesta(id) {
      this.dialogLoaderVisible = true;
      await this.$store
        .dispatch(ACTUALIZAR_INGESTA, { ingestaId: id, estadoId: 2 })
        .then((res) => {
          if (res.status === 200) {
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
            this.obtenerItemsIngestas();
          } else {
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              res.message
            );
          }
          this.dialogLoaderVisible = false;
        })
        .catch(() => {
          this.dialogLoaderVisible = false;
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `Ha ocurrido un error durante el registro.`
          );
        });
    },

    //!Obtener datos de un item especifico
    obtenerDatosItem(Id) {
      this.datosItem.id = Id;
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      this.modalTitle = `Actualizar ${this.itemName}`;
      this.btnRegistroText = `Actualizar ${this.itemName}`;
      //!Pre seleccionar el tab de datos de la empresa
      //this.activeTab = "empresa";
      this.$store
        .dispatch(OBTENER_DIETA, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.dietas.dieta;
            this.datosItem.estadosId === 1
              ? (this.switchItemEstado = true)
              : (this.switchItemEstado = false);
            this.accion = 2;
            this.dialogRegistro = true;
          } else {
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
            );
          }
          this.dialogLoaderVisible = false;
        })
        .catch(() => {
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
          );
          this.dialogLoaderVisible = false;
        });
    },
  },

  created() {
    this.obtenerItems();
    this.obtenerItemsGruposAlimentos();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "/dashboard" },
      { title: "Dietas" },
    ]);
  },

  computed: {
    headers() {
      return [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },
        {
          text: "Descripción",
          align: "start",
          sortable: true,
          value: "descripcion",
        },
        {
          text: "Tipo de Dieta",
          align: "start",
          sortable: true,
          value: "tipo",
        },
        {
          text: "Estado",
          align: "start",
          sortable: true,
          value: "estado",
          filter: this.filtroEstado,
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "",
        },
      ];
    },
    headersAlimentos() {
      return [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },
        {
          text: "Cantidad",
          align: "start",
          sortable: true,
          value: "cantidad",
        },
        {
          text: "Kilocalorias",
          align: "start",
          sortable: true,
          value: "energia_KcaL",
        },
        {
          text: "Proteinas(g)",
          align: "start",
          sortable: true,
          value: "proteina_g",
        },
        {
          text: "Grasas(g)",
          align: "start",
          sortable: true,
          value: "grasaTotal_g",
        },
        {
          text: "Carbohidratos(g)",
          align: "start",
          sortable: true,
          value: "carbohidratos_g",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "",
        },
      ];
    },
  },
};
</script>
