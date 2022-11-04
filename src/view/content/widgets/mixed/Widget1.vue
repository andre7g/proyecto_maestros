<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-custom bg-gray-100 card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 bg-success py-5">
      <h3 class="card-title font-weight-bolder text-white">
        Gimansio Marcello´s Gym
      </h3>
      <!--div class="card-toolbar">
        <Dropdown1></Dropdown1>
      </!--div-->
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0 position-relative overflow-hidden">
      <!--begin::Chart-->
      <apexchart
        class="card-rounded-bottom bg-success"
        :options="chartOptions"
        :series="series"
        type="area"
      ></apexchart>
      <!--end::Chart-->
      <!--begin::Stats-->
      <div class="card-spacer mt-n25">
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
            <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
              <inline-svg src="media/svg/icons/Communication/Add-user.svg" />
            </span>
            <a href="#" class="text-warning font-weight-bold font-size-h6">
              Usuarios: {{rating.cont_usuarios}}
            </a>
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-xl mb-7">
            <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
              <inline-svg src="media/svg/icons/Home/Home-heart.svg" />
            </span>
            <a href="#" class="text-primary font-weight-bold font-size-h6 mt-2">
            
              Rutinas de Ejercicios: {{rating.cont_rutinas}} 
            </a>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-danger px-6 py-8 rounded-xl mr-7">
            <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
              <inline-svg src="media/svg/icons/Navigation/Close.svg" />
            </span>
            <a href="#" class="text-danger font-weight-bold font-size-h6 mt-2">
              Pendientes de pago: 0
            </a>
          </div>
          <div class="col bg-light-success px-6 py-8 rounded-xl">
            <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
              <inline-svg src="media/svg/icons/Food/Miso-Soup.svg" />
            </span>
            <a href="#" class="text-success font-weight-bold font-size-h6 mt-2">
              Dietas: {{rating.cont_dietas}} 
            </a>
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script>
//import Dropdown1 from "@/view/content/dropdown/Dropdown1.vue";
import { mapGetters } from "vuex"; 
import { OBTENER_CONTADORES_DASHBOARD } from "@/core/services/store/dashboard/dashboard.module";
export default {
  name: "widget-1",
  components: {
    //Dropdown1
  },
  data() {
    return {
      strokeColor: "#C6E2CF",
      chartOptions: {},
      series: [
        {
          name: "",
          data: [20, 25, 40, 30, 35, 40, 50,48]
        }
      ],
      rating:[]
    };
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  },
  methods: {
  //!Obtener datos rating
    obtenerDatosItem() {
      this.$store
        .dispatch(OBTENER_CONTADORES_DASHBOARD)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            this.rating = this.$store.state.dashboard.contadores;
            console.log(this.rating);
          } else {
            console.log('algo fallo');
            // this.$refs.snackalert.SnackbarShow(
            //   "warning",
            //   "Alerta",
            //   `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
            // );
          }
          //this.dialogLoaderVisible = false;
        })
        .catch(() => {
          console.log('algo fallo');
          // this.$refs.snackalert.SnackbarShow(
          //   "warning",
          //   "Alerta",
          //   `Ha ocurrido un error inesperado, por favor, póngase en contacto con el administrador del sistema.`
          // );
          //this.dialogLoaderVisible = false;
        });
    },
  },
  mounted() {
    this.obtenerDatosItem();
    // reference; kt_mixed_widget_1_chart
    this.chartOptions = {
      chart: {
        type: "area",
        height: 200,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: this.strokeColor,
          opacity: 0.5
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "solid",
        opacity: 0
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.strokeColor]
      },
      xaxis: {
        categories: ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.layoutConfig("colors.gray.gray-300"),
            width: 1,
            dashArray: 3
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 80,
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0
          }
        },
        hover: {
          filter: {
            type: "none",
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.layoutConfig("font-family")
        },
        y: {
          formatter: function(val) {
            return val + " Clientes";
          }
        },
        marker: {
          show: false
        }
      },
      colors: ["transparent"],
      markers: {
        colors: [this.layoutConfig("colors.theme.light.danger")],
        strokeColor: [this.strokeColor],
        strokeWidth: 3
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      }
    };
  }
};
</script>
