<template id="app">
  <v-app>
    <v-navigation-drawer
      v-if="this.$root.$route.meta.nav"
      v-model="drawer"
      permanent
      app
      class="primary"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Transit v2</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-expansion-panels accordion multiple flat hover>
        <v-list-item href="/#/" key="dashboard" style="display:block" link>
          <v-list-item-content class="py-3">
            <v-list-item-title class="body-1">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-expansion-panel
          v-for="item in items"
          :key="item.title"
          class="d-block primary"
          @click.stop="item.show = !item.show"
        >
          <v-expansion-panel-header class="py-2 px-4">
            <v-list-item-title class="body-1">{{
              item.title
            }}</v-list-item-title>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list class="pa-0">
              <v-list-item
                v-for="child in item.children"
                :href="child.href"
                :key="item.title + child.title"
                class="d-block mx-n6 px-5"
                @click.stop="item.show = true"
                link
              >
                <v-list-item-content class="py-3">
                  <v-list-item-title class="caption">{{
                    child.title
                  }}</v-list-item-title>
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
import Vuetify from "vuetify";

export default {
  vuetify: new Vuetify({
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#0F1642",
          accent: "#2B3253",
          secondary: "#7E72F2",
          success: "#28C76F",
          info: "#2196F3",
          warning: "#FF9F43",
          error: "#EA5455"
        },
        light: {
          // primary:'#0000FF',
          // accent: '#FF4081',
          // secondary: '#ffe18d',
          // success: '#4CAF50',
          // info: '#2196F3',
          // warning: '#FB8C00',
          // error: '#FF5252'
        }
      }
    }
  }),
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Users",
          show: false,
          children: [
            {
              href: "/#/dispatchers",
              title: "Dispatchers",
              icon: ""
            },
            {
              href: "/#/admins",
              title: "Admins",
              icon: ""
            }
          ]
        },
        {
          title: "Buses",
          show: false,
          children: [
            {
              href: "/#/buses/all",
              title: "All Buses",
              icon: ""
            },
            {
              href: "/#/buses/active",
              title: "Active Buses",
              icon: ""
            },
            {
              href: "/#/buses/inactive",
              title: "Inactive Buses",
              icon: ""
            }
          ]
        },
        {
          title: "Routes",
          show: false,
          children: [
            {
              href: "/#/routes/all",
              title: "All Routes",
              icon: ""
            },
            {
              href: "/#/routes/active",
              title: "Active Routes",
              icon: ""
            },
            {
              href: "/#/routes/inactive",
              title: "Inactive Routes",
              icon: ""
            }
          ]
        }
      ]
    };
  }
};
</script>
