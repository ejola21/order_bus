<template lang="html">
  <div class="default-container">
    <div
      v-if="store.pay_yn == 'Y'"
      v-show="select_radio == '선불'"
      class="insert_phone"
    >
      <div
        class="phone_number"
        style="background-color: #eee; padding: 0.5rem;"
      >
        <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
      </div>
      <div class="phone_insert_data">
        <img
          v-show="back_phone.length != 0"
          @click="close_click"
          src="../assets/img/close.svg"
        />
        <select class="phone_select" v-model="front_phone">
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="019">019</option>
        </select>
        <input
          class="phone_back_num"
          v-model="back_phone"
          type="tel"
          placeholder="00000000"
          @keyup="phone_num_custom"
          maxLength="8"
        />
      </div>
    </div>

    <div v-show="select_radio == '선불'" class="order_btns">
      <div class="check_term">
        <div class="check-item-wrap">
          <div class="check-accept">
            위 내용을 확인하였으며 결제에 동의합니다.
          </div>
        </div>
        <div v-show="!check_term_hide">
          <v-divider class="hr_tag" shadowInset />
          <div class="check-item-wrap">
            <div class="check-desc" @click="termClick('term_pay')">
              전자금융거래 이용약관
            </div>
          </div>
          <div class="check-item-wrap">
            <div class="check-desc" @click="termClick('term_p_collect')">
              개인정보의 수집 및 이용안내
            </div>
          </div>
          <div class="check-item-wrap">
            <div class="check-desc" @click="termClick('term_p_offer')">
              개인정보 제공 및 위탁 안내
            </div>
          </div>
        </div>
        <div class="icon_arrow" @click="term_hide">
          <v-icon v-if="check_term_hide">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
          <!-- <mu-icon v-if="check_term_hide" value="expand_more"/>
                <mu-icon v-else value="expand_less"/> -->
        </div>
      </div>
    </div>

    <div
      v-show="!auth_confirm"
      v-if="store.order_phone_yn === 'Y' && select_radio === '후불'"
      class="phone_insert"
    >
      <div class="phone_insert_title">휴대폰 인증</div>
      <div class="phone_insert_data">
        <img
          v-show="back_phone.length != 0"
          class="cancel_img"
          @click="close_click"
          src="../assets/img/close.svg"
        />
        <select class="phone_select" v-model="front_phone">
          <option>010</option>
          <option>011</option>
          <option>016</option>
          <option>017</option>
          <option>019</option>
        </select>
        <input
          class="phone_back_num"
          v-model="back_phone"
          type="tel"
          placeholder="00000000"
          @keyup="phone_num_custom"
          maxLength="8"
        />
        <div class="number_submit">
          <button type="button" @click="authClick()">전송</button>
        </div>
      </div>
      <div class="auth_div">
        <div class="auth_input">
          <v-text-field
            ref="f_auth_num"
            inputClass="_auth_num"
            fullWidth
            v-model="auth_num"
            type="tel"
            hintText="인증번호"
            hintTextClass="j_hint"
          />
          <span v-show="timeShow" class="time_3minute"
            >{{ min }}:{{ second }}</span
          >
        </div>
        <div class="number_submit">
          <button type="button" @click="confirm_auth()">확인</button>
        </div>
      </div>
    </div>

    <div
      v-show="auth_confirm"
      v-if="store.order_phone_yn === 'Y' && select_radio === '후불'"
      class="phone_insert2"
    >
      <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
      <div class="phone_insert_data">
        <img
          v-show="back_phone.length != 0"
          @click="close_click"
          src="../assets/img/close.svg"
        />
        <select class="phone_select" v-model="front_phone">
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="019">019</option>
        </select>
        <input
          class="phone_back_num2"
          v-model="back_phone"
          type="tel"
          placeholder="00000000"
          @keyup="phone_num_custom"
          maxLength="8"
        />
      </div>
    </div>

    <v-col cols="12" sm="6">
      <pay-btn
        v-show="select_radio == '선불'"
        @pay_go_click="pay_go_click"
        :btn_name="'결제하기'"
      />
      <v-btn
        x-large
        color="#043474"
        dark
        class="btn_order2"
        v-show="select_radio == '후불'"
        v-if="store.order_phone_yn == 'Y'"
        @click="order_check"
        >예약하기 (매장)</v-btn
      >
      <v-btn
        x-large
        color="#043474"
        dark
        class="btn_order2"
        v-show="select_radio == '후불'"
        v-else
        @click="order_send2"
        >예약하기 (매장)</v-btn
      >
    </v-col>

    <!-- <mu-dialog :open="dialog" @close="close" title="앱카드 선택" dialogClass="dialog_appcard" bodyClass="dialog_appcard_body" scrollable>

          <div class="app_card_help" >
              <span class="help_color">현대,삼성,NH</span>카드는 크롬 브라우저에서 지원 안함
              <span class="help_color">신용카드 결제추천!</span>
          </div>
         <mu-divider/>
         <mu-menu  @change="card_change" :value="card_gb">
            <mu-menu-item value="1001/BC카드" title="BC카드"/>
            <mu-menu-item value="1002/국민카드" title="국민카드"/>
            <mu-menu-item value="1003/하나카드" title="하나카드"/>
            <mu-menu-item value="1004/삼성카드" title="삼성카드"/>
            <mu-menu-item value="1005/신한카드" title="신한카드"/>
            <mu-menu-item value="1007/우리카드" title="우리카드"/>
            <mu-menu-item value="1008/현대카드" title="현대카드"/>
            <mu-menu-item value="1020/롯데카드" title="롯데카드"/>
            <mu-menu-item value="1015/NH카드" title="NH카드"/>
            <mu-menu-item value="1018/전북카드" title="전북카드"/>
            <mu-menu-item value="1026/씨티카드" title="씨티카드"/>
            <mu-menu-item value="1017/광주카드" title="광주카드"/>
            <mu-menu-item value="1012/수협카드" title="수협카드"/>
         </mu-menu>
         <mu-raised-button primary label="선택" @click="card_check('APPCARD')" slot="actions"/>
       </mu-dialog> -->
  </div>
