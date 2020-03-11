<template>
  <div class="routes">
    <v-card class="primary mb-6"
            elevation="10"
    >
      <v-card-title class="d-inline-block">
        Buses
      </v-card-title>
      <v-card-title class="d-inline-block float-right">
        User
      </v-card-title>
    </v-card>
    <v-card class="primary float-none pa-2"
            elevation="10"
    >
      <v-row>
        <v-col>
          <v-card-title>
            Active Routes
          </v-card-title>
          <v-card class="primary lighten-2 pa-4 pb-2 ml-3"
                  elevation="7"
          >
            <v-card-title class="py-2">
              <v-row>
                <v-col class="text-center pa-0"
                       cols="3"
                >
                  Route Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="5"
                >
                  Trip Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="4"
                >
                  Bus #
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card v-for="routes in routes"
                    :key="routes.route_number"
                    class="primary my-2"
                    elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0"
                         cols="3"
                  >
                    {{ routes.route_number }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="5"
                  >
                    {{ routes.trip }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="4"
                  >
                    <v-select
                      :items="items"
                      label="Bus #"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-card>
        </v-col>
        <v-col>
          <v-card-title>
            Inactive Buses
          </v-card-title>
          <v-card class="primary lighten-2  pa-4 pb-2 mr-3"
                  elevation="7"
          >
            <v-card-title class="py-2">
              <v-row>
                <v-col class="text-center pa-0"
                       cols="3"
                >
                  Route Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="5"
                >
                  Trip Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="4"
                >
                  Bus #
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card v-for="routes in routes2"
                    :key="routes.route_number"
                    class="primary my-2"
                    elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0"
                         cols="3"
                  >
                    {{ routes.route_number }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="5"
                  >
                    {{ routes.trip }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="4"
                  >
                    <v-select
                      :items="items"
                      label="Bus #"
                      outlined
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
    export default {
        name: "Routes",

        data() {
            return {
                items:[
                    'Bus1','Bus2','Bus3','Bus4','Bus5','Bus6','Bus7','Bus8','Bus9','Bus10','No Bus'
                ],
                routes: [
                    {
                        route_number: '1',
                        trip: '1',
                    },
                    {
                        route_number: '2',
                        trip: '1',
                    },
                    {
                        route_number: '3',
                        trip: '1',
                    },
                    {
                        route_number: '4',
                        trip: '1',
                    },
                    {
                        route_number: '6',
                        trip: '1',
                    },
                    {
                        route_number: '7',
                        trip: '1',
                    },
                    {
                        route_number: '8',
                        trip: '1',
                    },
                    {
                        route_number: '10',
                        trip: '1',
                    },
                ],
                routes2: [
                    {
                        route_number: '5',
                        trip: '2',
                    },
                    {
                        route_number: '9',
                        trip: '2',
                    },
                    {
                        route_number: '11',
                        trip: '1',
                    },
                    {
                        route_number: '12',
                        trip: '1',
                    },
                ],
            }
        },

    }


</script>

<style scoped>

</style>
