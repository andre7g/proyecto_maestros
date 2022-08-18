<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Acuerdos Ministeriales | Administración
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color=""
              dark
              class="mb-2 float-right blue-grey darken-2"
              @click="modalNuevo"
            >
              Registrar Acuerdo
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
              <td>{{ item.acuerdo }}</td>
              <td class="text-right">{{ item.fechaIniciaVigencia }}</td>
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
                  @click="modalRequisitos(item.id)"
                >
                  <v-icon left>far fa-list-alt</v-icon> Requisitos
                </v-btn>
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
      transition="scroll-y-transition"
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
                  v-model="datosItem.acuerdo"
                  label="Acuerdo Ministerial"
                  :rules="[
                    required('Acuerdo Ministerial'),
                    minLength('Acuerdo Ministerial', 5),
                    maxLength('Acuerdo Ministerial', 100)
                  ]"
                  
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                  <v-text-field
                      dense
                      filled
                      autocomplete="off"
                      class="required"
                      color="blue-grey lighten-2"
                      v-model="fechaIniciaVigencia"
                      label="Fecha"
                      :rules="[
                          required('Fecha inicio vigencia'),
                          minLength('Fecha inicio vigencia', 8),
                          dateFormat('Fecha inicio vigencia')
                      ]"
                      maxlength="10"
                      v-mask="'##/##/####'"
                      >
                  </v-text-field>
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
                  color="primary"
                  class="mb-2 float-right"
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
      v-model="dialogRegistroRequisito"
      max-width="800"
      transition="scroll-y-transition"
      persistent
      scrollable
    >
      <v-card flat>
        <v-card-title>
          Asignar Requisito

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnRegistroRequisitoLoading"
            @click="
              dialogRegistroRequisito = false;
              resetFormAsignacion();
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
            v-on:submit.prevent="asignarRequisito"
            v-model="validFormAsignaicion"
          >

                <v-row>
                  <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItemAsignacion.requisitosId"
                      :items="requisitos"
                      :loading="ddlRequisitosLoading"
                      class="required"
                      dense
                      filled
                      label="Requisito"
                      item-text="nombreDocumento"
                      item-value="id"
                      :rules="[selectRequired('Requisito')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItemAsignacion.categoriasId"
                      :items="categorias"
                      class="required"
                      dense
                      filled
                      label="Categoría"
                      item-text="categoria"
                      item-value="id"
                      :rules="[selectRequired('Categoría')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItemAsignacion.tiposInstrumentoId"
                      :items="tiposinstrumento"
                      class="required"
                      dense
                      filled
                      label="Tipo de Instrumento"
                      item-text="tipo_Instrumento"
                      item-value="id"
                      :rules="[selectRequired('Tipo Instruneto')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                
                <v-row>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-5"
                    elevation="0"
                    class="mb-2 float-right grey lighten-5 ml-2"
                    @click="
                    dialogRegistroRequisito = false;
                    resetFormAsignacion();
                    "
                    :disabled="btnRegistroRequisitoLoading"
                >
                    Cancelar
                </v-btn>
                <!--:disabled="!validDocForm" type="submit"-->
                <v-btn
                    color="primary"
                    class="mb-2 float-right"
                    type="submit"
                    :elevation="0"
                    :disabled="!validFormAsignaicion"
                    :loading="btnRegistroRequisitoLoading"
                >
                    Guardar
                </v-btn>
                </v-row>
          </v-form>
          
          <v-row class="mt-10 mb-10 ml-0 mr-0">
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col md="12" sm="12" class="pt-0 pb-0">
                <v-data-table
                class="elevation-0"  
                :headers="headersRequisitos"
                :loading="tableAsignacionLoading"
                :items="asignacionRequisitos"
                :search="filtroRequisitos"
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
                    
                    <v-row>
                        <v-col cols="12" md="12" sm="12" xs="12">
                        <v-text-field
                            autocomplete="off"
                            append-icon="mdi-magnify"
                            dense
                            filled
                            color="blue-grey darken-2"
                            v-model="filtroRequisitos"
                            label="Buscar requisito"
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
                  
                </template>

                <template v-slot:item="{ item }">
                    <tr>
                    <td>{{ item.id }}</td> 
                    <td>{{ item.nombreDocumento }}</td>
                    <td>{{ item.categoria }}</td>
                    <td>{{ item.tipo_Instrumento }}</td>
                    <!--<td>{{ item.usuario_Creacion }}</td>-->
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
                        color="red accent-4"
                        @click="obtenerDatosItemAsignacion(item.id)"
                      >
                        <v-icon left>fas fa-window-close</v-icon> Eliminar
                      </v-btn>
                    </td>
                    </tr>
                </template>
                </v-data-table>
            </v-col>
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
import Vue from 'vue';
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";

