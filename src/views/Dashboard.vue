<template>
    <div class="dashboard">
        <v-card class="primary mb-3"
                elevation="10"
        >
            <v-card-title class="d-inline-block">
                Dashboard
            </v-card-title>
            <v-card-title class="d-inline-block float-right">
                user
                <v-btn @click="logout"> Logout</v-btn>
            </v-card-title>
        </v-card>
        <v-row>
            <v-col v-for="card in cards"
                   :key="card.title"
                   cols="3"
            >
                <v-card class="primary"
                        height="200px"
                        elevation="10"
                >
                    <v-card-title>
                        {{card.title}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card class="primary"
                        elevation="10"
                >
                    <v-card-title>
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
                                         class="pa-0 mx-0 my-1 "
                        >
                            <p class="my-1 mr-2">
                                <b>{{ item.title }}</b><br/>
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
                    <v-card-title>
                        Active Routes and Buses
                    </v-card-title>
                    <div>
                        <div style="width: 100%; height: 500px" id="mapContainer"></div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    let H = window.H;

    // @ is an alias to /src
    export default {
        name: "Dashboard",
        components: {},
        data() {
            return {
                cards: [{
                    title: 'Routes Being Run',
                    icon: '',
                    statistics: '',
                }, {
                    title: 'Buses Being Run',
                    icon: '',
                    statistics: '',
                }, {
                    title: 'Users Total',
                    icon: '',
                    statistics: '',
                }, {
                    title: 'Users Today',
                    icon: '',
                    statistics: '',
                }],
                timeline: [
                    {
                        title: 'New Dispatcher',
                        text: 'New Dispatcher add, Welcome Amy!',
                        time: '25min',
                        icon: '',
                        color: 'secondary'
                    }, {
                        title: 'Bus Route Update Due in 10 min',
                        text: 'Update the Bus routes for the day Before they',
                        time: '25min',
                        icon: '',
                        color: 'warning'
                    }, {
                        title: 'Bus Sent For Repair',
                        text: 'Bus 7 was sent out for repair',
                        time: '25min',
                        icon: '',
                        color: 'success'
                    }, {
                        title: 'A new route',
                        text: 'A new route was added id(21)',
                        time: '25min',
                        icon: '',
                        color: 'error'
                    }, {
                        title: 'New Bus',
                        text: 'A new Bus id(25) was added to the fleet!',
                        time: '25min',
                        icon: '',
                        color: 'secondary'
                    }
                ],
                platform: null,
                map: null,
                lat: 42.588081,
                lng: -87.822899
            }
        },
        mounted: function () {
            // Initialize the platform object:
            var platform = new H.service.Platform({
                'apikey': process.env.VUE_APP_HERE_APP_KEY,
                'appid': process.env.VUE_APP_HERE_APP_ID,
                'useHTTPS': true
            });

            // Obtain the default map types from the platform object
            var maptypes = platform.createDefaultLayers();

            // Instantiate (and display) a map object:
            //var map =
            new H.Map(
                document.getElementById('mapContainer'),
                maptypes.vector.normal.map,
                {
                    zoom: 10,
                    center: {lng: this.lng, lat: this.lat}
                });
        },
        methods: {
            logout() {
                this.$store.commit('changeToken', "")
            }
        }
    }
</script>
