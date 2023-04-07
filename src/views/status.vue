<template>
  <div>
    <!-- <div class="sub_top">
        <div class="back_btn"><a href="javascript:void(0);"><v-icon>mdi-arrow-left</v-icon></a></div>
        <div class="tit">주문현황</div>
    </div> -->

  <popup-cancel @cancel_req="cancel_req"/>

    <div class="step" v-if ="order_status.status == null || Object.keys(order_status.status).length == 0 "  >

      
      <div class="text-center">
        <img src="../assets/img/order_none.png" width="55%"/>
        <div class="tit">주문현황이 없습니다.</div>
        <div class="con">주문 후, 주문현황을 확인해보세요 ^^</div>
      </div>
      
    </div v-else>

      <v-card  v-for="status,index in order_status.status" :key="index" class="ma-3" >
        <div class="top_box">
          <div class="standby">
            
            <div  >{{status.store_name}}
              <span class="text_right" v-if="status.delivery_yn == 'Y'">배달</span>
              <span class="text_right" v-else-if="status.packing_yn == 'Y'">포장</span>
              <span class="text_right" v-else> 테이블  {{status.table_id}} </span>  
            </div>
            <div class="num">대기번호 {{status.seq}}</div><div class="reset">새로고침<img src="../assets/img/reset_btn.png" @click="refresh_detail(user_id)" /></div>
          </div>
        </div>
       
        <v-stepper :value="parseInt(status.idx)+1" vertical non-linear light class="ml-8 pl-12 pt-0 text-center">

          <v-stepper-step :complete="status.idx > 0" step="1">
            {{ status.money_yn == 'Y' ? '결제 완료' : '주문 완료' }}   {{ status.time1}}
            <small class="mt-2"> 고객님 주문이 접수되었습니다</small>
          </v-stepper-step>

          <v-stepper-content step="1"></v-stepper-content>
          
          <v-stepper-step :complete="status.idx > 1" step="2">
            접수 완료 {{ status.time2}}
            <small  class="mt-2"> 고객님 주문이 조리중입니다.</small>
          </v-stepper-step>
          <v-stepper-content step="2"></v-stepper-content>

          <v-stepper-step :complete="status.idx > 2" step="3">
             {{ status.delivery_yn == 'Y' ? '배달 출발' : ( status.idx === '3' ? '픽업 완료' : '처리 완료' ) }}   {{ status.time3}}
            <small  class="mt-2">고객님 주문 찾아가세요</small>
          </v-stepper-step>
          <v-stepper-content step="3"></v-stepper-content>
        </v-stepper>

        <v-divider></v-divider>
        <div class="option_detai  l">
          <div v-for="item, index in status.products" :key="index">
            <status-item :item="item"></status-item>
            <v-divider></v-divider>
          </div>
        </div>
        

        <div class="bottom_box">
          <div class="price_box">
            <span>총 주문 금액</span>
            <div class="price"> {{formatPrice(status.price, 'default')}} 원</div>
          </div>
        </div>



        <v-btn v-if="status.cancel_status == null" width ="92%" large color="primary" class="blue_btn" @click="cancel(status.order_no, status.cancel_status)" >취소 요청</v-btn>
        <v-btn v-else-if="status.cancel_status == '주문취소 요청중'"  width ="92%"  large color="#333" class="blue_btn">취소 요청중</v-btn>
        <v-btn v-else-if="status.cancel_status == '주문취소 요청거부'"  width ="92%"  large color="#B71C1C" class="blue_btn" @click="cancel_refuse" >취소 요청 거부</v-btn>
        <v-btn v-else width ="92%"  large color="#03a9f4" class="blue_btn">취소 요청 완료</v-btn>
 

      </v-card>
      
      
      
  </div>



</template>

<script>
/* eslint-disable */
import statusItem from "../components/statusItem";
import popup from "../components/popup";
import popupCancel from "../components/popup_cancel";