import { OBTENER_ACUERDOS,REGISTAR_ACUERDO,OBTENER_ACUERDO,ACTUALIZAR_ACUERDO } from "@/core/services/store/acuerdos/acuerdosministeriales.module";
import { OBTENER_REQUISITOS } from "@/core/services/store/requisitos/requisitos.module";
import { OBTENER_REQUISITOS_BY_ACUERDO,REGISTAR_REQUISITO_BY_ACUERDO,ACTUALIZAR_REQUISITO_BY_ACUERDO,OBTENER_REQUISITO_ASIGNACION_BY_ACUERDO } from "@/core/services/store/asianacionrequisitos/asignacionrequisitos.module";
import { OBTENER_TIPOS_INSTRUMENTO } from "@/core/services/store/tiposinstrumento/tiposinstrumento.module";
import { OBTENER_CATEGORIAS } from "@/core/services/store/categorias/categorias.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale('es');
Vue.filter("formatDate", function(value) {
    if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
    }
});

export default {
  name: "AdminProyectosTradicionales",
  data() {
    return {
        itemName:'Acuerdo Ministerial',
      validForm: false,
      validFormAsignaicion: false,
      tableLoading:false,
      //ddRolesLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogRegistroRequisito: false,
      //dialogSuspension: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      //proyectoSeleccionado: "",
      filtro: "",
      filtroRequisitos: "",
      dialog: false,
      modalTitle: "Registrar nuevo Acuerdo Ministerial",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      btnRegistroRequisitoLoading: false,
      selectEstado: '',
      items: [],
      requisitos: [],
      asignacionRequisitos: [],
      fechaIniciaVigencia: "",
      datosItem: {
        id:0,
        acuerdo:'',
        fechaIniciaVigencia: "",
        usuario_Creacion:'admin',
        fecha_Creacion:'2022-07-14',
        estadosId:1
      },
      datosItemAsignacion: { 
        id:0,
        acuerdoMinisterialId:0,
        requisitosId:0,
        categoriasId:0,
        tiposInstrumentoId:0,
        usuario_Creacion:'admin',
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
      ddlRequisitosLoading:false,
      tableAsignacionLoading:false,
      categoriasId:0,  
      tiposInstrumentoId:0,
      categorias: [],
      tiposinstrumento: [],

    
    };
  },
  components: {
    DialogLoader,
    SnackAlert
  },
  methods: {
    modalRequisitos(Id){
        this.dialogRegistroRequisito = true;
        //this.obtenerItemsRequisitos();
        this.datosItemAsignacion.acuerdoMinisterialId = Id;
        this.obtenerItemsAsignacionRequisitos(Id);
        this.obtenerDdlTiposInstrumento();
        this.obtenerDdlCategorias();

    },
    resetFormAsignacion() {
      this.datosItemAsignacion = {
        id:0,
        acuerdoMinisterialId:0,
        categoriasId:0,
        tiposInstrumentoId:0,
        requisitosId:0,
        usuario_Creacion:'admin',
        fecha_Creacion:'2022-07-14',
        estadosId:1
      };
      this.categoriasId=0;  
      this.tiposInstrumentoId=0;
    },
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
      this.modalTitle = `Registrar ${this.itemName}`;
      this.btnRegistroText = `Registrar ${this.itemName}`;
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },
    resetForm() {
      this.datosItem = {
        id:0,
        acuerdo:'',
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

      this.$store
        .dispatch(OBTENER_ACUERDOS)
        .then(res => {
          if(res.status === 200){
            this.items = this.$store.state.acuerdosministeriales.acuerdos;
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
    /// Obtener los items tipos instrumento
    async obtenerDdlTiposInstrumento() {
      this.tiposinstrumento = [];
      this.ddltiposinstrumentoLoading = true;
      this.$store
        .dispatch(OBTENER_TIPOS_INSTRUMENTO, 1)
        .then((res) => {
          if (res.status === 200) {
            this.tiposinstrumento = this.$store.state.tiposinstrumento.tiposInstrumento;
            //console.log(this.tiposinstrumento);
          }
            this.ddltiposinstrumentoLoading = false;
        })
        .catch(() => {
          this.ddltiposinstrumentoLoading = false;
        });
    },
        /// Obtener los items categorias
    async obtenerDdlCategorias() {
      this.categorias = [];
      this.ddlCategoriasLoadign = true;
      this.$store
        .dispatch(OBTENER_CATEGORIAS, 1)
        .then((res) => {
          if (res.status === 200) {
            this.categorias = this.$store.state.categorias.categorias;
            //console.log(this.categorias);
          }
            this.ddlCategoriasLoadign = false;
        })
        .catch(() => {
          this.ddlCategoriasLoadign = false;
        });
    },
    /// Obtener los items requisitos
    async obtenerRequisitos() {
      this.datosItemAsignacion.requisitosId = 0;
      
        this.requisitos = [];
        this.ddlRequisitosLoading = true;
         await this.$store
            .dispatch(OBTENER_REQUISITOS, 1)
            .then(res => {
              if(res.status === 200){
                this.requisitos = this.$store.state.requisitos.requisitos;
              }
              this.ddlRequisitosLoading = false;
            //console.log(this.items);
              //console.log('sdkfdkd');
            })
            .catch(() => {
              this.ddlRequisitosLoading = false;
            });
      
    },
    /// Obtener los items asignacion requisitos
    async obtenerItemsAsignacionRequisitos(Id) {
    this.asignacionRequisitos = [];
      this.tableAsignacionLoading = true;
      this.$store
        .dispatch(OBTENER_REQUISITOS_BY_ACUERDO,{ EstadoId:1, AcuerdoId: Id})
        .then(res => {
          if(res.status === 200){
            this.asignacionRequisitos = this.$store.state.asignacionrequisitos.requisitosByAcuerdo;
          }
            this.tableAsignacionLoading = false;
        //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableAsignacionLoading = false;
        });
    },
    async asignarRequisito(){
      //this.dialogLoaderVisible = true;
      this.btnRegistroRequisitoLoading=true;
      await this.$store
      .dispatch(REGISTAR_REQUISITO_BY_ACUERDO, this.datosItemAsignacion)
      .then(res => {
        this.btnLoading = false;
        //this.dialogLoaderVisible = false;
        if (res.status === 200) {
          this.$refs.snackalert.SnackbarShow(
            "success",
            "Mensaje",
            res.message
          );
          this.obtenerItemsAsignacionRequisitos(this.datosItemAsignacion.acuerdoMinisterialId);
          //this.dialogRegistro = false;
          this.resetFormAsignacion();
        } else {
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            res.message
          );
        }
        this.btnRegistroRequisitoLoading=false;
        //this.btnRegistroLoading = false;
      })
      .catch(() => {
        this.$refs.snackalert.SnackbarShow(
          "warning",
          "Alerta",
          `Ha ocurrido un error durante el registro.`
        );
        this.btnRegistroRequisitoLoading=false;
      });
      //this.dialogLoaderVisible = false;
    },
    async eliminarAsignacion(Id){
      this.datosItemAsignacion.id = Id;
      await this.$store
          .dispatch(ACTUALIZAR_REQUISITO_BY_ACUERDO,  this.datosItemAsignacion)
          .then(res => {
            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
              this.obtenerItemsAsignacionRequisitos(this.datosItemAsignacion.acuerdoMinisterialId);
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
    },
    //Registro de categorias
    registrarItem() {
      this.btnRegistroLoading = true;
        //console.log(this.datosItem);
      //!Asignar el estado a datos empresa segun lo seleccionado en el swithc del formulario
      this.switchItemEstado
        ? (this.datosItem.estadosId = 1)
        : (this.datosItem.estadosId = 2);

      this.datosItem.usuario_Creacion= "admin";
      this.datosItem.fechaIniciaVigencia =  moment(this.fechaIniciaVigencia, "DD-MM-YYYY").format("YYYY-MM-DD");

      //?Si accion es 1 se realiza el registro
      if (this.accion === 1) {
        this.$store
          .dispatch(REGISTAR_ACUERDO, this.datosItem)
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
          .dispatch(ACTUALIZAR_ACUERDO,  this.datosItem)
          .then(res => {
            console.log(res);
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
        .dispatch(OBTENER_ACUERDO, Id)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItem = this.$store.state.acuerdosministeriales.acuerdo;
            this.datosItem.estadosId === 1
              ? (this.switchItemEstado = true)
              : (this.switchItemEstado = false);
              this.fechaIniciaVigencia = this.datosItem.fechaIniciaVigencia;// moment(this.datosItem.fechaIniciaVigencia, "DD-MM-YYYY").format("YYYY-MM-DD");
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
    //!Obtener datos de un item especifico asignacion 
    obtenerDatosItemAsignacion(Id) {
      this.datosItemAsignacion.id = Id;
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      this.$store
        .dispatch(OBTENER_REQUISITO_ASIGNACION_BY_ACUERDO, Id)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.datosItemAsignacion = this.$store.state.asignacionrequisitos.requisitoByAcuerdo;
            this.eliminarAsignacion(this.datosItemAsignacion.id);
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
  
  
  created(){
    this.obtenerItems();
    this.obtenerRequisitos();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Acuerdos Ministeriales" }
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
            text: "Acuerdo",
            align: "start",
            sortable: true,
            value: "acuerdo"
          },
          {
            text: "Inicio de vigencia",
            align: "start",
            sortable: true,
            value: "fechaIniciaVigencia"
          },
          /*{
            text: "Usuario Creación",
            align: "start",
            sortable: true,
            value: "usuario_Creacion"
          },*/
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
    },
    headersRequisitos() {
        return [
          {
            text: "Id",
            align: "start",
            sortable: false,
            value: "id"
          },
          {
            text: "Requisito",
            align: "start",
            sortable: true,
            value: "nombreDocumento"
          },
          {
            text: "Categoria",
            align: "start",
            sortable: true,
            value: "categoria"
          },
          {
            text: "Tipo",
            align: "start",
            sortable: true,
            value: "tipo_Instrumento"
          },
         /* {
            text: "Usuario Creación",
            align: "start",
            sortable: true,
            value: "usuario_Creacion"
          },*/
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
