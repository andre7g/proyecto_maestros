<template>
  <div>
    <v-col cols="12" md="6" sm="12" class="pt-0 pb-0">
      <v-menu
        ref="menu1"
        v-model="menuFechaOpinion"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
        :nudge-right="40"
        full-width
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            dense
            filled
            autocomplete="off"
            prepend-inner-icon="event"
            :rules="[required('Fecha de opinión técnica')]"
            v-model="fechaOpinionTecnica"
            label="Fecha de solicitud de la opinión técnica"
            readonly
            v-bind="attrs"
            v-on="on"
            hint="DD-MM-YYYY"
            class=""
            clearable
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="fechas.fechaOpinion"
          @change="menuFechaOpinion = false"
          :active-picker.sync="activePicker"
          locale="es"
          :max="maxDate()"
        ></v-date-picker>
        <!--:max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"-->
      </v-menu>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fechas: {
        fechaOpinion: ""
      },
      activePicker: null,
      menuFechaOpinion: false
    };
  }
};
</script>