export default {
  components: {
    statusItem,
    popup,
    popupCancel
  },
  data() {
    return {
      dialog1 : "",
      dialog : "",
      activeStep: 1,
      status_r: "",
      select_order_no: "",
      cancel_req_u: require("../assets/img/cancel_req.svg"),
      cancel_req_ing_u: require("../assets/img/cancel_req_ing.svg"),
      cancel_suc_u: require("../assets/img/cancel_suc.svg"),
      payment_time_nocancel: "payment_time_nocancel",
      payment_time_cancel: "payment_time_cancel",
      windowHeight: 0,
      alram_confirm: false,
      cancel_item: {}
    };
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    order_status() {
      return this.$store.getters.order_status;
    },
    // r_order_status_one() {
    //   return this.$store.getters.r_order_status_one;
    // },
    // is_login() {
    //   return this.$store.getters.is_login
    // },
    // is_sns_login() {
    //   return this.$store.getters.is_sns_login
    // },
    is_popup() {
      return this.$store.getters.is_popup;
    },
    is_home() {
      return this.$store.getters.is_home;
    }
  },
  mounted() {

    this.$store.commit("is_back", false);
    this.$store.commit("is_select_store", false);
    if (!this.is_home) {
      this.$store.commit("title", "주문 현황");
    }
    
    this.$store.commit("is_menu", true);

    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    // if(this.$store.getters.store.pay_yn == 'Y' && !this.$store.getters.is_login)
    //   this.$router.push('/login');
    // else if (this.$store.getters.store.order_yn == 'Y' && (!this.$store.getters.is_sns_login && !this.$store.getters.is_login))
    //   this.$router.push('/login');

    this.windowHeight = window.innerHeight - 56;
    this.windowHeight += "px";

    var param = {
      store_id: this.$route.params.store_id,
      user_id: this.$route.params.user_id
    };

    this.$store.dispatch("l_order_rcv", param);

    // if (this.store.order_yn == 'Y')
    //   this.$store.dispatch('order_status2', param);
    // else
    //   this.$store.dispatch('order_status', param);
  },
  methods: {
    refresh(order_no) {
      // order_no 의 주문만 조회
      var param = {
        order_no: order_no
      };
      this.$store.dispatch("l_order_rcv_one", param).then(res => {
        this.$nextTick(() => {
          console.log(res);
          // this.$store.commit('order_status_update', res);
        });
        // console.log(this.r_order_status_one)
        if (res.cancel_status)
          this.showToast("조회 완료 !!  현재 " + res.cancel_status + " 입니다");
        else this.showToast("조회 완료 !!  현재 " + res.status + " 입니다");

        // let params = {
        //   'store_id': this.$route.params.store_id,
        //   'user_id': this.$route.params.user_id
        // };
        // this.$store.dispatch('l_order_rcv', params);
      });
    },
    refresh_detail(user_id) {
      // user_id의 주문 전체 조회
      var param = {
        store_id: this.store.store_id,
        user_id: user_id
      };
      this.$store.commit("order_status", []);
      this.$store.dispatch("l_order_rcv", param);
      this.showToast("조회 완료!!");
    },
    refresh_noshow(order_no) {
      var param = {
        order_no: order_no
      };

      this.$store.dispatch("l_order_rcv_one", param).then(res => {
        let params = {
          store_id: this.$route.params.store_id,
          user_id: this.$route.params.user_id
        };
        this.$store.dispatch("l_order_rcv", params);
        this.$store.commit("loading", false);
      });
    },

    cancel_req() {
 
      this.$store.commit("is_popup", {
        is_popup: false,
        title: "",
        desc: ""
      });
      this.$store.commit("loading", true);
      var param = {
        order_no: this.select_order_no
      };
      // console.log(this.select_order_no)
      this.$store.dispatch("u_order_cancel_req", param).then(res => {
        // console.log('res', res);
        if (res[0].result == "SUCCESS") {
          this.showToast(
            "주문 취소가 요청 되었습니다.잠시후에 새로고침을 하시면 결과를 볼수 있습니다."
          );
          this.refresh_noshow(this.select_order_no);
          //this.r_order_status_one.cancel_status = '주문취소 요청중';
        } else {
          this.$store.commit("loading", false);
          this.showToast(res[0].result);
        }
      });
    },
    cancel(order_no, cancel_status) {
      if (cancel_status) return;
      this.select_order_no = order_no;

      // var popup = {
      //   'title': "주문 취소 요청",
      //   'desc': "정말로 취소를 하시겠습니까?",
      //   'btn1': true,
      //   'btn3': true,
      //   'dialog': true
      // }
      // this.$store.commit('popup', popup);
      this.$store.commit("is_popup", {
        is_popup: true,
        title: "주문 취소요청",
        desc: "정말로 취소를 하시겠습니까?"
      });
    },
    cancel_refuse() {
      this.showToast("가맹점에서 취소요청을 거절 하였습니다.");
    }
  }
};
</script>

