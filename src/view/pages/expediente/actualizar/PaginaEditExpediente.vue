<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" :color="checkColor1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" :color="checkColor2">
          Dirección
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" :color="checkColor3">
          Individual / Empresa
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4" :color="checkColor4">
          Contacto
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 5" step="5" :color="checkColor5">
          Requisitos
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 6" step="6" :color="checkColor6">
          TDR
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 7" step="7" :color="checkColor7">
          Notificaciones
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card tile>
            <v-card-title>
              <v-spacer></v-spacer>
              <!--v-btn
            icon
            :disabled="btnRegistroLoading"
            @click="
              dialogRegistro = false;
              resetForm();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </!--v-btn-->
            </v-card-title>
            <v-divider class="d-none"></v-divider>

            <v-card-text class="pl-8 pr-8 pt-5">
              <v-form
                ref="form"
                v-on:submit.prevent="registrarItem"
                v-model="validForm"
              >
                <v-row>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.categoriasId"
                      :items="categorias"
                      class="required"
                      dense
                      outlined
                      label="Categoría"
                      item-text="categoria"
                      item-value="id"
                      :rules="[selectRequired('Categoría')]"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.tiposInstrumentoId"
                      :items="tiposinstrumento"
                      class="required"
                      dense
                      outlined
                      label="Tipo de Instrumento"
                      item-text="tipo_Instrumento"
                      item-value="id"
                      :rules="[selectRequired('Tipo Instruneto')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.tiposProyectoId"
                      :items="tiposproyecto"
                      class="required"
                      dense
                      outlined
                      label="Tipo de Proyecto"
                      item-text="tipo_Proyecto"
                      item-value="id"
                      :rules="[selectRequired('Tipo de Proyecto')]"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.tipo_Inversion"
                      :items="tiposInversion"
                      class="required"
                      dense
                      outlined
                      label="Tipo de Inversion"
                      item-text="tipo"
                      item-value="tipo"
                      :rules="[selectRequired('Tipo de Inversion')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.sectorId"
                      :items="sectores"
                      class="required"
                      dense
                      outlined
                      label="Sector"
                      item-text="nombre"
                      item-value="id"
                      :rules="[selectRequired('Sector')]"
                      @change="obtenerDdlSubSectores"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.subSectorId"
                      :loading="dialogLoaderVisibleSubSector"
                      :items="subSectores"
                      class="required"
                      dense
                      outlined
                      label="Sub Sectores"
                      item-text="nombre"
                      item-value="id"
                      :rules="[selectRequired('Sub Sectores')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.actividadesProductivasId"
                      :items="actividades"
                      class="required"
                      dense
                      outlined
                      label="Actividades productivas"
                      item-text="nombre"
                      item-value="id"
                      :rules="[selectRequired('Actividades productivas')]"
                      @change="obtenerDdlSubActividades"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.subActividadesProductivasId"
                      :loading="dialogLoaderVisibleSubActividades"
                      :items="subActividades"
                      class="required"
                      dense
                      outlined
                      label="Sub Actividades productivas"
                      item-text="nombre"
                      item-value="id"
                      :rules="[selectRequired('Sub Actividades productivas')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItem.no_Expediente"
                      label="No. Expediente"
                      :rules="[
                        required('No. Expediente'),
                        maxLengthForm15('No. Expediente'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItem.nombre_Proyecto"
                      label="Nombre del proyecto"
                      :rules="[
                        required('Nombre del proyecto'),
                        maxLengthForm500('Nombre del proyecto'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-textarea
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItem.descripcion_Proyecto"
                      label="Descripción del proyecto"
                      :rules="[
                        required('Descripción del proyecto'),
                        maxLengthForm1000('Descripción del proyecto'),
                      ]"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      class="required"
                      outlined
                      autocomplete="off"
                      dense
                      v-model="datosItem.monto_Inversion_Proyecto"
                      v-mask="'######'"
                      label="Monto de inversión del proyecto"
                      :rules="[required('Monto de inversión del proyecto')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="pt-4 pb-0">
                    <v-text-field
                      class="required"
                      outlined
                      autocomplete="off"
                      dense
                      v-model="datosItem.numero_Empleos_Construccion"
                      v-mask="'######'"
                      label="Número de empleos que genera el proyecto (Fase Construcción)"
                      :rules="[
                        required(
                          'Número de empleos que genera el proyecto (Fase Construcción)'
                        ),
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-4 pb-0">
                    <v-text-field
                      class="required"
                      outlined
                      autocomplete="off"
                      dense
                      v-model="datosItem.numero_Empleos_Operacion"
                      v-mask="'######'"
                      label="Número de empleos que genera el proyecto (Fase Operación)"
                      :rules="[
                        required(
                          'Número de empleos que genera el proyecto (Fase Operación)'
                        ),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      outlined
                      autocomplete="off"
                      dense
                      v-model="datosItem.tiempo_Vida_Proyecto"
                      label="Tiempo de vida útil del proyecto"
                      :rules="[
                        required('Tiempo de vida útil del proyecto'),
                        maxLengthForm50('Tiempo de vida útil del proyecto'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItem.link_Mitigacion"
                      label="NO. DE FOLIO DONDE SE ENCUENTRAN LOS COSTOS DE MEDIDAS DE MITIGACIÓN. (agregar link hacia seccion de costos de mitigacion)"
                      :rules="[
                        required('Categoría'),
                        minLength('Categoría', 3),
                        maxLength('Categoría', 100),
                      ]"
                      maxlength="100"
                    ></v-text-field>
                  </v-col>
                </!--v-row-->
                <v-row>
                  <v-col cols="12" md="6" sm="12" xs="12" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItem.detalleConsultorId"
                      :items="consultores"
                      class="required"
                      dense
                      outlined
                      label="Consultor"
                      item-text="nombre_Empresa_Profesional"
                      item-value="codigo_Consultor"
                      :rules="[selectRequired('Consultor')]"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="pt-1 pb-1">
                    <v-btn
                      color=""
                      dark
                      class="float-right blue-grey darken-2"
                      @click="modalNuevo"
                    >
                      Equipo de trabajo
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="pt-1 pb-1">
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
                        pageText: '{0}-{1} de {2}',
                      }"
                    >
                      <!--template v-slot:top>
                    < v-container, v-col and v-row are just for decoration purposes. >
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
                    </template-->

                      <template v-slot:item="{ item }">
                        <tr>
                          <td>{{ item.id }}</td>
                          <td>{{ item.categoria }}</td>
                          <td>{{ item.usuario_Creacion }}</td>
                          <td>
                            <v-chip
                              class="ma-2 font-weight-medium"
                              label
                              :color="
                                item.estados_Id === 1
                                  ? 'teal'
                                  : item.estados_Id === 2
                                  ? 'pink'
                                  : 'pink'
                              "
                              :text-color="
                                item.estados_Id === 1
                                  ? 'white'
                                  : item.estados_Id === 2
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
                  </v-col>
                </v-row>

                <!--v-row>
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
            </!--v-row-->
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-5"
                elevation="0"
                class="mb-2 float-right grey lighten-5"
                @click="dialogRegistro = false"
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
          <!--v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn-- text>
          Cancel
        </v-btn-->
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card tile>
            <v-card-title>
              <v-spacer></v-spacer>
              <!--v-btn
            icon
            :disabled="btnRegistroLoading"
            @click="
              dialogRegistro = false;
              resetForm();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </!--v-btn-->
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
                      v-model="datosItemDireccion.direccion_Proyecto"
                      label="Dirección del Proyecto"
                      :rules="[
                        required('Dirección del Proyecto'),
                        maxLengthForm300('Dirección del Proyecto'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItemDireccion.departamentosId"
                      :items="departamentos"
                      class="required"
                      dense
                      outlined
                      label="Departamento"
                      item-text="departamento"
                      item-value="id"
                      :rules="[selectRequired('Departamento')]"
                      @change="obtenerDdlMunicipios"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xs="6" class="pt-1 pb-1">
                    <v-autocomplete
                      v-model="datosItemDireccion.municipiosId"
                      :items="municipios"
                      :loading="dialogLoaderVisibleDeptos"
                      class="required"
                      dense
                      outlined
                      label="Municipio"
                      item-text="municipio"
                      item-value="id"
                      :rules="[selectRequired('Municipio')]"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.latitud_Proyecto"
                      label="Latitud"
                      :rules="[required('Latitud'), latitudForm('Latitud')]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.longitud_Proyecto"
                      label="Longitud"
                      :rules="[required('Longitud'), longitudForm('Longitud')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.calle"
                      label="Calle"
                      :rules="[required('Calle'), maxLengthForm50('Calle')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.avenida"
                      label="Avenida"
                      :rules="[required('Avenida'), maxLengthForm50('Avenida')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.grados"
                      label="Grados"
                      :rules="[required('Grados'), gradosForm('Grados')]"
                      maxlength="100"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.minutos"
                      label="Minutos"
                      :rules="[required('Minutos'), minutosForm('Minutos')]"
                      maxlength="100"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.segundos"
                      label="Segundos"
                      :rules="[required('Segundos'), segundosForm('Segundos')]"
                      maxlength="100"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.finca"
                      label="No. Finca"
                      :rules="[
                        required('No. Finca'),
                        maxLengthForm10('No. Finca'),
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.folio"
                      label="Folio"
                      :rules="[required('Folio'), maxLengthForm10('Folio')]"
                      maxlength="100"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="datosItemDireccion.libro"
                      label="Libro"
                      :rules="[required('Libro'), maxLengthForm10('Libro')]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!--v-row>
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
            </!--v-row-->
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
                  e1 = 1;
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
                @click="updateDireccion"
              >
                Guardar
              </v-btn>
            </v-card-actions>

            <div style="flex: 1 1 auto"></div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card tile>
            <v-card-title>
              <v-row>
                <v-col cols="12" md="8" sm="8" xs="8" class="pt-1 pb-1">
                  <v-autocomplete
                    v-model="tipoEmpresa_Id"
                    :items="tipoEmpresa"
                    class="required"
                    dense
                    outlined
                    label="Tipo"
                    item-text="tipo"
                    item-value="id"
                    :rules="[selectRequired('Tipo')]"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
              <!--v-btn
            icon
            :disabled="btnRegistroLoading"
            @click="
              dialogRegistro = false;
              resetForm();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </!--v-btn-->
            </v-card-title>
            <v-divider class="d-none"></v-divider>

            <v-card-text class="pl-8 pr-8 pt-5">
              <v-form
                ref="form"
                v-on:submit.prevent="registrarItem"
                v-model="validForm"
              >
                <v-row v-if="tipoEmpresa_Id === 1 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="dpiIndividual"
                      v-mask="'#############'"
                      label="DPI"
                      :rules="[]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 1 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="nombresIndividual"
                      label="Nombres"
                      :rules="[
                        required('Nombres'),
                        maxLengthForm200('Nombres'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 1 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="apellidosIndividual"
                      label="Apellidos"
                      :rules="[
                        required('Apellidos'),
                        maxLengthForm200('Apellidos'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 1 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="nitPropietario"
                      label="Nit"
                      :rules="[required('Nit'), onlyNit('Nit')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 2 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="nombreComercial"
                      label="Nombre Comercial"
                      :rules="[
                        required('Nombre Comercial'),
                        maxLengthForm200('Nombre Comercial'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 2 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="nitEmpresa"
                      label="Nit Empresa"
                      :rules="[required('Nit Empresa'), onlyNit('Nit Empresa')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 2 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="razonSocial"
                      label="Razón Social"
                      :rules="[
                        required('Razón Social'),
                        maxLengthForm200('Razón Social'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 2 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-text-field
                      autocomplete="off"
                      class="required"
                      dense
                      filled
                      color="blue-grey darken-2"
                      v-model="noEscrituraConstitutiva"
                      label="Número de Escritura Constitutiva"
                      :rules="[
                        required('Número de Escritura Constitutiva'),
                        maxLengthForm20('Número de Escritura Constitutiva'),
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tipoEmpresa_Id === 2 ? true : false">
                  <v-col cols="12" md="12" class="pt-4 pb-0">
                    <v-menu
                      ref="menu1"
                      v-model="menuFechaConstitucion"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                      :nudge-right="40"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          outlined
                          autocomplete="off"
                          :rules="[]"
                          v-model="fechaConstitucion"
                          label="Fecha de Constitución de la empresa"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hint="DD-MM-YYYY"
                          class=""
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fechas.fechaConstitucion"
                        @change="menuFechaConstitucion = false"
                        :active-picker.sync="activePicker"
                        locale="es"
                        :max="maxDate()"
                        :min="minDate()"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <!--v-row>
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
            </!--v-row-->
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
                  e1 = 2;
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
                @click="updateTipoEmpresa"
              >
                Guardar
              </v-btn>
            </v-card-actions>

            <div style="flex: 1 1 auto"></div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card tile>
            <v-card-title>
              {{ modalTitle }}

              <v-spacer></v-spacer>
              <!--v-btn
            icon
            :disabled="btnRegistroLoading"
            @click="
              dialogRegistro = false;
              resetForm();
            "
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </!--v-btn-->
            </v-card-title>
            <v-divider class="d-none"></v-divider>

            <v-card-text class="pl-8 pr-8 pt-5">
              <v-row>
              <v-col cols="12" sm="12" md="12">

                    <v-row class="col-md-12">
                      <v-col cols="12" sm="12" md="6">
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-btn
                          color=""
                          dark
                          class="mb-2 float-right blue-grey darken-2"
                          @click="modalNuevoContacto"
                        >
                          Registrar Nuevo Contacto
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row class="col-md-12 m-0 p-0">
                      <v-divider></v-divider>
                    </v-row>

                    <v-data-table
                      class="elevation-0"
                      :headers="headersContactos"
                      :items="contactos"
                      :search="filtro"
                      :loading="tableLoadingContactos"
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

                            <v-col
                              cols="2"
                              md="2"
                              sm="12"
                              xs="6"
                              class="d-none"
                            >
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
                          <td>{{ item.apellidos }}</td>
                          <td>{{ item.direccion_Notificacion }}</td>
                          <td>{{ item.email }}</td>
                          <td>{{ item.numero_Telefono }}</td>
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
                    btn-bg-light
                    white--text
                    lighten-2--text
                    font-weight-medium
                    text-capitalize
                  "
                              small
                              depressed
                              color="indigo"
                              @click="obtenerDatosItemContacto(item.id)"
                            >
                              <v-icon left>mdi-pencil</v-icon> Actualizar
                            </v-btn>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>

                  <!-- <template v-slot:html>
            {{ code4.html }}
          </template>
          <template v-slot:js>
            {{ code4.js }}
          </template> -->

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-5"
                elevation="0"
                class="mb-2 float-right grey lighten-5"
                @click="
                  dialogRegistro = false;
                  e1 = 3;
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
                :disabled="!validFormContactoPantalla"
                :loading="btnRegistroLoading"
                @click="
                  checkColor4 = 'green';
                  checkColor5 = 'blue-grey lighten-4';
                  e1 = 5;
                "
              >
                Guardar
              </v-btn>
            </v-card-actions>

            <div style="flex: 1 1 auto"></div>
          </v-card>
        </v-stepper-content>

        <!-- inicio:: seccion requisitos-->
        <v-stepper-content step="5">
          <v-card tile>
            <v-card-title>
              <v-subheader>Requisitos</v-subheader>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text>
              <v-row>
                <!--inicio:: tabla de documentos cargados -->
                <v-col cols="12" md="12" sm="12" class="pt-4">
                  <v-data-table
                    class="elevation-1"
                    :headers="headersContactos" 
                    :items="contactos"
                    :loading="tableLoadingContactos"
                    hide-default-footer
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
                        <td>{{ item.tipoDocumento }}</td>
                        <td>
                          <v-chip
                            label
                            class="ma-2"
                            :color="
                              item.estados_Id === 1
                                ? 'blue-grey lighten-4'
                                : item.estados_Id === 2
                                ? 'deep-orange lighten-4'
                                : 'pink lighten-4'
                            "
                            :text-color="
                              item.estados_Id === 1
                                ? 'blue-grey lighten-1'
                                : item.estados_Id === 2
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
                            class="ma-2 btn-bg-light blue-grey--text lighten-2--text font-weight-medium text-capitalize"
                            small
                            depressed
                            color="blue-grey lighten-5"
                            @click="
                              mostrarModalCargaDocumento(item.documento, 1)
                            "
                          >
                            <v-icon left>mdi-cloud-upload</v-icon> Cargar
                            Documento
                          </v-btn>

                          <v-btn
                            v-if="item.estadosId == 1"
                            class="ma-2 btn-bg-light blue-grey--text lighten-2--text font-weight-medium text-capitalize"
                            small
                            depressed
                            color="blue-grey lighten-5"
                            @click="descargarArchivo(item.path)"
                          >
                            <v-icon left>mdi-file-download-outline</v-icon>
                            Descargar
                          </v-btn>
                          <!--<v-btn v-if="item.estadosId==4"
                                            class="ma-2 btn-bg-light blue-grey--text lighten-2--text font-weight-medium text-capitalize"
                                            small
                                            depressed
                                            color="blue-grey lighten-5"
                                            @click="eliminarArchivo(item.idTipo)"
                                            >
                                            <v-icon left>mdi-delete</v-icon> Eliminar
                                        </v-btn>-->
                        </td>
                      </tr>
                    </template>

                    <template v-slot:no-data>
                      <p class="text-h7">
                        <v-icon left>mdi-alert</v-icon> No existe información
                        registrada de proyección de fuente cooperante
                      </p>
                    </template>
                  </v-data-table>
                </v-col>
                <!--fin:: tabla de documentos cargados -->
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-content>

        <!--fin:: seccion requisitos-->

        <!-- inicio:: seccion tdr-->
        <v-stepper-content step="6">
          <v-card tile>
            <v-card-title>
              <v-subheader>TDR</v-subheader>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text> </v-card-text>
          </v-card>
        </v-stepper-content>

        <!--fin:: seccion tdr-->
      </v-stepper-items>
    </v-stepper>

    <!--begin:: dialog carga de documento -->
    <v-dialog
      v-model="dialogCargaDocumento"
      width="600"
      transition="scroll-y-transition"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ dialogCargaDocTitle }}

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnCargaDocLoading"
            @click="dialogCargaDocumento = false"
            class="float-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-on:submit.prevent="cargarArchivo"
            v-model="validForm"
          >
            <v-row>
              <v-col cols="12" md="12" sm="12" class="pt-0 mt-4 pb-0 mb-0">
                <v-subheader class="text-h6 text-uppercase">
                  {{ documentoSeleccionado }}
                </v-subheader>
              </v-col>

              <v-col cols="12" md="12" sm="12" class="pt-0 mt-4 pb-0 mb-0">
                <template>
                  <v-file-input
                    id="docFile"
                    dense
                    filled
                    placeholder="Seleccionar archivo .pdf"
                    :label="'Seleccione para ' + documentoSeleccionado"
                    append-icon="mdi-file-pdf-outline"
                    prepend-icon=""
                    accept="application/pdf,image/jpeg"
                    @change="onFileChange"
                    :rules="[fileRequired('documento')]"
                    :show-size="1000"
                    ref="docFile"
                    class="required"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" small label color="primary">
                        {{ text }}
                      </v-chip>
                      <span
                        v-else-if="index === 2"
                        class="
                              text-overline
                              grey--text
                              text--darken-3
                              mx-2
                          "
                      >
                        +{{ files.length - 2 }} archivo(s)
                      </span>
                    </template>
                  </v-file-input>
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-btn
                  color="blue-grey darken-2"
                  text
                  @click="dialogCargaDocumento = false"
                  :disabled="btnCargaDocLoading"
                >
                  Cancelar
                </v-btn>

                <v-btn
                  color="blue-grey darken-2"
                  text
                  @click="enviarExpediente"
                  :loading="btnCargaDocLoading"
                >
                  Cargar documento
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--fin:: dialog carga de documento -->

    <!--begin:: modal registro-->
    <v-dialog
      v-model="dialogRegistroContacto"
      max-width="600"
      transition="dialog-bottom-transition"
      persistent
      scrollable
    >
      <v-card tile>
        <v-card-title>
          Registro de Contactos

          <v-spacer></v-spacer>
          <v-btn
            icon
            :disabled="btnRegistroContactoLoading"
            @click="
              dialogRegistroContacto = false;
              resetFormContacto();
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
            v-on:submit.prevent="registrarItemContacto"
            v-model="validFormContacto"
          >
            <v-row>
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey darken-2"
                  v-model="datosContacto.nombre"
                  label="Nomobres"
                  :rules="[
                    required('Nomobres'),
                    maxLengthForm200('Nomobres')
                  ]"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey darken-2"
                  v-model="datosContacto.apellidos"
                  label="Apellidos"
                  :rules="[
                    required('Apellidos'),
                    maxLengthForm200('Apellidos')
                  ]"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey darken-2"
                  v-model="datosContacto.direccion_Notificacion"
                  label="Dirección Notificacion"
                  :rules="[
                    required('Dirección Notificacion'),
                    maxLengthForm300('Dirección Notificacion')
                  ]"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey darken-2"
                  v-model="datosContacto.email"
                  label="Correo"
                  :rules="[
                    required('Correo'),
                    validEmail('Correo')
                  ]"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="12" class="pt-4 pb-0">
                <v-text-field
                  autocomplete="off"
                  class="required"
                  dense
                  filled
                  color="blue-grey darken-2"
                  v-model="datosContacto.numero_Telefono"
                  label="Número de Teléfono"
                  v-mask="'####-####'"
                  :rules="[
                    required('Número de Teléfono')
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
                    color="blue-grey darken-2"
                    v-model="switchItemEstadoContacto"
                    inset
                    :label="switchItemEstadoContacto ? 'Activo' : 'Inactivo'"
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
              dialogRegistroContacto = false;
              resetFormContacto();
            "
            :disabled="btnRegistroContactoLoading"
          >
            Cancelar
          </v-btn>
          <!--:disabled="!validDocForm" type="submit"-->
          <v-btn
            color="primary"
            class="mb-2 float-right"
            type="submit"
            :elevation="0"
            :disabled="!validFormContacto"
            :loading="btnRegistroContactoLoading"
            @click="registrarItemContacto"
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