</template>

<script>
// import orderBtn from '../components/orderBtn';
import payBtn from "../components/payBtn";
export default {
  name: "normalOrder",
  components: {
    // orderBtn,
    payBtn,
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    user_phone() {
      return this.$store.getters.user_phone;
    },
    is_android() {
      return this.$store.getters.is_android;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    coupon_obj() {
      return this.$store.getters.coupon_obj;
    },
    auth_confirm() {
      return this.$store.getters.auth_confirm;
    },
  },
  data() {
    return {
      front_phone: "",
      back_phone: "",
      user_phone_num: "",
      auth_num: "",
      min: 3,
      sec: 0,
      second: "00",
      timer: true,
      timeShow: false,
      interval: null,
      select_radio: "선불",
      toast: false,
      toast_msg: "",
      img_n_card: require("../assets/img/n_card.svg"),
      img_s_card: require("../assets/img/s_card.svg"),
      img_n_appcard: require("../assets/img/n_appcard.svg"),
      img_s_appcard: require("../assets/img/s_appcard.svg"),
      img_n_samsung: require("../assets/img/n_samsung.svg"),
      img_s_samsung: require("../assets/img/s_samsung.svg"),
      img_n_kakao: require("../assets/img/n_kakao.svg"),
      img_s_kakao: require("../assets/img/s_kakao.svg"),

      dialog: false,
      card_gb: "",
      select_card: "",
      select_pay: "0",
      check_term_hide: true,
      pay_gb: "NORMAL",
      pay_go: false,
      params: {},
      user_agent: "",
      user_agent_chk: true,
    };
  },
  mounted() {
    if (navigator.userAgent.match(/SM|iPhone/i)) this.user_agent_chk = true;
    else this.user_agent_chk = false;

    // this.user_agent_chk = navigator.userAgent.match(/SM|iPhone/i);
    // 한줄로해도되는데 가독성을 위해 if문걸음

    this.user_agent = navigator.userAgent.match("MIX"); //mix인경우 찾기
    // console.log(this.user_agent)
    if (this.store.pay_yn == "Y" && this.store.order_yn == "Y") {
      this.select_radio = "선불";
    } else if (this.store.pay_yn == "Y") {
      this.select_radio = "선불";
    } else {
      this.select_radio = "후불";
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
    this.coupon_select = "0";
  },
  methods: {
    close_click() {
      this.back_phone = "";
    },
    phone_num_custom(event) {
      this.$nextTick(() => {
        this.back_phone = this.back_phone.replace(/[^0-9]/g, "");
      });
    },
    termClick(gb) {
      this.$router.push("/" + gb);
    },
    card_check(gb) {
      if (this.card_gb == "" || !this.card_gb.match("/"))
        this.showToast("카드선택을 하세요");
      else {
        this.pay_gb = gb;
        let card_ = this.card_gb;
        this.card_gb = card_.split("/")[0];
        this.select_card = card_.split("/")[1];
        this.dialog = false;
        this.select_pay = "1";
      }
    },

    card_change(card) {
      this.card_gb = card;
    },

    card_select() {
      //   this.dialog = true;
      this.select_pay = "1";
      this.pay_gb = "APPCARD";
    },
    close() {
      this.dialog = false;
    },
    default_card_click(value) {
      this.select_pay = value;
      if (value == 0) {
        this.card_gb = "";
        this.select_card = "";
        this.pay_gb = "NORMAL";
      } else if (value == 2) {
        this.card_gb = "";
        this.select_card = "";
        this.pay_gb = "SSPAY";
      } else if (value == 3) {
        this.card_gb = "";
        this.select_card = "";
        this.pay_gb = "KAKAO";
      }
    },
    term_hide() {
      this.check_term_hide = !this.check_term_hide;
    },
    pay_go_click() {
      console.log("pay_go_click", this.$children);
      let phone_num = this.front_phone + "" + this.back_phone;
      if (phone_num.length < 10 || phone_num == "") {
        this.showToast("휴대폰 번호를 확인하세요.");
      } else if (this.order_product.length > 10) {
        this.showToast("장바구니가 꽉 찼습니다. (최대 10개)");
      } else {
        this.$store.commit(
          "user_phone",
          this.front_phone + "" + this.back_phone
        );
        this.params = {
          pay_gb: this.pay_gb,
          card_gb: this.card_gb,
          phone: this.front_phone + "" + this.back_phone,
          arrival_time: "",
          packing_yn: "",
          address1: "",
          address_detail: "",
          table_id: this.table_id,
        };

        this.$children[this.$children.length - 2].pay_send(this.params);
      }
    },
    order_check() {
      this.user_phone_num = this.front_phone + "" + this.back_phone;
      this.user_phone_num = this.user_phone_num.replace(/\s/gi, "");
      // 포차팩토리 후불시 휴대폰 인증 떄문에 체크용으로
      if (this.user_phone_num != this.user_id) {
        this.showToast("인증된 번호가 아닙니다(재인증 필요)");
        this.$store.commit("auth_confirm", false);
        this.$router.push("/basket_all");
      } else {
        if (this.order_product.length > 10) {
          this.showToast("장바구니가 꽉 찼습니다. (최대 10개)");
        } else {
          if (!this.auth_confirm) {
            this.showToast("휴대폰 인증을 해주세요.");
          } else {
            this.order_send2();
          }
        }
      }
    },
    order_send2() {
      let pm = [];
      let product_id = [];
      let p_o_id1 = [];
      let p_o_id2 = [];
      let pm_o_id = [];
      let price = [];
      let cnt = [];
      let memo = [];
      let total_price = 0;
      let pay_gb = "";
      let coupon_id = "";
      let user_seq = "";

      if (this.user_id.substr(0, 1) !== "0") {
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
      });

      if (this.coupon_obj != "") {
        if (this.coupon_obj.coupon_type === "P") {
          total_price -= parseInt(this.coupon_obj.amt);
        } else if (this.coupon_obj.coupon_type === "R") {
          total_price -= total_price * (this.coupon_obj.amt / 100);
          total_price /= 100;
          total_price = Math.ceil(total_price) * 100;
          //100단위 올림
        }
        coupon_id = this.coupon_obj.coupon_id;
      }

      let tmp_user_id = this.front_phone + "" + this.back_phone;
      if (tmp_user_id == "010") {
        tmp_user_id = "";
        if (this.user_id != "") {
          tmp_user_id = this.user_id;
        }
      }

      let param = {
        store_id: this.store.store_id,
        cancel_yn: "N",
        user_id: tmp_user_id,
        user_seq: user_seq,
        total_price: total_price,
        order_type: "AFTER",
        table_id: this.table_id,
        memo: memo,
        product_id: product_id,
        p_o_id1: p_o_id1,
        p_o_id2: p_o_id2,
        pm_o_id: pm,
        price: price,
        cnt: cnt,
        memo: memo,
        pay_gb: "ORDER",
        biz_dt: this.store.biz_dt,
        web_app_gb: "A2D",
        coupon_id: coupon_id,
      };

      this.$store.commit("loading", true);
      this.$store.dispatch("c_order2", param).then((res) => {
        this.$store.commit("loading", false);
        this.$store.commit("coupon_obj", "");
        if (res.result == "CLOSED") {
          this.showToast("영업시간이 아닙니다. 직원에게 문의하세요");
          return;
        } else if (res.result == "BLOCK_USER") {
          this.showToast("잘못된 접근입니다.(BLOCK)");
          return;
        } else if (res.result == "FAIL") {
          this.showToast("통신 에러 입니다. 다시 시도 하세요");
          return;
        } else if (res.result == "SOLD_OUT") {
          this.showToast(
            res.product_name +
              "재고가 소진 되었습니다. 다른 메뉴를 선택해주세요."
          );
          return;
        } else if (res.result == "SUCCESS") {
          this.$store.commit("user_id", res.user_id);

          //sns id 회원가입만 한경우 입력된 전화번호로 올릴것인가?
          // if (this.user_id.substr(0,1)  == 'K' && tmp_user_id.length > 2 )
          //    this.$store.commit('user_id', tmp_user_id);
          this.$store.commit("del_all_order");
          // this.$router.push('/status/' + this.store.store_id + '/' + this.user_id);
          this.$router.push("/order_result");

          // this.$store.commit('is_order_popup', true);
          // this.$router.push('/menu/'+ this.store.store_id + '/' + this.table_id);
        }
      });
    },
    postpay_click() {
      this.select_radio = "후불";
    },
    prepayment_click() {
      this.select_radio = "선불";
    },
    authClick() {
      // 휴대폰 인증
      this.user_phone_num = this.front_phone + "" + this.back_phone;
      this.user_phone_num = this.user_phone_num.replace(/\s/gi, "");

      if (this.user_phone_num.length < 10)
        this.showToast("정확한 회원아이디(핸드폰번호)를 입력하세요");
      else {
        this.min = 3;
        this.sec = 0;
        this.second = "00";
        clearInterval(this.interval);
        this.$store.commit("loading", true);
        var param = {
          user_id: this.user_phone_num,
        };
        this.$store.dispatch("cu_user_auth_new", param).then((res) => {
          this.$store.commit("loading", false);
          if (res.result == "SUCCESS") {
            this.showToast("카카오톡 또는 SMS 로 메시지를 전송했습니다.");
            this.timeShow = true;
            this.timer = true;
            this.interval = setInterval(() => {
              if (this.min > 0) {
                if (this.sec <= 10 && this.sec != 0) {
                  if (this.sec > 0) {
                    this.sec--;
                  }
                  this.second = "0" + this.sec;
                } else if (this.sec === 0) {
                  this.min--;
                  this.sec = 59;
                  this.second = this.sec;
                } else {
                  this.sec--;
                  this.second = this.sec;
                }
              } else if (this.min === 0 && this.sec === 0) {
                this.timer = false;
                clearInterval(this.interval);
              } else if (this.sec > 10) {
                this.sec--;
                this.second = this.sec;
              } else {
                this.sec--;
                this.second = "0" + this.sec;
              }
            }, 1000);
          } else this.showToast(res.result);
        });
      }
    },
    confirm_auth() {
      this.user_phone_num = this.front_phone + "" + this.back_phone;
      this.user_phone_num = this.user_phone_num.replace(/\s/gi, "");
      // console.log(this.auth_num)
      if (!this.timer) {
        this.showToast("타이머 시간 안에 인증 해주세요.");
      } else {
        this.$store.commit("loading", true);
        var param = {
          user_id: this.user_phone_num,
          auth_num: this.auth_num,
        };
        this.$store.dispatch("r_user_auth", param).then((res) => {
          this.$store.commit("loading", false);
          this.showToast(res.result);
          if (res.result == "인증에 성공했습니다.") {
            clearInterval(this.interval);
            this.timeShow = false;
            this.$store.commit("auth_confirm", true);
          }
          this.$store.commit("user_phone", this.user_phone_num);
          this.$store.commit("user_id", this.user_phone_num);
          // console.log(this.user_phone_num)
        });
      }
    },
    phone_num_custom(event) {
      this.$nextTick(() => {
        this.back_phone = this.back_phone.replace(/[^0-9]/g, "");
      });
    },
  },
};
</script>

<style lang="css" scoped>
.default-container {
  background-color: #f1f1f1;
}
.badge_size {
  font-size: 1.1rem;
  font-weight: bold;
}
.pay_title,
.phone_title {
  font-size: 1rem;
  font-weight: bold;
}
.pay_check_prepayment {
  position: relative;
  padding-bottom: 0.5rem;
  /* border-bottom: 0.05rem solid #bbbbbb; */
}
.v-input--selection-controls {
  margin-top: 0.5rem;
  padding-top: 4px;
  font-weight: bold;
}
.only_order {
  padding-top: 1rem;
}
.prepayment,
.postpay {
  font-size: 1.1rem;
  font-weight: bold;
}
.prepayment_desc,
.postpay_desc {
  position: absolute;
  font-size: 0.9rem;
  margin-left: 4.5rem;
}
.mix_padding {
  /* 중국폰만 이상하게 먹어서 혼자 css먹임 */
  position: absolute;
  padding-top: 0.0001rem;
  font-size: 1rem;
}
.pay_select {
  padding: 1rem;
  background-color: white;
  border-bottom: 1px #bbbbbb solid;
}
.default-container > .insert_phone {
  margin-top: 0.5rem;
  background-color: white;
  padding: 1rem;
  border-top: 1px #bbbbbb solid;
  border-bottom: 1px #bbbbbb solid;
}
.phone_insert_data > .phone_back_num {
  font-size: 1.4rem;
  border: none;
  border-bottom: 1px solid #707070;
  height: 2.2rem;
  margin-left: 5%;
  padding-left: 5%;
  width: 68%;
  border-radius: 0px;
  font-weight: 900;
}
.phone_insert_data {
  padding: 0.5rem 0;
  position: relative;
}
.phone_insert_data > img {
  position: absolute;
  right: 0;
  bottom: 25%;
}
.phone_select {
  width: 24%;
  border: 0px solid white;
  -webkit-apprearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/img/under_arrow.svg) no-repeat 100% 50%;
  font-size: 1.4rem;
  border-bottom: 1px solid #707070;
  border-radius: 0px;
  text-align-last: center;
  padding-right: 7%;
  font-weight: 600;
  height: 2.2rem;
  font-weight: 900;
}
.select::-ms-expand {
  display: none;
}
.hr_tag {
  background-color: #bbbbbb;
  margin-top: 7px;
}
.check_term > .hr_tag {
  margin-bottom: 0.5rem;
}
.selected_time {
  font-size: 1.1rem;
  font-weight: bold;
}
.check_term {
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
  position: relative;
}
.check-item-wrap {
  display: table;
}
.check-desc {
  color: #474747;
  border-bottom: 1px solid #474747;
  margin: 0.5rem;
}
.check-accept,
.check-desc {
  font-size: 0.9rem;
}
.check-accept {
  font-size: 1rem;
  color: #8a8a8a;
  margin: 0.5rem;
}
.icon_arrow {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.btn_box {
  display: flex;
  padding: 1rem 0;
}
.card_pay,
.appcard_pay {
  border: 2px solid #8a8a8a;
  padding: 1rem 0.5rem;
  width: 48%;
  text-align: center;
}
.card_pay_full {
  border: 2px solid #8a8a8a;
  padding: 1rem 0.5rem;
  width: 96%;
  text-align: center;
}
.samsung_pay {
  text-align: center;
  width: 48%;
  border: 2px solid #8a8a8a;
  height: 3.4rem;
}
.kakao_pay {
  padding: 1rem 0.5rem;
}

.samsung_pay > img {
  margin: 5px;
}
.kakao_pay {
  text-align: center;
  width: 48%;
  border: 2px solid #8a8a8a;
  height: 3.4rem;
}
.card_pay {
  margin-right: 2%;
}
.appcard_pay {
  margin-left: 2%;
}
.card_pay > span,
.appcard_pay > span,
.samsung_pay > span,
.kakao_pay > span {
  color: #8a8a8a;
  font-weight: bold;
  font-size: 3vw;
}
.card_icon {
  font-size: 5vw;
  vertical-align: middle;
  color: #8a8a8a;
}
.appcard_pay > .card_select {
  color: red;
}

.select_pay {
  border: 2px solid #0856c3;
}
.select_pay > .card_icon {
  color: #0856c3;
}
.select_pay > span {
  color: #0856c3;
}

.dialog_appcard {
  background-color: #ffffff;
  max-height: 30rem !important;
  height: 28rem;
}
.dialog_appcard_body {
  color: rgba(0, 0, 0, 0.6);
  max-height: 19rem !important;
}
.bottom_btn_box {
  padding-top: 0;
}
/* .ios_span_padding_top {
    padding-top: .2rem;
} */
.icon_img {
  vertical-align: middle;
}

.default-container > .btn_order,
.default-container > .btn_pay {
  height: 4rem;
}
.default-container > .bottom_fix {
  /* position:fixed;
    bottom: 0; */
  z-index: 6;
}
.default-container > .top_margin_in {
  margin-top: 0.5rem;
}
.pay_select1 {
  padding: 0 1rem;
  padding-bottom: 1rem;
  background-color: white;
  border-bottom: 1px #bbbbbb solid;
}
.left_margin {
  margin-left: 2%;
}
.right_margin {
  margin-right: 2%;
}

/* 하나카드 결제 관련 문구 때문에 만듬. 해결되면 삭제 */
/* .hana_card {
  display: table;
  margin-left: auto;
  margin-right: auto;
  color: #0856c3;
  font-weight: bold;
} */

/* 후불 휴대폰 인증 */
.phone_insert {
  background-color: white;
  padding: 1rem;
  padding-top: 1rem;
  font-size: 0;
}
.phone_insert2 {
  padding: 1rem;
  padding-top: 1rem;
  font-size: 0;
}
.phone_insert > .phone_insert_title {
  color: #474747;
  font-size: 1rem;
  font-weight: 900;
}
.number_submit {
  display: inline-block;
  margin-left: 2%;
  width: 27%;
  vertical-align: top;
  position: absolute;
  bottom: 10%;
  right: 0;
}
.number_submit > button {
  background-color: #00295a;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  height: 46px;
  border: 0;
  outline: 0;
  width: 100%;
  padding: 0 1rem;
}
.auth_input {
  width: 68%;
  position: relative;
}
.auth_div {
  position: relative;
  padding-top: 1rem;
}
.auth_div > .number_submit {
  position: absolute;
  right: 0;
  bottom: 26%;
}
.auth_div ._auth_num {
  font-size: 1.2rem;
  font-weight: bold;
}
.auth_div .j_hint {
  font-size: 1.2rem;
  font-weight: bold;
}
.phone_insert_data > .cancel_img {
  position: absolute;
  right: 29%;
  bottom: 25%;
}
.phone_insert_data > .phone_back_num2 {
  font-size: 1.4rem;
  border: none;
  border-bottom: 1px solid #707070;
  height: 2.2rem;
  margin-left: 5%;
  padding-left: 5%;
  width: 68%;
  border-radius: 0px;
  font-weight: 900;
  background-color: #f1f1f1;
}
.time_3minute {
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: 0.5rem;
  right: 0;
}
.v-btn:not(.v-btn--round).v-size--x-large {
  height: 52px;
  min-width: 92px;
  width: 100%;
  border: 0.1rem solid #0856c3;
}
.btn_order {
  color: white;
  font-size: 1.3rem;
}
.btn_order2 {
  color: white;
  font-size: 1.3rem;
}
.pay_choice {
  background-color: #eee;
  padding: 0.5rem;
}
</style>
