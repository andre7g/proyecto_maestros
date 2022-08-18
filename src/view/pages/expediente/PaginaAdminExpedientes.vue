<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Expedientes
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color=""
              dark
              class="mb-2 float-right blue-grey darken-2"
              :to="{name: 'expedientes-ingreso'}"
            >
              Registrar Expediente
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
                <v-col cols="12" md="6" sm="6" xs="12" class="pt-0 pb-0">
                  <v-text-field
                    autocomplete="off"
                    class="required"
                    dense
                    filled
                    color="blue-grey lighten-2"
                    v-model="filtro"
                    label="Número, nombre del proyecto, descripción..."
                    maxlength="200"
                  >
                    <v-icon slot="append" color="black">
                      mdi-magnify
                    </v-icon>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6" xs="12" class="pt-0 pb-0">
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
              <td class="text-right">{{ item.no_Expediente}}</td>
              <td>{{ item.nombre_Proyecto }}</td>
              <td>
                {{ item.descripcion_Proyecto }}
              </td>
              <td>
                <v-chip
                  class="ma-2 font-weight-medium"
                  label
                  :color="
                    item.estados_Id === 1
                      ? 'blue lighten-4'
                      : item.estados_Id === 2
                      ? 'cyan lighten-4'
                      : item.estados_Id === 6
                      ? 'cyan lighten-4'
                      : item.estados_Id === 7
                      ? 'deep-orange lighten-4'
                      : 'pink lighten-4'
                  "
                  :text-color="
                    item.estados_Id === 1
                      ? 'blue lighten-1'
                      : item.estados_Id === 2
                      ? 'cyan darken-1'
                      : item.estados_Id === 6
                      ? 'cyan darken-1'
                      : item.estados_Id === 7
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
                  v-if="item.estados_Id === 1"
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
                  @click="obtenerDatosItem(item.id, 1)"
                >
                  <v-icon left>mdi-pencil</v-icon> Actualizar
                </v-btn>

                <v-btn
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
                  @click="mostrarDialogEnvio(item.nombre_Proyecto)"
                >
                  <v-icon left>mdi-send</v-icon> Enviar
                </v-btn>
                <v-btn
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
                  :to="{
                    name:'actualizar-expediente',
                    params:{ id: item.id }

                  }"
                >
                  <v-icon left>fas fa-edit</v-icon> Editar
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
      max-width="900"
      transition="scroll-y-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          {{dialogTitle}}

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

        <v-card-text class="pl-0 pr-0 pt-0">

          <v-tabs
            v-model="tab"
            background-color="blue-grey lighten-1"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              Datos Generales
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-tab>

            <v-tab href="#tab-2" :disabled="tabContactosDisabled">
               Contactos
              <v-icon>mdi-account-box-outline</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
              <v-card flat>
                <v-card-text>
                  <v-form
                    ref="form"
                    v-on:submit.prevent="registrarItem"
                    v-model="validForm"
                    class="pt-4 pl-2 pr-2"
                  >

                    <v-row>
                      <v-col cols="12" md="12" class="pt-0 pb-0">
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
                            maxLength('Nombre de la institución', 500)
                          ]"
                          maxlength="500"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
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
                    </v-row>

                    <v-row>
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
                        <label class="grey--text subtitle-1 mb-0 font-weight-medium"
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

                    <v-row>
                      <v-col cols="12" md="12" class="pb-0">
                        <v-spacer></v-spacer>
                        <!--:disabled="!validDocForm" type="submit"-->
                        <v-btn
                          color="primary"
                          class="mb-2 float-right ml-1"
                          type="submit"
                          :elevation="0"
                          :disabled="!validForm"
                          :loading="btnRegistroLoading"
                        >
                          Guardar
                        </v-btn>

                        <v-btn
                          color="grey lighten-5"
                          elevation="0"
                          class="mb-2 float-right grey lighten-5"
                          @click="dialogRegistro = false"
                          :disabled="btnRegistroLoading"
                        >
                          Cerrar
                        </v-btn>
                        
                      </v-col>
                    </v-row>


                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
              <v-card flat>
                <v-card-text>
                  <v-form v-model="validFormContactos" v-on:submit.prevent="registrarContacto" class="pt-6 pl-2 pr-2">
                    <v-row>
                      <!--inicio:: campo -->
                      <v-col cols="12" md="6" sm="12" class="pt-6 pb-0">
                        <v-select
                          dense
                          filled
                          v-model="tipoContactoSeleccionado"
                          :items="tiposContacto"
                          class="required"
                          color="blue-grey lighten-2"
                          label="Tipo de contacto"
                          item-text="tipo"
                          item-value="id"
                          :rules="[selectRequired('tipo de contacto')]"
                          @change="configurarDatosContacto"
                          menu-props="auto"
                          return-object
                        >
                        </v-select>
                      </v-col>
                      <!--fin:: campo-->
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12" sm="12" xs="12" class="pt-0 pb-0">
                         <v-text-field
                            :color="tipoContactoSeleccionado.id === 2 ? 'blue-grey lighten-2' : 'blue-grey lighten-3'"
                            autocomplete="off"
                            class="required"
                            dense
                            filled
                            v-model="datosContacto.nombre"
                            :disabled="tipoContactoSeleccionado.id === 1"
                            label="Nombre"
                            :rules="[
                              tipoContactoSeleccionado.id === 2 ? required('nombre') : true,
                              tipoContactoSeleccionado.id === 2 ? minLength('nombre',5) : true,
                              tipoContactoSeleccionado.id === 2 ? maxLength('nombre', 100) : true
                            ]"
                            maxlength="100"
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-if="tipoContactoSeleccionado.id === 2">
                      <v-col cols="12" md="6" sm="12" xs="12" class="pt-0 pb-0">
                        <v-select
                          dense
                          filled
                          v-model="datosContacto.cargosId"
                          :items="cargos"
                          class="required"
                          color="blue-grey lighten-2"
                          :loading="false"
                          label="Cargo"
                          item-text="nombreCargo"
                          item-value="id"
                          :rules="[tipoContactoSeleccionado.id === 2 ? selectRequired('cargo') : true]"
                          menu-props="auto"
                        >
                        </v-select>
                      </v-col>

                      <v-col cols="12" md="6" sm="12" xs="12" class="pt-0 pb-0">
                         <v-text-field
                            color="blue-grey lighten-2"
                            autocomplete="off"
                            class="required"
                            dense
                            filled
                            v-model="datosContacto.area"
                            label="Área"
                            :rules="[
                              tipoContactoSeleccionado.id === 2 ? required('área') : true,
                              tipoContactoSeleccionado.id === 2 ? minLength('área',5) : true,
                              tipoContactoSeleccionado.id === 2 ? maxLength('área', 100) : true
                            ]"
                            maxlength="100"
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-if="tipoContactoSeleccionado.id === 2">
                      <v-col cols="12" md="6" sm="12" class="pt-0 pb-0">
                        <v-text-field
                          color="blue-grey lighten-2"
                          autocomplete="off"
                          class="required"
                          dense
                          filled
                          v-model="datosContacto.correoElectronicoPersonal"
                          label="Correo electrónico personal"
                          :rules="[
                            tipoContactoSeleccionado.id === 2 ? required('Correo electrónico personal') : true,
                            tipoContactoSeleccionado.id === 2 ? minLength('Correo electrónico institucional',5) : true,
                            tipoContactoSeleccionado.id === 2 ? maxLength('Correo electrónico institucional',150) : true,
                            tipoContactoSeleccionado.id === 2 ? validEmail('Correo electrónico personal') : true
                          ]"
                          maxlength="150"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6" sm="12" class="pt-0 pb-0">
                        <v-text-field
                          color="blue-grey lighten-2"
                          autocomplete="off"
                          class="required"
                          dense
                          filled
                          v-model="datosItem.telefonoPersonal"
                          label="Teléfono personal"
                          :rules="[
                            tipoContactoSeleccionado.id === 2 ? required('teléfono personal') : true,
                            tipoContactoSeleccionado.id === 2 ? minLength('teléfono personal', 8) : true,
                            tipoContactoSeleccionado.id === 2 ? maxLength('teléfono personal', 15) : true 
                          ]"
                          maxlength="15"
                        ></v-text-field>
                      </v-col>
                    </v-row>


                    <v-row>
                      <v-col cols="12" md="6" sm="12" class="pt-0 pb-0">
                        <v-text-field
                          color="blue-grey lighten-2"
                          autocomplete="off"
                          dense
                          filled
                          v-model="datosContacto.correoElectronicoInstitucional"
                          :label=" tipoContactoSeleccionado.id === 1 ? 'Correo electrónico de la institución' : 'Correo electrónico institucional'"
                          :rules="[
                            maxLength('Correo electrónico institucional',150),
                            datosContacto.correoElectronicoInstitucional.length > 0 ? validEmail('Correo electrónico institucional') : true
                          ]"
                          maxlength="150"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6" sm="12" class="pt-0 pb-0">
                        <v-text-field
                          color="blue-grey lighten-2"
                          autocomplete="off"
                          dense
                          filled
                          v-model="datosContacto.telefonoInstitucional"
                          :label=" tipoContactoSeleccionado.id === 1 ? 'Teléfono de la institución' : 'Teléfono institucional'"
                          :rules="[
                            maxLength('teléfono institucional', 15) 
                          ]"
                          maxlength="15"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    
                      <v-row>
                        <v-col cols="12" md="12" class="pb-0">
                        <v-spacer></v-spacer>
                        <!--:disabled="!validDocForm" type="submit"-->
                        <v-btn
                          color="primary"
                          class="mb-2 float-right ml-1"
                          type="submit"
                          :elevation="0"
                          :disabled="!validFormContactos"
                          :loading="btnRegistroContactoLoading"
                        >
                          Agregar contacto
                        </v-btn>                        
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-row class="mt-6">
                    <v-col cols="12" md="12">
                      <v-subheader>
                        Contactos de la institución registrados
                      </v-subheader>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>

                  <v-row>
                    <!--inicio:: tabla de documentos cargados -->
                    <v-col cols="12" md="12" sm="12" class="pt-4">
                        <v-data-table
                            class="elevation-1"
                            :headers="headersContactos"
                            :items="contactos"
                            :loading="tableContactosLoading"
                            hide-default-footer
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

                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.area }}</td>
                                        <td>{{ item.nombreCargo }}</td>
                                        <td>{{ item.direccion }}</td>
                                        <td> 
                                             <small class="text-subtitle-2" v-if="item.correoElectronicoPersonal">personal: {{ item.correoElectronicoPersonal }}<br/></small>
                                             <small class="text-subtitle-2" v-if="item.correoElectronicoInstitucional">institucional: {{ item.correoElectronicoInstitucional }} </small>
                                        </td>
                                        <td>
                                            <small class="text-subtitle-2" v-if="item.telefonoPersonal">personal: {{item.telefonoPersonal}} <br/></small>
                                            <small class="text-subtitle-2" v-if="item.telefonoInstitucional">institucional: {{ item.telefonoInstitucional }} </small>
                                        </td>
                                        <td>
                                            <v-btn v-if="item.estadosId==1"
                                                class="ma-2 btn-bg-light blue-grey--text lighten-2--text font-weight-medium text-capitalize"
                                                small
                                                depressed
                                                color="blue-grey lighten-5"
                                                @click="eliminarContacto(item.id)"
                                                >
                                                <v-icon left>mdi-delete</v-icon> Dar de baja
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
       
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--end:: modal registro-->


    <!--begin:: dialog envío expediente -->
    <v-dialog v-model="dialogEnvio" width="600" transition="scroll-y-transition" persistent>
      <v-card>
        <v-card-title class="text-h5">
          Envío de expediente

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnEnvioLoading"
            @click="dialogEnvio = false"
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          
        </v-card-title>

        <v-card-text>
          <v-row class="mt-2">
            <v-col cols="12">
            {{proyectoSeleccionado}}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-grey darken-2"
            text
            @click="dialogEnvio = false"
            :disabled="btnEnvioLoading"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="blue-grey darken-2"
            text
            @click="enviarExpediente"
            :loading="btnEnvioLoading"
            :disabled="datosPendientes>0"
          >
            Sí, enviar
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>

    <!--Dialog loader -->
    <DialogLoader
      :dialogVisible="dialogLoaderVisible"
      :text="dialogLoaderText"
      transition="scroll-y-transition"
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

