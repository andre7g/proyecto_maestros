<template>
  <div>
    <v-row>
      <v-col md="12" sm="12" xs="12">
        <template>
          <div class="text-center">
            <v-chip class="ma-2" color="teal" label text-color="white">
              <v-icon left>
                far fa-calendar-alt
              </v-icon>
              {{ datosCard.fecha }}
            </v-chip>
          </div>
        </template>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" md="12" sm="12" xs="12">
        <template>
          <div class="text-center">
            <h2>{{ datosCard.imcmensaje }}</h2>
          </div>
        </template>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" md="12" sm="12" xs="12">
        <template>
          <div class="text-center mt-0">
            <h4>
              Consumir {{ datosControl.caloriasConsumir }} calorías diarias
            </h4>
          </div>
        </template>
      </v-col>
    </v-row>
    <v-row class="m-0">
      <v-col md="12" sm="12" xs="12">
        <template>
          <div class="text-center">
            <v-rating
              :value="datosControl.rating"
              color="amber"
              background-color="amber"
              readonly
              size="30"
            ></v-rating>
          </div>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >IMC</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1">{{
              datosControl.imc
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Peso</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.peso }} lb</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Altura</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.altura }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Espalda</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.espalda }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Pecho</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.pecho }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Brazo</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.brazo }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Antebrazo</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.antebrazo }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Abdomen</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.abdomen }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Cintura</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.cintura }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Cadera</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.cadera }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Pierna</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.pierna }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="3" sm="4" xs="12" class="pt-1 pb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Pantorrilla</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1"
              >{{ datosControl.pantorrilla }} cm</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
        class="pt-1 pb-1"
        v-if="datosControl.enfermedad !== ''"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Enfermedad</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1">{{
              datosControl.enfermedad
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
        class="pt-1 pb-1"
        v-if="datosControl.medicamentos !== ''"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Medicamentos</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1">{{
              datosControl.medicamentos
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
        class="pt-1 pb-1"
        v-if="datosControl.lesiones !== ''"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Lesiones</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1">{{
              datosControl.lesiones
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
        class="pt-1 pb-1"
        v-if="datosControl.observaciones !== ''"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-uppercase"
              >Observaciones</v-list-item-title
            >
            <v-list-item-subtitle class="text-subtitle-1">{{
              datosControl.observaciones
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});
export default {
  props: {
    datosControl: {},
    datosCard: {},
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  mounted() {},
  computed: {},
};
</script>
<style lang=""></style>
