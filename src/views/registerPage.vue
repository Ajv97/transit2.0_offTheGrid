<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title class="black--text">Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="credentials.email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="credentials.password"
                    required
                    v-on:keydown.enter.once="register"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <div class="flex-grow-1"></div>
                <v-btn
                  style="background-color: #ff0000"
                  class="black--text"
                  @click="register()"
                  :disabled="registerDisabled"
                  :loading="registerDisabled"
                  >Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { http } from "../components/httpComponent";

export default {
  data: () => ({
    drawer: null,
    errors: [],
    preventError: [],
    registerDisabled: false,
    preventregister: false,
    credentials: {
      email: "",
      password: ""
    }
  }),
  methods: {
    async register() {
      this.registerDisabled = true;
      await http
        .post("users/login", this.credentials)
        .then(response => {
          this.$store.commit("changeToken", response.data.token);
          this.$store.commit("changeAdmin", response.data.admin);
          window.location = "#/Dashboard";
          this.registerDisabled = false;
        })
        .catch(e => {
          this.registerDisabled = false;
          this.errors.push(e);
        });
    }
  }
};
</script>
<style scoped></style>
