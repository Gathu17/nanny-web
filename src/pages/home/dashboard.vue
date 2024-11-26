<template>
 <NuxtLayout name="nanny-layout"></NuxtLayout>
 <aside>
   <Filters/>
 </aside>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const filters = ref([])

</script>