import validations from "@/core/untils/validations.js";

import {OBTENER_EXPEDIENTES} from "@/core/services/store/expedientes/expedientes.module";

/*
import {OBTENER_CONTACTOS, REGISTRAR_CONTACTO} from "@/core/services/store/contactos/contacto.module";
*/


export default {
  name: "AdminExpedientes",
  data() {
    return {
      tab: null,
      tabContactosDisabled: true,
      tableLoading: false,
      validForm: false,
      dialogEnvio: false,
      
      btnEnvioLoading: false,
      btnRegistroContactoLoading: false,
      contactos: [],
      tableContactosLoading: false,
      ddRolesLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      proyectoSeleccionado: "",
      filtro: "",
      tiposContacto: [{id: 1, tipo: "De la institución"}, {id: 2, tipo: "Trabajador"}],
      tipoContactoSeleccionado: {},
      dialog: false,
      dialogTitle: "Registrar nuevo proyecto",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      estadoProyecto: "",
      tiposInstitucion:[],
      items: [],
      cargos: [],
      datosItem: {
        id: 0,
        nombreInstitucion: "",
        nombreMaximaAutoridad: "",
        nombreContactoCooperacion: "",
        telefonoContactoCooperacion: "",
        correoContactoCooperacion: "",
        direccion: "",
        telefono: "",
        correo: "",
        nivelesInstitucionId: 0,
        tiposInstitucionId: 0,
        estadosId: 1
      },
      datosContacto: {
        nombre: '',
        cargosId: null,
        area: '',
        correoElectronicoPersonal: null,
        telefonoPersonal: null,
        correoElectronicoInstitucional: '',
        telefonoInstitucional: null,
        estadosId: 1,
        usuarioCreacion: 'admin'
      },
      estadosProyecto: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" }
      ],
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
      this.tab = "tab-1";
      this.accion = 1;
      this.tabContactosDisabled=true;
      this.dialogTitle = "Registrar Institución";
      this.btnRegistroText = "Registrar Institución";
      this.switchItemEstado = true;
      this.dialogRegistro = true;
      this.contactos = [];
    },

    cerrarModalRegistro() {
      //this.dialogRegistro = false;
    },

    //Mostrar el dialogo para la suspension
    mostrarDialogEnvio(nombreProyecto) {
      this.proyectoSeleccionado = nombreProyecto;
      this.dialogEnvio = true;
    },

    //Enviar el expediente
    async enviarExpediente(){
        this.btnEnvioLoading=true;
        this.btnEnvioLoading=false;
        return ""
    },

    resetForm() {
      this.datosItem = {
        id: 0,
        nombreInstitucion: "",
        nombreMaximaAutoridad: "",
        nombreContactoCooperacion: "",
        telefonoContactoCooperacion: "",
        correoContactoCooperacion: "",
        direccion: "",
        telefono: "",
        correo: "",
        nivelesInstitucionId: 0,
        tiposInstitucionId: 0,
        estadosId: 1,
        
      };
      this.tab="tab-1";
      this.switchItemEstado = true;
      this.accion = 1;
    },

    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_EXPEDIENTES)
        .then(res => {
          if(res.status===200){
            this.items = this.$store.state.expedientes.expedientes;
          }
          //console.log(this.items);
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },

        /*
    //Obtener los niveles institucion
    async obtenerNivelesInstitucion() {
      this.nivelesInstitucion = [];
      this.$store
        .dispatch(OBTENER_ITEMS_CATALOGO, {endpoint: 'NivelesInstitucion/all/1'})
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
        .dispatch(OBTENER_ITEMS_CATALOGO, {endpoint: 'TiposInstitucion/all/1'})
        .then(res => {
          if (res.status === 200) {
            this.tiposInstitucion = res.data;
          }
        })
        .catch(() => {
            this.tiposInstitucion = [];
        });
    },


     //Obtener los cargos
    async obtenerCargos() {
      this.cargos = [];
      this.$store
        .dispatch(OBTENER_ITEMS_CATALOGO, {endpoint: 'Cargos/all/1'})
        .then(res => {
          if (res.status === 200) {
            this.cargos = res.data;
          }
        })
        .catch(() => {
            this.cargos = [];
        });
    },
    ///Registro de institucion
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
              //this.dialogRegistro = false;
              //this.resetForm();
              this.tab = "tab-2";
              this.accion = 2;
              this.tabContactosDisabled=false;
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
              //this.dialogRegistro = false;
              this.obtenerItems();
              //this.resetForm();
              this.tabContactosDisabled=false;
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
    // tipo 1 mostrar tab registro, tipo 2 mostrar tab contactos
    obtenerDatosItem(Id, tipo) {
      this.resetFormContacto();
      this.tipoContactoSeleccionado = {};
      this.empresaId = Id;
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      this.dialogTitle = `Actualizar Institución`;
      this.btnRegistroText = `Actualizar Institución`;
         
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
            this.tabContactosDisabled=false;
            tipo === 1 ? this.tab = "tab-1" : this.tab = "tab-2";
            this.dialogRegistro = true;
            this.obtenerContactos(Id);
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


    //Obtener los contactos de la institucion
    async obtenerContactos(id){
      this.contactos = [];
      this.tableContactosLoading = true;

      this.$store
        .dispatch(OBTENER_CONTACTOS, {tipoContacto: 'INSTITUCION', estadoId: 1, id: id})
        .then(res => {
          if(res.status === 200){
            this.contactos = this.$store.state.contacto.contactos;
          }
          this.tableContactosLoading = false;
        })
        .catch(() => {
          this.tableContactosLoading = false;
           this.contactos = [];
        });
    },

    //Configurar el contacto
    configurarDatosContacto(){
      if(this.tipoContactoSeleccionado.id == 1){
        this.datosContacto.nombre = "Contacto de la institución";//;
      } else {
        this.datosContacto.nombre = "";
      }
    },


    async registrarContacto(){
      this.btnRegistroContactoLoading = true;


      this.datosItem.tipoContactoId = this.tipoContactoSeleccionado.id;
      this.datosContacto.tipo= 2;
      this.datosContacto.tipoContactoId = 2;
      
      //Verificar si el tipo es institucion
      if(this.tipoContactoSeleccionado.id == 1){
        this.datosContacto.correoElectronicoPersonal = null;
        this.datosContacto.telefonoPersonal = null;
        this.datosContacto.cargosId = null;
        this.datosContacto.tipo =1;
        this.datosContacto.tipoContactoId = 1;
        //console.log(this.datosContacto);
      } //
      this.datosContacto.institucionesId = this.datosItem.id;

      

      //!Asignar el estado a datos empresa segun lo seleccionado en el swithc del formulario
      this.switchItemEstado
        ? (this.datosContacto.estadosId = 1)
        : (this.datosContacto.estadosId = 2);

      this.datosItem.usuarioCreacion= "test";

        this.$store
          .dispatch(REGISTRAR_CONTACTO, {datos: this.datosContacto})
          .then(res => {
            
            //this.dialogLoaderVisible = false;
            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow("success", "Mensaje", res.message);
              this.obtenerContactos(this.datosItem.id);             
              this.resetFormContacto();
            } else {
              this.$refs.snackalert.SnackbarShow("warning", "Alerta", res.message);
            }
            this.btnRegistroContactoLoading = false;
          })
          .catch(() => {
            this.btnRegistroContactoLoading=false;
            this.$refs.snackalert.SnackbarShow("warning", "Alerta", `Ha ocurrido un error durante el registro.`
            );
          });
      
    },

    resetFormContacto() {
     this.tipoContactoSeleccionado.id = 2;
     this.datosContacto= {
        nombre: '',
        cargosId: null,
        area: '',
        correoElectronicoPersonal: null,
        telefonoPersonal: null,
        correoElectronicoInstitucional: '',
        telefonoInstitucional: null,
        estadosId: 1,
        usuarioCreacion: 'admin'
      };
    }*/
  },
  created(){
    this.obtenerItems();
   /* 
    this.obtenerNivelesInstitucion();
    this.obtenerTiposInstitucion();
    this.obtenerCargos();*/
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Administracion" },
      { title: "Expedientes" }
    ]);
  }, 

  computed:{

    headers() {
        return [
          {
            text: "No. Expediente",
            align: "start",
            sortable: false,
            value: "no_Expediente"
          },
          {
            text: "Nombre del proyecto",
            align: "start",
            sortable: true,
            value: "nombre_Proyecto"
          },
          {
            text: "Descripción",
            align: "start",
            sortable: true,
            value: "descripcion_Proyecto"
          },
          /*{
            text: "Máxima autoridad",
            align: "start",
            sortable: true,
            value: "institucion"
          },*/
          {
            text: "Estado",
            align: "start",
            sortable: true,
            value: "estado",
            filter: this.filtroEstado
          },
          {
            text: "Acciones",
            align: "start",
            sortable: false,
            value: ""
          }
      ]
    }, 

    headersContactos(){
      return [
         {
            text: "Id",
            //align: "start",
            sortable: false,
            value: "id",
            align: ' d-none'
          },
          {
            text: "Nombre",
            align: "start",
            sortable: true,
            value: "nombre"
          },
          {
            text: "Área",
            align: "start",
            sortable: true,
            value: "area"
          },
          {
            text: "Cargo",
            align: "start",
            sortable: true,
            value: "cargo"
          },
          {
            text: "Dirección",
            align: "start",
            sortable: true,
            value: "direccion"
          },
          {
            text: "Correo(s)",
            align: "start",
            sortable: true,
            value: "correo"
          },
          {
            text: "Teléfono(s)",
            align: "start",
            sortable: true,
            value: "telefono"
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
