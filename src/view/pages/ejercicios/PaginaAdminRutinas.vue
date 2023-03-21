<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Rutinas de Ejercicios | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color="#003B5C"
              class="mb-2 float-right teal--text"
              @click="modalNuevo"
            >
              <v-icon left>fas fa-user-plus</v-icon> Nueva Rutina
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
              <td>{{ item.dificultad }}</td>
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
                  color="#003B5C"
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
                  color="#003B5C"
                  @click="modalSeries(item.id)"
                >
                  <v-icon left>mdi-pencil</v-icon> Ingresar Ejercicios
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
                  label="Nombre de la Rutina"
                  :rules="[
                    required('Nombre de la Rutina'),
                    maxLengthForm45('Nombre de la Rutina'),
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
                  label="Descripción de la Rutina"
                  :rules="[
                    required('Descripción de la Rutina'),
                    maxLengthForm500('Descripción de la Rutina'),
                  ]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItem.dificultad"
                  :items="dificultades"
                  class="required"
                  dense
                  filled
                  label="Dificultad"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Dificultad')]"
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
                  color="#003B5C"
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
      v-model="dialogRegistroSeries"
      persistent
      scrollable
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-card-title>
          {{ modalTitle }}

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnRegistroSeriesLoading"
            @click="
              dialogRegistroSeries = false;
              resetFormSeries();
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
            v-on:submit.prevent="registrarItemSerie"
            v-model="validFormSeries"
          >
            <v-row>
              <v-col cols="12" md="2" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItemSeries.repeticiones"
                  :items="numero_series"
                  class="required"
                  dense
                  filled
                  label="Número de Series"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Número de Series')]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="10" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItemSeries.tipoEjercicioId"
                  :items="tiposEjercicio"
                  class="required"
                  dense
                  filled
                  label="Tipo de Ejercicio"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Tipo de Ejercicio')]"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn
                  color="grey lighten-5"
                  elevation="0"
                  class="mb-2 float-right grey lighten-5"
                  @click="
                    dialogRegistroSeries = false;
                    resetFormSeries();
                  "
                  :disabled="btnRegistroSeriesLoading"
                >
                  Cancelar
                </v-btn>
                <!--:disabled="!validDocForm" type="submit"-->
                <v-btn
                  color="#003B5C"
                  class="mb-2 float-right teal--text"
                  type="submit"
                  :elevation="0"
                  :disabled="!validFormSeries"
                  :loading="btnRegistroSeriesLoading"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
            <v-row class="col-md-12 m-0 p-0">
              <v-divider></v-divider>
            </v-row>
            <h2>Series</h2>
            <v-row class="col-md-12">
              <v-expansion-panels focusable>
                <v-expansion-panel
                  class="mt-2"
                  v-for="(serie, i) in series"
                  :key="i"
                >
                  <v-expansion-panel-header
                    disable-icon-rotate
                    color="blue-grey lighten-5"
                  >
                    <span class="black--text"> {{ "Serie "+ (i+1) + " - " + serie.tipo }} </span>
                    <template v-slot:actions>
                      <v-icon
                        :color="
                          serie.tipoEjercicioId === 1
                            ? 'red'
                            : serie.tipoEjercicioId === 2
                            ? 'black'
                            : serie.tipoEjercicioId === 3
                            ? 'teal'
                            : 'red accent-4'
                        "
                      >
                        {{
                          serie.tipoEjercicioId === 1
                            ? "fas fa-burn"
                            : serie.tipoEjercicioId === 2
                            ? "fas fa-dumbbell"
                            : serie.tipoEjercicioId === 3
                            ? "fas fa-running"
                            : "fas fa-exclamation-triangle"
                        }}
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-card-text class="pl-0 pr-0">
                      <Serie :serie="serie" />
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
  OBTENER_RUTINAS,
  REGISTRAR_RUTINA,
  OBTENER_RUTINA,
  ACTUALIZAR_RUTINA,
} from "@/core/services/store/ejercicios/rutinas.module";
import {
  OBTENER_SERIES_BY_RUTINA,
  REGISTRAR_SERIE,
} from "@/core/services/store/ejercicios/series.module";
import Serie from "@/view/components/ejercicios/CardSerie.vue";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "AdminRutinas",
  data() {
    return {
      itemName: "Rutinas",
      validForm: false,
      tableLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nueva rutina",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: "",
      items: [],
      series: [],
      datosItem: {
        id: 0,
        nombre: "",
        descripcion: "",
        dificultad: "",
        estadosId: 1,
      },
      datosItemSeries: {
        repeticiones: 0,
        rutinaId: 0,
        tipoEjercicioId: 0,
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" },
      ],
      tiposEjercicio: [
        { value: 1, text: "Calentamiento" },
        { value: 2, text: "Pesas" },
        { value: 3, text: "Cardio" },
      ],
      numero_series: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 7, text: "7" },
        { value: 8, text: "8" },
      ],
      dificultades: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
      ...validations,
      fechaNacimiento: "",
      dialogRegistroSeries: false,
      btnRegistroSeriesLoading: false,
      validFormSeries: false,
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
    Serie,
  },
  methods: {
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
    modalSeries(Id) {
      this.datosItemSeries.rutinaId = Id;
      this.dialogRegistroSeries = true;
      this.obtenerItemsSeries();
    },
    resetForm() {
      this.datosItem = {
        id: 0,
        nombre: "",
        descripcion: "",
        dificultad: "",
        estadosId: 1,
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },
    resetFormSeries() {
      this.datosItemSeries = {
        repeticiones: 0,
        rutinaId: 0,
        tipoEjercicioId: 0,
      };
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_RUTINAS)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.rutinas.rutinas;
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
    /// Obtener los items series
    async obtenerItemsSeries() {
      this.dialogLoaderVisible = true;
      this.series = [];
      await this.$store
        .dispatch(OBTENER_SERIES_BY_RUTINA, this.datosItemSeries.rutinaId)
        .then((res) => {
          if (res.status === 200) {
            this.series = this.$store.state.series.series;
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
        //console.log(this.datosItem);
        this.$store
          .dispatch(REGISTRAR_RUTINA, this.datosItem)
          .then((res) => {
            console.log(this.datosItem);
            console.log(res);
            this.btnLoading = false;
            //this.dialogLoaderVisible = false;
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
        //console.log(this.datosItem);
        this.$store
          .dispatch(ACTUALIZAR_RUTINA, this.datosItem)
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
    async registrarItemSerie() {
      this.dialogLoaderVisible = true;
      await this.$store
        .dispatch(REGISTRAR_SERIE, this.datosItemSeries)
        .then((res) => {
          if (res.status === 200) {
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
            this.obtenerItemsSeries();
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
        .dispatch(OBTENER_RUTINA, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.rutinas.rutina;
            console.log(this.datosItem);
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
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "/dashboard" },
      { title: "Administracion" },
      { title: "Rutina de Ejercicios" },
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
          text: "Dificultad",
          align: "start",
          sortable: true,
          value: "dificultad",
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
  },
};
</script>
