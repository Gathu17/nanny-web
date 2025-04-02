<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const center = { lat: -1.22741, lng: 36.9178 };
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCSQtWqnQxT4nVJlckKLHAqcdK3StsBYt8"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