<style scoped>
.step { padding:0 1rem; padding-top:1.5rem; }
.v-stepper--alt-labels .v-stepper__step small { line-height:1rem; display:block; font-weight:600; color:rgba(0, 0, 0, 0.38); }
.v-application .mt-12 { margin-top:0!important; margin-bottom:1rem; border-top:1px solid #ccc; border-bottom:1px solid #ccc; }
.v-stepper--alt-labels .v-stepper__step { flex-basis:156px; }
.v-stepper__step { padding: 24px 0px; }
.v-stepper { box-shadow:none; }
.v-stepper--vertical {padding-bottom: 0;}

.top_box { overflow:hidden; border-bottom: 1px solid #ccc; padding:0.8rem 1.2rem 0.5rem; background-color:#ddd; }
.standby .num { float:left; font-weight:bold; font-size:1.1rem; }
.standby .reset { float:right; font-size:0.9rem; }
.standby .reset img { width:20px; vertical-align:middle; margin-left:0.2rem; margin-top:-0.2rem; }

.v-stepper__header { box-shadow:none; border-bottom:1px solid #ccc; padding:0.6rem 0; }
.v-stepper__header .time { color:#03a9f4; font-weight:normal; }

.bottom_box { padding:1rem 1rem 1rem 1rem; overflow:hidden; }

.bottom_box .store_box { padding-bottom:1rem; border-bottom:1px solid #ccc; overflow:hidden; font-size: 0.9rem; }
.store_box .table_num, .store_box .prd_list { width:100%; float:left; }
.store_box .table_num { font-weight:bold; font-size:1.1rem; }
.store_box .prd_list span:last-child { float:right; }

.bottom_box .price_box { clear:both; padding-top:0.6rem; float:right; font-weight:bold; }
.bottom_box .price_box span { margin-top:0.6rem; display:block; float:left; }
.bottom_box .price_box .price { color:#B71C1C; font-size:1.7rem; float:right; margin-left:1rem; }

.btn_wrap { padding:0 1rem 1rem; }
.blue_btn { color:#fff; margin: 1rem;}
.v-btn:not(.v-btn--round).v-size--default { height:32px; }
.v-dialog1 > .v-card > .v-card__text { padding:20px 24px; font-weight:400; font-size:0.95rem; color:#000; text-align:center; }
.v-dialog2 > .v-card > .v-card__text { padding:20px 24px; font-weight:400; font-size:0.95rem; color:#000; text-align:center; }
.v-dialog3 > .v-card > .v-card__text { padding:20px 24px; font-weight:400; font-size:0.95rem; color:#000; text-align:center; }
.v-dialog4 > .v-card > .v-card__text { padding:20px 24px; font-weight:400; font-size:0.95rem; color:#000; text-align:center; }
.v-card__actions { padding:0 8px 4px; background:#eee; }

.tit {
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 0.3rem;
}
/* @media(max-width:400px){
.v-stepper--alt-labels .v-stepper__step { flex-basis:116px; }
.v-stepper__step { padding: 24px 10px; }
} */

</style>
