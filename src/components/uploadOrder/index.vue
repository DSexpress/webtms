<template>
    <div class="dash_main">
        <dashboard></dashboard>
        <maps class="maps"></maps>
        <div class="close-arrow"></div>
    </div>
</template>

<script>
import maps from './map'
import dashboard from'./dashboard'
export default {
    components:{maps,dashboard}
}
</script>

<style>
    .dash_main{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 100%;
    }
    .maps{
        flex: 1;
    }
</style>
