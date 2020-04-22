<template>
  <div class="buses">
    <v-card class="primary mb-6" elevation="10">
      <v-card-title class="d-inline-block">
        Buses
      </v-card-title>
      <v-card-title class="d-inline-block float-right">
        User
      </v-card-title>
    </v-card>
    <v-card class="primary float-none pa-2" elevation="10">
      <v-row>
        <v-col>
          <v-card-title>
            Inactive Buses
          </v-card-title>
          <v-card class="primary lighten-2  pa-4 pb-2 mr-3" elevation="7">
            <v-card-title class="py-2">
              <v-row>
                <v-col class="text-center pa-0" cols="3">
                  Bus Number
                </v-col>
                <v-col class="text-center pa-0" cols="5">
                  Gps Id
                </v-col>
                <v-col class="text-center pa-0" cols="4">
                  Status
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card
              v-for="bus in buses"
              :key="bus.id"
              v-show="bus.status !== 'Active'"
              class="primary my-2"
              elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0" cols="3">
                    {{ bus.bus_ID }}
                  </v-col>
                  <v-col class="text-center pa-0" cols="5">
                    {{ bus.gps_ID }}
                  </v-col>
                  <v-col class="text-center pa-0" cols="4">
                    <v-select
                      v-model="bus.status"
                      :items="items"
                      label="Status"
                      outlined
                      @input="submit(bus.id)"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { http } from "../components/httpComponent";
import { store } from "../store/store";
export default {
  data: () => ({
    buses: [],
    items: ["Active", "Inactive", "Maintenance"]
  }),
  methods: {
    //submit method
    submit(id) {
      let bus = this.buses.find(function(element) {
        return element.id === id;
      });
      let updatedBus = {
        id: bus.id,
        bus_ID: bus.bus_ID,
        trip_ID: bus.trip_ID,
        gps_ID: bus.gps_ID,
        latitude: bus.latitude,
        longitude: bus.longitude,
        status: bus.status
      };
      http
        .patch("/buses/" + bus.id, updatedBus, {
          headers: {
            authorization: store.getters.token
          }
        })
        .then(response => {
          if (response.status !== 200) {
            this.buses.find(function(element) {
              if (element.id === id) {
                if (element.status === "Active") {
                  element.status = "Inactive";
                } else {
                  element.status = "Active";
                }
              }
            });
          }
        });
    },
    reload() {
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
    this.reload();
  }
};
</script>
