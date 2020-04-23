<template>
    <div class="dashboard">
        <v-card class="primary mb-3"
                elevation="10"
        >
            <v-card-title class="d-inline-block">
                Dashboard
            </v-card-title>
            <v-card-title class="d-inline-block float-right">
                {{firstname}}
                <v-btn @click="logout"
                       class="accent ml-4"
                > Logout</v-btn>
            </v-card-title>
        </v-card>
        <v-row>
            <v-col v-for="card in cards"
                   :key="card.title"
                   cols="3"
            >
                <v-card class="primary"
                        elevation="10"
                >
                    <v-row class="pa-8 ma-0">
                        <v-avatar :color="'background'+card.iconColor"
                                  size="72"
                                  class="d-inline-block"
                        >
                            <v-icon large
                                    :color="card.iconColor"
                            >{{card.icon}}
                            </v-icon>
                        </v-avatar>
                        <v-card-title class="pa-0 pl-8">
                            {{card.value}}
                            {{card.title}}
                        </v-card-title>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card class="primary"
                        elevation="10"
                >
                    <v-card-title class="font-weight-bold title">
                        Activity Timeline
                    </v-card-title>
                    <v-timeline dense
                                clipped
                                class="pa-0"
                    >
                        <v-timeline-item v-for="(item,i) in timeline"
                                         :key="i"
                                         :icon="item.icon"
                                         :color="item.color"
                                         fill-dot
                                         class="pa-0 mx-0 my-1 "
                        >
                            <p class="my-1 mr-2 caption">
                                <b class="body-2 font-weight-bold">{{ item.title }}</b><br/>
                                {{ item.text }}<br/>
                                {{ item.time }} ago
                            </p>
                        </v-timeline-item>
                    </v-timeline>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card class="primary"
                        elevation="10"
                >
                    <v-card-title class="font-weight-bold title">
                        Active Routes and Buses
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {store} from "../store/store"
    // @ is an alias to /src
    export default {
        name: "Dashboard",
        components: {},
        data() {
            return {
                firstname: '',
                cards:
                    [{
                        title: 'Routes Being Run',
                        icon: 'mdi-map-marker-path',
                        iconColor: 'secondary',
                    }, {
                        title: 'Buses Being Run',
                        icon: 'mdi-bus',
                        iconColor: 'warning',
                    }, {
                        title: 'Users Total',
                        icon: 'mdi-account-multiple',
                        iconColor: 'secondary',
                    }, {
                        title: 'Users Today',
                        icon: 'mdi-account-multiple',
                        iconColor: 'warning',
                    }],
                timeline: [
                    {
                        title: 'New Dispatcher',
                        text: 'New Dispatcher add, Welcome Amy!',
                        time: '25min',
                        icon: 'mdi-plus',
                        color: 'secondary'
                    }, {
                        title: 'Bus Route Update Due in 10 min',
                        text: 'Update the Bus routes for the day Before they',
                        time: '25min',
                        icon: 'mdi-clock-outline',
                        color: 'warning'
                    }, {
                        title: 'Bus Sent For Repair',
                        text: 'Bus 7 was sent out for repair',
                        time: '25min',
                        icon: 'mdi-check',
                        color: 'success'
                    }, {
                        title: 'A new route',
                        text: 'A new route was added id(21)',
                        time: '25min',
                        icon: 'mdi-plus',
                        color: 'error'
                    }, {
                        title: 'New Bus',
                        text: 'A new Bus id(25) was added to the fleet!',
                        time: '25min',
                        icon: 'mdi-plus',
                        color: 'secondary'
                    }
                ]
            }
        },
        methods: {
            logout() {
                this.$store.commit('changeToken', "");
                this.$router.go(0);
            },

            reload() {
                this.firstname = store.getters.firstname;
            }
        },
        beforeMount() {
            this.reload();
        }
    }
</script>
