<template>
  <div>
    <v-row>
      <v-col
        lg="4"
        md="6"
        sm="6"
        xs="12"
        class="mt-4"
        v-for="usuario in items"
        :key="usuario.codigo"
      >
        <CardUsuario :usuario="usuario" />
      </v-col>
    </v-row>
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
import CardUsuario from "@/view/components/control/CardUsuario.vue";

import { OBTENER_USUARIOS } from "@/core/services/store/usuarios/usuarios.module";

import moment from "moment";

moment.locale("es");
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

export default {
  name: "ControlUsuarios",
  data() {
    return {
      itemName: "Usuario",
      dialogLoaderVisible: false,
      dialogLoaderText: "",
      items: [],
      search: "",
    };
  },
  components: {
    DialogLoader,
    SnackAlert,
    CardUsuario,
  },
  methods: {
    /// Obtener los items
    async obtenerItems() {
      this.items = [];
      this.tableLoading = true;

      this.$store
        .dispatch(OBTENER_USUARIOS, 1)
        .then((res) => {
          if (res.status === 200) {
            this.items = this.$store.state.usuarios.usuarios;
            console.log(this.items);
          }
          this.tableLoading = false;
          //console.log(this.items);
          //console.log('sdkfdkd');
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
  },

  created() {
    this.obtenerItems();
  },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Inicio", route: "/dashboard" },
      { title: "Control" },
      { title: "Usuarios" },
    ]);
  },

  computed: {},
};
</script>
