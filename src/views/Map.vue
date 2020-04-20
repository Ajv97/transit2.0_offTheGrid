<template>
  <div>
    <div style="width: 100%; height: 500px" id="map-container"></div>
  </div>
</template>
<script>
    let H = window.H;
    export default {
        name: "Map",
        data: function () {
            return {
                platform: null,
                map: null,
                behavior: null,
                ui: null,
                defaultLayers: null,
                lat: 51.520763,
                lng: -0.102138,
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                speed: 0,
                heading: 0,
                msg: "...",
                idWatch: false,
                marker: null,
                dialog: false,
                show_info: false,
                loading: false,
                loading_followme: false,
                fab: true
            }
        },
        created: function () {
            this.$root.$on('switchLayerSatelliteTraffic', this.switchLayerSatelliteTraffic);
            this.$root.$on('switchLayerNormalTraffic', this.switchLayerNormalTraffic);
            this.$root.$on('showInfo', this.showInfo);
        },
        mounted: function () {
            this.platform = new H.service.Platform({
                'apikey': process.env.VUE_APP_HERE_APP_CODE,
                'app_id': process.env.VUE_APP_HERE_APP_ID,
                'useHTTPS': true
            });
            //this.platform.configure(H.map.render.panorama.RenderEngine)
            var zoom_default = 14;
            // if you need to customize the BaseLayer:
            // https://developer.here.com/documentation/maps/topics/map-types.html
            this.defaultLayers = this.platform.createDefaultLayers();
            this.map = new H.Map(
                document.getElementById('map-container'),
                this.defaultLayers.normal.map,
                {
                    zoom: zoom_default,
                    center: {lat: this.lat, lng: this.lng},
                    //engineType: H.Map.EngineType.PANORAMA
                }
            );
            this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
            this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
            this.useMetricMeasurements(this.map, this.defaultLayers);
            //this.map.getViewPort().resize();
        },
        methods: {
            showInfo: function () {
                console.log("Show INfo")
                this.show_info = true
            },

            switchLayerNormalTraffic: function () {
                this.map.setBaseLayer(this.defaultLayers.normal.traffic)
            },
            switchLayerSatelliteTraffic: function () {
                console.log("switchLayerSatelliteTraffic")
                this.map.setBaseLayer(this.defaultLayers.satellite.traffic)
            },
            useMetricMeasurements: function (map, defaultLayers) {
                var ui = H.ui.UI.createDefault(map, defaultLayers);
                ui.setUnitSystem(H.ui.UnitSystem.METRIC);
            }
        }
    }
</script>
