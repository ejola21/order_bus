<template>
<div ref="basket" v-show="is_visible" class="basket">
  <div class="basket-drag" :class="{'default_bottom_padding' : select_tab == 'default' && store.in_yn == 'N'}" :style="{maxHeight : windowHeight, height: windowHeight}">
    <div v-if="order_product_length > 0">
      <div  v-for="(product, index) in order_product" :key="index">
        <basket-item :item="product"></basket-item>
      </div>
        
      
      <div class="demo-paper add_menu_btn" @click="addOrderClick">
      
        <span><v-btn large class="menu_add">메뉴 추가</v-btn></span>
      </div>
 
      <div class="margin_top price_bottom_delivery_n">

        <div v-show="my_coupon.length > 0 || select_tab == 'delivery' || time_sale" class="price_div">
          <span>총금액</span>
          <span class="right_zero">{{formatPrice(cost, 'default')}}&nbsp;원</span>
        </div>

        <div v-show="my_coupon.length > 0" class="select_box">
          <div class="coupon_select_title">쿠폰 선택</div>
          <v-select  v-model="coupon_select" @change="coupon_use"  solo label="선택하세요"
             :items="my_coupon"  item-text="title" item-disabled ="disabled" item-value="coupon_id" >
          </v-select>
        </div>
       
        <div v-if="time_sale" class="price_div bottom_margin" :class="{ 'top_margin': my_coupon.length === 0}">
          <span>타임할인</span>
          <span class="right_zero">-{{ formatPrice( (total_sale), 'default')}} 원</span>
        </div>
        <div v-if="select_tab == 'delivery'" class="price_div bottom_margin" :class="{ 'top_margin': my_coupon.length === 0}">
          <span v-if="store.delivery_amt != 0">배달비</span>
          <span v-else>배달 최소 금액</span>
          <span v-if="store.delivery_amt != 0" class="right_zero">+{{formatPrice(store.delivery_amt, 'default')}} 원</span>
          <span v-else class="right_zero">{{formatPrice(store.min_delivery_amt, 'default')}} 원</span>
        </div>
        <div v-if="my_coupon.length > 0 || select_tab == 'delivery' || time_sale" class="default_padding" :class="{ 'padding_top' : my_coupon.length === 0 }">
            <v-divider></v-divider>
        </div>
        <div class="total_price_div">
          <span class="total_price_title">결제금액</span>
          <span class="total_price_span">{{formatPrice(total_price, 'default')}}&nbsp;원</span>
        </div>


      </div>
      <div>
        <div class="parent_select_tab">
          <div class="select_tab" v-if="(store.one_yn != 'Y' && table_id != 998 && table_id != 0) || (store.one0_yn != 'Y' && (table_id == 0 || table_id == 998))">
            <div v-if="store.in_yn == 'Y' && (table_id != 998 && table_id != 0)" class="default_tab"
            :class="[
              {select_order : select_tab == 'default'}, {no_select_border : select_tab != 'default'},
              {select_border_right: select_tab == 'default' && select_tab_cnt > 0},
              { three_font : select_tab_cnt == 2 && store.in_yn == 'Y' },
              { other_font : select_tab_cnt < 2 || store.in_yn != 'Y'}
            ]"
            @click="tab_click('default')">
              <img :src="select_tab == 'default'? default_select_img : default_nselect_img" width="25rem">
              매장주문
            </div>
            <div class="delivery_tab" v-if="store.packing_yn == 'Y'"
            :class="[
              {select_order : select_tab == 'packing'}, {no_select_border : select_tab != 'packing'},
              {select_border_all: select_tab == 'packing' && this.packing > 0 && table_id != 998 && table_id != 0 && select_tab_cnt != 1 },
              {select_border_right: select_tab == 'packing' && packing > 0 && (table_id == 998 || table_id == 0) && select_tab_cnt > 1 },
              {select_border_right: select_tab == 'packing' && packing == 0 && select_tab_cnt > 1},
              {select_border_left: select_tab == 'packing' && packing == 1 && table_id != 998 && table_id != 0},
              { three_font : select_tab_cnt == 2 && store.in_yn == 'Y' }, { other_font : select_tab_cnt < 2 || store.in_yn != 'Y'}
            ]"
            @click="tab_click('packing')">
              <img :src="select_tab == 'packing'? packing_select_img : packing_nselect_img" width="25rem">
              포장주문
            </div>
            <div class="delivery_tab" v-if="store.delivery_yn == 'Y'"
            :class="[
              {select_order : select_tab == 'delivery'},
              {no_select_border : select_tab != 'delivery'},
              {select_border_left: select_tab == 'delivery' && this.select_tab_cnt == 2},
              {select_border_left: select_tab == 'delivery' && delivery == 1 && table_id != 998 && table_id != 0},
              { three_font : select_tab_cnt == 2 && store.in_yn == 'Y' },
              { other_font : select_tab_cnt < 2 || store.in_yn != 'Y'}
            ]"

            @click="tab_click('delivery')">
              <img :src="select_tab == 'delivery'? delivery_select_img : delivery_nselect_img" width="25rem">
              배달주문
            </div>
          </div>
        </div>
      </div>
      <packing
      :class="
          [
            {border_top : store.one_yn == 'Y' && table_id != 998 && table_id != 0 },
            {border_top : store.one0_yn == 'Y' && (table_id == 0 || table_id == 998)}
          ]"
          v-if="select_tab == 'packing'"/>
      <delivery
      :class="
          [
            {border_top : store.one_yn == 'Y' && table_id != 998 && table_id != 0 },
            {border_top : store.one0_yn == 'Y' && (table_id == 0 || table_id == 998)}
          ]"
      v-else-if="select_tab == 'delivery'"/>
      <normal-order
      :class="
          [
            {border_top : store.one_yn == 'Y' && table_id != 998 && table_id != 0 },
            {border_top : store.one0_yn == 'Y' && (table_id == 0 || table_id == 998)}
          ]"
          v-else-if="select_tab == 'default'"/>
    </div>
    <div v-else class="no_content">
      <div class="error-mark-wrap">
      
        <div class="demo-paper add_menu_btn" @click="addOrderClick">
          <span><v-btn large>메뉴 추가</v-btn></span>
        </div>
      
      
        <div class="empty_basket">
          <img src="../assets/img/empty_basket.png" width="55%"/>
        <div class="tit">장바구니가 비어있습니다.</div>
        <div class="con" style="font-size:1.1rem;">상품을 골라 한 번에 결제해보세요 ^^</div>
        
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
 import basketItem from "../components/basketItem";
