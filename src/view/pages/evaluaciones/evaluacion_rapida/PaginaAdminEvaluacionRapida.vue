<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Evaluaciones | Evaluación Rápida
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
                <v-col cols="12" md="6" sm="12" xs="12">
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

                <v-col cols="12" md="6" sm="12" xs="12">
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
              <td>{{ item.nombre }}</td>
              <td>{{ item.edad }}</td>
              <!--td>{{ item.descripcion }}</!--td-->
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

import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "EvaluacionRapida",
  data() {
    return {
      itemName: "Evaluación Rápida",
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
      datosItem: {
        id: 0,
        nombre: "",
        descripcion: "",
        dificultad: "",
        estadosId: 1,
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" },
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
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
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
    /// Obtener los items
    obtenerItems() {
      // 1. Crea un nuevo objeto XMLHttpRequest
      let xhr = new XMLHttpRequest();

      // 2. Configuración: solicitud GET para la URL /article/.../load
      xhr.open("GET", "#/db");

      // 3. Envía la solicitud a la red
      xhr.send();

      // 4. Esto se llamará después de que la respuesta se reciba
      xhr.onload = function() {
        if (xhr.status != 200) {
          // analiza el estado HTTP de la respuesta
          alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
        } else {
          // muestra el resultado
          alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
          console.log(xhr);
        }
      };

      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          alert(`Recibidos ${event.loaded} de ${event.total} bytes`);
        } else {
          alert(`Recibidos ${event.loaded} bytes`); // sin Content-Length
        }
      };

      xhr.onerror = function() {
        alert("Solicitud fallida");
      };
    },
  },

  created() {
    this.obtenerItems();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "/dashboard" },
      { title: "Evaluaciones" },
      { title: "Evaluación Rápida" },
    ]);
  },

  computed: {
    headers() {
      return [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Edad",
          align: "start",
          sortable: true,
          value: "edad",
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
