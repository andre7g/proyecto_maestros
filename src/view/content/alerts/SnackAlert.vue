<template>
  <div>
    <v-snackbar
      style="z-index: 9999999;"
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :top="snackbar.position === 'top'"
      right
      transition="dialog-top-transition"
    >
      <v-layout align-center pr-4 pb-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong class="text-h6">{{ snackbar.title }}</strong>
            <v-btn class="float-right" icon @click="snackbar.visible = false">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
          <div class="text-subtitle-1">{{ snackbar.text }}</div>
          <!--<v-btn text @click="snackbar.visible = false"> <--v-if="snackbar.timeout === 0"  
            <v-icon></v-icon>
            Cerrar
        </v-btn>-->
        </v-layout>
      </v-layout>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  data() {
    return {
      snackbar: {
        color: null,
        icon: null,
        mode: null,
        position: "top",
        text: null,
        timeout: 7500,
        title: null,
        visible: false
      },
      timeout: 7500
    };
  },
  methods: {
    SnackbarShow(type, title, text) {
      if (!type) return;
      switch (type) {
        case "error":
          this.snackbar = {
            color: "error",
            icon: "error",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: title,
            text: text,
            visible: true
          };
          break;
        case "info":
          this.snackbar = {
            color: "info",
            icon: "info",
            mode: "multi-line",
            position: "top",
            timeout: 0,
            title: title,
            text: text,
            visible: true
          };
          break;
        case "success":
          this.snackbar = {
            color: "success",
            icon: "check_circle",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: title,
            text: text,
            visible: true
          };
          break;
        case "warning":
          this.snackbar = {
            color: "warning",
            icon: "warning",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: title,
            text: text,
            visible: true
          };
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.v-application {
  .warning {
    background-color: #fb8c00 !important;
    border-color: #fb8c00 !important;
  }
}

.v-snack__wrapper{
  border-radius: 4px !important;
}
</style>