// import orderBtn from '../components/orderBtn';
// import snsLogin from '../components/snsLogin';

import packing from "../components/packing";
import delivery from "../components/delivery";
import normalOrder from "../components/normalOrder";

export default {
  components: {
    basketItem,
    packing,
    delivery,
    normalOrder
  },
  computed: {
    is_visible() {
      return this.$store.getters.is_visible;
    },
    order_product_length() {
      return this.$store.getters.order_product_length;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    is_login() {
      return this.$store.getters.is_login;
    },
    // is_sns_login() {
    //   return this.$store.getters.is_sns_login
    // },
    total_price() {
      var _price = 0;
      var _this = this;
      var chk_time_sale = false;
      var chk_cnt = 0;
      this.total_sale = 0;
      _.forEach(this.order_product, function(value, key) {
        //console.log('value : ', value, value.price, key);
        
        if (value.product.sale_gb === "T" && _this.select_tab === "packing") {
          if (value.product.sale_st_time1 !== "") {
            chk_time_sale = _this.timeCalc(
              value.product.sale_st_time1,
              value.product.sale_ed_time1
            );
            // chk_time_sale = _this.timeCalc('0000', '2359');
          }
          if (value.product.sale_st_time2 !== "" && !chk_time_sale) {
            chk_time_sale = _this.timeCalc(
              value.product.sale_st_time2,
              value.product.sale_ed_time2
            );
            // chk_time_sale = _this.timeCalc('0000', '2359');
          }
        }
        //console.log('111',chk_time_sale, _price,value.product.sale_price);

        if (chk_time_sale) {
          //if (parseInt(value.product.sale_price) == 0 ||  (parseInt(value.product.sale_price) > parseInt(value.product.sale_time_price))) {

          let sale_tmp = 0;
          if (parseInt(value.product.sale_price) > 0)
            sale_tmp =
              parseInt(value.product.sale_price) -
              parseInt(value.product.sale_time_price);
          else
            sale_tmp =
              parseInt(value.product.price) -
              parseInt(value.product.sale_time_price);
          sale_tmp *= parseInt(value.cnt);
          _this.total_sale += sale_tmp;

          _price -= sale_tmp;
          _this.time_sale_obj = {
            st_time1: value.product.sale_st_time1,
            ed_time1: value.product.sale_ed_time1,
            st_time2: value.product.sale_st_time2,
            ed_time2: value.product.sale_ed_time2
          };
          if (parseInt(value.price) > parseInt(value.product.sale_time_price)) {
            chk_cnt++;
          }
          
        }

        _price = _price + parseInt(value.price);

        chk_time_sale = false;
        if (chk_cnt > 0) _this.time_sale = true;
        else _this.time_sale = false;
      });
      let coupon = this.$store.getters.coupon_obj;
      if (coupon != "" && coupon.coupon_type === "P") {
        _price -= parseInt(coupon.amt);
      } else if (coupon != "" && coupon.coupon_type === "R") {
        _price -= _price * (coupon.amt / 100);
        _price /= 100;
        _price = Math.ceil(_price) * 100;
        //100단위 올림
      }
      if (this.select_tab === "delivery") {
        _price += parseInt(this.store.delivery_amt);
      }
      // this.total_sale = 0;

      this.$store.commit("sum_price", _price);


      return _price;
    },
    cost() {
      var _price = 0;
      _.forEach(this.order_product, function(value, key) {
        _price = _price + parseInt(value.price);
      });

      return _price;
    },
    addr() {
      return this.$store.getters.addr;
    },
    user_phone() {
      return this.$store.getters.user_phone;
    },
    basket_tab() {
      return this.$store.getters.basket_tab;
    },
   
    coupon_obj() {
      return this.$store.getters.coupon_obj;
    },
    l_product() {
      return this.$store.getters.l_product;
    },
    my_coupon() 
    {
      
      let _my_coupon =  _.filter(this.$store.getters.l_user_coupon, {
        gb: "Y"
      });

      console.log("my_coupon", _my_coupon);
      let _this = this;

      _.forEach(_my_coupon, function(value, key) {
        
        value.disabled  = (_this.cost > value.target_amt) ? false : true;

        if (value.coupon_type === "P") {

          if (key.coupon_id === _this.coupon_select) {
            value.title =   _this.formatPrice(value.amt,"");
          }
          else
          {
            value.title =  _this.formatPrice(value.amt,"")+ " 이상 )";
          }

          value.title =   _this.formatPrice(value.amt,"");
        }
        else if (value.coupon_type === "R") {
          
          if (key.coupon_id === _this.coupon_select) {
            value.title =  value.amt + "% 할인";
          }
          else
          {
            value.title =  value.amt +  "% 할인 (" + _this.formatPrice(value.target_amt,"") + " 이상 )";
          }
        }
        else  
        {
          if (key.coupon_id != _this.coupon_select) 
          {
            value.title =  value.amt +  " (" + _this.formatPrice(value.target_amt,"") + " 이상 )";
          }
        }
      });

      if ( _my_coupon.length > 0 )
        _my_coupon.unshift({
          amt:"",
          coupon_id:"0",
          coupon_type:"",
          ed_dt:"",
          gb:"",
          st_dt:"",
          target_amt:"",
          title:"선택하세요",
          disabled : false,
          user_id:""});

      return _my_coupon;
      
    },
    time_sale_confirm() {
      return _.filter(this.l_product, {
        sale_gb: "T"
      });
    }
  },
  data() {
    return {
      default_nselect_img: require("../assets/img/default_n.svg"),
      default_select_img: require("../assets/img/default_s.svg"),
      delivery_nselect_img: require("../assets/img/delivery_n.svg"),
      delivery_select_img: require("../assets/img/delivery_s.svg"),
      packing_select_img: require("../assets/img/packing_s.svg"),
      packing_nselect_img: require("../assets/img/packing_n.svg"),
      select_tab_cnt: 0,
      // m_user_id: '',
      windowHeight: "",
      front_phone: "",
      back_phone: "",
      params: {
        dialog: false,
        title: "",
        desc: "",
        result: false,
        length: 0
      },
      select_tab: "default",
      pay: false,
      delivery: false,
      packing: -1,
      coupon_select: 0,
      time_sale: false,
      time_sale_obj: false,
      total_sale: 0,
      //my_coupon :[],
    };
  },
  mounted() {
    this.$store.commit("is_select_store", false);
    this.$store.commit("is_back", false);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);

    window.addEventListener("hashchange", () => {
      document.getElementById("ALLAT_MOBILE_PAY").style.display = "none";
      this.$store.commit("is_visible", true);
    });

    if (this.store.in_yn == "Y") {
      this.pay = true;
    }
    if (this.store.packing_yn == "Y") {
      this.select_tab_cnt++;
      if (this.pay) this.packing = 1;
      else {
        this.packing = 0;
        this.select_tab = "packing";
      }
    }
    if (this.store.delivery_yn == "Y") {
      this.select_tab_cnt++;
      if (this.pay && this.packing > 0) this.delivery = 2;
      else if (this.packing == -1 && this.pay) {
        this.delivery = 1;
      } else if (!this.pay && this.packing > -1) {
        this.delivery = 1;
      } else {
        this.delivery = 0;
        this.select_tab = "delivery";
      }
    }

    if (this.packing !== -1 && this.basket_tab === "packing" ) {
      this.select_tab = "packing";
      this.$store.commit("basket_tab", "packing");
    }
     else if (this.delivery !== false && this.basket_tab === "delivery" ) 
    {
      this.select_tab = "delivery";
      this.$store.commit("basket_tab", "delivery");
    } else if (this.table_id == 998) {
      if (this.store.delivery_yn == "Y") {
        this.select_tab = "delivery";
        this.$store.commit("basket_tab", "delivery");
      } else if (this.store.packing_yn == "Y") {
        this.select_tab = "packing";
        this.$store.commit("basket_tab", "packing");
      } else {
        this.select_tab = "";
      }
    } else if (this.table_id == 0) {
      if (this.store.packing_yn == "Y") {
        this.select_tab = "packing";
        this.$store.commit("basket_tab", "packing");
      } else if (this.store.delivery_yn == "Y") {
        this.select_tab = "delivery";
        this.$store.commit("basket_tab", "delivery");
      } else {
        this.select_tab = "";
      }
    } else if (this.basket_tab == "address_add") {
      this.select_tab = "delivery";
      this.$store.commit("basket_tab", "delivery");
    } else if (this.select_tab == "delivery") {
      this.$store.commit("basket_tab", "delivery");
    } else if (this.select_tab == "packing") {
      this.$store.commit("basket_tab", "pakking");
    } else {
      this.select_tab = "default";
      this.$store.commit("basket_tab", "default");
    }

    // console.log(this.select_tab)

    // this.$store.commit('title', '장바구니');
    this.$store.commit("is_popup", {
      is_popup: false,
      title: "",
      desc: ""
    });


    if (this.$refs.basket.clientHeight < window.innerHeight) {
      this.windowHeight = window.innerHeight - 56;
      this.windowHeight += "px";
      // console.log(this.$refs.basket.clientHeight)
      // console.log(window.innerHeight)
    }

    if (this.user_id.length > 9) {
      this.front_phone = this.user_id.substring(0, 3);
      let back_num = this.user_id.split(this.front_phone)[1];
      this.back_phone = back_num.substring(0, back_num.length);
    } else if (this.user_phone != "" && this.user_id.length < 9) {
      this.front_phone = this.user_phone.substring(0, 3);
      let back_num = this.user_phone.split(this.front_phone)[1];
      this.back_phone = back_num.substring(0, back_num.length);
    } else {
      this.front_phone = "010";
    }

    let params = {
      user_id: this.user_id,
      store_id: this.store.store_id
    };

    this.$store.dispatch("l_user_coupon", params).then(res => {
      //this.coupon_init();
    });
    
    this.coupon_select = "0";
    this.$store.commit("coupon_obj", "");
  },
  methods: {
    addOrderClick() {
      if (this.order_product.length > 9) {
        this.showToast("장바구니가 꽉 찼습니다. (최대 10개)");
      } else {
        this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
      }
    },
    tab_click(s_tab) {
      this.$store.commit("basket_tab", s_tab);
      this.select_tab = s_tab;
      //first_chk = false;
      if (this.select_tab !== "packing") {
        this.time_sale = false;
      }
    },
    address_add_click() {
      this.$router.push("/address");
    },
    coupon_use() {
      
      this.$nextTick(() => {

        console.log("coupon_use",this.coupon_select);

        let cou = this.getCoupon(this.coupon_select);

        if (cou.length > 0 && this.isNumber(cou[0].amt)) {
          this.$store.commit("coupon_obj", cou[0]);
        } else if (cou.length > 0 && !this.isNumber(cou[0].amt)) {
          this.$store.commit("coupon_obj", cou[0]);
        } else {
          this.$store.commit("coupon_obj", "");
        }
        console.log("coupon_use2");
      });
    },
    getCoupon(id) {
      return _.filter(this.my_coupon, {
        coupon_id: id
      });
    },
    
  }

};
</script>

