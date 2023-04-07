<template>
<div class = "payBtn" >
    <v-btn x-large color="primary" class="btn_order2"  block @click="$emit('pay_go_click')">{{btn_name}}</v-btn> 
    
    
    <!--
    KG삼성페이는 kg바로콜 accept-charset="euc-kr" 로 설정
    KG카카오페이는 우리서버에서 넘기고 우리서버에서 KG 콜 accept-charset="euc-kr" 로 설정안함
    세틀은 세틀뱅크 페이지 바로 콜함
    -->

    <form  ref="kg_kakao" method="post" :action = "api_url + 'kg_call_web'">
      <input type="hidden" name="allat_shop_id" value="2dpayshop">
      <input type="hidden" name="allat_pay_type" value="CARD">
  		<input type="hidden" name="allat_order_no" v-model="order_no">
  		<input type="hidden" name="allat_amt" v-model="amt">
  		<input type="hidden" name="allat_pmember_id" v-model="user_id">
  		<input type="hidden" name="allat_product_cd" v-model="product_id">
  		<input type="hidden" name="allat_product_nm" v-model="product_name">
  		<input type="hidden" name="allat_buyer_nm" :value="buyer_name">
  		<input type="hidden" name="allat_recp_nm" :value="recp_name">
  		<input type="hidden" name="allat_recp_addr" value="서울시 강남구">
  		<input type="hidden" name="shop_receive_url" :value="api_url + 'kg_approval'">
  		<input type="hidden" name="allat_enc_data">

      <input type="hidden" name="allat_settle_agency_amt" v-model="agency_amt">
  		<input type="hidden" name="allat_autoscreen_yn" value="Y">
  		<input type="hidden" name="allat_card_yn" value="Y">
  		<input type="hidden" name="allat_abank_yn" value="N">
  		<input type="hidden" name="allat_vbank_yn" value="N">
  		<input type="hidden" name="allat_test_yn" value="N">
  		<!-- <input type="hidden" name="allat_select_pay_type" value="CARD"> -->
      <!-- <input type="hidden" name="allat_card_id" value="63"> -->
  		<input type="hidden" name="allat_spay_type" value="KAKAO">
  		<input type="hidden" name="allat_vat_amt" value="">
      <input type="hidden" name="allat_sell_mm" value="00">
    </form>
    
    <form ref="kg_sspay" name="kg_sspay" accept-charset="euc-kr" method="post">
  		<input type="hidden" name="allat_shop_id" value="2dpayshop">
  		<input type="hidden" name="allat_pay_type" value="CARD">
  		<input type="hidden" name="allat_order_no" v-model="order_no">
  		<input type="hidden" name="allat_amt" v-model="amt">
  		<input type="hidden" name="allat_pmember_id" v-model="user_id">
  		<input type="hidden" name="allat_product_cd" v-model="product_id">
  		<input type="hidden" name="allat_product_nm" v-model="product_name">
  		<input type="hidden" name="allat_buyer_nm" :value="buyer_name">
  		<input type="hidden" name="allat_recp_nm" :value="recp_name">
  		<input type="hidden" name="allat_recp_addr" value="서울시 강남구">
  		<input type="hidden" name="shop_receive_url" :value="api_url +'kg_approval'">
  		<input type="hidden" name="allat_enc_data">

      <input type="hidden" name="allat_settle_agency_amt" v-model="agency_amt">
  		<input type="hidden" name="allat_autoscreen_yn" value="Y">
  		<input type="hidden" name="allat_test_yn" value="N">
  		<input type="hidden" name="allat_spay_type" value="SSPAY">
  		<input type="hidden" name="allat_sell_mm" value="00">
    </form>

    <form class ="settle" ref="settle_app" method="post" action="https://pg.settlebank.co.kr/card/MbNewCardAction.do">
      <input type="hidden" name="PMid" :value="store.sb_auth_id"><!--세트뱅크 가맹점 상점ID -->
      <input type="hidden" name="POid" v-model="order_no">
      <input type="hidden" name="PAmt" v-model="amt">
      <input type="hidden" name="PMname" v-model="buyer_name">
      <input type="hidden" name="PUname" v-model="user_id">
      <input type="hidden" name="PEname" value="2DPAY">
      <input type="hidden" name="PNoteUrl" :value="api_url + 'settle_rnoti'">
      <input type="hidden" name="PNextPUrl":value="api_url + 'settle_pay_rcv'">
      <input type="hidden" name="PCancPUrl" :value="api_url + 'settle_pay_rcv'">
      <input type="hidden" name="PGoods" v-model="product_name">
      <input type="hidden" name="cardGb" v-model="card_gb">
      <input type="hidden" name="PEmail" value="">
      <input type="hidden" name="P_INT_MON" value="00">
      <input type="hidden" name="PCardType" id="PCardType" value="">
      <input type="hidden" name="PTarget" value="" >
      <input type="hidden" name="PUserid" v-model="user_id">
      <input type="hidden" name="PChainUserId" value=""/>
      <input type="hidden" name="PNoti" value="AUTH"><!--세트뱅크 가맹점 상점ID -->
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "payBtn",
  props: ['btn_name'],
  data() {
    return {
      api_url : "https://3.34.149.33/app2/",
      amt: 0,
      order_no: '',
      product_name: '',
      product_id: '',
      reply_cd: '0000',
      reply_msg: '',
      agency_amt: '',
      buyer_name: '',
      recp_name: '',
      card_gb: '',
      action_url :'',
      dialog: false,
      user_phone_num: ''
    }
  },

  computed: {

    store() {
      return this.$store.getters.store
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    store() {
      return this.$store.getters.store
    },
    basket_tab() {
      return this.$store.getters.basket_tab;
    },
    coupon_obj() {
      return this.$store.getters.coupon_obj;
    }

  },

  mounted() {
    //   // window.postMessage({'reply_cd':'0000','reply_msg':'성공','pg':'KG' },'http://m.2dpay.co.kr');
    //   // window.postMessage({'reply_cd':'0021','reply_msg':'성공','pg':'SB' },'http://localhost:8080');
    // window.addEventListener('message', (e) => {

    // if (e.origin == 'http://m.2dpay.co.kr' && e.data.reply_cd)
    // if (e.origin == 'http://localhost:8080' && e.data.reply_cd)
    // this.p_result(e);
    // });

    
    //Allat_Mobile_Close();
    //document.getElementById("ALLAT_MOBILE_PAY").style.display = "none";

    //console.log('basketBtn mounted');


    // KG올엣 - 결제 결과 수신용
    //window.addEventListener('message', this.pay_receive,false);



    // window.addEventListener("onbeforeunload", function (event) {
    //   console.log('beforeunload');
    // });


  },
  methods: {
    pay_send(params) {
      document.getElementById("ALLAT_MOBILE_PAY").style.display = "none";
      this.$store.commit('loading', false);
      this.$store.commit('is_visible',true);

      this.user_phone_num = params.phone;
      if(params.pay_gb != 'NORMAL') {
        if(params.pay_gb == 'APPCARD')
          this.card_gb = params.card_gb
      } else {
        let total_price = 0;
        _.forEach(this.order_product, function(o) {
        total_price += parseInt(o.price);
      });
        if(this.store.delivery_amt != 0 && this.basket_tab == 'delivery') {
          total_price += parseInt(this.store.delivery_amt)
        }

        if (total_price > 1000000 && this.store.store_id != 'dg500004') {
          //대구 책나무만 아니면 100만원 이하만 결제 되도록
          this.showToast('1,000,000원 초과시 주문 되지 않습니다.')
        }
        else if (total_price > 3000000 && this.store.store_id == 'dg500004') {
          //대구 책나무만 300만원 이하만 결제 되도록
          this.showToast('3,000,000원 초과시 주문 되지 않습니다.')
        }
        else {
          this.$store.commit('user_phone', this.user_phone_num);
          this.$store.commit('arrival_time_s', params.arrival_time)
          
          this.$router.push('/order2');
          return;
        }
      }
      // let t_user_id = this.user_id
      // if (t_user_id.length < 9)
      let t_user_id  = this.user_phone_num;

      let pm = [];
      let product_id = [];
      let p_o_id1 = [];
      let p_o_id2 = [];
      let pm_o_id = [];
      let price = [];
      let cnt = [];
      let memo = [];
      let total_price = 0;
      let pay_gb ='';
      let coupon_id = '';
      let user_seq = '';
      let chk_time_sale = false;
      let packing_sale = 0;

      let _this = this;

      if (this.user_id.substr(0, 1) !== '0') {
        user_seq = this.user_id;
      }

      _.forEach(this.order_product, function(o) {
        pm.push(o.pm_o_id.toString());
        product_id.push(o.product.product_id);
        p_o_id1.push(o.p_o_id1);
        p_o_id2.push(o.p_o_id2);
        pm_o_id.push(o.pm_o_id);
        price.push(o.price);
        total_price += parseInt(o.price);
        cnt.push(o.cnt);
        memo.push(o.memo);

        if (o.product.sale_gb === 'T' && _this.basket_tab == 'packing') {
          if (o.product.sale_st_time1 !== '') {
            chk_time_sale = _this.timeCalc(o.product.sale_st_time1, o.product.sale_ed_time1);
          }
          if (o.product.sale_st_time2 !== '' && !chk_time_sale) {
            chk_time_sale = _this.timeCalc(o.product.sale_st_time2, o.product.sale_ed_time2);
          }
        }
        if (chk_time_sale) {
          let sale_tmp = 0;
            if (parseInt(o.product.sale_price) > parseInt(o.product.sale_time_price)) {
            
            if (parseInt(o.product.sale_price) > 0)
              sale_tmp = parseInt(o.product.sale_price) - parseInt(o.product.sale_time_price);
            else
              sale_tmp = parseInt(o.product.price) - parseInt(o.product.sale_time_price);

            sale_tmp *= o.cnt;

            packing_sale += sale_tmp;
          }
        }

        chk_time_sale = false;
      });
      
      total_price -= packing_sale;

      if (this.coupon_obj != '') {
        if (this.coupon_obj.coupon_type === 'P') {
          total_price -= parseInt(this.coupon_obj.amt);
        }
        else if (this.coupon_obj.coupon_type === 'R') {
          total_price -= total_price * (this.coupon_obj.amt / 100);
          total_price /= 100;
          total_price = Math.ceil(total_price) * 100;
          //100단위 올림
        }
        coupon_id = this.coupon_obj.coupon_id;
      }

      if(this.store.delivery_amt != 0 && this.basket_tab == 'delivery') {
        total_price += parseInt(this.store.delivery_amt)
      }

      if (total_price > 1000000 && params.gb == 'APPCARD' && this.store.store_id != 'dg500004') {
        this.showToast('1,000,000원 초과시 주문 되지 않습니다.');
        return;
      }
      else if (total_price > 3000000 && params.gb == 'APPCARD' && this.store.store_id == 'dg500004') {
        this.showToast('3,000,000원 초과시 주문 되지 않습니다.');
        return;
      }
      let param = {
        'store_id': this.store.store_id,
        'cancel_yn': 'N',
        'user_id': t_user_id,
        'user_seq': user_seq,
        'total_price': total_price,
        'order_type': 'BEFORE',
        'table_id': params.table_id,
        'memo': memo,
        'product_id': product_id,
        'p_o_id1': p_o_id1,
        'p_o_id2': p_o_id2,
        'pm_o_id': pm,
        'price': price,
        'cnt': cnt,
        'memo': memo,
        'pay_gb': params.pay_gb,
        'biz_dt': this.store.biz_dt,
        'address1': params.address1,
        'address_detail': params.address_detail,
        'user_id': t_user_id,
        'packing_yn': params.packing_yn,
        'arrival_time': params.arrival_time,
        'web_app_gb': 'B2D',
        'coupon_id': coupon_id
        //packing_time: params.packing_time
      };
      this.$store.commit('loading', true);
      this.$store.dispatch('c_order', param)
        .then((res) => {
          this.$store.commit('loading', false);
          if (res.result =='CLOSED')
          {
            this.showToast('영업시간이 아닙니다. 직원에게 문의하세요');
            return;
          }
          else if (res.result == 'SOLD_OUT') {
            this.showToast( res.product_name + '재고가 소진 되었습니다. 다른 메뉴를 선택해주세요.');
            return;
          }
          // alert(t_user_id)
          this.$store.commit('user_id', t_user_id);
          this.product_name = res.product_name;
          this.product_id = product_id.toString();
          this.amt = param.total_price;
          this.order_no = res.order_no;
          this.recp_name = this.store.store_id;
          this.buyer_name = this.store.store_id;

          if (params.pay_gb != 'APPCARD') {
            this.agency_amt = this.store.kg_id + ':' + this.amt;
          }
          //console.log('this.buyer_name',  this.buyer_name);
          //console.log('refs', this.$refs.kg_sspay);

          this.$nextTick(function() {
            if (params.pay_gb == 'APPCARD') {
              this.dialog = false;
              //console.log('refs', this.$refs.settle_app);
              this.$refs.settle_app.submit();
            }
            else if (params.pay_gb == 'KAKAO')
            {
              // console.log('refs', this.$refs.kg_kakao);
              //Allat_Mobile_Approval(this.$refs.kg_kakao, '0', '0');
              this.$refs.kg_kakao.submit();
            }
            else if (params.pay_gb == 'SSPAY')
            {
              this.$store.commit('is_visible',false);
              // console.log('refs', this.$refs.kg_sspay);
              // this.$refs.kg_sspay.submit();
             Allat_Mobile_ApprovalNewPlus(this.$refs.kg_sspay, '0', '0');
            }
            //Allat_Mobile_ApprovalNewPlus(this.$refs.kg_sspay, '0', '0');
          })
        })

    },

  }

}
</script>

<style scoped>
.btn_order2 {
  width: 100%;
  color: white;
  font-size: 1.3rem;
}
</style>