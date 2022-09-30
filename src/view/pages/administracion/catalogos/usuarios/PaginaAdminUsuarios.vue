<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Usuarios | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color="#C6E2CF"
              class="mb-2 float-right teal--text"
              @click="modalNuevo"
            >
              <v-icon left>fas fa-user-plus</v-icon> Nuevo Usuario
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
              <td>{{ item.codigo }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.telefono }}</td>
              <td>{{ item.genero }}</td>
              <td>{{ item.fecha_Nacimiento }}</td>
              <td>{{ item.fecha_Inicio }}</td>
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
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.nombres"
                  label="Nombres"
                  :rules="[required('Nombres'), maxLengthForm45('Nombres')]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.apellidos"
                  label="Apellidos"
                  :rules="[required('Apellidos'), maxLengthForm45('Apellidos')]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="pt-4 pb-0">
                <v-autocomplete
                  v-model="datosItem.genero"
                  :items="generos"
                  class="required"
                  dense
                  filled
                  label="Género"
                  item-text="text"
                  item-value="value"
                  :rules="[selectRequired('Género')]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.dpi"
                  label="Dpi"
                  v-mask="'#############'"
                  :rules="[]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.telefono"
                  label="Número de Teléfono"
                  v-mask="'####-####'"
                  :rules="[required('Número de Teléfono')]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  dense
                  filled
                  autocomplete="off"
                  class="required"
                  color="teal lighten-1"
                  v-model="fechaNacimiento"
                  label="Fecha Nacimiento"
                  :rules="[
                    required('Fecha Nacimiento'),
                    minLength('Fecha Nacimiento', 8),
                    dateFormat('Fecha Nacimiento'),
                  ]"
                  maxlength="10"
                  v-mask="'##/##/####'"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="teal lighten-1"
                  v-model="datosItem.email"
                  label="Email"
                  :rules="[
                    required('Email'),
                    validEmail('Email'),
                    maxLengthForm100('Email'),
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
                  v-model="datosItem.direccion"
                  label="Dirección"
                  :rules="[
                    required('Dirección'),
                    maxLengthForm500('Dirección'),
                  ]"
                ></v-text-field>
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
  OBTENER_USUARIOS,
  REGISTAR_USUARIO,
  OBTENER_USUARIO,
  ACTUALIZAR_USUARIO,
} from "@/core/services/store/usuarios/usuarios.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "AdminUsuarios",
  data() {
    return {
      itemName: "Usuario",
      validForm: false,
      tableLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nuevo Usuario",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: "",
      items: [],
      datosItem: {
        id: 0,
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        dpi: 0,
        telefono: "",
        direccion: "",
        email: "",
        codigo: 0,
        pass: "",
        fecha_Nacimiento: "",
        fecha_Inicio: "2022-07-14",
        estadosId: 1,
        genero: "",
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" },
      ],
      generos: [
        { value: "M", text: "Masculino" },
        { value: "F", text: "Femenino" },
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
        nombres: "",
        apellidos: "",
        dpi: 0,
        telefono: "",
        direccion: "",
        email: "",
        codigo: 0,
        pass: "",
        fecha_Nacimiento: "",
        fecha_Inicio: "2022-07-14",
        estadosId: 1,
        genero:''
      };
      this.fechaNacimiento = "";
      this.switchItemEstado = true;
      this.accion = 1;
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_USUARIOS)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.usuarios.usuarios;
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
      this.btnRegistroLoading = true;

      if (this.datosItem.dpi === "") {
        this.datosItem.dpi = 0;
      }

      this.switchItemEstado
        ? (this.datosItem.estadosId = 1)
        : (this.datosItem.estadosId = 2);

      //this.datosItem.usuario_Creacion = "admin";
      this.datosItem.fecha_Nacimiento = moment(
        this.fechaNacimiento,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");

      //?Si accion es 1 se realiza el registro
      if (this.accion === 1) {
        //console.log(this.datosItem);
        this.$store
          .dispatch(REGISTAR_USUARIO, this.datosItem)
          .then((res) => {
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
            this.btnRegistroLoading = false;
          })
          .catch(() => {
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
          .dispatch(ACTUALIZAR_USUARIO, this.datosItem)
          .then((res) => {
            //console.log(res);
            this.btnLoading = false;
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
        .dispatch(OBTENER_USUARIO, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.usuarios.usuario;
            this.datosItem.estadosId === 1
              ? (this.switchItemEstado = true)
              : (this.switchItemEstado = false);
            this.fechaNacimiento = moment(
              this.datosItem.fecha_Nacimiento
            ).format("DD-MM-YYYY");
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
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Usuarios" },
    ]);
  },

  computed: {
    headers() {
      return [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "codigo",
        },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },
        {
          text: "No. Teléfono",
          align: "start",
          sortable: true,
          value: "telefono",
        },
        {
          text: "Género",
          align: "start",
          sortable: true,
          value: "genero",
        },
        {
          text: "Fecha Nacimiento",
          align: "start",
          sortable: true,
          value: "fecha_Nacimiento",
        },
        {
          text: "Fecha Inicio",
          align: "start",
          sortable: true,
          value: "fecha_Inicio",
        },
        {
          text: "Estado",
          align: "start",
          sortable: true,
          value: "estado",
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
