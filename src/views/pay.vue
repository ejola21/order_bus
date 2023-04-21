<template>
  <div class="pay">
    <div v-if="l_pay.length == 0" class="no_content">
      <div class="error-mark-wrap">
        <div class="empty_pay">
          <img src="../assets/img/no_pay_result.png" width="60%" />
          <div class="tit">결제내역이 없습니다.</div>
          <div class="con">예약 후, 결제내역을 확인해보세요 ^^</div>
        </div>
      </div>
    </div>
    <!-- <mu-paper class="no_content"  v-if ="l_pay.length == 0 " >
    <div class="error-mark-wrap"><img src="../assets/img/error_outline.svg" slot="left" class="error-mark"/><strong class="point_color2">예약현황</strong>이 없습니다.</div>
  </mu-paper> -->
    <!-- <mu-paper class="no_content" :zDepth="1"  v-show ="!l_pay[0]" >
    결제내역이 없습니다.
  </mu-paper> -->
    <div v-else class="pay_paper_desc">
      <img src="../assets/img/pay_desc.png" />
    </div>
    <v-card class="pay_container" max-width="500">
      <v-list-item v-for="(pay, index) in l_pay" :key="index">
        <v-list subheader class="payment_date">
          <v-subheader v-if="index == 0">{{ pay.dt }}</v-subheader>

          <v-subheader v-if="index > 0 && pay.dt != l_pay[index - 1].dt">{{
            pay.dt
          }}</v-subheader>
          <pay-item :item="pay" class="list_item">1</pay-item>
        </v-list>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import payItem from "../components/payItem";
export default {
  components: { payItem },

  computed: {
    l_pay() {
      return this.$store.getters.l_pay;
    },
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    is_home() {
      return this.$store.getters.is_home;
    },
    // is_login() {
    //   return this.$store.getters.is_login
    // },
  },
  data() {
    return {
      noPayHeight: 0,
    };
  },
  mounted() {
    this.$store.commit("is_select_store", false);
    if (!this.is_home) {
      this.$store.commit("title", "결제 내역");
    }
    this.$store.commit("is_back", false);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    this.noPayHeight = window.innerHeight - 72;
    this.noPayHeight += "px";

    // if (this.user_id !='') {
    var param = {
      // 'user_id': this.user_id
      user_id: "01025205307",
    };
    this.$store.dispatch("l_pay", param);
    // }
  },
};
</script>

<style lang="css" scoped>
.pay_paper_desc {
  margin: 1rem;
  text-align: center;
}
.pay_paper_desc > img {
  width: 100%;
}
.v-item-title {
  font-size: 1.2rem !important;
}

/* .order_wait {
  padding: 1rem;
} */

.v-item-text {
  font-size: 1.2rem !important;
}
.order_wait > .pay > .v-card > .v-list {
  padding: 0;
  border-bottom: solid 1px #bbbbbb;
}

.pay {
  /* margin-top: 3.5rem; */
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
}
.v-subheader {
  background-color: rgb(242, 242, 242);
  color: #666;
  font-size: 1.1rem;
  font-weight: bold;
}

.no_login {
  text-align: center;
  font-size: 1rem;
  background-color: rgb(227, 242, 254);
  padding: 1rem;
  margin-bottom: 1rem;
  color: rgb(30, 30, 30);
}

.no_content {
  text-align: center;
  /* background-color: #f1f1f1; */
}

.point_color2 {
  font-size: 1.05rem;
}
.btn_login {
  margin-top: 1.5rem;
}

.error-mark {
  vertical-align: middle;
  margin-right: 5px;
  position: relative;
  bottom: 1px;
}

.empty_pay {
  margin-top: 2rem;
}
.tit {
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 0.3rem;
}
.pay_container {
  padding: 0;
}
.payment_date {
  width: 100%;
}
.list_item {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