<style media="screen">
</style>

<style scoped>
.basket {
  /* margin-top: 3.5rem; */
  background-color: #eee;
}
.basket > .basket-drag {
  overflow: auto;
}
.all_check {
  width: 100%;
  border-bottom: 1px solid #95989a;
  padding-bottom: 0.2rem;
}
.order_btns {
  background-color: white;
}
.basket-item {
  padding: 1rem;
  padding-bottom: 0.5%;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #043474;
    width: 100%;
}
.v-btn.v-size--default {
    font-size: 1.3rem;
    font-weight: bold;
}
.theme--light.v-btn {
    color: #ffffff;
}
.add_menu_btn,
.coupon_list {
  margin: 1rem;
  margin-bottom: 1px;
  border-radius: 10px;
}
.add_menu_btn > div > img {
  vertical-align: bottom;
}
.add_menu_btn > div > span {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}
.add_menu_btn > div > span {
  line-height: 3.1rem;
  vertical-align: middle;
}
.add_menu_btn > div > .basket_menu_plus {
  font-size: 1.3rem;
  color: #8a8a8a;
  vertical-align: middle;
}
.add_menu_btn > div {
  text-align: center;
}

.add_menu_btn {
  background-color: #0856c3;
}

.price {
  text-align: center;
  padding: 1.5rem 1rem;
  padding-top: 2rem;
}

