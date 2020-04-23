<template>
    <div class="dashboard">
        <v-card class="primary mb-3" elevation="10">
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
                    <div>
                        <div style="width: 100%; height: 500px" id="mapContainer"></div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {http} from "../components/httpComponent";
    import {store} from "../store/store";

    let H = window.H;
    let map;
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
                ],
                platform: null,
                map: null,
                lat: 42.588081,
                lng: -87.822899,
                buses: [],
                routes: [],
                routesPoints: [],
                routesColors: []
            };
        },
        mounted: function () {
            // Initialize the platform object:
            let platform = new H.service.Platform({
                apikey: process.env.VUE_APP_HERE_APP_KEY,
                appid: process.env.VUE_APP_HERE_APP_ID,
                useHTTPS: true
            });

            // Obtain the default map types from the platform object
            let defaultLayers = platform.createDefaultLayers();

            // Instantiate (and display) a map object:
            //var map =
            map = new H.Map(
                document.getElementById("mapContainer"),
                defaultLayers.vector.normal.map,
                {
                    zoom: 11.5,
                    center: {lng: this.lng, lat: this.lat}
                }
            );

            window.addEventListener("resize", () => map.getViewPort().resize());

            new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        },
        methods: {
            logout() {
                this.$store.commit("changeToken", "");
                this.$router.go(0);
            },

            reload() {
                this.firstname = store.getters.firstname;
            },

            async getRoutes() {
                let awaitRoutes,
                    hereRoutes = 0;
                await http
                    .get("/routes/", {
                        headers: {
                            authorization: store.getters.token
                        }
                    })
                    .then(response => {
                        this.routes = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                while (this.routes === 0) {
                    await sleep(100);
                }

                await this.routes.forEach(async route => {
                    await http
                        .get("/gtfsroutesroutes/", {
                            headers: {
                                authorization: store.getters.token,
                                route_id: route.route_ID
                            }
                        })
                        .then(response => {
                            this.routesColors.push(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });

                awaitRoutes = this.routes.length;

                await this.routes.forEach(async route => {
                    await http
                        .get("/gtfsroutelocationdataroutes/id/", {
                            headers: {
                                authorization: store.getters.token,
                                trip_id: route.trip_ID
                            }
                        })
                        .then(response => {
                            this.routesPoints.push(response.data);
                            hereRoutes++;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });

                while (hereRoutes < awaitRoutes) {
                    await sleep(100);
                }

                await this.routesPoints.forEach(async route => {
                    let polyline = new H.geo.LineString();

                    //polyline.color = this.routesColors.route_color;
                    await route.forEach(location => {
                        polyline.pushPoint({
                            lat: location.stop_lat,
                            lng: location.stop_lon
                        });
                    });

                    await map.addObject(
                        new H.map.Polyline(polyline, {style: {lineWidth: 4}})
                    );
                });
            },

            getBuses() {
                http
                    .get("/buses/", {
                        headers: {
                            authorization: store.getters.token
                        }
                    })
                    .then(response => {
                        this.buses = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        beforeMount() {
            this.getRoutes();
            this.getBuses();
            this.reload();
        }
    };

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
</script>
