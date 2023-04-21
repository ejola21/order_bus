<template>
  <div class="leave-container">
    <v-card class="leave_2dpay">
      <p class="leave_info">
        탈퇴전 꼭 확인해주세요!
      </p>
      <div class="leave_desc">
        <span
          >예약 현황, 결제 내역/영수증 등 2DPAY의 모든 정보가 즉시 삭제되며
          복구할 수 없습니다</span
        >
      </div>
      <mu-divider />
      <div class="leave_pwd_div">
        <v-text-field
          full-width
          v-model="password"
          label="비밀번호 - 6자리이상"
          type="password"
          labelClass="l_label_title"
          :maxLength="6"
        />
        <v-text-field
          full-width
          v-model="re_password"
          label="비밀번호 재입력"
          type="password"
          labelClass="l_label_title"
          :maxLength="6"
        />
        <v-raised-button
          class="leave_btn"
          label="회원탈퇴"
          full-width
          v-on:click=""
        />
      </div>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      user_id: "",
      password: "",
      re_password: "",
    };
  },
  computed: {},
  mounted() {
    this.$store.commit("is_select_store", false);
    this.$store.commit("is_back", true);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    if (!this.$store.getters.is_login) this.$router.push("/login");
    // this.$store.commit('title', '회원탈퇴');
  },
  methods: {},
};
</script>

<style scoped>
.mu-divider {
  margin-bottom: 1rem;
  background-color: #bbbbbb;
}
.leave-container {
  margin-top: 90px;
}
.leave_2dpay {
  /* margin: 1rem; */
}
.leave_desc {
  padding: 1.5rem;
  padding-top: 0;
}
.leave_desc > span {
  font-size: 1.1rem;
}

.leave_info {
  padding: 1rem;
  background-color: #0856c3;
  font-size: 1.4rem;
  text-align: center;
  color: white;
}

.leave_pwd_div {
  padding: 0.01rem 1.5rem;
}

.l_label_title {
  font-size: 1.3rem;
  font-weight: bold;
  width: 320px;
}

.leave-container > .leave_2dpay > .leave_pwd_div > .leave_btn {
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: #940031;
  color: white;
}
</style>
