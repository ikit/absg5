<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div
      id="map-wrap"
      style="height: 100vh"
    >
      <l-map
        ref="theMap"
        :zoom="zoom"
        :center="center"
        zoom-control="false"
      >
        <l-tile-layer :url="url" />
        <l-marker-cluster ref="markersLayer">
          <l-marker
            v-for="p in persons"
            :key="p.id"
            :lat-lng="p.location"
          >
            <l-icon
              :icon-size="dynamicSize"
              :icon-anchor="dynamicAnchor"
              :icon-url="p.avatar.url"
            />
            <l-popup>
              {{ p.avatar.label }}
            </l-popup>
          </l-marker>
        </l-marker-cluster>
      </l-map>
    </div>


    <div style="position: absolute; top: 10px; left: 50px; z-index: 2000; text-align: center">
      <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="accent" fab small v-on="on" style="margin-right: 10px">
                        <v-icon>far fa-clock</v-icon>
                    </v-btn>
                </template>
                <span>Naviguer dans le temps</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" fab small v-on="on" style="margin-right: 10px">
                        <v-icon>fas fa-layer-group</v-icon>
                    </v-btn>
                </template>
                <span>Masquer/Afficher des informations</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" fab small v-on="on" style="margin-right: 10px">
                        <v-icon>fas fa-search</v-icon>
                    </v-btn>
                </template>
                <span>Rechercher sur la carte</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" fab small v-on="on" style="margin-right: 10px">
                        <v-icon>fas fa-map-pin</v-icon>
                    </v-btn>
                </template>
                <span>Ajouter des données</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" fab small v-on="on" style="margin-right: 10px" @click="centerUpdate(myPosition)">
                        <v-icon>fas fa-crosshairs</v-icon>
                    </v-btn>
                </template>
                <span>Recentrer sur ma position</span>
            </v-tooltip>
             -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { parseAxiosResponse, getPeopleAvatar } from '../middleware/CommonHelper';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import { latLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LIcon,
        'l-marker-cluster': Vue2LeafletMarkerCluster
    },
    data: () => ({
        zoom: 11,
        center: latLng(57.41322, 1.219482),
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        showParagraph: false,
        mapOptions: {
            zoomSnap: 0.5
        },
        persons: [],
        myPosition: [],
        iconSize: 64
    }),
    computed: {
        dynamicSize() {
            return [this.iconSize, this.iconSize * 1.15];
        },
        dynamicAnchor() {
            return [this.iconSize / 2, this.iconSize * 1.15];
        }
    },
    mounted () {
        axios.get(`/api/voyag`).then(response => {
            const data = parseAxiosResponse(response);
            this.myPosition = data.myPosition;
            this.centerUpdate(this.myPosition);
            this.persons = data.persons.filter(e => Array.isArray(e.lastLocation)).map(i => ({
                id: i.id,
                personId: i.personId,
                avatar: getPeopleAvatar(i),
                location: latLng(i.lastLocation[0], i.lastLocation[1])
            }));

            this.isLoading = false;
            var group = new L.featureGroup(this.persons);
            this.$refs.theMap.fitBounds(group.getBounds());
        });

    },
    methods: {
        zoomUpdate(zoom) {
            this.zoom = zoom;
        },
        centerUpdate(position) {
            this.$refs.theMap.setCenter(latLng(position), this.center);
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert("Click!");
        },
        onUpdateMyPosition () {
            if(navigator.geolocation) {
                vigator.geolocation.getCurrentPosition(this.showPosition);
            }else{
                displayError("La géolocalisation n'est pas supoportée par votre navigateur web.");
                this.error = "Geolocation is not supported.";
            }
        },
        showPosition:function (position) {
        }
    }
};

</script>

<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

</style>
