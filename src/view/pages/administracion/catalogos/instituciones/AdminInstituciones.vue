<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Instituciones | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color=""
              dark
              class="mb-2 float-right blue-grey darken-2"
              @click="modalNuevo"
            >
              Registrar Institucion
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
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-page-first',
            lastIcon: 'mdi-page-last',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right',
            'items-per-page-text': 'Registros por página',
            pageText: '{0}-{1} de {2}'
          }"
        >
          <template v-slot:top>
            <!-- v-container, v-col and v-row are just for decoration purposes. -->
            <v-container fluid>
              <v-row>
                <v-col cols="6" md="6" sm="6" xs="6">
                  <v-text-field
                    autocomplete="off"
                    class="required"
                    dense
                    filled
                    color="blue-grey lighten-2"
                    v-model="filtro"
                    label="Estado"
                    maxlength="200"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="6" sm="6" xs="6">
                  <v-select
                    v-model="estadoProyecto"
                    :items="estadosProyecto"
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
              <td>{{ item.estado }}</td>
              <td>
                <v-chip
                  class="ma-2 font-weight-medium"
                  label
                  :color="
                    item.estadosId === 1
                      ? 'blue-grey lighten-4'
                      : item.estadosId === 2
                      ? 'blue lighten-4'
                      : item.estadosId === 6
                      ? 'cyan lighten-4'
                      : item.estadosId === 7
                      ? 'deep-orange lighten-4'
                      : 'pink lighten-4'
                  "
                  :text-color="
                    item.estadosId === 1
                      ? 'blue-grey lighten-1'
                      : item.estadosId === 2
                      ? 'blue lighten-1'
                      : item.estadosId === 6
                      ? 'cyan darken-1'
                      : item.estadosId === 7
                      ? 'deep-orange lighten-1'
                      : 'pink darken-1'
                  "
                  small
                >
                  {{ item.estado }}
                </v-chip>
              </td>
              <td>
                <v-btn
                  v-if="item.estadosId === 1"
                  class="
                    ma-2
                    btn-bg-light
                    blue-grey--text
                    lighten-2--text
                    font-weight-medium
                    text-capitalize
                  "
                  small
                  depressed
                  color="blue-grey lighten-5"
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

    <!--begin:: dialog suspension -->
    <v-dialog v-model="dialogSuspension" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Suspensión del proyecto
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col sm="12">
              Está seguro de suspender el proyecto {{ proyectoSeleccionado }}
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--end: dialog-->

    <!--begin:: modal registro-->
    <v-dialog
      v-model="dialogRegistro"
      max-width="900"
      transition="dialog-bottom-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          Registro de Institución

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
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey lighten-2"
                  v-model="datosItem.nombreInstitucion"
                  label="Nombre de la institución"
                  :rules="[
                    required('Nombre de la institución'),
                    minLength('Nombre de la institución', 5),
                    maxLength('Nombre de la institución', 200)
                  ]"
                  maxlength="200"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" class="pt-0 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey lighten-2"
                  v-model="datosItem.nombreMaximaAutoridad"
                  label="Nombre de la máxima autoridad"
                  :rules="[
                    required('Nombre de la máxima autoridad'),
                    minLength('Nombre de la máxima autoridad', 5),
                    maxLength('Nombre de la máxima autoridad', 100)
                  ]"
                  maxlength="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.telefonoInstitucion"
                  label="Número de teléfono de la institución"
                  :rules="[
                    required('Teléfono de la institución'),
                    minLength('Teléfono de la institución', 8),
                    maxLength('Teléfono de la institución', 12)
                  ]"
                  maxlength="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.correoAlternoInstitucion"
                  label="Correo electrónico de la institución"
                  :rules="[
                    required('Correo electrónico alterno de la institución'),
                    minLength(
                      'Correo electrónico alterno de la institución',
                      10
                    ),
                    validEmail('Correo electrónico alterno de la institución')
                  ]"
                  maxlength="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.direccionInstitucion"
                  label="Dirección de la institución"
                  :rules="[
                    required('Dirección'),
                    minLength('Dirección', 5),
                    maxLength('Dirección de la institución', 150)
                  ]"
                  maxlength="150"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.nombreContactoCooperacion"
                  label="Nombre de contacto de cooperación"
                  :rules="[
                    required('Nombre'),
                    minLength('Nombre', 5),
                    alphaRule('Nombre')
                  ]"
                  maxlength="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.telefonoContactoCooperacion"
                  label="Teléfono de contacto de cooperación"
                  :rules="[required('Nombre'), minLength('Nombre', 8)]"
                  maxlength="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-text-field
                  color="blue-grey lighten-2"
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  v-model="datosItem.correoContactoCooperacion"
                  label="Correo electrónico del contacto en cooperacion"
                  :rules="[
                    required('Nombre'),
                    minLength('Nombre', 5),
                    validEmail('Correo electrónico alterno de la institución')
                  ]"
                  maxlength="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="12" xs="12" class="pt-0 pb-0">
                <v-select
                  dense
                  filled
                  v-model="datosItem.nivelesInstitucionId"
                  :items="nivelesInstitucion"
                  class="required"
                  color="blue-grey lighten-2"
                  :loading="dialogLoaderVisible"
                  label="Nivel"
                  item-text="nombreNivel"
                  item-value="id"
                  :rules="[selectRequired('Nivel institución')]"
                  menu-props="auto"
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="6" sm="12" xs="12" class="pt-0 pb-0">
                <v-select
                  dense
                  filled
                  v-model="datosItem.tiposInstitucionId"
                  :items="tiposInstitucion"
                  class="required"
                  color="blue-grey lighten-2"
                  :loading="dialogLoaderVisible"
                  label="Tipo de institución"
                  item-text="nombreTipo"
                  item-value="id"
                  :rules="[selectRequired('Tipo de institución')]"
                  menu-props="auto"
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="12" sm="12" class="pt-0 pb-0">
                <label class="grey--text body-2 mb-0 font-weight-medium"
                  >Estado</label
                >
                <template>
                  <v-switch
                    class="pt-0 mt-1"
                    v-model="switchItemEstado"
                    inset
                    :label="switchItemEstado ? 'Activo' : 'Inactivo'"
                  >
                  </v-switch>
                </template>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
            color="primary"
            class="mb-2 float-right"
            type="submit"
            :elevation="0"
            :disabled="!validForm"
            :loading="btnRegistroLoading"
            @click="registrarItem"
          >
            Guardar
          </v-btn>
        </v-card-actions>

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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";

