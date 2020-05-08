<template>
    <div class="dashboard">
        <v-card class="primary mb-3" elevation="10">
            <v-card-title class="d-inline-block">
                Dashboard
            </v-card-title>
            <v-card-title class="d-inline-block float-right">
                {{ firstname }}
                <v-btn @click="logout" class="accent ml-4"> Logout</v-btn>
            </v-card-title>
        </v-card>
        <v-row>
            <v-col v-for="card in cards" :key="card.title" cols="3">
                <v-card class="primary" elevation="10">
                    <v-row class="pa-8 ma-0">
                        <v-avatar
                                :color="'background' + card.iconColor"
                                size="72"
                                class="d-inline-block"
                        >
                            <v-icon large :color="card.iconColor">{{ card.icon }}</v-icon>
                        </v-avatar>
                        <v-card-title class="pa-0 pl-8">
                            {{ card.value }}
                            {{ card.title }}
                        </v-card-title>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card class="primary" elevation="10">
                    <v-card-title class="font-weight-bold title">
                        Activity Timeline
                    </v-card-title>
                    <v-timeline dense clipped class="pa-0">
                        <v-timeline-item
                                v-for="(item, i) in timeline"
                                :key="i"
                                :icon="item.icon"
                                :color="item.color"
                                fill-dot
                                class="pa-0 mx-0 my-1 "
                        >
                            <p class="my-1 mr-2 caption">
                                <b class="body-2 font-weight-bold">{{ item.title }}</b
                                ><br/>
                                {{ item.text }}<br/>
                                {{ item.time }} ago
                            </p>
                        </v-timeline-item>
                    </v-timeline>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card class="primary" elevation="10">
                    <v-card-title class="font-weight-bold title">
                        Active Routes and Buses
                        <v-spacer/>
                        <v-btn @click="recenterMap()">Recenter</v-btn>
                    </v-card-title>
                    <GmapMap
                            id="map"
                            :center="center"
                            :zoom="12"
                            style="width:100%;  height: 500px;"
                            :options="{
                             mapTypeControl: false,
                             scaleControl: false,
                             streetViewControl: false,
                             rotateControl: false,
                             fullscreenControl: true,
                             disableDefaultUi: false}"
                            map-type-id="terrain"
                    >
                        <gmap-info-window
                                :options="infoOptions"
                                :position="infoPosition"
                                :opened="infoOpened"
                                :content="infoContent"
                                @closeclick="infoOpened=false"
                        />
                        <gmap-marker
                                v-for="(bus, index) in buses"
                                :key="index"
                                :ref="`markers${index}`"
                                :position="bus.location"
                                :clickable="true"
                                :draggable="false"
                                :icon="{ url: require('../assets/bus_icon.png'),
                                         size: {width: 60, height: 90, f: 'px', b: 'px',},
                                         scaledSize: {width: 30, height: 45, f: 'px', b: 'px',}
                                }"
                                @click="center = bus.location, toggleInfoWindow(bus,index)"
                        />
                        <gmap-polyline
                                v-for="route in routesAndColors"
                                v-bind:key="route.trip_ID"
                                v-bind:path.sync="route.route_points"
                                v-bind:options="{ strokeColor: route.route_color }"
                        />
                    </GmapMap>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {http} from "../components/httpComponent";
    import {store} from "../store/store";
    import {CronJob} from 'cron'

    // @ is an alias to /src
    export default {
        name: "Dashboard",
        components: {},
        data() {
            return {
                firstname: "",
                cards: [
                    {
                        title: "Routes Being Run",
                        icon: "mdi-map-marker-path",
                        iconColor: "secondary"
                    },
                    {
                        title: "Buses Being Run",
                        icon: "mdi-bus",
                        iconColor: "warning"
                    },
                    {
                        title: "Users Total",
                        icon: "mdi-account-multiple",
                        iconColor: "secondary"
                    },
                    {
                        title: "Users Today",
                        icon: "mdi-account-multiple",
                        iconColor: "warning"
                    }
                ],
                timeline: [
                    {
                        title: "New Dispatcher",
                        text: "New Dispatcher add, Welcome Amy!",
                        time: "25min",
                        icon: "mdi-plus",
                        color: "secondary"
                    },
                    {
                        title: "Bus Route Update Due in 10 min",
                        text: "Update the Bus routes for the day Before they",
                        time: "25min",
                        icon: "mdi-clock-outline",
                        color: "warning"
                    },
                    {
                        title: "Bus Sent For Repair",
                        text: "Bus 7 was sent out for repair",
                        time: "25min",
                        icon: "mdi-check",
                        color: "success"
                    },
                    {
                        title: "A new route",
                        text: "A new route was added id(21)",
                        time: "25min",
                        icon: "mdi-plus",
                        color: "error"
                    },
                    {
                        title: "New Bus",
                        text: "A new Bus id(25) was added to the fleet!",
                        time: "25min",
                        icon: "mdi-plus",
                        color: "secondary"
                    }
                ],
                buses: [],
                routes: [],
                routesAndColors: [],
                center: {lat: 42.597281, lng: -87.896133},
                center_recenter: {lat: 42.597281, lng: -87.896133},
                paths: [],
                infoPosition: null,
                infoOpened: false,
                infoContent: null,
                currentPlace: null,
                infoOptions: null
            };
        },

        methods: {
            logout() {
                this.$store.commit("changeToken", "");
                this.$router.go(0);
            },

            reload() {
                this.firstname = store.getters.firstname;
            },

            async recenterMap() {
                this.center = {lat: 42.5972, lng: -87.8961};
                await sleep(100)
                this.center = this.center_recenter;
            },

            toggleInfoWindow(bus) {
                this.infoOptions = {
                    pixelOffset: {
                        width: -16,
                        height: -90
                    },
                    content:
                        '<div id="content">' +
                        '<h1 id="firstHeading" class="firstHeading; black--text">Bus# ' + bus.bus_ID + '</h1>' +
                        '<div id="bodyContent">' +
                        '<p class="black--text"> Trip ID: ' + bus.trip_ID + ' <br/> Route ID: ' + bus.route_ID + ' </p>' +
                        '</div>' +
                        '</div>'
                }
                this.infoPosition = {lat: bus.location.lat, lng: bus.location.lng}
                this.currentPlace = {lat: bus.location.lat, lng: bus.location.lng}
                this.infoOpened = true;
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
                        response.data.forEach(responseInfo => {
                            this.routesAndColors.push({
                                bus_ID: responseInfo.bus_ID,
                                id: responseInfo.id,
                                route_ID: responseInfo.route_ID,
                                trip_ID: responseInfo.trip_ID,
                                route_text_color: "",
                                route_color: "",
                                route_points: []
                            });
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });

                while (this.routes === 0) {
                    await sleep(100);
                }

                await this.routesAndColors.forEach(async route => {
                    await http
                        .get("/gtfsroutesroutes/", {
                            headers: {
                                authorization: store.getters.token,
                                route_id: route.route_ID
                            }
                        })
                        .then(response => {
                            route.route_color = "#" + response.data.route_color;
                            route.route_text_color = "#" + response.data.route_text_color;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });

                awaitRoutes = this.routesAndColors.length;

                await this.routesAndColors.forEach(route => {
                    http.get("/gtfspolylinedata/id/", {
                        headers: {
                            authorization: store.getters.token,
                            route_id: route.route_ID
                        }
                    })
                        .then(async response => {
                            if (response.status === 200) {
                                let correctedLocation = [];
                                await response.data.forEach(location => {
                                    correctedLocation.push({
                                        lat: Number(location.latitude),
                                        lng: Number(location.longitude)
                                    });
                                });
                                route.route_points = correctedLocation;
                            }
                            hereRoutes++;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });

                while (hereRoutes < awaitRoutes) {
                    await sleep(100);
                }
            },

            getBuses() {
                console.log(new Date())
                http
                    .get("/buses/", {
                        headers: {
                            authorization: store.getters.token
                        }
                    })
                    .then(response => {
                        response.data.forEach(bus => {
                            if (bus.status === "Active") {
                                bus.location.lat = Number.parseFloat(bus.location.latitude)
                                bus.location.lng = Number.parseFloat(bus.location.longitude)
                                this.buses.push(bus)
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        beforeMount() {
            this.getRoutes();
            //this.getBuses();
            this.reload();
        },
        mounted() {
            // get bus info every 15 seconds
            let job = new CronJob('*/15 * * * * *', this.getBuses(), null, true, 'America/Chicago');
            job.start()
        }
    };

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
</script>

<style>
    #map {
        height: 40%;
        width: 100%;
    }

    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
