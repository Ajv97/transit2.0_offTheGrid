<template>
    <div class="dispatchers">
        <v-card class="primary mb-6"
                elevation="10"
        >
            <v-card-title class="d-inline-block">
                Dispatchers
            </v-card-title>
            <v-card-title class="d-inline-block float-right">
                user
            </v-card-title>
        </v-card>
        <v-card class="primary float-none pa-2"
                elevation="10"
        >
            <v-row>
                <v-col>
                    <v-card-title>
                        Dispatchers
                    </v-card-title>
                    <v-card class="primary lighten-2 pa-4 pb-2 ml-3"
                            elevation="7"
                    >
                        <v-card-title class="py-2">
                            <v-row>
                                <v-col class="text-center pa-0"
                                       cols="3"
                                >
                                    Name
                                </v-col>
                                <v-col class="text-center pa-0"
                                       cols="5"
                                >
                                    Email
                                </v-col>
                                <v-col class="text-center pa-0"
                                       cols="4"
                                >
                                    Delete User
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card v-for="dispatch in dispatchers"
                                :key="dispatch.id"
                                class="primary my-2"
                                elevation="5"
                        >
                            <v-card-title class="py-2">
                                <v-row>
                                    <v-col class="text-center pa-0"
                                           cols="3"
                                    >
                                        {{ dispatch.name }}
                                    </v-col>
                                    <v-col class="text-center pa-0"
                                           cols="5"
                                    >
                                        {{ dispatch.email }}
                                    </v-col>
                                    <v-col class="text-center pa-0"
                                           cols="4"
                                    >
                                        <v-btn class="error"
                                               elevation="3"
                                        >
                                            Delete
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card-title>
                        Add Dispatchers
                    </v-card-title>
                    <v-card class="primary lighten-2  pa-4 pb-2 mr-3"
                            elevation="7"
                    >
                        <v-card-title>
                            New Dispatcher Details
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-form ref="form">
                            <v-row class="mx-4 mt-4">
                                <v-col class="py-0">
                                    <v-text-field filled
                                                  outlined
                                                  dense
                                                  label="First Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field filled
                                                  outlined
                                                  dense
                                                  label="Last Name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-4 mt-n2">
                                <v-col class="py-0">
                                    <v-text-field filled
                                                  outlined
                                                  dense
                                                  label="Email"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field filled
                                                  outlined
                                                  dense
                                                  label="Password"
                                                  :append-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
                                                  :type="passShow ? 'text' : 'password'"
                                                  @click:append="passShow = !passShow"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="mx-4 mt-4 mb-2">
                                <v-col class="py-0">
                                    <v-btn>
                                        Add Dispatcher
                                    </v-btn>
                                </v-col>
                                <v-col class="py-0">
                                    <v-btn error
                                           @click="reset"
                                    >
                                        Clear
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Dispatchers",
        data() {
            return {
                dispatchers: [
                    {
                        name: 'time Alan',
                        email: 'nothing@nada.com',
                        id: '1'
                    },
                    {
                        name: 'time Alan',
                        email: 'nothing@nada.com',
                        id: '2'
                    },
                    {
                        name: 'time Alan',
                        email: 'nothing@nada.com',
                        id: '3'
                    },
                    {
                        name: 'time Alan',
                        email: 'nothing@nada.com',
                        id: '4'
                    },
                    {
                        name: 'time Alan',
                        email: 'nothing@nada.com',
                        id: '5'
                    }
                ],
                passShow: false,
            }
        },
        methods: {
            reset() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>

</style>