import { OBTENER_ITEMS } from "@/core/services/store/genericoget.module";
import { OBTENER_ESTADOS } from "@/core/services/store/estados/estados.module";
import validations from "@/core/untils/validations.js";

import {
  OBTENER_INSTITUCION,
  REGISTAR_INSTITUCION,
  ACTUALIZAR_INSTITUCION
} from "@/core/services/store/instituciones/institucion.module";

export default {
  name: "AdminProyectosTradicionales",
  data() {
    return {
      validForm: false,
      ddRolesLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogSuspension: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      proyectoSeleccionado: "",
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nuevo proyecto",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      estadoProyecto: "",
      items: [],
      datosItem: {
        id: 0,
        nombreInstitucion: "",
        nombreMaximaAutoridad: "",
        nombreContactoCooperacion: "",
        telefonoContactoCooperacion: "",
        correoContactoCooperacion: "",
        direccionInstitucion: "",
        telefonoInstitucion: "",
        correoAlternoInstitucion: "",
        nivelesInstitucionId: 0,
        tiposInstitucionId: 0,
        estadosId: 1
      },
      estadosProyecto: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" }
      ],
     
     
      
      datosUsuario: {
        nombre: "",
        correo: "",
        institucion: "",
        rolesId: 0,
        estado: 0
      },
      ...validations,
    
    };
  },
  components: {
    DialogLoader,
    SnackAlert
  },
  methods: {
    filtroEstado(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.estadoProyecto.value) {
        return true;
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.estadoProyecto.text;
    },

    modalNuevo() {
      this.accion = 1;
      this.modalTitle = "Registrar Índice";
      this.btnRegistroText = "Registrar Índice";
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },

    cerrarModalRegistro() {
      //this.dialogRegistro = false;
    },

    //Mostrar el dialogo para la suspension
    mostrarDialogSuspension(nombreProyecto) {
      this.proyectoSeleccionado = nombreProyecto;
      this.dialogSuspension = true;
    },

    resetForm() {
      this.datosItem = {
        id: 0,
        nombreInstitucion: "",
        nombreMaximaAutoridad: "",
        nombreContactoCooperacion: "",
        telefonoContactoCooperacion: "",
        correoContactoCooperacion: "",
        direccionInstitucion: "",
        telefonoInstitucion: "",
        correoAlternoInstitucion: "",
        nivelesInstitucionId: 0,
        tiposInstitucionId: 0,
        estadosId: 1
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },

    /// Obtener los items
    async obtenerItems() {
    this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_ESTADOS)
        .then(res => {
          if(res.status === 200){
            this.items = this.$store.state.estados.estados;
            this.tableLoading = false;
          }
            console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },


    //Obtener los niveles institucion
    async obtenerNivelesInstitucion() {
      this.nivelesInstitucion = [];
      this.$store
        .dispatch(OBTENER_ITEMS, {endpoint: 'NivelesInstitucion'})
        .then(res => {
          if (res.status === 200) {
            this.nivelesInstitucion = res.data;
          }
        })
        .catch(() => {
            this.nivelesInstitucion = [];
        });
    },

    //Obtener los tipos de institucion
    async obtenerTiposInstitucion() {
      this.tiposInstitucion = [];
      this.$store
        .dispatch(OBTENER_ITEMS, {endpoint: 'TiposInstitucion'})
        .then(res => {
          if (res.status === 200) {
            this.tiposInstitucion = res.data;
          }
        })
        .catch(() => {
            this.tiposInstitucion = [];
        });
    },

    ///Registro de usuario
    registrarItem() {
      this.btnRegistroLoading = true;

      //!Asignar el estado a datos empresa segun lo seleccionado en el swithc del formulario
      this.switchItemEstado
        ? (this.datosItem.estadosId = 1)
        : (this.datosItem.estadosId = 2);

      this.datosItem.usuarioCreacion= "test";

      //?Si accion es 1 se realiza el registro
      if (this.accion === 1) {
        this.$store
          .dispatch(REGISTAR_INSTITUCION, this.datosItem)
          .then(res => {
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
        this.$store
          .dispatch(ACTUALIZAR_INSTITUCION,  this.datosItem)
          .then(res => {
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
      this.empresaId = Id;
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      this.dialogTitulo = `Actualizar ${this.itemName}`;
      this.btnRegistroText = `Actualizar ${this.itemName}`;
      //!Pre seleccionar el tab de datos de la empresa
      this.activeTab = "empresa";
      this.$store
        .dispatch(OBTENER_INSTITUCION, Id)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.institucion.institucion;
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
    }
  },
  created(){
    this.obtenerItems();
    this.obtenerNivelesInstitucion();
    this.obtenerTiposInstitucion();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Instituciones" }
    ]);
  }, 

  computed:{

    headers() {
        return [
          {
            text: "Id",
            align: "start",
            sortable: false,
            value: "id"
          },
          {
            text: "estado",
            align: "start",
            sortable: true,
            value: "estado"
          },
          {
            text: "Acciones",
            align: "start",
            sortable: false,
            value: ""
          }
      ]
    }
  }
};
</script>
