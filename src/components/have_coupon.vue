<template>
  <div>
    <div class="coupon_container" v-for="(coupon, index) in item" :key="index">
      <div class="content_div">
        <div class="coupon_div">
          <div class="circle_div" :style="{ 'background-image' : 'url(' + require('../assets/img/coupon_front1.png') + ')'}" style="background-size: 21px 100%"></div>
        </div>
        <div class="content">
            <div class="content_title bold">&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;P&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;N</div>
            <div class="price_div" v-if="coupon.coupon_type == 'P'">
                <span class="money">{{formatPrice(coupon.amt, 'default')}}</span>
                <span class="price_end">원</span>
            </div>
            <div class="price_div" v-else-if="coupon.coupon_type == 'R'">
              <span class="money">
                {{coupon.amt}}% 할인
              </span>
            </div>
            <div class="price_div" v-else>
              <span class="money">
                {{coupon.amt}}
              </span>
            </div>
            <div class="min_amt" v-if="coupon.target_amt != '0'">
              <div class="min_amt_text">( {{formatPrice(coupon.target_amt, 'default')}}원 이상 구매시 적용 )</div>
            </div>
            <div class="date">
              <span class="date_title">유효기간 </span>
              <span class="date_content">{{coupon.st_dt}} ~ {{coupon.ed_dt}}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "coupon_desc",
  props: ['item'],
  computed: {
    
  },
  data() {
    return {

    }
  },
  mounted() {
    // console.log(this.item);  
  },
  methods: {
      
  }
}
</script>

<style scoped>
.coupon_div {
  display: block;
  width: 5%;
  /* height: 100px; */
  display: inline-block;
  font-size: 0;
}
.circle_div {
  height: 100%;
  margin-left: -1px;
  /* width: 100%; */
}
.inline_block {
  display: inline-block;
}
.content_div {
  width: 101%;
  margin-left: -1%;
  /* height: 100px; */
  display: flex;
  box-shadow: 0 6px 3px -3px rgb(164, 164, 164);
}
.coupon_container {
  margin: 5% 0;
  display: flex;
}
.content {
  margin-left: -1px;
  width: 100%;
  padding: 8px 0;
  padding-top: 15px;
  background-color: #444444;
}
.content_title {
  background-color: #ffea00;
  color: rgb(68, 68, 68);
  font-size: 1rem;
  padding-top: 3px;
}
.min_amt {
  padding: 0 8px;
  padding-top: 2px;
}
.date_title, .date_content {
  color: white;
  font-size: .83rem;
}
.min_amt_text {
  font-size: .83rem;
  color: rgb(161, 161, 161);
}
.price_div {
  width: 100%;
  /* display: flex; */
  padding: 0px 8px;
  padding-top: 5px;
  padding-bottom: 2px;
}
.money {
  color: #ffea00;
  /* margin-top: 10px; */
}
.price_end {
  padding-left: 10px;
  color: white;
}
.price_content>span {
  font-weight: bold;
}
.price_content {
  padding-top: 5px;
  width: 100%;
}
.price_end {
  margin-left: -5px;
  font-size: 1rem;
  line-height: 1.8rem;
}
.bold {
  font-weight: bold;
}
.date {
  padding: 0 8px;
}

@media (max-width:360px){
  .money{
    font-size:2rem;
    line-height: 2.5rem;
  }
  .price_div {
    height: 2.5rem;
  }
  .price_end {
    line-height: 2.5rem;
    font-size: 1.4rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .68rem;
  }
}
@media (min-width:361px) and (max-width:399px){
  .money{
    font-size:2.2rem;
    line-height: 3rem;
  }
  .price_end {
    line-height: 3rem;
    font-size: 1.5rem;
  }
  .price_div {
    height: 3rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .8rem;
  }
}
@media (min-width:400px) and (max-width:439px){
  .money{
    font-size:2.3rem;
    line-height: 3.2rem;
  }
  .price_div {
    height: 3.2rem;
  }
  .price_end {
    line-height: 3.2rem;
    font-size: 1.6rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .9rem;
  }
}
@media (min-width:440px) and (max-width:479px){
  .money{
    font-size:3.4rem;
    line-height: 3.4rem;
  }
  .price_div {
    height: 3.4rem;
  }
  .price_end {
    font-size: 1.7rem;
  }
  .date_title, .date_content {
    color: white;
    font-size: .9rem;
  }
}
</style>