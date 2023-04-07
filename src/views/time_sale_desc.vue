<template>
 <section ref="time_height" class="time_sale_desc_container">
      <img :src="store.ban_detail_img1" width="100%">
  </section>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
  },
  mounted() {
    let vh = window.innerHeight * 0.01;
    // document.querySelector('.time_sale_desc_container').style.setProperty('--vh', `${vh}px`);
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);

    
  },
  methods: {
    
  }
}
</script>

<style scoped>
.time_sale_desc_container {
    margin-top: 56px;
    /* background-image: url('../assets/img/test_s2300002.jpg');
    background-repeat: no-repeat; */
    display: block;
    /* background-position: center center;
    background-size: 100% 100%; */
    height: auto;
    /* height: 100vh;
    height: calc(var(--vh, 1vh) * 100 - 56px); */
}
</style>

