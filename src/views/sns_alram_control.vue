<template>
 <div v-if="store.order_yn == 'Y'" class="sns-alram-container">
  <mu-paper class="sns_alram_div">
    <div class="alram_update_div">
      <mu-text-field fullWidth v-model="user_id" label="휴대폰번호" hintText="숫자만 입력해주세요." type="tel"  labelClass="j_label_title" hintTextClass="j_hint" />
      <mu-raised-button class="auth_btn" label="인증번호 받기" fullWidth v-on:click="authClick()" />
      <mu-text-field fullWidth v-model="auth_num"label="인증번호"  type="tel" :errorText="inputErrorText" @textOverflow="handleInputOverflow" labelClass ="j_label_title"  :maxLength="6" />
      <mu-raised-button class="update_alram_btn" label="알림등록" fullWidth v-on:click="addAlramClick()" primary/>
    </div>
  </mu-paper>
</div>
</template>

<script>
/* eslint-disable */
 export default {
  data() {
    return {
      user_id: '',
      auth_num: '',
      inputErrorText: '',
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
    if(!this.$store.getters.is_sns_login && !this.$store.getters.is_login)
            this.$router.push('/login');
  },
  methods: {
    authClick() {

      if (this.user_id.length < 10) 
        this.showToast("정확한 휴대폰번호를 입력하세요");
      else {
        this.loading = true;
        var param = {
          'user_id': this.user_id
        };
        this.$store.dispatch('cu_user_auth2', param)
          .then((res) => {
            this.loading = false;
            if (res.result == 'SUCCESS') 
              this.showToast("카카오톡 또는 SMS 로 메시지를 전송했습니다.");
            else 
              this.showToast(res.result);
        })
      }
    },

    addAlramClick() {
      if (this.user_id.length < 10) 
        this.showToast("정확한 휴대폰번호를 입력하세요");
      else {
        this.loading = true;
        var param = {
          'phone': this.user_id,
          'sns_id': this.$store.getters.sns_id,
          'auth_num': this.auth_num
        };
        this.$store.dispatch('u_user_phone', param)
          .then((res) => {
            this.loading = false;
            if (res.result == 'SUCCESS') {
              this.showToast("메뉴 완료 메세지 수신 설정이 완료 되었습니다");
              this.$store.commit('user_id', param.phone);
              // alert(param.phone)
              this.$router.go(-1)
            }
            else 
              this.showToast(res.result);
        })
      }
    },
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '인증번호가 6자리를 넘었습니다' : ''
    },

  }
}
</script>

<style scoped>
.sns-alram-container {
  margin-top: 3.5rem;
}

.alram_update_div {
  padding:  0 1.5rem;
  padding-top: 1rem;
}

.j_label_title {
  font-size: 1.3rem;
  font-weight: bold;
  width: 320px;
}

.j_hint {
  font-size: 0.5 rem;
  font-weight: normal;
}

.j_buttons {
  margin-top: 4rem;
}

.j_label_radio {
  margin-left: 0rem;
}
</style>

<style scoped>
.auth_btn {
  margin: 1rem 0;
  background-color: black;
  color: white;
}

.update_alram_btn {
  margin-top: 1rem;
  background-color: #0856c3;
  color: white;
}

.mu-radio {
  vertical-align: middle;
  margin-left: 1rem;
}

.j_gender {
  font-size: 1.05rem;
  color: rgb(100, 100, 100);
}

.j_buttons button {
  font-size: 1rem;
}
</style>
