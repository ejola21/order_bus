<template>
  <div class="packing-container">
    <div v-if="store.pay_yn == 'Y'" class="pay_select">
      <div class="pay_choice">
        <v-badge
          v-if="user_agent_chk"
          content="1"
          circle
          color="#0954ba"
          badgeClass="badge_size"
        >
          <span class="pay_title">&nbsp;결제 수단 선택</span>
        </v-badge>
        <v-badge
          v-else
          content="1"
          circle
          color="#0954ba"
          badgeClass="badge_size_other"
        >
          <span class="pay_title">&nbsp;결제 수단 선택</span>
        </v-badge>
      </div>
      <div class="pay_check_prepayment">
        <div
          v-if="store.pay_yn == 'Y' && store.order_yn == 'Y'"
          @click="prepayment_click"
        >
          <v-radio-group v-model="select_radio" hide-details>
            <v-radio name="pay_type1" value="선불" label="선불"></v-radio>
            <!-- <mu-radio name="pay_type2" v-model="select_radio" labelClass="prepayment" label="선불" nativeValue="선불"/> -->
            <span
              :class="[
                { prepayment_desc: !user_agent },
                { mix_padding: user_agent },
              ]"
              >&nbsp;&nbsp;(모바일로 미리 결제)</span
            >
          </v-radio-group>
        </div>
        <div v-else-if="store.pay_yn == 'Y'">
          <!-- <mu-radio name="pay_type" v-model="select_radio" labelClass="prepayment" label="선불" nativeValue="선불"/> -->
          <!-- <span class="prepayment">선불</span>
                <span :class="[{'prepayment_desc' : !user_agent}, {'mix_padding' : user_agent}]">&nbsp;&nbsp;모바일로 미리 결제</span> -->
          <!-- :class="{'ios_span_padding_top' : !is_android}" -->
        </div>
        <!-- <order-btn v-show="select_radio == '0'" :phone="front_phone+back_phone"></order-btn> -->
        <div class="btn_box" v-show="select_radio == '선불'">
          <div
            class="card_pay"
            :class="{ select_pay: select_pay == 0 }"
            @click="default_card_click(0)"
          >
            <img
              class="icon_img"
              :src="select_pay == 0 ? img_s_card : img_n_card"
              width="23rem"
            />
            <span>신용/체크/법인카드</span>
          </div>
          <div
            class="appcard_pay"
            :class="{ select_pay: select_pay == 1 }"
            @click="card_select"
          >
            <img
              class="icon_img"
              :src="select_pay == 1 ? img_s_appcard : img_n_appcard"
              width="23rem"
            />
            <!-- <span>&nbsp;앱카드</span><span v-show="select_card != ''" class="card_select">&nbsp;*{{select_card}}</span> -->
            <span>&nbsp;앱카드</span
            ><span v-show="select_card != ''" class="card_select"></span>
          </div>
        </div>
        <div
          class="btn_box bottom_btn_box"
          v-if="is_android && store.store_id != 'dg500004'"
          v-show="select_radio == '선불'"
        >
          <div
            class="samsung_pay right_margin"
            :class="{ select_pay: select_pay == 2 }"
            @click="default_card_click(2)"
          >
            <img
              class="sumsung_img"
              height="40rem"
              :src="select_pay == 2 ? img_s_samsung : img_n_samsung"
            />
          </div>
          <div
            class="kakao_pay left_margin"
            :class="{ select_pay: select_pay == 3 }"
            @click="default_card_click(3)"
          >
            <img
              class="icon_img"
              :src="select_pay == 3 ? img_s_kakao : img_n_kakao"
              width="23rem"
              height="16.42rem"
            />
            <span>&nbsp;pay 카카오페이</span>
          </div>
        </div>
        <div
          class="btn_box bottom_btn_box"
          v-if="!is_android && store.store_id != 'dg500004'"
          v-show="select_radio == '선불'"
        >
          <div
            class="kakao_pay"
            :class="{ select_pay: select_pay == 3 }"
            @click="default_card_click(3)"
          >
            <img
              class="icon_img"
              :src="select_pay == 3 ? img_s_kakao : img_n_kakao"
              width="23rem"
              height="16.42rem"
            />
            <span>&nbsp;pay 카카오페이</span>
          </div>
        </div>
        <div v-show="select_radio == '선불'">
          <!-- <span class="hana_card">&nbsp;&nbsp;하나카드는 신용카드, 앱카드 결제만 지원합니다.</span> -->
        </div>
        <v-divider class="hr_tag" shadowInset />
      </div>
      <div
        v-if="store.order_yn == 'Y' && store.pay_yn == 'Y'"
        class="pay_check_postpay"
      >
        <div @click="postpay_click">
          <v-radio-group v-model="select_radio" hide-details>
            <v-radio name="pay_type2" value="후불" label="후불"></v-radio>
            <!-- <mu-radio name="pay_type2" v-model="select_radio" labelClass="postpay" label="후불" nativeValue="후불"/> -->
            <span
              :class="[
                { postpay_desc: !user_agent },
                { mix_padding: user_agent },
              ]"
              >&nbsp;&nbsp;(카운터에서 직접 결제)</span
            >
          </v-radio-group>
          <v-divider class="hr_tag" shadowInset />
        </div>
      </div>
    </div>

    <div class="insert_phone" :class="{ not_only_order: store.pay_yn == 'Y' }">
      <div
        class="phone_number"
        style="background-color: #eee; padding: 0.5rem;"
      >
        <v-badge
          v-if="store.pay_yn == 'Y' && user_agent_chk"
          content="2"
          circle
          color="#0954ba"
          badgeClass="badge_size"
        >
          <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge
          v-else-if="store.pay_yn == 'Y' && !user_agent_chk"
          content="2"
          circle
          color="#0954ba"
          badgeClass="badge_size_other"
        >
          <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge
          v-else-if="store.pay_yn != 'Y' && user_agent_chk"
          content="1"
          circle
          color="#0954ba"
          badgeClass="badge_size"
        >
          <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge
          v-else
          content="1"
          circle
          color="#0954ba"
          badgeClass="badge_size_other"
        >
          <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
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
    <div class="arrive_time">
      <div class="store_time" style="background-color: #eee; padding: 0.5rem;">
        <v-badge
          v-if="store.pay_yn == 'Y' && user_agent_chk"
          content="3"
          circle
          color="#0954ba"
          badgeClass="badge_size"
        >
          <span class="phone_title">&nbsp;매장 도착 시간</span>
        </v-badge>
        <v-badge
          v-else-if="store.pay_yn == 'Y' && !user_agent_chk"
          content="3"
          circle
          color="#0954ba"
          badgeClass="badge_size_other"
        >
          <span class="phone_title">&nbsp;매장 도착 시간</span>
        </v-badge>

        <v-badge
          v-else-if="store.pay_yn != 'Y' && user_agent_chk"
          content="2"
          circle
          color="#0954ba"
          badgeClass="badge_size"
        >
          <span class="phone_title">&nbsp;매장 도착 시간</span>
        </v-badge>
        <v-badge
          v-else
          content="2"
          circle
          color="#0954ba"
          badgeClass="badge_size_other"
        >
          <span class="phone_title">&nbsp;매장 도착 시간</span>
        </v-badge>
      </div>
      <v-divider class="hr_tag" shadowInset />

      <div class="time_select">
        <v-select
          v-model="time"
          label="선택해주세요"
          solo
          :items="items"
          item-text="title"
          item-value="value"
        >
        </v-select>
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
        </div>
      </div>
    </div>

    <v-col cols="12" sm="6">
      <pay-btn
        v-show="select_radio == '선불'"
        @pay_go_click="pay_go_click"
        :btn_name="'결제하기 (포장)'"
      />

      <v-btn
        x-large
        color="primary"
        dark
        class="btn_order2"
        v-show="select_radio == '후불'"
        @click="order_click"
        >예약하기 (포장)</v-btn
      >
    </v-col>
  </div>
