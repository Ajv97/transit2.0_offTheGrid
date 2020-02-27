<template>
  <div class="buses">
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
            Active Buses
          </v-card-title>
          <v-card class="primary lighten-2 pa-4 pb-2 ml-3"
                  elevation="7"
          >
            <v-card-title class="py-2">
              <v-row>
                <v-col class="text-center pa-0"
                       cols="3"
                >
                  Bus Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="5"
                >
                  Gps Id
                </v-col>
                <v-col class="text-center pa-0"
                       cols="4"
                >
                  Status
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card v-for="bus in buses"
                    :key="bus.bus_number"
                    class="primary my-2"
                    elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0"
                         cols="3"
                  >
                    {{ bus.bus_number }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="5"
                  >
                    {{ bus.gps_id }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="4"
                  >
                    <v-select
                      :items="items"
                      label="Status"
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
                  Bus Number
                </v-col>
                <v-col class="text-center pa-0"
                       cols="5"
                >
                  Gps Id
                </v-col>
                <v-col class="text-center pa-0"
                       cols="4"
                >
                  Status
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card v-for="bus in buses2"
                    :key="bus.bus_number"
                    class="primary my-2"
                    elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0"
                         cols="3"
                  >
                    {{ bus.bus_number }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="5"
                  >
                    {{ bus.gps_id }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="4"
                  >
                    <v-select
                      :items="items"
                      label="Status"
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
        name: "Buses",

        data() {
            return {
                items:[
                    'Active','Inactive','Maint'
                ],
                buses: [
                    {
                        bus_number: '1',
                        gps_id: '3457-1',
                    },
                    {
                        bus_number: '2',
                        gps_id: '3457-2',
                    },
                    {
                        bus_number: '3',
                        gps_id: '3457-3',
                    },
                    {
                        bus_number: '4',
                        gps_id: '3457-4',
                    },
                    {
                        bus_number: '6',
                        gps_id: '3457-6',
                    },
                    {
                        bus_number: '7',
                        gps_id: '3457-7',
                    },
                    {
                        bus_number: '8',
                        gps_id: '3457-8',
                    },
                    {
                        bus_number: '10',
                        gps_id: '3457-10',
                    },
                ],
                buses2: [
                    {
                        bus_number: '5',
                        gps_id: '3457-5',
                    },
                    {
                        bus_number: '9',
                        gps_id: '3457-9',
                    },
                    {
                        bus_number: '11',
                        gps_id: '3457-11',
                    },
                    {
                        bus_number: '12',
                        gps_id: '3457-12',
                    },
                ],
            }
        },

    }


</script>

