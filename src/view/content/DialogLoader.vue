<template>
  <v-dialog v-model="dialogVisible" persistent width="300">
    <v-card color="rgb(255, 255, 255, 0.9)" justify="center">
      <v-card-text class="text-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          justify="center"
          style="min-height: 120px;"
        ></v-progress-circular>
        <v-row>
          <v-col cols12 md12>
            {{ text }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogLoader",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
