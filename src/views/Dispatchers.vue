<template>
    <div class="dispatchers">
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
                                        <v-dialog
                                                v-model="dialog.on"
                                                width="500"
                                        >
                                            <template v-slot:activator="{on}">
                                                <v-btn class="error"
                                                       elevation="3"
                                                       v-on="on"
                                                       @click="fillRemove(dispatch.name)"
                                                >
                                                    Delete
                                                </v-btn>
                                            </template>

                                            <v-card class="primary pa-4">
                                                <v-card-title>
                                                    Remove Dispatcher
                                                </v-card-title>

                                                <v-card-text>
                                                    Are you sure you want to remove {{dispatch.name}} as a dispatcher?
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-row>
                                                        <v-col>
                                                            <v-btn class="secondary"
                                                                   text
                                                                   block
                                                                   @click="dialog.on = false"
                                                            >
                                                                I don't
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col>
                                                            <v-btn class="error"
                                                                   text
                                                                   block
                                                                   @click="function(){
                                                                   remove(dispatch.email);
                                                                   dialog.on = false;
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
                                </v-row>
                            </v-card-title>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card-title>
                        Add Dispatchers
                    </v-card-title>
                    <v-card class="accent pa-4 pb-2 mr-3"
                            elevation="7"
                    >
                        <v-card-title>
                            New Dispatcher Details
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-form ref="form">
                            <v-row class="mx-4 mt-4">
                                <v-col class="py-0">
                                    <v-text-field v-model="newDispatcher.firstName"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="First Name is required"
                                                  :persistent-hint="newDispatcher.inputs.firstName"
                                                  :error=newDispatcher.inputs.firstName
                                                  label="First Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field v-model="newDispatcher.lastName"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Last Name is required"
                                                  :persistent-hint="newDispatcher.inputs.lastName"
                                                  :error=newDispatcher.inputs.lastName
                                                  label="Last Name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-4 mt-n2">
                                <v-col class="py-0">
                                    <v-text-field v-model="newDispatcher.email"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Email is required"
                                                  :persistent-hint="newDispatcher.inputs.email"
                                                  :error=newDispatcher.inputs.email
                                                  label="Email"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="py-0">
                                    <v-text-field v-model="newDispatcher.password"
                                                  required
                                                  filled
                                                  outlined
                                                  dense
                                                  hint="Password is required"
                                                  :persistent-hint="newDispatcher.inputs.password"
                                                  :error=newDispatcher.inputs.password
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
                                            v-model="dialog.on"
                                            width="500"
                                    >
                                        <template v-slot:activator="{}">
                                            <v-btn block
                                                   class="accent lighten-2"
                                                   @click="fillDispatch()"
                                            >
                                                Add Dispatcher
                                            </v-btn>
                                        </template>

                                        <v-card class="primary pa-4">
                                            <v-card-title>
                                                {{dialog.title}}
                                            </v-card-title>

                                            <v-card-text>
                                                {{dialog.text}}
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-row>
                                                    <v-col>
                                                        <v-btn class="error"
                                                               text
                                                               block
                                                               @click="dialog.on = false"
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
                                                                   dialog.on = false;
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

    export default {
        name: "Dispatchers",
        data: () => ({
            dialog: {
                title: '',
                text: '',
                on: false,
            },
            snackbar: {
                text: '',
                timeout: 5000,
                on: false,
                color: '',
            },
            dispatchers: [
                {
                    name: 'Tim Alan',
                    email: 'nothing@nada.com',
                    id: '1'
                },
                {
                    name: 'Tim Alan',
                    email: 'nothing@nada.com',
                    id: '2'
                },
                {
                    name: 'Tim Alan',
                    email: 'nothing@nada.com',
                    id: '3'
                },
                {
                    name: 'Tim Alan',
                    email: 'nothing@nada.com',
                    id: '4'
                },
                {
                    name: 'Tim Alan',
                    email: 'nothing@nada.com',
                    id: '5'
                }
            ],
            passShow: false,
            newDispatcher: {
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
                http.post('users/registerdispatcher/', this.newDispatcher)
                    .then(response => {
                        if (response.status === 201) {
                            this.snackbar.text = 'Dispatcher Successfully Created';
                            this.snackbar.color = 'success';
                            this.snackbar.on = true;
                            this.newDispatcher.email = '';
                            this.newDispatcher.password = '';
                            this.newDispatcher.firstName = '';
                            this.newDispatcher.lastName = '';
                        } else {
                            this.snackbar.text = 'Dispatcher Creation Failed';
                            this.snackbar.color = 'error';
                            this.snackbar.on = true;
                        }
                    })
                    .catch(e => {
                        // eslint-disable-next-line no-console
                        console.log(e);
                        this.snackbar.text = 'not connected';
                        this.snackbar.color = 'secondary';
                        this.snackbar.on = true;
                    });
            },

            remove(email) {
                http.delete('/admins/dispatcher/', email)
                    .then(response => {
                        if (response.status === 204) {
                            this.snackbar.text = 'Dispatcher Successful Deleted';
                            this.snackbar.color = 'success';
                            this.snackbar.on = true;
                        } else {
                            this.snackbar.text = 'Dispatcher Deletion Failed';
                            this.snackbar.color = 'error';
                            this.snackbar.on = true;
                        }
                    })
                    .catch(e => {
                        // eslint-disable-next-line no-console
                        console.log(e);
                        this.snackbar.text = 'not connected';
                        this.snackbar.color = 'secondary';
                        this.snackbar.on = true;
                    });
            },

            fillRemove(firstName) {
                this.dialog.title = 'Remove Dispatcher';
                this.dialog.text = 'Are you sure you want to remove ' + firstName + ' as a dispatcher?';
            },

            fillDispatch() {
                const lName = this.newDispatcher.lastName !== "";
                const fName = this.newDispatcher.firstName !== "";
                const email = this.newDispatcher.email !== "";
                const password = this.newDispatcher.password !== "";
                if (lName && fName && email && password) {
                    this.dialog.title = 'Add Dispatcher';
                    this.dialog.text = 'Are you sure you want to add ' + this.newDispatcher.firstName + ' ' + this.newDispatcher.lastName + ' as a dispatcher?';
                    this.dialog.on = true;
                } else {
                    this.newDispatcher.inputs.lastName = !lName;
                    this.newDispatcher.inputs.firstName = !fName;
                    this.newDispatcher.inputs.email = !email;
                    this.newDispatcher.inputs.password = !password;

                }
            }
        }
    }
</script>

<style scoped>

</style>