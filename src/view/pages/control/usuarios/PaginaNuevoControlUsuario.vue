<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <v-row class="col-md-12">
          <v-col cols="12" sm="12" md="6">
            Control de
            {{ `${datosUsuario.nombres}  ${datosUsuario.apellidos}` }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pl-0 pr-0">
        <v-form
          ref="form"
          v-on:submit.prevent="registrarItem"
          v-model="validForm"
        >
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                readonly
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.imc"
                label="IMC"
                :rules="[decimalRules('IMC'), maxLengthForm6('IMC')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                readonly
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.caloriasConsumir"
                label="Calorias Diarias a Consumir"
                :rules="[
                  decimalRules('Calorias Consumir'),
                  maxLengthForm7('Calorias Consumir'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <h4 v-if="datosItem.imc !== 0">{{ imc_mensaje }}</h4>
            </v-col>
          </v-row>
          <v-row class="col-md-12 m-0 p-0">
            <v-divider></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.peso"
                label="Peso en Libras"
                :rules="[
                  decimalRules('Peso en Libras'),
                  maxLengthForm6('Peso en Libras'),
                ]"
                @keyup="calcularIMC"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.altura"
                label="Altura en centimetros"
                :rules="[
                  decimalRules('Altura en centimetros'),
                  maxLengthForm6('Altura en centimetros'),
                ]"
                @keyup="calcularIMC"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-autocomplete
                v-model="factorActividad"
                :items="factores"
                dense
                filled
                label="Actividad Física"
                item-text="text"
                item-value="factor"
                @change="calcularCaloriasConsumir"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.espalda"
                label="Espalda en centimetros"
                :rules="[
                  decimalRules('Espalda en centimetros'),
                  maxLengthForm6('Espalda en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.pecho"
                label="Pecho en centimetros"
                :rules="[
                  decimalRules('Pecho en centimetros'),
                  maxLengthForm6('Pecho en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.brazo"
                label="Brazo en centimetros"
                :rules="[
                  decimalRules('Brazo en centimetros'),
                  maxLengthForm6('Brazo en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.antebrazo"
                label="Antebrazo en centimetros"
                :rules="[
                  decimalRules('Antebrazo en centimetros'),
                  maxLengthForm6('Antebrazo en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.abdomen"
                label="Abdomen en centimetros"
                :rules="[
                  decimalRules('Abdomen en centimetros'),
                  maxLengthForm6('Abdomen en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.cintura"
                label="Cintura en centimetros"
                :rules="[
                  decimalRules('Cintura en centimetros'),
                  maxLengthForm6('Cintura en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.cadera"
                label="Cadera en centimetros"
                :rules="[
                  decimalRules('Cadera en centimetros'),
                  maxLengthForm6('Cadera en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.pierna"
                label="Pierna en centimetros"
                :rules="[
                  decimalRules('Pierna en centimetros'),
                  maxLengthForm6('Pierna en centimetros'),
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                class="required"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.pantorrilla"
                label="Pantorrilla en centimetros"
                :rules="[
                  decimalRules('Pantorrilla en centimetros'),
                  maxLengthForm6('Pantorrilla en centimetros'),
                ]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6" sm="12" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.enfermedad"
                label="Enfermedad"
                :rules="[maxLengthForm200('Enfermedad')]"
                maxLength="200"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.medicamentos"
                label="Medicamentos"
                :rules="[maxLengthForm200('Medicamentos')]"
                maxLength="200"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.lesiones"
                label="Lesiones"
                :rules="[maxLengthForm200('Lesiones')]"
                maxLength="200"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" xs="12" class="pt-4 pb-0">
              <v-text-field
                autocomplete="off"
                dense
                filled
                color="teal lighten-1"
                v-model="datosItem.observaciones"
                label="Observaciones"
                :rules="[maxLengthForm200('Observaciones')]"
                maxLength="200"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="4" xs="3"
              ><h5>Agregar una calificación</h5></v-col
            >
            <v-col cols="12" lg="4" md="4" sm="4" xs="9">
              <v-rating
                class="mb-5 ml-10"
                v-model="datosItem.rating"
                background-color="orange lighten-3"
                color="amber"
                large
              ></v-rating>
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
    </v-card>
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

import { OBTENER_USUARIO } from "@/core/services/store/usuarios/usuarios.module";
import { REGISTAR_HISTORIAL_BY_USUARIO } from "@/core/services/store/control/historialusuarios.module";
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
      validForm: false,
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      btnRegistroText: "Guardar",
      btnRegistroLoading: false,
      factores: [
        { factor: 1.2, text: "Sedentario" },
        {
          factor: 1.375,
          text: "Poca Actividad Física (ejercicio de 1 a 3 veces por semana)",
        },
        {
          factor: 1.55,
          text: "Actividad Moderada (ejercicio de 3 a 5 veces por semana)",
        },
        {
          factor: 1.725,
          text: "Actividad Intensa (ejercicio de 6 a 7 veces por semana)",
        },
        {
          factor: 1.9,
          text: "Atleta Profesional (entrenamientos de más de 4 horas diarias)",
        },
      ],
      datosItem: {
        id: 0,
        fecha:'2022-10-01',
        peso: 0,
        altura: 0,
        imc: 0,
        espalda: 0,
        pecho: 0,
        brazo: 0,
        antebrazo: 0,
        abdomen: 0,
        cintura: 0,
        cadera: 0,
        pierna: 0,
        pantorrilla: 0,
        grasaCorporal: 0,
        caloriasConsumir: 0,
        enfermedad: "",
        medicamentos: "",
        lesiones: "",
        observaciones: "",
        usuariosId: 0,
        estadosId: 1,
        rating:1
      },
      ...validations,
      datosUsuario: {},
      codigo: 0,
      rating: 1,
      imc_mensaje: "",
      factorActividad: 0,
      edad: 0,
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
  },
  methods: {
    //Registro de categorias
    registrarItem() {
      if (this.datosItem.imc === 0) {
        this.$refs.snackalert.SnackbarShow(
          "warning",
          "Alerta",
          "Ingresa Peso en libras y Altura en centimetros para calcular el IMC."
        );
        return;
      }

      if (this.datosItem.caloriasConsumir === 0) {
        this.$refs.snackalert.SnackbarShow(
          "warning",
          "Alerta",
          "Ingresa Peso en libras, Altura en centimetros y selecciona la actividad fisica para calcular las calorias diarias a consumir."
        );
        return;
      }

      this.btnRegistroLoading = true;
      this.dialogLoaderVisible = true;
      this.datosItem.usuariosId = this.datosUsuario.id;
      this.$store
        .dispatch(REGISTAR_HISTORIAL_BY_USUARIO, this.datosItem)
        .then((res) => {
            console.log(res);
          if (res.status === 200) {
            this.$refs.snackalert.SnackbarShow(
              "success",
              "Mensaje",
              res.message
            );
            this.$router.push({
              name: "control-usuarios",
            });
          } else {
            this.$refs.snackalert.SnackbarShow(
              "warning",
              "Alerta",
              res.message
            );
          }
          this.btnRegistroLoading = false;
          this.dialogLoaderVisible = false;
        })
        .catch(() => {
          this.btnRegistroLoading = false;
          this.dialogLoaderVisible = false;
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Alerta",
            `Ha ocurrido un error durante el registro.`
          );
        });
    },
    //!Obtener datos de un item especifico
    obtenerDatosItem() {
      this.dialogLoaderVisible = true;
      this.dialogLoaderText = "Obteniendo información...";
      //!Pre seleccionar el tab de datos de la empresa
      //this.activeTab = "empresa";
      this.$store
        .dispatch(OBTENER_USUARIO, this.codigo)
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
        .then(() => {
          this.getEdad();
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
    calcularIMC() {
      this.dialogLoaderVisible = true;
      let imc = 0;
      let peso = 0;
      let altura = 0;

      if (this.datosItem.peso) {
        peso = (this.datosItem.peso * 0.453592).toFixed(2); //kilogramos
      }
      if (this.datosItem.altura) {
        altura = (this.datosItem.altura * 0.01).toFixed(2); //metros
      }

      imc = (peso / (altura * altura)).toFixed(1);

      if (imc >= 1 && imc <= 9999) {
        this.datosItem.imc = imc;

        if (imc < 18.5) {
          this.imc_mensaje = "Bajo Peso";
        } else if (imc >= 18.5 && imc < 24.9) {
          this.imc_mensaje = "Peso Normal";
        } else if (imc >= 25 && imc < 29.9) {
          this.imc_mensaje = "Pre-obesidad o Sobrepeso";
        } else if (imc >= 30 && imc < 34.9) {
          this.imc_mensaje = "Obesidad clase I";
        } else if (imc >= 35 && imc < 39.9) {
          this.imc_mensaje = "Obesidad clase II";
        } else if (imc >= 40) {
          this.imc_mensaje = "Obesidad clase III";
        }
        if (this.factorActividad !== 0) {
          this.calcularCaloriasConsumir();
        }
      }
      this.dialogLoaderVisible = false;
      return true;
    },
    calcularCaloriasConsumir() {
      this.dialogLoaderVisible = true;

      let calorias = 0;
      let peso = 0;
      let altura = 0;

      if (this.datosItem.peso) {
        peso = (this.datosItem.peso * 0.453592).toFixed(2); //kilogramos
      }

      if (this.datosItem.altura) {
        altura = this.datosItem.altura; //centimetros
      }

      if (this.datosUsuario.genero === "M") {
        //hombres
        calorias = (
          66 +
          13.7 * peso +
          (5 * altura - 6.8 * this.edad) * this.factorActividad
        ).toFixed(2);
      } //mujeres
      else {
        calorias = (
          655 +
          9.6 * peso +
          (1.8 * altura - 4.7 * this.edad) * this.factorActividad
        ).toFixed(2);
      }
      if (calorias >= 1 && calorias <= 9999) {
        this.datosItem.caloriasConsumir = calorias;
      }
      this.dialogLoaderVisible = false;
      return true;
    },
    getEdad() {
      var hoy = new Date();
      var cumpleanos = new Date(this.datosUsuario.fecha_Nacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      this.edad = edad;
    },
  },

  created() {
    this.parametros = this.$route.params;
    if (this.parametros.id) {
      this.codigo = this.parametros.id;
      this.obtenerDatosItem();
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "dashboard" },
      { title: "Control" },
      { title: "Usuario" },
    ]);
  },

  computed: {},
};
</script>