</template>

<script>
import payBtn from "../components/payBtn";
export default {
  name: "packing",
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
  },
  data() {
    return {
      front_phone: "",
      back_phone: "",
      time: "",
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

      items: [
        { title: "바로", value: "00:00:00" },

        { title: "20분 후", value: "00:20:00" },
        { title: "30분 후", value: "00:30:00" },
        { title: "40분 후", value: "00:40:00" },
        { title: "50분 후", value: "00:50:00" },
        { title: "1시간후", value: "01:00:00" },

        { state: "Georgia", abbr: "GA" },
        { state: "Nebraska", abbr: "NE" },
        { state: "California", abbr: "CA" },
        { state: "New York", abbr: "NY" },
      ],

      dialog: false,
      card_gb: "",
      select_card: "",
      select_pay: "0",
      check_term_hide: true,
      pay_gb: "NORMAL",
      pay_go: false,
      params: {},
      user_agent: "",
      user_agent_chk: "",
    };
  },
  mounted() {
    if (navigator.userAgent.match(/SM|iPhone/i)) this.user_agent_chk = true;
    else this.user_agent_chk = false;

    this.user_agent = navigator.userAgent.match("MIX");
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
      let phone_num = this.front_phone + "" + this.back_phone;
      if (phone_num.length < 10 || phone_num == "") {
        this.showToast("휴대폰 번호를 확인하세요.");
      } else if (this.time == "") {
        this.showToast("매장 도착 시간을 선탁하세요.");
      } else {
        this.$store.commit(
          "user_phone",
          this.front_phone + "" + this.back_phone
        );
        this.params = {
          pay_gb: this.pay_gb,
          card_gb: this.card_gb,
          phone: this.front_phone + "" + this.back_phone,
          arrival_time: this.time,
          packing_yn: "Y",
          address1: "",
          address_detail: "",
          table_id: 0,
        };
        this.$children[this.$children.length - 2].pay_send(this.params);
      }
    },
    order_click() {
      let phone_num = this.front_phone + "" + this.back_phone;
      if (phone_num.length < 10 || phone_num == "") {
        this.showToast("휴대폰 번호를 확인하세요.");
      } else if (this.time == "") {
        this.showToast("매장 도착 시간을 선택하세요.");
      } else this.order_send2();
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
      let chk_time_sale = false;
      let packing_sale = 0;
      let _this = this;

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

        if (o.product.sale_gb === "T") {
          if (o.product.sale_st_time1 !== "") {
            chk_time_sale = _this.timeCalc(
              o.product.sale_st_time1,
              o.product.sale_ed_time1
            );
          }
          if (o.product.sale_st_time2 !== "" && !chk_time_sale) {
            chk_time_sale = _this.timeCalc(
              o.product.sale_st_time2,
              o.product.sale_ed_time2
            );
          }
        }
        if (chk_time_sale) {
          let sale_tmp = 0;
          if (
            parseInt(o.product.sale_price) > parseInt(o.product.sale_time_price)
          ) {
            if (parseInt(o.product.sale_price) > 0)
              sale_tmp =
                parseInt(o.product.sale_price) -
                parseInt(o.product.sale_time_price);
            else
              sale_tmp =
                parseInt(o.product.price) - parseInt(o.product.sale_time_price);

            sale_tmp *= o.cnt;

            packing_sale += sale_tmp;
          }
        }

        chk_time_sale = false;
      });

      total_price -= packing_sale;

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
        table_id: 0,
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
        arrival_time: this.time,
        packing_yn: "Y",
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
              "예약이 마감되었습니다. 다른 예약을 선택해주세요."
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
  },
};
</script>

