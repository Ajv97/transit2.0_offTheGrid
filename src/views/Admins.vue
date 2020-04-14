<template>
    <div>
        <v-snackbar v-model="snackbar.on"
                    :timeout="snackbar.timeout"
                    :color="snackbar.color"
        >
            <v-col class="ma-0 pa-0 text-center">
                {{snackbar.text}}
            </v-col>
        </v-snackbar>
        <v-card class="primary mb-6"
                elevation="10"
        >
            <v-card-title class="d-inline-block">
                Admins
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
                        Admins
                    </v-card-title>
                    <v-card class="accent pa-4 pb-2 ml-3"
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
                        <v-card v-for="admin in admins"
                                :key="admin.id"
                                class="primary my-2"
                                elevation="5"
                        >
                            <v-card-title class="py-2">
                                <v-row>
                                    <v-col class="text-center pa-0"
                                           cols="3"
                                    >
                                        {{ admin.name }}
                                    </v-col>
                                    <v-col class="text-center pa-0"
                                           cols="5"
                                    >
                                        {{ admin.email }}
                                    </v-col>
                                    <v-col class="text-center pa-0"
                                           cols="4"
                                    >
                                        <v-btn class="error"
                                               elevation="3"
                                               @click="fillRemove(admin.name)"
                                        >
                                            Delete
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                        </v-card>
                        <v-dialog
                                v-model="dialog.remove.on"
                                width="500"
                        >
                            <v-card class="primary pa-4">
                                <v-card-title>
                                    Remove Admin
                                </v-card-title>

                                <v-card-text>
                                    {{dialog.remove.text}}
                                </v-card-text>

                                <v-card-actions>
                                    <v-row>
                                        <v-col>
                                            <v-btn class="secondary"
                                                   text
                                                   block
                                                   @click="dialog.remove.on = false"
                                            >
                                                I don't
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn class="error"
                                                   text
                                                   block
                                                   @click="dialog.remove.on = false"
                                            >
                                                I do
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card-title>
                        Add Admins
                    </v-card-title>
                    <v-card class="accent pa-4 pb-2 mr-3"
                            elevation="7"
                    >
                        <v-card-title>
                            New Admin Details
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-form ref="form">
                            <v-row class="mx-4 mt-4">
                                <v-col class="py-0">
                                    <v-text-field v-model="newAdmin.firstName"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="First Name is required"
                                                  :persistent-hint="newAdmin.inputs.firstName"
                                                  :error=newAdmin.inputs.firstName
                                                  label="First Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field v-model="newAdmin.lastName"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Last Name is required"
                                                  :persistent-hint="newAdmin.inputs.lastName"
                                                  :error=newAdmin.inputs.lastName
                                                  label="Last Name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-4 mt-n2">
                                <v-col class="py-0">
                                    <v-text-field v-model="newAdmin.email"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Email is required"
                                                  :persistent-hint="newAdmin.inputs.email"
                                                  :error=newAdmin.inputs.email
                                                  label="Email"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field v-model="newAdmin.password"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Password is required"
                                                  :persistent-hint="newAdmin.inputs.password"
                                                  :error=newAdmin.inputs.password
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
                                    <v-dialog
                                            v-model="dialog.add.on"
                                            width="500"
                                    >
                                        <template v-slot:activator="{}">
                                            <v-btn block
                                                   class="accent lighten-2"
                                                   @click="fillAdmin()"
                                            >
                                                Add Admin
                                            </v-btn>
                                        </template>

                                        <v-card class="primary pa-4">
                                            <v-card-title>
                                                Add Admin
                                            </v-card-title>

                                            <v-card-text>
                                                {{dialog.add.text}}
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-row>
                                                    <v-col>
                                                        <v-btn class="error"
                                                               text
                                                               block
                                                               @click="dialog.add.on = false"
                                                        >
                                                            I don't
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn class="secondary"
                                                               text
                                                               block
                                                               @click="function(){
                                                                   submit();
                                                                   dialog.add.on = false;
                                                               }"
                                                        >
                                                            I do
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                                <v-col class="py-0">
                                    <v-btn block
                                           class="accent lighten-4"
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
    import {http} from "../components/httpComponent";
    import {store} from "../store/store";

    export default {
        name: "Admins",
        data: () => ({
            dialog: {
                remove:{
                    text: '',
                    on: false,
                },
                add:{
                    text: '',
                    on: false,
                }
            },
            snackbar: {
                text: '',
                timeout: 5000,
                on: false,
                color: '',
            },
            admins: [
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
            newAdmin: {
                inputs: {
                    email: false,
                    password: false,
                    firstName: false,
                    lastName: false,
                },
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
        }),
        methods: {
            reset() {
                this.$refs.form.reset()
            },

            submit() {
                let admin = this.newAdmin;
                http.post("users/registeradmin?email=" + admin.email
                    + "&password=" + admin.password
                    + "&firstname=" + admin.firstName
                    + "&lastname=" + admin.lastName, {
                    headers: {
                        "authorization": store.getters.token
                    }
                }).then(response => {
                    if (response.status !== 200) {
                        this.makeSnackbar('Failed to add admin', 'error');
                    } else {
                        this.makeSnackbar('Admin added', 'success');
                    }
                })
            },

            fillRemove(firstName) {
                this.dialog.remove.text = 'Are you sure you want to remove ' + firstName + ' as an admin?';
                this.dialog.remove.on = true
            },

            fillAdmin() {
                const lName = this.newAdmin.lastName !== "";
                const fName = this.newAdmin.firstName !== "";
                const email = this.newAdmin.email !== "";
                const password = this.newAdmin.password !== "";
                if (lName && fName && email && password) {
                    this.dialog.add.text = 'Are you sure you want to add ' + this.newAdmin.firstName + ' ' + this.newAdmin.lastName + ' as an admin?';
                    this.dialog.add.on = true;
                } else {
                    this.newAdmin.inputs.lastName = !lName;
                    this.newAdmin.inputs.firstName = !fName;
                    this.newAdmin.inputs.email = !email;
                    this.newAdmin.inputs.password = !password;

                }
            },

            makeSnackbar(text,color){
                this.snackbar.text = text;
                this.snackbar.color = color;
                this.snackbar.on = true;
            },

            reload() {
                http.get('/admins/allAdmins/', {
                    headers: {
                        "authorization": store.getters.token
                    }
                })
                    .then(response => {
                        this.admins = response.data;
                        console.log(this.admins)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
        },
        beforeMount() {
            this.reload()
        }
    }
</script>

<style scoped>

</style>