.price_title {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(30, 30, 30);
}
.price_content > span,
.price_content {
  font-weight: bold;
  color: #0856c3;
}

.price_content {
  font-size: 2.7rem;
  text-align: center;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price_content > span {
  font-size: 2rem;
}

.bottom {
  clear: both;
  margin-top: 4rem;
}

.btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  height: 4rem;
  text-align: center;

  display: table;
  float: right;
}

.mu-checkbox-label {
  font-size: 0.8rem !important;
  margin-left: 0px;
}

.no_content {
  text-align: center;
  background-color: #eee;
  height: 100vh;
}

.error-mark {
  vertical-align: middle;
  margin-right: 5px;
  position: relative;
  bottom: 1px;
}
.empty_basket {
  margin-top: 3rem;
}
.select_tab {
  background-color: white;
  font-size: 0;
  height: 3rem;
  width: 100%;
  display: flex;
  z-index: 5;
  /* border-bottom: 3px solid #175ab7; */
}
.border_top {
  border-top: 3px solid #175ab7;
}
.delivery_tab,
.default_tab {
  flex: 1;
  line-height: 3.5rem;
  text-align: center;
  font-weight: 600;
  color: #8a8a8a;
  box-sizing: border-box;
  background-color: #e3e3e3;
  border-top: 3px solid #e3e3e3;
}
.three_font {
  font-size: 1rem;
}
.other_font {
  font-size: 1.3rem;
}
.select_border_right {
  border-right: 0.05rem solid #bbbbbb;
}
.select_border_left {
  border-left: 0.05rem solid #bbbbbb;
}
.select_border_all {
  border-right: 0.05rem solid #bbbbbb;
  border-left: 0.05rem solid #bbbbbb;
}

