<template>
 <div class="addressItem"  v-on:click="$emit('item-select',item)" >
   <!-- <img class="place_img" src="../assets/img/search_place.png" width="20rem"/> -->
    <div class="jibun">
      {{item.jibunAddr}}
    </div>
    <div class="road">
      {{item.roadAddr}}
    </div>
  
  </div>

</template>

<script>
export default {
    name: "addressItem",
    props: ['item'],
}
</script>

<style lang="css" scoped="">
.addressItem{
  font-size: 1rem;
  padding: .5rem;
  font-weight: normal;
}

.road{
  margin-top :0.5rem;
}


</style>