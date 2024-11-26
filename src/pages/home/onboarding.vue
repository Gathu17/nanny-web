<template>
    <div class="min-h-screen w-full bg-gradient-to-br from-pink-300 to-purple-600 flex items-center justify-center">
        <div v-if="profile" class="w-[80%] rounded bg-white p-8">
            <h1 class="font-bold text-xl">What kind of jobs are you looking for?</h1>
            <p class="text-sm font-lighter">Don't worry - you can add profiles once you've registered</p>
            <div class="flex justify-around mt-6">
                <div class="flex-1 h-[10vh] shadow-lg text-center p-8 mr-4">
                Babysitter
            </div>
            <div class="flex-1 h-[10vh] shadow-lg text-center p-8 mr-4">
                HouseKeeper
            </div>
            <div class="flex-1 h-[10vh] shadow-lg text-center p-8">
                Care Companion
            </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const profile = ref<boolean>(true);
const onboarding = ref<boolean>(false);

function handleClick() :void{

}
</script>