.select_order {
  border-top: 0.05rem solid #bbbbbb;
  border-bottom: 0px solid white;
  color: #175ab7;
  background-color: white;
  z-index: 5;
}

.margin_div {
  padding: 0 2rem;
  height: 1px;
  border-top: 0.05rem solid #bbbbbb;
}
.parent_select_tab {
  /* border-bottom: 3px solid #175ab7; */
  font-size: 0;
  position: relative;
}
.select_tab img {
  vertical-align: middle;
  margin-bottom: 10px;
}
.no_select_border {
  border-bottom: 0.05rem solid #bbbbbb;
  border-top: 0.05rem solid #bbbbbb;
}
.delivery_n {
  border-top: 1px solid #bbbbbb;
}
.price_bottom_delivery_n {
  margin-bottom: 2rem;
}
.font_bold {
  font-weight: bold;
}

.s_border_left {
  border-left: 0.05rem solid #bbbbbb;
}
.n_border_left {
  border-left: 3px solid #bbbbbb;
}
.default_bottom_padding {
  padding-bottom: 65px;
}

.price_div {
  position: relative;
  padding: 0 2rem;
  padding-bottom: 0;
  color: #444444;
  font-size: 1.1rem;
}
.price_div *,
.select_box * {
  font-weight: 600;
}
.right_zero {
  position: absolute;
  right: 0;
  padding-right: 2rem;
}
.select_box {
  margin: 0 2rem;
  /* display: flex; */
}
.coupon_select_title {
  font-size: 1.1rem;
  color: #444444;
  width: 30%;
  line-height: 48px;
}
.default_padding {
  padding: 0 1rem;
  width: 100%;
}
.total_price_div {
  display: flex;
  padding: 1rem 2rem;
}
.total_price_title {
  width: 35%;
  font-size: 1.6rem;
  font-weight: bold;
  color: #0856c3;
}
.total_price_span {
  width: 65%;
  font-size: 1.6rem;
  color: #0856c3;
  font-weight: bold;
  text-align: right;
}
.margin_top {
  margin-top: 2rem;
}
.padding_top {
  padding-top: 0.5rem;
}
.bottom_margin {
  margin-bottom: 0.7rem;
}
.top_margin {
  margin-top: 0.7rem;
}
.time_sale_desc {
  padding: 1rem 2rem;
  padding-top: 0;
}

.time_sale_div {
  font-size: 1.2rem;
  text-align: center;
  color: red;
}

@media (max-width: 350px) {
  .total_price_title,
  .total_price_span {
    font-size: 1.3rem;
  }
}
.menu_add {
  color: white;
  font-size: 1.2rem;
}
.v-btn.v-size--large {
    font-size: 1.2rem;
}
.tit {
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 0.3rem;
}
</style>