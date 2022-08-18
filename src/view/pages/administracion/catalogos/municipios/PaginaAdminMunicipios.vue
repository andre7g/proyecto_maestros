<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Municipios | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color=""
              dark
              class="mb-2 float-right blue-grey darken-2"
              @click="modalNuevo"
            >
              Registrar Municipio
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
              <td>{{ item.id }}</td> 
              <td>{{ item.municipio }}</td>
              <td>{{ item.depto }}</td>
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
                  {{item.estado}}
                </v-chip>
              </td>
              <td>
                <v-btn
                  class="
                    ma-2
                    btn-bg-light
                    white--text
                    lighten-2--text
                    font-weight-medium
                    text-capitalize
                  "
                  small
                  depressed
                  color="indigo"
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
      transition="dialog-bottom-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          {{modalTitle}}

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
                  color="blue-grey darken-2"
                  v-model="datosItem.municipio"
                  label="Municipio"
                  :rules="[
                    required('Municipio'),
                    minLength('Municipio', 3),
                    maxLength('Municipio', 100)
                  ]"
                  maxlength="100"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                  <v-autocomplete
                      v-model="datosItem.departamentosId"
                      :items="deptos"
                      class="required"
                      dense
                      filled
                      label="Departamento"
                      item-text="departamento"
                      item-value="id"
                      :rules="[
                          selectRequired(
                              'Departamentos'
                          )
                      ]"
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
                    color="blue-grey darken-2"
                    v-model="switchItemEstado"
                    inset
                    :label="switchItemEstado ? 'Activo' : 'Inactivo'"
                  >
                  </v-switch>
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-5"
                elevation="0"
                class="mb-2 float-right grey lighten-5 mr-2"
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
                
              >
                Guardar
              </v-btn>
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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";

import { OBTENER_MUNICIPIOS,REGISTRAR_MUNICIPIO,ACTUALIZAR_MUNICIPIO,OBTENER_MUNICIPIO } from "@/core/services/store/municipios/municipios.module";
import { OBTENER_DEPARTAMENTOS } from "@/core/services/store/departamentos/departamentos.module";
import validations from "@/core/untils/validations.js";

export default {
  name: "AdminProyectosTradicionales",
  data() {
    return {
        itemName:'Municipio',
      validForm: false,
      tableLoading: false,
      //ddRolesLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      //dialogSuspension: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      //proyectoSeleccionado: "",
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nuevo municipio",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: '',
      items: [],
      deptos: [],
      datosItem: {
        id:0,
        municipio:'',
        usuario_Creacion:'',
        departamentosId:0,
        fecha_Creacion:'2022-07-14',
        estadosId:1
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" }
      ],
      //datosUsuario: {},
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
      if (!this.selectEstado.value) {
        return true;
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.selectEstado.text;
    },
    modalNuevo() {
      this.accion = 1;
      this.modalTitle = "Registrar Municipio";
      this.btnRegistroText = "Registrar Municipio";
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },
    resetForm() {
      this.datosItem = {
        id:0,
        municipio:'',
        departamentosId:0,
        usuario_Creacion:'',
        fecha_Creacion:'2022-07-14',
        estadosId:1
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      await this.$store
        .dispatch(OBTENER_MUNICIPIOS)
        .then(res => {
          if(res.status === 200){
            this.items = this.$store.state.municipios.municipios;
          }
          this.tableLoading = false;
        //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /// Obtener los items deptos
    async obtenerDepartamentos() {
    this.deptos = [];
      this.tableLoading = true;

      await this.$store
        .dispatch(OBTENER_DEPARTAMENTOS,1)
        .then(res => {
          if(res.status === 200){
            this.deptos = this.$store.state.departamentos.departamentos;
            this.tableLoading = false;
          }
        //console.log(this.items);
        console.log(this.deptos);
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    //Registro de categorias
    async registrarItem() {
      this.btnRegistroLoading = true;
      //console.log(this.datosItem);
      //!Asignar el estado a datos empresa segun lo seleccionado en el swithc del formulario
      this.switchItemEstado
        ? (this.datosItem.estadosId = 1)
        : (this.datosItem.estadosId = 2);

      this.datosItem.usuario_Creacion= "admin";

      //?Si accion es 1 se realiza el registro
      if (this.accion === 1) {
        await this.$store
          .dispatch(REGISTRAR_MUNICIPIO, this.datosItem)
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
        await this.$store
          .dispatch(ACTUALIZAR_MUNICIPIO,  this.datosItem)
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
      this.datosItem.id = Id;
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      this.modalTitle = `Actualizar ${this.itemName}`;
      this.btnRegistroText = `Actualizar ${this.itemName}`;
      //!Pre seleccionar el tab de datos de la empresa
      //this.activeTab = "empresa";
      this.$store
        .dispatch(OBTENER_MUNICIPIO, Id)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.municipios.municipio;
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
    this.obtenerDepartamentos();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Municipios" }
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
            text: "Municipio",
            align: "start",
            sortable: true,
            value: "municipio"
          },
          {
            text: "Departamento",
            align: "start",
            sortable: true,
            value: "depto"
          },
          {
            text: "Usuario Creación",
            align: "start",
            sortable: true,
            value: "usuario_Creacion"
          },
          {
            text: "Estado",
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
