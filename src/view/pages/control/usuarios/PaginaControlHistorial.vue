<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Historial |
            {{ `${datosUsuario.nombres}  ${datosUsuario.apellidos}` }}
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

                <!--v-col cols="6" md="6" sm="6" xs="6">
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
                </v-col-->

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
              <td>
                <span
                  :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                >
                  {{ item.fecha }}
                </span>
              </td>
              <td>
                <span
                  :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >{{ item.peso }}</span
                >
              </td>
              <td>
                <span
                  :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >{{ item.altura }}</span
                >
              </td>
              <td>
                <span
                  :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >{{ item.imc }}</span
                >
              </td>
              <td>
                <span
                  :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >{{ item.caloriasConsumir }} calorías diarias</span
                >
              </td>
              <td>
                <v-rating
                  class="float-left"
                  :value="item.rating"
                  color="amber"
                  background-color="amber"
                  readonly
                  size="15"
                ></v-rating>
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
                  @click="obtenerDatosItemControl(item.id, item.fecha,item.imc)"
                >
                  <v-icon left>fa-weight</v-icon> Ver Control
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
      v-model="dialogControl"
      max-width="700"
      transition="scroll-y-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogControl = false" class="float-right">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <CardControl :datosControl="datosControl" :datosCard="datosCard" />
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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";
import CardControl from "@/view/components/control/CardVistaControl.vue";
import {
  OBTENER_HISTORIAL_USUARIOS_BY_USUARIO,
  OBTENER_HISTORIAL_BY_USUARIO,
} from "@/core/services/store/control/historialusuarios.module";
import { OBTENER_USUARIO } from "@/core/services/store/usuarios/usuarios.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "HistorialUsuarios",
  data() {
    return {
      itemName: "Usuario",
      tableLoading: false,
      dialogControl: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "Cargando...",
      items: [],
      ...validations,
      datosUsuario: {},
      datosControl: {},
      codigo: 0,
      filtro: "",
      datosCard:{
        fecha: "",
        imcmensaje:""
      }
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
    CardControl,
  },
  methods: {
    /// Obtener los items
    async obtenerItems(Id) {
      this.items = [];
      this.tableLoading = true;
      this.$store
        .dispatch(OBTENER_HISTORIAL_USUARIOS_BY_USUARIO, Id)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.historialusuarios.historialUsuarios;
          }
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    //!Obtener datos de un item especifico
    obtenerDatosItem(Id) {
      this.$store
        .dispatch(OBTENER_USUARIO, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosUsuario = this.$store.state.usuarios.usuario;
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
    //!Obtener datos de un item especifico
    obtenerDatosItemControl(Id, fecha, imc) {
      if (imc < 18.5) {
        this.datosCard.imcmensaje = "Bajo Peso";
      } else if (
        imc >= 18.5 &&
        imc < 24.9
      ) {
        this.datosCard.imcmensaje = "Peso Normal";
      } else if (imc >= 25 && imc < 29.9) {
        this.datosCard.imcmensaje = "Pre-obesidad o Sobrepeso";
      } else if (imc >= 30 && imc < 34.9) {
        this.datosCard.imcmensaje = "Obesidad clase I";
      } else if (imc >= 35 && imc < 39.9) {
        this.datosCard.imcmensaje = "Obesidad clase II";
      } else if (imc >= 40) {
        this.datosCard.imcmensaje = "Obesidad clase III";
      }
      this.datosCard.fecha = fecha;
      this.$store
        .dispatch(OBTENER_HISTORIAL_BY_USUARIO, Id)
        .then((res) => {
          if (res.status === 200) {
            this.datosControl = this.$store.state.historialusuarios.historialUsuario;
            this.dialogControl = true;
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
    this.parametros = this.$route.params;
    if (this.parametros.id) {
      this.codigo = this.parametros.id;
      this.obtenerDatosItem(this.codigo);
      this.obtenerItems(this.codigo);
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Usuarios" },
    ]);
  },

  computed: {
    headers() {
      return [
        {
          text: "Fecha",
          align: "start",
          sortable: false,
          value: "fecha",
        },
        {
          text: "Peso",
          align: "start",
          sortable: true,
          value: "peso",
        },
        {
          text: "Altura",
          align: "start",
          sortable: true,
          value: "altura",
        },
        {
          text: "IMC",
          align: "start",
          sortable: true,
          value: "imc",
        },
        {
          text: "Calorias a Consumir",
          align: "start",
          sortable: true,
          value: "caloriasConsumir",
        },
        {
          text: "Calificación",
          align: "start",
          sortable: true,
          value: "rating",
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
