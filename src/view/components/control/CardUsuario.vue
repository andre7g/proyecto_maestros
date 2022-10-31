<template lang="">
  <div>
    <v-card :loading="loading" elevation="3" max-width="400">
      <template slot="progress">
        <v-progress-linear
          color="teal"
          height="20"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="100"
        src="../../../assets/img/user.png"
        v-if="usuario.genero === 'M'"
      ></v-img>
      <v-img
        height="100"
        src="../../../assets/img/userF.png"
        v-if="usuario.genero === 'F'"
      ></v-img>

      <v-card-title>
        <v-chip
          :color="
            usuario.genero === 'M' ? 'light-blue darken-4' : 'pink lighten-4'
          "
          :text-color="usuario.genero === 'M' ? 'light-blue lighten-4' : 'pink'"
        >
          <v-avatar>
            <v-icon> fas fa-user icon-1x</v-icon>
          </v-avatar>
          {{ usuario.nombre }}
        </v-chip>
      </v-card-title>
      <v-divider class="m-0"></v-divider>
      <v-card-text>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="float-end">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader>Acciones</v-subheader>
            <v-list-item-group color="primary">
              <router-link
                :to="{
                  name: 'control-usuario',
                  params: { id: usuario.id },
                }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <v-list-item key="1">
                    <v-list-item-icon>
                      <v-icon>fa-weight</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>Nuevo Control </v-list-item-content>
                  </v-list-item>
                </a>
              </router-link>
              <router-link
                :to="{
                  name: 'historial-usuario',
                  params: { id: usuario.id },
                }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <v-list-item key="2">
                    <v-list-item-icon>
                      <v-icon>fas fa-history</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content> Historial </v-list-item-content>
                  </v-list-item>
                </a>
              </router-link>
              <router-link
                :to="{
                  name: 'agregar',
                  params: { id: usuario.id },
                }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <v-list-item key="3">
                    <v-list-item-icon>
                      <v-icon>fas fa-dumbbell</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content> Agregar Rutinas</v-list-item-content>
                  </v-list-item>
                </a>
              </router-link>
              <router-link
                :to="{
                  name: 'agregar-dieta',
                  params: { id: usuario.id },
                }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <v-list-item key="4">
                    <v-list-item-icon>
                      <v-icon>fas fa-apple-alt</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content> Agregar Dietas</v-list-item-content>
                  </v-list-item>
                </a>
              </router-link>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-row class="mx-0">
          <v-rating
            class="float-left"
            :value="(usuario.sumatoria_rating / usuario.cantidad_rating)"
            color="amber"
            background-color="amber"
            readonly
            size="20"
          ></v-rating>

          <!--div class="grey--text ms-4">
            4.5 (413)
          </div-->
        </v-row>
        <div class="mt-2 text-subtitle-1">
          <span><strong>Codigo:</strong> {{ usuario.codigo }}</span>
        </div>
        <div class="mt-0 text-subtitle-1">
          <span><strong>Peso:</strong> {{usuario.peso}}lbs</span>
        </div>
        <div class="mt-0 text-subtitle-1">
          <span><strong>Calorías a Consumir:</strong> {{usuario.calorias}}kcal</span>
        </div>
      </v-card-text>

      <v-divider class="m-0"></v-divider>

      <!--v-card-title>Tonight's availability</!--v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>
-->
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CardUsuario",

  components: {},
  props: {
    usuario: {},
  },
  data() {
    return {
      loading: false,
      selection: 1,
      rating:0
    };
  },
  methods: {},
  created() {},
  computed: {},
};
</script>
<style lang=""></style>
