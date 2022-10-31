<template>
  <div>
    <v-card :elevation="1" class="v-sheet theme--light br-0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Alimentos
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
          disable-pagination
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
          <!--template v-slot:top>
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
          </!--template-->

          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.alimento }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.energia_KcaL }}kcal</td>
              <td>{{ item.proteina_g }}g</td>
              <td>{{ item.grasaTotal_g }}g</td>
              <td>{{ item.carbohidratos_g }}g</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
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
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";
import { OBTENER_ALIMENTOS_BY_INGESTAS } from "@/core/services/store/dietas/ingestaalimentos.module";
import validations from "@/core/untils/validations.js";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "AdminAlientosIngesta",
  props: {
    ingesta: {},
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
        tiempoMinutos: "",
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
        tiempoMinutos: "",
      };
      this.switchItemEstado = true;
      this.accion = 1;
    },
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_ALIMENTOS_BY_INGESTAS, this.ingesta.id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.items = this.$store.state.ingestaalimentos.alimentosByIngestas;
          }
          this.tableLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // /// Obtener los items
    // async obtenerItemsEjercicios() {
    //   this.ejercicios = [];
    //   this.tableLoading = true;

    //   this.$store
    //     .dispatch(OBTENER_EJERCICIOS, 1)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.ejercicios = this.$store.state.ejercicios.ejercicios;
    //         //console.log(this.items);
    //       }
    //       this.tableLoading = false;
    //       //console.log(this.items);
    //       //console.log('sdkfdkd');
    //     })
    //     .catch(() => {
    //       this.tableLoading = false;
    //     });
    // },
    // //Registro de categorias
    // registrarItem() {
    //   this.dialogLoaderVisible = true;
    //   this.btnRegistroLoading = true;
    //   this.switchItemEstado
    //     ? (this.datosItem.estadosId = 1)
    //     : (this.datosItem.estadosId = 2);
    //   //?Si accion es 1 se realiza el registro
    //   if (this.accion === 1) {
    //     //console.log(this.datosItem);
    //     this.$store
    //       .dispatch(REGISTRAR_EJERCICIO_SERIE, this.datosItem)
    //       .then((res) => {
    //         console.log(res);
    //         //this.dialogLoaderVisible = false;
    //         if (res.status === 200) {
    //           this.$refs.snackalert.SnackbarShow(
    //             "success",
    //             "Mensaje",
    //             res.message
    //           );
    //           this.obtenerItems();
    //           this.dialogRegistro = false;
    //           this.resetForm();
    //         } else {
    //           this.$refs.snackalert.SnackbarShow(
    //             "warning",
    //             "Alerta",
    //             res.message
    //           );
    //         }
    //         this.dialogLoaderVisible = false;
    //         this.btnRegistroLoading = false;
    //       })
    //       .catch(() => {
    //         this.dialogLoaderVisible = false;
    //         this.btnRegistroLoading = false;
    //         this.$refs.snackalert.SnackbarShow(
    //           "warning",
    //           "Alerta",
    //           `Ha ocurrido un error durante el registro.`
    //         );
    //       });
    //   }
    //   //?Si accion es 2 se realiza la actualizacion
    //   else {
    //     //console.log(this.datosItem);
    //     this.$store
    //       .dispatch(ACTUALIZAR_EJERCICIO_SERIE, this.datosItem)
    //       .then((res) => {
    //         //console.log(res);
    //         this.dialogLoaderVisible = false;
    //         this.btnRegistroLoading = false;

    //         if (res.status === 200) {
    //           this.$refs.snackalert.SnackbarShow(
    //             "success",
    //             "Mensaje",
    //             res.message
    //           );
    //           this.dialogRegistro = false;
    //           this.obtenerItems();
    //           this.resetForm();
    //         } else {
    //           this.$refs.snackalert.SnackbarShow(
    //             "warning",
    //             "Alerta",
    //             res.message
    //           );
    //         }
    //       })
    //       .catch(() => {
    //         this.dialogLoaderVisible = false;
    //         this.btnRegistroLoading = false;
    //         this.$refs.snackalert.SnackbarShow(
    //           "warning",
    //           "Alerta",
    //           `Ha ocurrido un error durante el registro.`
    //         );
    //       });
    //   }
    // },

    // //!Obtener datos de un item especifico
    // obtenerDatosItem(Id) {
    //   this.datosItem.id = Id;
    //   this.dialogLoaderVisible = true;
    //   this.dialogLoaderText = "Obteniendo información...";
    //   this.modalTitle = `Actualizar ${this.itemName}`;
    //   this.btnRegistroText = `Actualizar ${this.itemName}`;
    //   //!Pre seleccionar el tab de datos de la empresa
    //   //this.activeTab = "empresa";
    //   this.$store
    //     .dispatch(OBTENER_EJERCICIO_SERIE, Id)
    //     .then((res) => {
    //       //console.log(res);
    //       if (res.status === 200) {
    //         this.datosItem = this.$store.state.seriesejercicios.ejercicioserie;
    //         this.datosItem.estadosId === 1
    //           ? (this.switchItemEstado = true)
    //           : (this.switchItemEstado = false);
    //         this.accion = 2;
    //         this.dialogRegistro = true;
    //       } else {
    //         this.$refs.snackalert.SnackbarShow(
    //           "warning",
    //           "Alerta",
    //           `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
    //         );
    //       }
    //       this.dialogLoaderVisible = false;
    //     })
    //     .catch(() => {
    //       this.$refs.snackalert.SnackbarShow(
    //         "warning",
    //         "Alerta",
    //         `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
    //       );
    //       this.dialogLoaderVisible = false;
    //     });
    // },
  },

  created() {
    this.obtenerItems();
    // this.obtenerItemsEjercicios();
  },
  mounted() {
  },

  computed: {
    headers() {
      return [
        {
          text: "Alimento",
          align: "start",
          sortable: true,
          value: "alimentos",
          filter: this.filtroEjercicio,
        },
        {
          text: "Cantidad",
          align: "start",
          sortable: false,
          value: "cantidad",
        },
        {
          text: "Kilocalorias",
          align: "start",
          sortable: true,
          value: "energia_KcaL",
        },
        {
          text: "Proteínas",
          align: "start",
          sortable: true,
          value: "proteina_g",
        },
        {
          text: "Grasas",
          align: "start",
          sortable: true,
          value: "grasaTotal_g",
        },
        {
          text: "Carbohidratos",
          align: "start",
          sortable: true,
          value: "carbohidratos_g",
        },
      ];
    },
  },
};
</script>
