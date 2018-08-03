<template>
    <div class="dash_main">
        <dashboard></dashboard>
        <maps class="maps"></maps>
       
    </div>
</template>

<script>
import maps from './parts/map'
import dashboard from'./parts/dashboard'
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
