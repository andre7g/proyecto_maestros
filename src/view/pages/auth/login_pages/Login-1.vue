<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': this.state == 'signin',
        'login-signup-on': this.state == 'signup',
        'login-forgot-on': this.state == 'forgot',
      }"
      id="kt_login"
    >
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #00173C;"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-20 pt-5 pb-0">
          <p
            class="font-weight-bold text-justify font-size-h1 font-size-h2-lg ml-8 mr-8 text-md-center"
            style="color: #00A88C;"
          >
            MARCELLO´S GYM
          </p>
        </div>
        <!--div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div-->
        <div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </div>
      <!--begin::Aside-->
      <!--begin::Content-->
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-0 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <!--begin::Signin-->
          <div class="login-form login-signin">
            <a href="#" class="text-center mb-10">
              <img
                src="media/logos/logo-rgm.png"
                class="max-h-70px mb-4"
                alt=""
              />
            </a>

            <v-form
              v-on:submit.prevent="login"
              v-model="validForm"
              id="kt_login_signin_form"
              ref="kt_login_signin_form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Bienvenido
                </h3>
                <span class="text-muted font-weight-bold font-size-h4 d-none"
                  >New Here?
                  <a
                    id="kt_login_signup"
                    class="text-primary font-weight-bolder"
                    @click="showForm('signup')"
                    >Create an Account</a
                  ></span
                >
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >Código de Usuario</label
                >
                <div
                  id="example-input-group-1"
                  label=""
                  label-for="example-input-1"
                >
                  <v-text-field
                    outlined
                    class=""
                    type="text"
                    name="email"
                    ref="email"
                    maxlength="150"
                    v-model="form.codigo"
                    v-mask="'#####'"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex justify-content-between mt-n5">
                  <label class="font-size-h6 font-weight-bolder text-dark pt-5"
                    >Contraseña</label
                  >
                  <a
                    class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                    id="kt_login_forgot"
                    @click="showForm('forgot')"
                    >¿Olvidaste tu contraseña?</a
                  >
                </div>
                <div
                  id="example-input-group-2"
                  label=""
                  label-for="example-input-2"
                >
                  <!--form-control form-control-solid h-auto py-7 px-6 rounded-lg-->
                  <v-text-field
                    outlined
                    class=""
                    type="password"
                    name="password"
                    ref="password"
                    v-model="form.pass"
                    autocomplete="off"
                    maxlength="50"
                  />
                </div>
              </div>
              <div class="pb-lg-0 pb-5">
                <button
                  ref="kt_login_signin_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                  :disabled="!validForm"
                >
                  Iniciar Sesión
                </button>
              </div>
            </v-form>
          </div>
          <!--end::Signin-->
          <!--begin::Signup-->
          <div class="login-form login-signup">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signup_form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Sign Up
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  Enter your details to create your account
                </p>
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  ref="fullname"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref="remail"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref="rpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Confirm password"
                  name="cpassword"
                  ref="cpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="checkbox mb-0">
                  <input type="checkbox" name="agree" />
                  <span class="mr-2"></span>
                  I Agree the
                  <a href="#" class="ml-2">terms and conditions</a>.
                </label>
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  ref="kt_login_signup_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  style="width:150px;"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_signup_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <!--end::Signup-->
          <!--begin::Forgot-->
          <div class="login-form login-forgot">
            <!--begin::Form-->
            <v-form
              v-on:submit.prevent="resetPassEmail"
              v-model="validFormReset"
              id="kt_login_forgot_form"
              ref="kt_login_forgot_form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  ¿Olvidaste tu contraseña?
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  Ingresa tu correo electrónico para restablecer tu contraseña
                </p>
              </div>
              <div class="form-group">
                <v-text-field
                  outlined
                  class="gray-bg"
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  autocomplete="off"
                  v-model="datosPass.correo"
                  :rules="[
                    required('Correo Electrónico'),
                    validEmail('Correo Electrónico'),
                  ]"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0">
                <button
                  id="kt_login_forgot_submit"
                  ref="kt_login_forgot_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  :disabled="!validFormReset"
                  type="submit"
                >
                  Restablecer contrase&ntilde;a
                </button>
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                  :disabled="cancelResetDisabled"
                >
                  Cancelar
                </button>
              </div>
            </v-form>
          </div>
          <!--end::Forgot-->
        </div>
        <!--begin::Content footer-->
        <!--div
          class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0 s-none"
        >
          <a href="#" class="text-primary font-weight-bolder font-size-h5"
            >Términos de uso</a
          >
          <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
            >Contacto</a
          >
        </div-->
        <!--end::Content footer-->
      </div>
      <!--end::Content-->
    </div>
<!--Inicio:: Snack alert-->
<SnackAlert ref="snackalert"></SnackAlert>
<!-- Fin:: Snack alert-->
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import KTUtil from "@/assets/js/components/util";
import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";
import validations from "@/core/untils/validations.js";
import SnackAlert from "@/view/content/alerts/SnackAlert.vue";
export default {
  name: "login-1",
  data() {
    return {
      state: "signin",
      // Remove this dummy login info
      form: {
        codigo: "", //admin@demo.com
        pass: "", //demo
      },
      validForm: false,
      validFormReset: false,
      cancelResetDisabled: false,
      datosResetPass: {
        correoElectronico: "",
      },
      datosPass: {
        user_Id: 0,
        correo: "",
      },
      ...validations,
    };
  },
  components: {
    SnackAlert,
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
    ...mapGetters(["currentUser"]),

    backgroundImage() {
      return (
        //process.env.BASE_URL + "media/svg/illustrations/login-visual-1.svg"
        process.env.BASE_URL + "media/img/free-vector.jpg"
      );
    },
  },
  mounted() {},
  methods: {
    showForm(form) {
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
    },

    async login() {
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signin_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");
      //delete this.form.usuarioCreacion;

      await this.$store
        .dispatch(LOGIN, this.form)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.token) {
            this.$router.push({ name: "dashboard" });
          } else {
            if (res.message) {
              this.$refs.snackalert.SnackbarShow(
                "warning",
                "Error",
                res.message
              );
            } else {
              this.$refs.snackalert.SnackbarShow(
                "warning",
                "Error",
                res.message
              );
            }
          }
          submitButton.classList.remove(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
        })
        .catch(() => {
          this.$refs.snackalert.SnackbarShow(
            "warning",
            "Mensaje",
            "Ha ocurrido un error, por favor, ponte en contacto con el administrador del sistema."
          );
          submitButton.classList.remove(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
          this.form.pass = "";
        });
    },
  },
};
</script>
