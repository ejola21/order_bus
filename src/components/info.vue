<template>
    <div class="information">
      <img :src="store.img_url_">
      <div class="con_wrap">
        <div class="tit">{{store.store_name}}</div>
        <div id="grid">
        <div class="sub_tit">
          영업시간<br/>
          배달<br/>
          원산지<br/>
          주소<br/>
          전화번호
        </div>
        <div class="con">
          {{ store.biz_time }}<br/>
          {{ store.delivery_place }}<br/>
          {{ store.store_orign }}<br/>
          {{ store.address1 }} {{ store.address_detail }}<br/>
          {{ store.phone }}
          </div>
          </div>
        </div>
      
    </div>
</template>

<script>
 export default {
  name: "info",
  computed: {
    store() {
      let tmp = this.$store.getters.store;
      tmp.desc = tmp.desc.replace(/(?:\n)/g, '<br />');
      //if (tmp.store.img_url_)
      tmp.img_url_ = 'https://s3.ap-northeast-2.amazonaws.com/tdpay.s3/data/store_img/' + tmp.img_url;
      console.log('!!!!!!',tmp.img_url);
      return tmp;
    },
  },
  data() {
    return {
      default_img: require('../assets/img/noimg.jpg'),
    }
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', false);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
  },
}

</script>

<style scoped>
.information img { display:block; width:100%; }
.information .con_wrap { font-size:0.9rem; line-height:2rem; border-bottom: 0.1rem groove #e0e0e0;}
.information .con_wrap .tit { margin: 0.5rem; font-size:1.2rem; font-weight:bold; margin-bottom:0.4rem; }
.information .con_wrap .sub_tit { float:left; font-weight:bold; margin-right: 0.9rem;}
.information .con_wrap .con { float:left; }
#grid{
  display: grid;
  grid-auto-flow: column;
  margin: 1rem;
}
</style>