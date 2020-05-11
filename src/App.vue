<template id="app">
    <v-app class="v-app">
        <v-navigation-drawer v-if="this.$root.$route.meta.nav"
                             v-model="drawer"
                             permanent
                             app
                             class="primary"
                             style="padding-right:1px;"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Transit v2</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-expansion-panels accordion
                                multiple
                                flat
                                hover
            >
                <v-list-item href="/#/"
                             key="dashboard"
                             class="d-block"
                             link
                >
                    <v-list-item-content class="py-3">
                        <v-list-item-title class="body-1">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-expansion-panel v-for="item in items"
                                   :key="item.title"
                                   class="d-block primary"
                                   @click.stop="item.show=!item.show"
                >
                    <v-expansion-panel-header class="py-2 px-4"
                                              v-if="!item.admin || item.admin == adminRights"
                    >
                        <v-list-item-title class="body-1">{{item.title}}</v-list-item-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list class="pa-0">
                            <v-list-item v-for="child in item.children"
                                         :href="child.href"
                                         :key="item.title+child.title"
                                         class="mx-n6 px-5"
                                         @click.stop="item.show=true"
                                         link
                            >

                                <v-list-item-icon class="mr-2">
                                    <v-icon medium
                                            :color="child.iconColor"
                                    >{{child.icon}}
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="body-2">{{child.title}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-navigation-drawer>
        <v-content class="accent">
            <v-fade-transition mode="out-in">
                <v-container fluid class="py-6 px-8">
                    <router-view></router-view>
                </v-container>
            </v-fade-transition>
        </v-content>
    </v-app>
</template>

<script>

    // import Vuetify from "vuetify";
    import {store} from "./store/store";

    export default {
        data: () => ({
            drawer: true,
            adminRights: true,
            items: [
                {
                    title: 'Users',
                    show: false,
                    admin: true,
                    children: [
                        {
                            href: '/#/dispatchers',
                            title: 'Dispatchers',
                            icon: 'mdi-headset',
                            iconColor: ''
                        }, {
                            href: '/#/admins',
                            title: 'Admins',
                            icon: 'mdi-shield-half-full',
                            iconColor: ''
                        }]
                }, {
                    title: 'Buses',
                    show: false,
                    admin: false,
                    children: [
                        {
                            href: '/#/buses/all',
                            title: 'All Buses',
                            icon: 'mdi-bus',
                            iconColor: ''
                        }, {
                            href: '/#/buses/active',
                            title: 'Active Buses',
                            icon: 'mdi-bus',
                            iconColor: 'success'
                        }, {
                            href: '/#/buses/inactive',
                            title: 'Inactive Buses',
                            icon: 'mdi-bus',
                            iconColor: 'error'
                        }]
                }, {
                    title: 'Routes',
                    show: false,
                    admin: false,
                    children: [
                        {
                            href: '/#/routes/all',
                            title: 'All Routes',
                            icon: 'mdi-map-marker-path',
                            iconColor: ''
                        }, {
                            href: '/#/routes/active',
                            title: 'Active Routes',
                            icon: 'mdi-map-marker-path',
                            iconColor: 'success'
                        }, {
                            href: '/#/routes/inactive',
                            title: 'Inactive Routes',
                            icon: 'mdi-map-marker-path',
                            iconColor: 'error'
                        }]
                }
            ]
        }),
        methods: {
            reload() {
                this.adminRights = store.getters.admin;
                console.log("admin rights = " + this.adminRights);
            }
        },
        beforeMount() {
            this.reload();
        }
    }
    ;
</script>
<style>
    @import url("https://fonts.googleapis.com/css?family=Montserrat");

    * {
        font-family: "Montserrat";
    }
</style>
