<template>
  <div class="pwd-find-container">
  <mu-paper class="find_pwd">
    <div class="pwd_find_div">
      <mu-text-field fullWidth ref="f_user_id" inputClass="_user_id"v-model="user_id" label="핸드폰번호(회원ID)" hintText="숫자만 입력해주세요." type="tel"  labelClass="j_label_title" hintTextClass="j_hint" />
      <mu-raised-button class="auth_btn" label="인증번호 받기" fullWidth v-on:click="authClick()" />
      <mu-text-field ref="f_auth_num" inputClass="_auth_num" fullWidth v-model="auth_num"label="인증번호"  type="tel" hintText="인증번호 입력하세요." hintTextClass="j_hint" :errorText="inputErrorText" @textOverflow="handleInputOverflow" labelClass ="j_label_title"  :maxLength="6" />
      <mu-text-field ref="f_password" inputClass="_password" fullWidth v-model="password"label="비밀번호 - 6자리이상"  hintText="비밀번호를 입력해주세요." hintTextClass="j_hint" type="password" labelClass ="j_label_title"  :maxLength="6" />
      <mu-text-field ref="f_re_password" inputClass="_re_password" fullWidth v-model="re_password" label="비밀번호 재입력" hintText="비밀번호를 입력해주세요."  hintTextClass="j_hint" type="password" labelClass ="j_label_title" :maxLength="6" />
      <mu-raised-button class="find_btn" @click="pw_change" label="비밀번호 변경" fullWidth v-on:click="" primary/>
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
      password: '',
      re_password: '',
    }
  },
  computed: {
    
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
    const auth_num = this.$refs.f_auth_num.$el.querySelector('._auth_num')
    const password = this.$refs.f_password.$el.querySelector('._password')
    const re_password = this.$refs.f_re_password.$el.querySelector('._re_password')
    const user_id = this.$refs.f_user_id.$el.querySelector('._user_id')
    user_id.addEventListener('keyup', (e) => {
      this.$nextTick(() => {
        this.user_id = this.user_id.replace(/[^0-9]/g,"")
      })
    })
    auth_num.addEventListener('keyup', (e) => {
      if(e.key == 'Enter')
        password.focus()
    })
    password.addEventListener('keyup', (e) => {
      if(e.key == 'Enter')
        re_password.focus()
    })
    re_password.addEventListener('keyup', (e) => {
      if(e.key == 'Enter')
        this.pw_change()
    })
  },
  methods: {
    authClick() {

      if (this.user_id.length < 10) 
        this.showToast("정확한 회원아이디(핸드폰번호)를 입력하세요");
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
    pw_change() {
      if (this.user_id.length < 10) 
        this.showToast("정확한 회원아이디(핸드폰번호)를 입력하세요");
      else if (this.password.length < 6) 
        this.showToast("정확한 비밀번호(6자리이상)를 입력하세요");
      else if (this.password != this.re_password) 
        this.showToast("비밀번호가 서로 틀립니다.");
      else {
        this.loading = true;
        var param = {
          'user_id': this.user_id,
          'password': this.password,
          'auth_num': this.auth_num
        };
        this.$store.dispatch('u_pw2', param)
          .then((res) => {
            this.loading = false;
            if (res.result == 'SUCCESS') {
              this.showToast("비밀번호가 변경 되었습니다");
              let _this = this
              setTimeout(function() {
                _this.$router.go(-1);
              }, 1500)
            } else 
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
.pwd-find-container {
  margin-top: 3.5rem;
}

.pwd_find_div {
  padding:  0 1.5rem;
  padding-top: 1rem;
}

.j_label_title {
  font-size: 1.3rem;
  font-weight: bold;
  width: 320px;
}

.j_hint {
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

.find_btn {
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