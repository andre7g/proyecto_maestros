<template>
  <!--begin::Advance Table Widget 9-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"
          >Clasificación</span
        >
        <!--span class="text-muted mt-3 font-weight-bold font-size-sm"
          >More than 400+ new members</!--span
        -->
      </h3>
      <!--div class="card-toolbar">
        <a class="btn btn-info font-weight-bolder font-size-sm mr-3"
          >New Arrivals</a
        >
        <a class="btn btn-danger font-weight-bolder font-size-sm">Create</a>
      </!--div-->
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-0 pb-3">
      <div class="tab-content">
        <!--begin::Table-->
        <div class="table-responsive">
          <v-data-table
            class="elevation-0"
            :headers="headers"
            :items="rating"
            :loading="tableLoading"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'mdi-page-first',
              lastIcon: 'mdi-page-last',
              prevIcon: 'mdi-chevron-left',
              nextIcon: 'mdi-chevron-right',
              'items-per-page-text': 'Registros por página',
              pageText: '{0}-{1} de {2}',
            }"
            disable-pagination
            hide-default-footer
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  <span
                    :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >
                    {{ item.codigo }}
                  </span>
                </td>
                <td>
                  <span
                    :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                  >
                    {{ item.nombre }}
                  </span>
                </td>
                <td>
                  <span
                    :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                    >{{ item.peso }} lbs</span
                  >
                </td>
                <td>
                  <span
                    :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                    >{{ item.altura }} cmts</span
                  >
                </td>
                <td>
                  <span
                    :class="item.estadosId === 1 ? 'black--text' : 'grey--text'"
                    >{{ item.imc }}</span
                  >
                </td>
                <td>
                  <v-rating
                    class="float-left"
                    :value="item.sumatoria_rating / item.cantidad_rating"
                    color="amber"
                    background-color="amber"
                    readonly
                    size="15"
                  ></v-rating>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
        <!--end::Table-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Advance Table Widget 9-->
</template>

<script>
import { OBTENER_RATING_DASHBOARD } from "@/core/services/store/dashboard/dashboard.module";
export default {
  name: "widget-3",
  data() {
    return {
      tableLoading: false,
      rating: [],
    };
  },
  mounted() {
    this.obtenerDatosItem();
  },
  methods: {
    //!Obtener datos rating
    obtenerDatosItem() {
      this.$store
        .dispatch(OBTENER_RATING_DASHBOARD)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.rating = this.$store.state.dashboard.rating;
            //console.log(this.rating);
          } else {
            console.log("algo fallo");
            // this.$refs.snackalert.SnackbarShow(
            //   "warning",
            //   "Alerta",
            //   `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
            // );
          }
          //this.dialogLoaderVisible = false;
        })
        .catch(() => {
          console.log("algo fallo");
          // this.$refs.snackalert.SnackbarShow(
          //   "warning",
          //   "Alerta",
          //   `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
          // );
          //this.dialogLoaderVisible = false;
        });
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Código",
          align: "start",
          value: "codigo",
        },
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        {
          text: "Peso",
          align: "start",
          value: "peso",
        },
        {
          text: "Altura",
          align: "start",
          value: "altura",
        },
        {
          text: "IMC",
          align: "start",
          value: "imc",
        },
        {
          text: "Calificación",
          align: "start",
          value: "rating",
        },
      ];
    },
  },
};
</script>
