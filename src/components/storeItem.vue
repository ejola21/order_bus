<template>
 <div @click="storeClick">
    <div class="gridImg">

      <div v-if="store.open_yn == 'N'"  class="store_close">
          <span>영업 마감</span>
      </div>

      <div class="grid_div" ref="box" :class="{'no_img_bg': !before_loading }">
        <lazy-component @show="handler" class="img_div">
          <img v-if="store.img_url" class="grid_img" :src='"https://s3.ap-northeast-2.amazonaws.com/tdpay.s3/data/store_img/"+store.img_url' @error='urlError'>
          <img v-else class="grid_img" :src="default_img">
        </lazy-component>
      </div>

      <div v-if="store.open_yn == 'Y'" class="content_bottom">
        <div class="grid_pruduct_title">
            <span slot="title" class="product_name">{{store.waiting_cnt}}개 상품 준비중</span>
        </div>
      </div>
      
      <!-- <div class="circle_wait">
        <div class="font_title">대기</div>
        <div class="font">{{store.waiting_cnt}}</div>
      </div> -->
    </div>
    <div class="content">
      <div class="grid_pruduct_title">
          <span slot="title" class="product_name">{{store.store_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
 export default {
  props: ['store'],
  data() {
    return {
      default_img: require('../assets/img/noimg.jpg'),
      before_loading: false,
    }
  },
  computed: {
    table_id () {
      return this.$store.getters.table_id
    }
  },
  mounted() {

  },
  methods: {
    handler() {
      this.before_loading = true;
    },
    storeClick() {
      this.$store.commit('is_back', true);
      this.$router.push('/menu/'+this.store.store_id+'/'+ this.table_id);
    }

  }
}
</script>

<style scoped>
.inline_block {
  display: inline-block;
}
.gridImg {
  width:100%;
  /* overflow: hidden; */
  position: relative;
  font-size:0;
}
.gridImg > div> div>.grid_img {
  /* 100% 비율 계산 안할때 지우면됨 */
  width: 100%;
  height: 7.5rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

/* 영업 마감 표시 위한 클래스 */
.gridImg >.store_close{
  width:100%;
  position: absolute;
  color: white;
  height: 7.5rem;
  background-color: rgba(0, 0, 0, .5);
  text-align: center;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

/* 영업 마감 표시 위한 클래스 */
.store_close span{
  line-height: 7.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.grid_div {
  width: 100%;
  height: 7.5rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}
.content {
  padding: 3% 10%;
  font-size: 0;
}
.content_bottom {
  position:absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0 , 0, 0, .6);
  padding: 3% 0;
}
.content span {
  font-size: 1.1rem;
  letter-spacing: -0.5px;
  /* font-weight: bold; */
}
.content_bottom span {
  font-size: 1.1rem;
  letter-spacing: -0.5px;
  font-weight: bold;
  color:white;
  opacity: 1;
}
.grid_pruduct_title, .grid_product_price {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:100%;
  height: 1.3rem;
}
.grid_product_price_sale {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:100%;
}
.large_price {
  /* float: right;
  margin-right: 1rem; */
  color: #0856c3;
}
.product_name {
  color: #474747;
  display:inline-block;
}
.content>.grid_product_price_sale>.price_left {
  color: #ACACAC;
  font-weight: bold;
  text-decoration: line-through;
}
.content>.grid_product_price_sale>.price_right {
  float:right;
  color:#D10000;
  font-weight: bold;
}
.sale_tag {
  position:absolute;
  color: white;
  background-color: #D10000;
  border-radius: 20px;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  top: -3%;
  left: -3%;
}
.img_div {
  text-align: center;
}
.no_img_bg {
  background-image : url('../assets/img/noimg.jpg');
}
.grid_div {
  background-size: 100% 120px;
}
.width_f {
  width: 100%;
}
.circle_wait {
  position:absolute;
  color: white;
  background-color: #0956c2;
  border-radius: 20px;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  top: -3%;
  left: -3%;
}
.circle_wait > .font{
  font-size: .9rem;
  line-height: 1;
}
.circle_wait > .font_title {
  font-size: .8rem;
  padding-top: .3rem;
}

</style>