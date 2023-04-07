<template>
    <div class="coupon_list_container">
    <div class="width_div">
      <img class="back_img" :src="back_img" width="100%" />
    </div>
    <div class="coupon_div">
      <coupon-desc :item="l_coupon"></coupon-desc>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
 import couponDesc from '../components/coupon_desc';
export default {
  components: {
    couponDesc
  },
  data() {
    return {
      back_img: require('../assets/img/coupon_list_back.png'),
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    l_coupon() {
      return this.$store.getters.l_coupon;
    },
    user_id() {
      return this.$store.getters.user_id;
    }
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
    this.$store.dispatch('l_coupon', {
      store_id: this.store.store_id
    });
    // alert(this.user_id);
  },
  methods: {
    
  }
}
</script>

<style scoped>
.coupon_list_container {
  font-size: 0;
  /* margin-top: 3.5rem; */
  height: auto;
  width: 100%;
  background-color: rgb(234, 234, 234);
  
}
.coupon_div {
  padding: 1rem;
  float:left;
  width: 100%;
  margin-top: -40%;
}
.width_div {
  width: 100%;
  float: left;
}
</style>