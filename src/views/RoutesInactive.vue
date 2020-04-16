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
            Inactive Routes
          </v-card-title>
          <v-card class="accent pa-4 pb-2 mx-3"
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
                    :key="routes.id"
                    v-show="routes.bus_ID === 'No Bus'"
                    class="primary my-2"
                    elevation="5"
            >
              <v-card-title class="py-2">
                <v-row>
                  <v-col class="text-center pa-0"
                         cols="3"
                  >
                    {{ routes.route_ID }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="5"
                  >
                    {{ routes.trip_ID }}
                  </v-col>
                  <v-col class="text-center pa-0"
                         cols="4"
                  >
                    <v-select
                      v-model = "routes.bus_ID"
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
    import {http} from "../components/httpComponent";
    import {store} from "../store/store"
    export default {
        data: () => ({
            routes: [],
            items:[
                '1','2','3','4','5','6','7','8','9','10','No Bus'
            ],
        }),
        methods: {
            //submit method
            submit(id){
                let routes = this.routes.find(function (element) {
                    return element.id === id;
                });
                let updatedRoute = {
                    "id": routes.id,
                    "bus_ID": routes.bus_ID,
                    "trip_ID": routes.trip_ID,
                    "route_ID": routes.route_ID,
                };
                http.patch("/routes/" + routes.id, updatedRoute ,{headers:{
                        "authorization":store.getters.token
                    }}).then(response => {if(response.status !== 200){
                    this.routes.find(function (element) {
                        if (element.id === id){
                            if(element.bus_ID === ""){
                                element.bus_ID = ""
                            }
                            else{
                                element.bus_ID = ""
                            }

                        }
                    });
                }})
            },
            reload() {
                http.get('/routes/', {
                    headers:{
                        "authorization":store.getters.token
                    }
                })
                    .then(response => {
                        this.routes = response.data;

                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        },
        beforeMount() {
            this.reload()
        }
    }


</script>

<style scoped>

</style>
