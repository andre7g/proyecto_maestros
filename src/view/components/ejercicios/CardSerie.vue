<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Ejercicios
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color="#003B5C"
              class="mb-2 float-right teal--text"
              @click="modalNuevo"
            >
              <v-icon left>fas fa-user-plus</v-icon> Nuevo Ejercicio
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
                <v-col cols="12" md="12" sm="12" xs="12">
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
              <td>{{ item.repeticiones }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.peso }}</td>
              <td>{{ item.metodo }}</td>
              <td>{{ item.tiempo }}</td>
              <td>{{ item.desEjercicioSerie }}</td>
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
                <v-autocomplete
                  v-model="datosItem.ejerciciosId"
                  :items="ejercicios"
                  class="required"
                  dense
                  filled
                  label="Ejercicio"
                  item-text="nombre"
                  item-value="id"
                  :rules="[selectRequired('Métodos')]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItem.repeticiones"
                  :items="repeticiones"
                  class="required"
                  dense
                  filled
                  label="Repeticiones"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Repeticiones')]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.pesoLb"
                  label="Peso en Libras"
                  :rules="[
                    required('Peso en Libras'),
                    maxLengthForm45('Peso en Libras'),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.tiempoMinutos"
                  label="Tiempo en Minutos"
                  v-mask='"###"'
                  :rules="[
                    required('Tiempo en Minutos')
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItem.metodoEjercicioId"
                  :items="metodos"
                  class="required"
                  dense
                  filled
                  label="Métodos"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Métodos')]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-textarea
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.descripcion"
                  label="Descripción del Ejercicio"
                  :rules="[
                    required('Descripción del Ejercicio'),
                    maxLengthForm1000('Descripción del Ejercicio'),
                  ]"
                ></v-textarea>
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
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";
import { OBTENER_EJERCICIOS } from "@/core/services/store/ejercicios/ejercicios.module";
import {
  OBTENER_EJERCICIOS_SERIE_BY_SERIE,
  REGISTRAR_EJERCICIO_SERIE,
  OBTENER_EJERCICIO_SERIE,
  ACTUALIZAR_EJERCICIO_SERIE,
} from "@/core/services/store/ejercicios/seriesejercicios.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "AdminSeriesEjercicios",
  props: {
    serie: {},
  },
  data() {
    return {
      itemName: "Ejercicios",
      validForm: false,
      tableLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nuevo ejercicio",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: "",
      items: [],
      ejercicios: [],
      datosItem: {
        id: 0,
        seriesId: 0,
        ejerciciosId: 0,
        repeticiones: 0,
        pesoLb: "",
        estadosId: 1,
        metodoEjercicioId: 0,
        descripcion: "",
        tiempoMinutos:""
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" },
      ],
      repeticiones: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 6, text: "6" },
        { value: 8, text: "8" },
        { value: 10, text: "10" },
        { value: 12, text: "12" },
        { value: 15, text: "15" },
        { value: 20, text: "25" },
        { value: 30, text: "30" },
        { value: 40, text: "40" },
        { value: 50, text: "50" },
      ],
      metodos: [
        { value: 1, text: "Mancuernas" },
        { value: 2, text: "Barra" },
        { value: 3, text: "Máquina" },
      ],
      ...validations,
      fechaNacimiento: "",
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
  },
  methods: {
    filtroEjercicio(value) {
      if (!this.selectEstado.value) {
        return true;
      }
      return value === this.selectEstado.text;
    },
    modalNuevo() {
      this.accion = 1;
      this.datosItem.seriesId = this.serie.id;
      this.modalTitle = `Registrar ${this.itemName}`;
      this.btnRegistroText = `Registrar ${this.itemName}`;
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },
    resetForm() {
      this.datosItem = {
        id: 0,
        seriesId: 0,
        ejerciciosId: 0,
        repeticiones: 0,
        pesoLb: "",
        estadosId: 1,
        metodoEjercicioId: 0,
        descripcion: "",
        tiempoMinutos:""
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_EJERCICIOS_SERIE_BY_SERIE, this.serie.id)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.seriesejercicios.ejerciciosserie;
            console.log(this.items);
          }
          this.tableLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /// Obtener los items
    async obtenerItemsEjercicios() {
      this.ejercicios = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_EJERCICIOS, 1)
        .then((res) => {
          if (res.status === 200) {
            this.ejercicios = this.$store.state.ejercicios.ejercicios;
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
          .dispatch(REGISTRAR_EJERCICIO_SERIE, this.datosItem)
          .then((res) => {
            console.log(res);
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
          .dispatch(ACTUALIZAR_EJERCICIO_SERIE, this.datosItem)
          .then((res) => {
            //console.log(res);
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
        .dispatch(OBTENER_EJERCICIO_SERIE, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.seriesejercicios.ejercicioserie;
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
    this.obtenerItemsEjercicios();
  },
  mounted() {},

  computed: {
    headers() {
      return [
        {
          text: "Repeticiones",
          align: "start",
          sortable: false,
          value: "repeticiones",
        },
        {
          text: "Ejercicio",
          align: "start",
          sortable: true,
          value: "nombre",
          filter: this.filtroEjercicio,
        },
        {
          text: "Peso",
          align: "start",
          sortable: true,
          value: "peso",
        },
        {
          text: "Método",
          align: "start",
          sortable: true,
          value: "metodo",
        },
        {
          text: "Tiempo",
          align: "start",
          sortable: true,
          value: "tiempo",
        },
        {
          text: "Descripción",
          align: "start",
          sortable: true,
          value: "desEjercicioSerie",
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
