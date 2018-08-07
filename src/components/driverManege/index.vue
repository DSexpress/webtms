<template>
    <div class="dash_main">
        <list></list>
    </div>
</template>

<script>
import list from"./parts/list.vue"
export default {
    components:{list}
};
</script>

<style>
.dash_main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
}
</style>