<style scoped>
.packing-container {
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
  margin-left: 1.875rem;
}
.pay_check_prepayment {
  position: relative;
  /* padding: 1rem 0; */
  padding-bottom: 0.5rem;
}
.prepayment,
.postpay,
.time_title {
  font-size: 1.1rem;
  font-weight: bold;
}
.prepayment_desc,
.postpay_desc {
  position: absolute;
  /* padding-top: 15rem; */
  font-size: 0.9rem;
  margin-left: 4.5rem;
}
.v-input--selection-controls {
  margin-top: 0.5rem;
  padding-top: 4px;
  font-weight: bold;
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
.packing-container > .arrive_time {
  background-color: white;
  padding: 1rem;
  border-top: 1px #bbbbbb solid;
  border-bottom: 1px #bbbbbb solid;
}
.packing-container > .insert_phone {
  background-color: white;
  padding: 1rem;
  border-bottom: 1px #bbbbbb solid;
}
.not_only_order,
.arrive_time {
  margin-top: 0.5rem;
}
.packing-container > .not_only_order {
  border-top: 1px #bbbbbb solid;
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
.time_select {
  padding: 0.5rem 0;
  /* position: relative;
    padding-left: 4rem; */
}
.time_title {
  position: absolute;
  color: #8a8a8a;
  display: inline-block;
  left: 1rem;
  top: 1rem;
}
.selected_time {
  font-size: 1.1rem;
  font-weight: bold;
}
.arrive_time {
  padding-bottom: 0;
}
.time_select .mu-dropDown-menu {
  font-size: 1.2rem;
}
.check_term {
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
  /* border-bottom: 1px solid #bbbbbb; */
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
.v-btn:not(.v-btn--round).v-size--x-large {
  height: 52px;
  min-width: 92px;
  width: 100%;
  border: 0.1rem solid #043474;
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
.samsung_pay {
  text-align: center;
  width: 48%;
  border: 2px solid #8a8a8a;
  height: 3.4rem;
}
.samsung_pay > img {
  margin: 5px;
}
.kakao_pay {
  text-align: center;
  width: 48%;
  border: 2px solid #8a8a8a;
  height: 3.4rem;
  padding: 1rem 0.5rem;
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

.packing-container > .btn_order,
.packing-container > .btn_pay {
  height: 4rem;
}

.left_margin {
  margin-left: 2%;
}
.right_margin {
  margin-right: 2%;
}

/* 하나카드 결제 관련 문구 때문에 만듬. 해결되면 삭제 */
/* .hana_card {
    display:table;
    margin-left: auto;
    margin-right: auto;
    color: #0856C3;
    font-weight: bold;
} */
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
