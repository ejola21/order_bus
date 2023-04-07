<template>
<div class="my_coupon_container">
    <!-- <img src="../assets/img/my_coupon.jpg" width="100%"> -->
    <!-- <div class="can_use_coupon">

    </div> -->
    <div v-if="my_coupon.length < 1 && using_coupon.length < 1" class="empty_coupon">
      <img class="icon_color" src="../assets/img/menu_app_down.svg" width="100%"/>
      사용 가능한 쿠폰이 없습니다.
    </div>
    <div v-else>
      <div v-if="my_coupon.length > 0">
        <div class="use_can_coupone_title">사용 가능 쿠폰</div>
        <have-coupon :item="my_coupon"/>
      </div>
      <div v-if="using_coupon.length > 0">
        <div class="use_can_coupone_title margin_top">사용한 쿠폰</div>
        <using-coupon :item="using_coupon"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
 import haveCoupon from '../components/have_coupon'
import usingCoupon from '../components/using_coupon'
export default {
  components: {
    haveCoupon,
    usingCoupon
  },
  data() {
    return {
      empty: require('../assets/img/info.svg'),
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    my_coupon() {
      return _.filter(this.$store.getters.l_user_coupon, {
        'gb': 'Y'
      })
    },
    using_coupon() {
      return _.filter(this.$store.getters.l_user_coupon, {
        'gb': 'U'
      })
    },
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);

    this.$store.dispatch('l_user_coupon', {
      user_id: this.user_id,
      store_id: this.store.store_id
    });
    // console.log(this.using_coupon);
  },
  methods: {
    
  }
}
</script>

<style scoped>
.my_coupon_container {
  /* padding: 25px; */
  /* padding: 1.5rem; */
  font-size: 0;
  /* margin-top: 3.5rem; */
  background-color: #ffffff;
}
.empty_coupon {
  height: calc(100vh - 56px);
  background-color: #ffffff;
  font-size: 1.5rem;
  text-align: center;
}
.use_can_coupone_title {
  font-size: 1rem;
  font-weight: bold;
}
.margin_top {
  margin-top: 1.5rem;
}
.icon_color {
  fill: black;
}
</style>

