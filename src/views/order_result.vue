<template>
  <div
    class="order_result_container"
    :style="{ maxHeight: windowHeight, minHeight: windowHeight }"
  >
    <div class="order_result_title">
      <div class="order_title_img">
        <img src="../assets/img/order_success.png" />
      </div>
      <div class="order_title_desc">
        <span>예약이 완료 되었습니다.</span><br />
        <span>예약 현황에서 예약상태를 볼 수 있습니다.</span><br />
        <span>조리 완료시 카카오톡 혹은 SMS로 알립니다.</span>
      </div>
    </div>
    <div class="orderResult_btns">
      <v-row align="center">
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <!-- <v-btn x-large color="#043474" v-if="store.group_code" class="group_store_go" @click="go_group_click">상점으로 가기</v-btn> -->
            <v-btn
              x-large
              color="primary"
              class="order_result_status_go_btn"
              @click="go_status_click"
              >예약 상태 보기</v-btn
            >
            <v-btn
              x-large
              color="#ffffff"
              class="order_result_menu_go_btn"
              @click="go_menu_click"
              >메뉴 더 보기</v-btn
            >
            <!-- <div v-if="store.group_code" class="group_store_go" @click="go_group_click">상점으로 가기</div>
          <div class="order_result_status_go_btn" @click="go_status_click">예약 상태 보기</div>
          <div class="order_result_menu_go_btn" @click="go_menu_click">메뉴 더 보기</div> -->
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      windowHeight: 0,
    };
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
  },
  methods: {
    go_status_click() {
      this.$router.push("/status/" + this.store.store_id + "/" + this.user_id);
    },
    go_menu_click() {
      this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
    },
    go_group_click() {
      this.$router.push(
        "/group/" + this.store.group_code + "/" + this.table_id
      );
    },
  },
  mounted() {
    this.$store.commit("is_select_store", false);
    this.$store.commit("is_back", true);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    // this.$store.commit('title', '예약상태');
    this.windowHeight = window.innerHeight - 56;
    this.windowHeight += "px";
  },
};
</script>

<style scoped>
.order_result_container {
  /* margin-top: 3.5rem; */
  background-color: white;
}
.order_result_container > .order_result_title {
  margin: 1rem;
}
.order_result_container > .order_result_title > .order_title_img {
  padding: 1rem 3rem;
}
.order_result_container > .order_result_title > .order_title_img > img {
  width: 100%;
}
.order_title_desc {
  text-align: center;
  /* padding: 1rem; */
  padding-top: 0;
}
.order_title_desc > span {
  color: #8a8a8a;
  font-size: 1rem;
}

.orderResult_btns {
  padding: 0rem 1rem;
}

.order_result_status_go_btn {
  color: white;
  background-color: #0856c3;
}
.group_store_go {
  color: white;
  background-color: #00295a;
}
.order_result_menu_go_btn {
  color: #043474;
  border: 0.05rem solid #043474 !important;
  background-color: white;
}
.order_result_menu_go_btn,
.order_result_status_go_btn,
.group_store_go {
  margin: 0.7rem 0;
  text-align: center;
  line-height: 80px;
  width: 100%;
  height: 80px;
  font-size: 1.5rem;
  font-weight: bold;
}
.v-btn:not(.v-btn--round).v-size--x-large {
  height: 4rem;
}
</style>
