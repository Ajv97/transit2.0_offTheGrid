<template>
    <<<<<<< HEAD
    <div class="login">
        <v-container>
            <v-layout>
                <v-flex>
                </v-flex>
                <v-flex xs6>
                    <!-- Begin Login Card Window Thing -->
                    <v-card elevation="15">
                        <v-toolbar class="primary"
                                   elevation="0"
                        >
                            <v-toolbar-title>
                                Login
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-container class="accent lighten-1"
                                     elevation="0"
                        >
                            <v-form ref="login">
                                <v-text-field filled
                                              outlined
                                              dense
                                              label="E-Mail"
                                              ref="username"
                                              required
                                              type="email"
                                              v-model="credentials.email"
                                ></v-text-field>
                                <v-text-field filled
                                              outlined
                                              dense
                                              label="Password"
                                              ref="password"
                                              required
                                              v-model="credentials.password"
                                              :append-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
                                              :type="passShow ? 'text' : 'password'"
                                              @click:append="passShow = !passShow"
                                ></v-text-field>

                                <v-btn block
                                       @click="login()"
                                       class="accent lighten-2"
                                ><strong>Login</strong>
                                </v-btn>
                            </v-form>
                        </v-container>
                    </v-card>
                    <!-- End Login Window -->
                </v-flex>
                <v-flex>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    =======
    <v-content id="app" fill-height>
        <v-layout row wrap>
            <v-flex/>
            <v-flex class="text-xs-center">
                <v-container fluid class="container">
                    <v-card fluid>
                        <v-toolbar class="primary py-2" flat>
                            <v-toolbar-title class="py-2">Login</v-toolbar-title>
                            <div class="flex-grow-1"></div>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>

                                <v-text-field
                                        label="Email"
                                        name="login"
                                        type="text"
                                        v-model="credentials.email"
                                />

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        v-model="credentials.password"
                                        required
                                        v-on:keydown.enter.once="submit"
                                />

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn style="background-color: #00ff00" class="primary my-2" @click="submit()"
                                   :disabled="submitDisabled" :loading="submitDisabled">Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-flex>
            <v-flex/>
        </v-layout>
    </v-content>
    >>>>>>> Func_Buses_Routes
</template>

<script>
    import {http} from "../components/httpComponent";

    export default {
        data: () => ({
            drawer: null,
            errors: [],
            preventError: [],
            submitDisabled: false,
            preventSubmit: false,
            credentials: {
                email: "",
                password: ""
            }
        }),
        methods: {
            async submit() {
                this.submitDisabled = true;
                await http.post("users/login?email=" + this.credentials.email + "&password=" + this.credentials.password)
                    .then(response => {
                        if (response.data.role !== "ROLE_USER") {
                            let admin = (response.data.role === "ROLE_ADMIN");
                            this.$store.commit('changeAdmin', admin);
                            this.$store.commit('changeToken', response.data.accessToken);
                            window.location = "#/";
                            this.submitDisabled = false;
                        }
                    }).catch(e => {
                        this.submitDisabled = false;
                        this.errors.push(e);
                    })
            }
        }
    }
</script>

<style scoped>
    .container {
        position: absolute;
        align-content: center;
        margin: 20px;
        border-radius: 10px;
        max-width: 300px;
    }

    #app {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        background-size: cover;
        background-position: center;
    }

</style>