import {
  OBTENER_TIPOS_INSTRUMENTO,
} from "@/core/services/store/tiposinstrumento/tiposinstrumento.module";
import { OBTENER_CATEGORIAS } from "@/core/services/store/categorias/categorias.module";
import { OBTENER_TIPOS_PROYECTO } from "@/core/services/store/tiposproyecto/tiposproyecto.module";
import { OBTENER_DEPARTAMENTOS } from "@/core/services/store/departamentos/departamentos.module";
import { OBTENER_MUNICIPIOS_BY_DEPTO } from "@/core/services/store/municipios/municipios.module";
import { OBTENER_ACTIVIDADES } from "@/core/services/store/actividades/actividadesproductivas.module";
import { OBTENER_SUBACTIVIDADES_BY_ACTIVIDAD } from "@/core/services/store/subactividades/subactividades.module";
import { OBTENER_SECTORES } from "@/core/services/store/sectores/sectores.module";
import { OBTENER_SUBSECTORES_BY_SECTOR } from "@/core/services/store/subsectores/subsectores.module";
import { OBTENER_CONSULTORES } from "@/core/services/store/consultores/consultores.module";
import { REGISTRAR_CONTACTO,OBTENER_CONTACTOS_BY_EXPEDIENTE,OBTENER_CONTACTO,ACTUALIZAR_CONTACTO } from "@/core/services/store/contactos/contactos.module";
import {
  ACTUALIZAR_EXPEDIENTE,
  ACTUALIZAR_DIRECCION_EXPEDIENTE,
  ACTUALIZAR_TIPOEMPRESA_EXPEDIENTE,
  OBTENER_EXPEDIENTE
} from "@/core/services/store/expedientes/expedientes.module";
import validations from "@/core/untils/validations.js";
import moment from "moment";
import Vue from "vue";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});
export default {
  name: "AdminProyectosTradicionales",
  data() {
    return {
      e1: 1,
      checkColor1: "blue-grey lighten-4",
      checkColor2: "blue-grey lighten-4",
      checkColor3: "blue-grey lighten-4",
      checkColor4: "blue-grey lighten-4",
      checkColor5: "blue-grey lighten-4",
      checkColor6: "blue-grey lighten-4",
      checkColor7: "blue-grey lighten-4",
      itemName: "Categoría",
      validForm: false,
      //ddRolesLoading: false,
      dialogRegistro: false,
      dialogLoaderVisible: false,
      //dialogSuspension: false,
      dialogLoaderText: "",
      switchItemEstado: true,
      switchItemEstadoContacto: true,
      //proyectoSeleccionado: "",
      filtro: "",
      dialog: false,
      modalTitle: "Registrar nuevo proyecto",
      accion: 1,
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      selectEstado: "",
      items: [],
      categorias: [],
      tiposinstrumento: [],
      tiposproyecto: [],
      departamentos: [],
      municipios: [],
      actividades: [],
      subActividades: [],
      sectores: [],
      subSectores: [],
      consultores: [],
      tipoEmpresa: [
        { id: 1, tipo: "Individual" },
        { id: 2, tipo: "Sociedad" },
      ],
      tiposInversion: [
        { id: 1, tipo: "Pública" },
        { id: 2, tipo: "Privada" },
      ],
      datosItem: {
        id: 0,
        no_Expediente: "",
        usuario_Creacion: "admin",
        fecha_Creacion: "2022-07-14",
        nombre_Proyecto: "",
        descripcion_Proyecto: "",
        tiempo_Vida_Proyecto: "",
        monto_Inversion_Proyecto: 0,
        numero_Empleos_Construccion: 0,
        numero_Empleos_Operacion: 0,
        tipo_Inversion: "",
        link_Mitigacion: "",
        tiposInstrumentoId: 0,
        categoriasId: 0,
        tiposProyectoId: 0,
        estadosId: 1,
        sectorId: 0,
        subSectorId: 0,
        actividadesProductivasId: 0,
        subActividadesProductivasId: 0,
        detalleConsultorId: 0,
      },
      datosItemDireccion: {
        id: 0,
        usuario_Creacion: "admin",
        fecha_Creacion: "2022-07-14",
        fecha_Actualizacion: "2022-07-14",
        usuario_Actualizacion: "admin",
        finca: "",
        folio: "",
        libro: "",
        direccion_Proyecto: "",
        latitud_Proyecto: "",
        longitud_Proyecto: "",
        calle: "",
        avenida: "",
        grados: "",
        minutos: "",
        segundos: "",
        departamentosId: 0,
        municipiosId: 0,
      },
      datosItemTipoEmpresa: {
        id: 0,
        //no_Expediente:'',
        usuario_Creacion: "admin",
        fecha_Creacion: "2022-07-14",
        usuario_Actualizacion: "admin",
        // nombre_Proyecto:'',
        // descripcion_Proyecto:'',
        // tiempo_Vida_Proyecto:'',
        // monto_Inversion_Proyecto:0,
        // numero_Empleos_Construccion:0,
        // numero_Empleos_Operacion:0,
        // tipo_Inversion:'',
        // link_Mitigacion:'',
        // finca:'',
        // folio:'',
        // libro:'',
        // direccion_Proyecto:'',
        // latitud_Proyecto:'',
        // longitud_Proyecto:'',
        // calle:'',
        // avenida:'',
        // grados:'',
        // minutos:'',
        // segundos:'',
        tipo_Empresa: "",
        dpi_Individual: 0,
        nombres_Individual: "",
        apellidos_Individual: "",
        nit_Propietario: "",

        nombre_Comercial: "",
        nit_Empresa: "",
        razon_Social: "",
        no_Escritura_Constitutiva: "",
        fecha_Constitucion: "",
        //tiposInstrumento_Id:0,
        //categorias_Id:0,
        //tiposProponente_Id:0,
        //tiposProyecto_Id:0,
        // departamentos_Id:0,
        // municipios_Id:0,
        //estados_Id:1,
        //detalleConsultor_Id:0,
        //sector_Id:0,
        //subSector_Id:0,
        //actividadesProductivas_Id:0,
        //subActividadesProductivas_Id:0
        //cargoRepresentanteLegal_Id:0,
      },
      estados: [
        { text: "Todos", value: null },
        { value: 1, text: "Activo" },
        { value: 2, text: "Inactivo" },
      ],
      //datosUsuario: {},
      depto_Id: 0,
      consultor_Id: 0,
      tipoEmpresa_Id: 0,
      dialogLoaderVisibleDeptos: false,
      dialogLoaderVisibleSubActividades: false,
      dialogLoaderVisibleSubSector: false,
      ...validations,
      id_expediente: 0,
      menuFechaConstitucion: false,
      fechas: {
        fechaConstitucion: "",
      },
      activePicker: null,
      dpiIndividual: 0,
      nombresIndividual: "",
      apellidosIndividual: "",
      nitPropietario: "",
      nombreComercial: "",
      nitEmpresa: "",
      razonSocial: "",
      noEscrituraConstitutiva: "",
      fechaConstitucionSociedad: "",
      requisitosCargados: [],
      tableLoadingRequisitos: false,
      dialogCargaDocumento: false,
      dialogCargaDocTitle: "",
      archivo: [],
      documentoSeleccionado: "",
      datosContacto:{
        id:0,
        nombre:'',
        apellidos:'',
        direccion_Notificacion:'',
        email:'',
        numero_Telefono:'',
        usuario_Creacion:'admin',
        fecha_Creacion:"2022-07-14",
        estadosId:1,
        expedienteId:0
      },
      dialogRegistroContacto:false,
      btnRegistroContactoLoading:false,
      validFormContacto:false,
      accionContacto:1,
      contactos: [],
      tableLoadingContactos:false,
      validFormContactoPantalla:false,
      parametros:'',
      datosExpediente:{}
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
  },
  methods: {
    cargarExpediente(){
      this.parametros = this.$route.params;
      if(this.parametros.id){
          this.id_expediente = this.parametros.id
          this.obtenerDatosExpediente(this.id_expediente).then(()=>{

            this.datosItem.id = this.datosExpediente.id;
            this.datosItem.no_Expediente = this.datosExpediente.no_Expediente;
            this.datosItem.usuario_Creacion = this.datosExpediente.usuario_Creacion;
            this.datosItem.fecha_Creacion = this.datosExpediente.fecha_Creacion;
            this.datosItem.nombre_Proyecto = this.datosExpediente.nombre_Proyecto;
            this.datosItem.descripcion_Proyecto = this.datosExpediente.descripcion_Proyecto;
            this.datosItem.tiempo_Vida_Proyecto = this.datosExpediente.tiempo_Vida_Proyecto;
            this.datosItem.monto_Inversion_Proyecto = this.datosExpediente.monto_Inversion_Proyecto;
            this.datosItem.numero_Empleos_Construccion = this.datosExpediente.numero_Empleos_Construccion;
            this.datosItem.numero_Empleos_Operacion = this.datosExpediente.numero_Empleos_Operacion;
            this.datosItem.tipo_Inversion = this.datosExpediente.tipo_Inversion; 
            this.datosItem.link_Mitigacion = this.datosExpediente.link_Mitigacion;
            this.datosItem.tiposInstrumentoId = this.datosExpediente.tiposInstrumentoId; 
            this.datosItem.categoriasId = this.datosExpediente.categoriasId;
            this.datosItem.tiposProyectoId = this.datosExpediente.tiposProyectoId;
            this.datosItem.estadosId = this.datosExpediente.estadosId;
            this.datosItem.sectorId = this.datosExpediente.sectorId;
            this.datosItem.subSectorId = this.datosExpediente.subSectorId;
            this.datosItem.actividadesProductivasId = this.datosExpediente.actividadesProductivasId; 
            this.datosItem.subActividadesProductivasId = this.datosExpediente.subActividadesProductivasId;
            this.datosItem.detalleConsultorId = this.datosExpediente.detalleConsultorId;


            this.datosItemDireccion.finca=this.datosExpediente.finca;
            this.datosItemDireccion.folio=this.datosExpediente.folio;
            this.datosItemDireccion.libro=this.datosExpediente.libro;
            this.datosItemDireccion.direccion_Proyecto=this.datosExpediente.direccion_Proyecto;
            this.datosItemDireccion.latitud_Proyecto=this.datosExpediente.latitud_Proyecto;
            this.datosItemDireccion.longitud_Proyecto=this.datosExpediente.longitud_Proyecto;
            this.datosItemDireccion.calle=this.datosExpediente.calle;
            this.datosItemDireccion.avenida=this.datosExpediente.avenida;
            this.datosItemDireccion.grados=this.datosExpediente.grados;
            this.datosItemDireccion.minutos= this.datosExpediente.minutos;
            this.datosItemDireccion.segundos=this.datosExpediente.segundos;
            this.datosItemDireccion.departamentosId=this.datosExpediente.departamentosId;
            this.datosItemDireccion.municipiosId=this.datosExpediente.municipiosId;

            this.datosExpediente.tipo_Empresa === 'Individual' ? this.tipoEmpresa_Id = 1 : this.tipoEmpresa_Id = 2;
            this.dpiIndividual = this.datosExpediente.dpi_Individual;
            this.nombresIndividual = this.datosExpediente.nombres_Individual;
            this.apellidosIndividual = this.datosExpediente.apellidos_Individual;
            this.nitPropietario = this.datosExpediente.nit_Propietario;

            this.nombreComercial = this.datosExpediente.nombre_Comercial;
            this.nitEmpresa = this.datosExpediente.nit_Empresa;
            this.razonSocial = this.datosExpediente.razon_Social;
            this.noEscrituraConstitutiva = this.datosExpediente.no_Escritura_Constitutiva;

            if(this.datosExpediente.fecha_Constitucion != null) {
              this.fechas.fechaConstitucion = moment(this.datosExpediente.fecha_Constitucion ).format('YYYY-MM-DD');
            }

            this.datosItemTipoEmpresa.tipo_Empresa = this.datosExpediente.tipo_Empresa;

            this.datosItemTipoEmpresa.dpi_Individual = this.datosExpediente.dpi_Individual;
            this.datosItemTipoEmpresa.nombres_Individual = this.datosExpediente.nombres_Individual;
            this.datosItemTipoEmpresa.apellidos_Individual = this.datosExpediente.apellidos_Individual;
            this.datosItemTipoEmpresa.nit_Propietario = this.datosExpediente.nit_Propietario;

            this.datosItemTipoEmpresa.nombre_Comercial = this.datosExpediente.nombre_Comercial;
            this.datosItemTipoEmpresa.nit_Empresa = this.datosExpediente.nit_Empresa;
            this.datosItemTipoEmpresa.razon_Social = this.datosExpediente.razon_Social;
            this.datosItemTipoEmpresa.no_Escritura_Constitutiva = this.datosExpediente.no_Escritura_Constitutiva;
            this.datosItemTipoEmpresa.fecha_Constitucion = this.datosExpediente.fecha_Constitucion;


      }).then(()=>{
        this.obtenerDdlMunicipios();
        this.obtenerDdlSubSectores();
        this.obtenerDdlSubActividades();
        this.obtenerContactos();
      });
      }
    },
    onFileChange(e) {
      if (e) {
        //!?Validar que el tipo de archivo sea pdf
        if (e.type != "application/pdf" && e.type != "image/jpeg") {
          // Api call
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `El archivo que desea ingresar no es válido.`
          );
          //console.log("no es un pdf..")
          //this.$refs.file.reset();
          document.querySelector("#docFile").value = "";
          this.$refs.docFile.reset();
          return false;
        }
        //?Validar que el tamaó del archivo no exceda los 10Mb
        if (e.size / 1024 / 1024 > 10) {
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `El tamaño del archivo excede el límite permitido (10Mb)`
          );
          // this.$refs.file.reset();
          document.querySelector("#docFile").value = "";
          this.$refs.docFile.reset();
          return false;
        }

        this.archivo = e;
      }
    },
    modalNuevoContacto() {
      this.accionContacto = 1;
      this.switchItemEstadoContacto = true;
      this.dialogRegistroContacto = true;
    },
    maxDate() {
      const date = new Date();
      date.setFullYear(date.getFullYear());
      return date.toISOString().substr(0, 10);
    },
    minDate() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 60);
      return date.toISOString().substr(0, 10);
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
      this.modalTitle = "Registrar Categoría";
      this.btnRegistroText = "Registrar Categoría";
      this.switchItemEstado = true;
      this.dialogRegistro = true;
    },
    // resetForm() {
    //   this.datosItem = {
    //     id:0,
    //     categoria:'',
    //     usuario_Creacion:'',
    //     fecha_Creacion:'2022-07-14',
    //     estados_Id:1
    //   };
    //   this.switchItemEstado = true;
    //   this.accion = 1;
    // },
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
    /// Obtener los items tipos proyecto
    async obtenerDdlTipoProyecto() {
      this.tiposproyecto = [];
      this.ddlCategoriasLoadign = true;
      this.$store
        .dispatch(OBTENER_TIPOS_PROYECTO, 1)
        .then((res) => {
          if (res.status === 200) {
            this.tiposproyecto = this.$store.state.tiposproyecto.tiposProyecto;
            //console.log(this.categorias);
          }
            this.ddlCategoriasLoadign = false;
        })
        .catch(() => {
          this.ddlCategoriasLoadign = false;
        });
    },
    /// Obtener los departamentos
    async obtenerDdlDepartamentos() {
      this.departamentos = [];
      this.ddlCategoriasLoadign = true;
      this.$store
        .dispatch(OBTENER_DEPARTAMENTOS, 1)
        .then((res) => {
          if (res.status === 200) {
            this.departamentos = this.$store.state.departamentos.departamentos;
            //console.log(this.categorias);
          }
            this.ddlCategoriasLoadign = false;
        })
        .catch(() => {
          this.ddlCategoriasLoadign = false;
        });
    },
    /// Obtener los municipios
    async obtenerDdlMunicipios() {
      this.municipios = [];
      this.dialogLoaderVisibleDeptos = true;
      this.$store
        .dispatch(
          OBTENER_MUNICIPIOS_BY_DEPTO,
          this.datosItemDireccion.departamentosId
        )
        .then((res) => {
          if (res.status === 200) {
            this.municipios = this.$store.state.municipios.municipios;
            //console.log(this.categorias);
          }
            this.dialogLoaderVisibleDeptos = false;
        })
        .catch(() => {
          this.dialogLoaderVisibleDeptos = false;
        });
    },
    /// Obtener las actividades productivas
    async obtenerDdlActividades() {
      this.actividades = [];
      this.dialogLoaderVisibleDeptos = true;
      this.$store
        .dispatch(OBTENER_ACTIVIDADES, 1)
        .then((res) => {
          if (res.status === 200) {
            this.actividades = this.$store.state.actividadesproductivas.actividades;
            //console.log(this.categorias);
          }
            this.dialogLoaderVisibleDeptos = false;
        })
        .catch(() => {
          this.dialogLoaderVisibleDeptos = false;
        });
    },
    /// Obtener los Sub actividades
    async obtenerDdlSubActividades() {
      this.subActividades = [];
      this.dialogLoaderVisibleSubActividades = true;
      this.$store
        .dispatch(
          OBTENER_SUBACTIVIDADES_BY_ACTIVIDAD,
          this.datosItem.actividadesProductivasId
        )
        .then((res) => {
          if (res.status === 200) {
            this.subActividades = this.$store.state.subactividades.subactividades;
            //console.log(this.categorias);
          }
            this.dialogLoaderVisibleSubActividades = false;
        })
        .catch(() => {
          this.dialogLoaderVisibleSubActividades = false;
        });
    },
    // Obtener los sectores
    async obtenerDdlSectores() {
      this.sectores = [];
      this.dialogLoaderVisibleDeptos = true;
      this.$store
        .dispatch(OBTENER_SECTORES, 1)
        .then((res) => {
          if (res.status === 200) {
            this.sectores = this.$store.state.sectores.sectores;
            //console.log(this.categorias);
          }
            this.dialogLoaderVisibleDeptos = false;
        })
        .catch(() => {
          this.dialogLoaderVisibleDeptos = false;
        });
    },
    // Obtener los Sub sectores
    async obtenerDdlSubSectores() {
      this.subSectores = [];
      this.dialogLoaderVisibleSubSector = true;
      this.$store
        .dispatch(OBTENER_SUBSECTORES_BY_SECTOR, this.datosItem.sectorId)
        .then((res) => {
          if (res.status === 200) {
            this.subSectores = this.$store.state.subsectores.subSectores;
            //console.log(this.categorias);
          }
            this.dialogLoaderVisibleSubSector = false;
        })
        .catch(() => {
          this.dialogLoaderVisibleSubSector = false;
        });
    },
    // Obtener los contactos por expediente
    async obtenerContactos() {
      this.contactos = [];
      this.tableLoadingContactos = true;
      this.$store
        .dispatch(OBTENER_CONTACTOS_BY_EXPEDIENTE, this.id_expediente)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.contactos = this.$store.state.contactos.contactos;
          }
            this.contactos.length > 0 ? this.validFormContactoPantalla = true : false;
            this.tableLoadingContactos = false;
          
        })
        .catch(() => {
          this.tableLoadingContactos = false;
        });
    },
    // Obtener los CONSULTORES
    async obtenerDdlConsultores() {
      this.consultores = [];
      this.dialogLoaderVisibleDeptos = true;
      this.$store
        .dispatch(OBTENER_CONSULTORES)
        .then((res) => {
          if (res.status === 200) {
            this.consultores = this.$store.state.consultores.consultores;
            //console.log(this.categorias);
            this.dialogLoaderVisibleDeptos = false;
          }
        })
        .catch(() => {
          this.dialogLoaderVisibleDeptos = false;
        });
    },
    //Registro de categorias
    registrarItem() {
      this.dialogLoaderVisible = true;
      
      //?Si accion es 2 se realiza la actualizacion

        this.$store
          .dispatch(ACTUALIZAR_EXPEDIENTE, this.datosItem)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              // if(this.e1 === 1){
              this.checkColor1 = "green";
              this.checkColor2 = "blue-grey lighten-4";
              //     this.e1 = 2;
              // }else if(this.e1 === 2){
              //     this.checkColor2 = 'green';
              //     this.checkColor3 = 'blue-grey lighten-4';
              this.e1 = 2;
              // }else if(this.e1 === 3){
              //     this.checkColor3 = 'green';
              //     this.checkColor4 = 'blue-grey lighten-4';
              //     this.e1 = 4;
              // }else if(this.e1 === 4){
              //     this.checkColor4 = 'green';
              //     this.checkColor5 = 'blue-grey lighten-4';
              //     this.e1 = 5;
              // }else if(this.e1 === 5){
              //     this.checkColor5 = 'green';
              //     this.e1 = 1;
              //     this.checkColor1 = 'blue-grey lighten-4';
              // }
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
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
      
      this.dialogLoaderVisible = false;
      this.btnRegistroLoading = false;
    },
    //Update de datos direccion
    updateDireccion() {
      this.dialogLoaderVisible = true;
      this.datosItemDireccion.id = this.id_expediente;

      this.$store
        .dispatch(ACTUALIZAR_DIRECCION_EXPEDIENTE, this.datosItemDireccion)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.checkColor2 = "green";
            this.checkColor3 = "blue-grey lighten-4";
            this.e1 = 3;
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
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

      this.dialogLoaderVisible = false;
      this.btnRegistroLoading = false;
    },
    //Update de datos tipo empresa
    updateTipoEmpresa() {
      this.tipoEmpresa_Id === 1
        ? (this.datosItemTipoEmpresa.tipo_Empresa = "Individual")
        : (this.datosItemTipoEmpresa.tipo_Empresa = "Sociedad");

      if (this.tipoEmpresa_Id === 1) {
        this.datosItemTipoEmpresa.dpi_Individual = this.dpiIndividual;
        this.datosItemTipoEmpresa.nombres_Individual = this.nombresIndividual;
        this.datosItemTipoEmpresa.apellidos_Individual = this.apellidosIndividual;
        this.datosItemTipoEmpresa.nit_Propietario = this.nitPropietario;

        delete this.datosItemTipoEmpresa.nombre_Comercial;
        delete this.datosItemTipoEmpresa.nit_Empresa;
        delete this.datosItemTipoEmpresa.razon_Social;
        delete this.datosItemTipoEmpresa.no_Escritura_Constitutiva;
        delete this.datosItemTipoEmpresa.fecha_Constitucion;
      } else {
        delete this.datosItemTipoEmpresa.dpi_Individual;
        delete this.datosItemTipoEmpresa.nombres_Individual;
        delete this.datosItemTipoEmpresa.apellidos_Individual;
        delete this.datosItemTipoEmpresa.nit_Propietario;

        this.datosItemTipoEmpresa.nombre_Comercial = this.nombreComercial;
        this.datosItemTipoEmpresa.nit_Empresa = this.nitEmpresa;
        this.datosItemTipoEmpresa.razon_Social = this.razonSocial;
        this.datosItemTipoEmpresa.no_Escritura_Constitutiva = this.noEscrituraConstitutiva;
        this.datosItemTipoEmpresa.fecha_Constitucion = this.fechaConstitucionSociedad;
      }

      this.dialogLoaderVisible = true;
      this.datosItemTipoEmpresa.id = this.id_expediente;
      console.log(this.datosItemTipoEmpresa);
      this.$store
        .dispatch(ACTUALIZAR_TIPOEMPRESA_EXPEDIENTE, this.datosItemTipoEmpresa)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.checkColor3 = "green";
            this.checkColor4 = "blue-grey lighten-4";
            this.e1 = 4;
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
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

      this.dialogLoaderVisible = false;
      this.btnRegistroLoading = false;
    },

    //!Obtener datos de un expediente especifico
    async obtenerDatosExpediente(Id) {
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";


      await this.$store
        .dispatch(OBTENER_EXPEDIENTE, Id)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.datosExpediente = this.$store.state.expedientes.expediente;
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

    //REQUISITOS Y TDR
    // Tipo: 1 REquisito, 2 TDR
    mostrarModalCargaDocumento(documento, tipo) {
      tipo === 1
        ? (this.dialogCargaDocTitle = "Cargar requisito")
        : (this.dialogCargaDocTitle = "Cargar tdr");
      this.documentoSeleccionado = documento;
      this.dialogCargaDocumento = true;
    },
        //Registro de contacto
    async registrarItemContacto() {
      this.validFormContactoPantalla = false;
      this.dialogLoaderVisible = true;
      this.btnRegistroContactoLoading = true;
      //this.datosContacto.expedienteId = this.id_expediente;
      this.datosContacto.expedienteId = this.id_expediente;
      this.switchItemEstadoContacto
        ? (this.datosContacto.estadosId = 1)
        : (this.datosContacto.estadosId = 2);


      if (this.accionContacto === 1) {
        await this.$store
          .dispatch(REGISTRAR_CONTACTO, this.datosContacto)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
                this.dialogRegistroContacto = false;
                this.resetFormContacto();
                this.obtenerContactos();
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
      //?Si accion es 2 se realiza la actualizacion
      else {
        await this.$store
          .dispatch(ACTUALIZAR_CONTACTO, this.datosContacto)
          .then((res) => {
            //console.log(res);
            if (res.status === 200) {
              this.$refs.snackalert.SnackbarShow(
                "success",
                "Mensaje",
                res.message
              );
              this.dialogRegistroContacto = false;
                this.resetFormContacto();
                this.obtenerContactos();
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
      this.dialogLoaderVisible = false;
      this.btnRegistroContactoLoading = false;
    },
    resetFormContacto() {
      this.datosContacto = {
        id:0,
        nombre:'',
        apellidos:'',
        direccion_Notificacion:'',
        email:'',
        numero_Telefono:'',
        usuario_Creacion:'admin',
        fecha_Creacion:"2022-07-14",
        estadosId:1,
        expedienteId:0
      },
      this.switchItemEstadoContacto = true;
      this.accionContacto = 1;
    },
    //!Obtener datos de un item especifico
    obtenerDatosItemContacto(Id) {
      this.datosContacto.id = Id;
      this.dialogLoaderVisible = true;
      this.btnRegistroContactoLoading = true;
      this.dialogLoaderText = "Obteniendo información...";
      //!Pre seleccionar el tab de datos de la empresa
      //this.activeTab = "empresa";
      this.$store
        .dispatch(OBTENER_CONTACTO, Id)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.datosContacto = this.$store.state.contactos.contacto;
            this.datosContacto.estadosId === 1
              ? (this.switchItemEstado = true)
              : (this.switchItemEstado = false);
            this.accionContacto = 2;
            this.dialogRegistroContacto = true;
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
        });
    
        this.dialogLoaderVisible = false;
        this.btnRegistroContactoLoading = false;
    },
  },
  created() {
    //this.obtenerItems();
    this.obtenerDdlTiposInstrumento();
    this.obtenerDdlCategorias();
    this.obtenerDdlTipoProyecto();
    this.obtenerDdlDepartamentos();
    this.obtenerDdlActividades();
    this.obtenerDdlSectores();
    this.obtenerDdlConsultores();
    this.cargarExpediente();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Expediente" },
      { title: "Ingreso de Expediente" },
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
          text: "Categoría",
          align: "start",
          sortable: true,
          value: "categoria",
        },
        {
          text: "Usuario Creación",
          align: "start",
          sortable: true,
          value: "usuario_Creacion",
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

    headersRequisitos() {
      {
        return [
          {
            text: "Documento",
            align: "start",
            sortable: false,
            value: "tipoDocumento",
          },
          {
            text: "Estado",
            align: "start",
            sortable: false,
            value: "estado",
          },
          {
            text: "Acciones",
            align: "start",
            sortable: true,
            value: "nombreMoneda",
          },
        ];
      }
    },

    headersTdrs() {
      {
        return [
          {
            text: "Documento",
            align: "start",
            sortable: false,
            value: "tipoDocumento",
          },
          {
            text: "Estado",
            align: "start",
            sortable: false,
            value: "estado",
          },
          {
            text: "Acciones",
            align: "start",
            sortable: true,
            value: "nombreMoneda",
          },
        ];
      }
    },
    headersContactos() {
      {
        return [
          {
            text: "Id",
            align: "start",
            sortable: false,
            value: "id",
          },
          {
            text: "Nombres",
            align: "start",
            sortable: false,
            value: "nombre",
          },
          {
            text: "Apellidos",
            align: "start",
            sortable: false,
            value: "apellidos",
          },
          {
            text: "Dirección Notificación",
            align: "start",
            sortable: false,
            value: "direccion_Notificacion",
          },
          {
            text: "Email",
            align: "start",
            sortable: false,
            value: "email",
          },
          {
            text: "Número Teléfono",
            align: "start",
            sortable: false,
            value: "numero_Telefono",
          },
          {
            text: "Estado",
            align: "start",
            sortable: false,
            value: "estado",
          },
          {
            text: "Acciones",
            align: "start",
            sortable: true,
            value: "nombreMoneda",
          },
        ];
      }
    },

    fechaConstitucion: {
      get: function() {
        return this.fechas.fechaConstitucion
          ? moment(this.fechas.fechaConstitucion).format("DD-MM-YYYY")
          : null;
      },
      set: function(val) {
        this.fechaConstitucionSociedad = moment(val, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
        //console.log(this.datosEmpresa.fecha_Nacimiento )
        return val;
      },
    },
  },
  watch: {
    //Cambiar el formato de fecha de nacimiento del objeto datosEmpresa al momento de que fechas.fechaNacimiento cambie
    "fechas.fechaConstitucion": function(val) {
      this.fechaConstitucionSociedad = val;
    },

    menuFechaConstitucion(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
