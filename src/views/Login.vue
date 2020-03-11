<template>
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
</template>

<script>
    export default {
        name: "login",
        data: () => ({
            credentials: {
                email: "",
                password: ""
            },
            drawer: false,
            passShow: false,
        }),
        methods: {
            reset() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>

</style>