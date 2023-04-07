<template>
<div class="store">
    <div class="store_title">
      <div class="title_name_img">
        <!-- <div class="main_image inline_block">
          <img v-if="store.img_url" :src="store.img_url" @error="urlError">
          <img v-else src="../assets/img/noimg.jpg" @error="urlError">
        </div> -->
        <!-- <div v-lazy-container="{ selector : 'img'}" class="main_image inline_block">
          <img :data-src='store.img_url_' :data-error='default_img' :data-loading='default_img'>
        </div> -->
        <div class="item">
          <lazy-component class="main_image inline_block">
            <img :src='store.img_url'>
          </lazy-component>
        </div>
      </div>
    </div>
    <div class="desc" v-if="store.desc">
        <div class="font_size desc_div" v-html="store.desc"></div>
    </div>
    <div class="open_clock" v-if="store.biz_time">
        <!-- <mu-icon slot="leftAvatar" class="icon" value="watch_later"/> -->
        <div class="font_div">
            <div class="font_size">영업시간</div>
            <div class="font_size"> {{ store.biz_time }} </div>
        </div>
    </div>
    <div class="delivery" v-if="store.delivery_place">
        <!-- <mu-icon slot="leftAvatar" class="icon" value="local_shipping"/> -->
        <div class="font_div">
            <div class="font_size">배달기능</div>
            <div class="font_size"> {{ store.delivery_place }} </div>
        </div>
    </div>
    <div class="origin" v-if="store.store_orign">
        <!-- <mu-icon slot="leftAvatar" class="icon" value="vpn_lock"/> -->
        <div class="font_div">
            <div class="font_size">원산지</div>
            <div class="font_size"> {{ store.store_orign }}</div>
        </div>
    </div>
    <div class="address" v-if="store.address1 || store.address_detail">
      <!-- <mu-icon slot="leftAvatar" class="icon" value="place"/> -->
      <div class="font_div">
        <span class="font_size">{{ store.address1 }} {{ store.address_detail }}</span>
      </div>
    </div>
    <div class="phone" v-if="store.phone">
      <!-- <mu-icon slot="leftAvatar" class="icon" value="stay_primary_portrait"/> -->
      <div class="font_div">
        <span class="font_size">{{ store.phone }}</span>
      </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {

  computed: {
    store() {
      let tmp = this.$store.getters.store;
      tmp.desc = tmp.desc.replace(/(?:\n)/g, '<br />');
      tmp.img_url_ = 'https://s3.ap-northeast-2.amazonaws.com/tdpay.s3/data/store_img/' + tmp.img_url;
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
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
  },
}
</script>

<style scoped>
.order_title {
  width : 100%;
  background-color: white;
}
.main_image {
  width : 100%;
  line-height: 0;
  position:relative;
}
.title_name_img {
  background-color: #f1f1f1;
  position: relative;
  line-height: 0;
}
.store_title {
  width : 100%;
  background-color: white;
}
.store {
  margin-top: 3.5rem;
  background-color: #f1f1f1;
  margin-bottom: 4.5rem;
}
.inline_block {
  display: inline-block;
}
.main_image img {
  width : 100%;
}
.open_clock, .delivery, .origin, .address, .phone {
  background-color: white;
  padding: .5rem 1rem;
  border-bottom: solid 1px #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.desc {
  border-bottom: solid 1px #e6e6e6;
  background-color: white;
  padding: 1rem;
}
.desc_div {
  vertical-align: middle;
}
.font_size {
  font-size: 1rem;
}
.font_div {
  margin-left: 1rem;
  left: 40px;
  top: .5rem;
}
.icon {
  height: 30px;
}


.coupon_div {
  background-color: #444444;
  display: block;
  width: 6%;
  height: 100px;
  display: inline-block;
  font-size: 0;
}
.circle_div {
  height: 100px;
  /* width: 100%; */
}
.inline_block {
  display: inline-block;
}
.content_div {
  width: 101%;
  margin-left: -1%;
  height: 100px;
  background-color: #444444;
  display: flex;
}
.coupon_container {
  margin: 0 5%;
  display: flex;
}
.content {
  width: 70%;
  padding: 8px;
}
.down {
  width: 30%;
  margin: 8px;
  background-color: rgba(61, 61, 61, 1);
  border: solid 2px rgba(255, 235, 0, 1);
  padding: 4px 0;
}
.down_title {
  text-align: center; 
  height: 2.3rem;
  line-height: 2.3rem;
  font-size: 1rem;
  color: rgba(255, 235, 0, 1);
}
.down_content {
  margin-top: 10px;
  height: 1.8rem;
  text-align: center;
  color:white;
  font-size: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content_title {
  color: #ffea00;
  font-size: 1rem;
}
.date {
  font-size: 1rem;
}
.date_title, .date_content {
  color: white;
  font-size: .83rem;
}
.price_div {
  width: 100%;
  display: flex;
}
.price_content, .price_end {
  color: #ffea00;
  margin-top: 10px;
}
.price_end {
  color: white;
}
.price_content {
  text-align: right;
  font-size: 1.8rem;
  width: 90%;
}
.price_end {
  width: 10%;
  align-self: flex-end;
  font-size: 1rem;
  line-height: 1.8rem;
}
.down_icon {
  border-bottom: 1px solid white;
}
.bold {
  font-weight: bold;
}

@media (max-width:360px){
  .price_content{
    font-size:1.6rem;
  }
  .price_end {
    line-height: 1.6rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .75rem;
  }
}
@media (min-width:361px) and (max-width:399px){
  .price_content{
    font-size:1.9rem;
  }
  .price_end {
    line-height: 1.9rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .9rem;
  }
}
@media (min-width:400px) and (max-width:439px){
  .price_content{font-size:1.9rem;
  }
  .price_end {
    line-height: 1.9rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: 1rem;
  }
}
@media (min-width:440px) and (max-width:479px){
  .price_content{
    font-size:1.9rem;
  }
  .price_end {
    line-height: 1.9rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: 1.1rem;
  }
}
</style>
