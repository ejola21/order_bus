<template>
 <div class="join-container">
  <v-card class="join_id">
    <div class="j_join">
      <mu-text-field full-width v-model="user_id" label="휴대폰번호(회원ID)" hintText="숫자만 입력해주세요." type="tel"  labelClass="j_label_title" hintTextClass="j_hint" />
      <v-btn class="auth_btn" label="인증번호 받기" block v-on:click="authClick()" />
      <mu-text-field full-width ref="j_auth_num" inputClass="_auth_num" v-model="auth_num" label="인증번호"  type="tel" hintText="인증번호 입력하세요." hintTextClass="j_hint" :errorText="inputErrorText" @textOverflow="handleInputOverflow" labelClass ="j_label_title"  :maxLength="6" />
      <mu-text-field full-width ref="j_password" inputClass="_password" v-model="password"label="비밀번호 - 6자리이상"  hintText="비밀번호를 입력해주세요." hintTextClass="j_hint" type="password" labelClass ="j_label_title"  :maxLength="6" />
      <mu-text-field full-width ref="j_re_password" inputClass="_re_password" v-model="re_password" label="비밀번호 재입력" hintText="비밀번호를 입력해주세요."  hintTextClass="j_hint" type="password" labelClass ="j_label_title" :maxLength="6" />
      <mu-raised-button class="join_btn" label="사용자 등록" fullWidth v-on:click="joinClick()" primary/>
    </div>
  </v-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      user_id: '',
      auth_num: '',
      password: '',
      re_password: '',
      inputErrorText: '',
    }
  },
  computed: {
    bf_pay() {
      return this.$store.getters.bf_pay;
    }
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
    const auth_num = this.$refs.j_auth_num.$el.querySelector('._auth_num')
    const password = this.$refs.j_password.$el.querySelector('._password')
    const re_password = this.$refs.j_re_password.$el.querySelector('._re_password')
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
        this.joinClick()
    })
  },
  methods: {
    joinClick() {
      if (this.password.length < 6) {
        this.showToast("정확한 비밀번호(6자리이상)를 입력하세요");
      } else if (this.user_id.length < 10) {
        this.showToast("정확한 폰번호를 입력하세요");
      } else if (this.password != this.re_password) {
        this.showToast("비밀번호가 서로 틀립니다.");
      } else {

        var param = {
          'user_id': this.user_id,
          'password': this.password,
          'auth_num': this.auth_num
        };
        this.$store.dispatch('c_user_web', param)
          .then((res) => {

            if (res.result == 'SUCCESS') {
              this.showToast("회원가입을 축하합니다.");


              this.$store.commit('login',
                            {user_id: this.user_id,
                              password: this.password,
                              auto_login: true,
                              is_login: true,
                            });

              if(this.bf_pay =='')
              {
                this.$router.go(-1);
              }
              else if (this.bf_pay =='NORMAL')
              {
                this.$store.commit('bf_pay','');
                this.$router.push("/order2");
              }
              else
              {
                this.$store.commit('bf_pay','');
                this.$router.push("/basket_all");
              }

            } else if (res.result == 'DUP') {
              this.showToast("이미 등록된 휴대폰 번호입니다.");
            } else {
              this.showToast("인증번호가 틀렸습니다.");
            }

          })
      }
    },

    authClick() {

      if (this.user_id.length < 10) {
        this.showToast("정확한 폰번호를 입력하세요");
      } else {
        var param = {
          'user_id': this.user_id,
        };
        this.$store.dispatch('cu_user_auth', param)
          .then((res) => {

            if (res.result == 'SUCCESS') {
              this.showToast("인증 번호를 전송했습니다.");
            } else if (res.result == 'DUP') {
              this.showToast("이미 등록된 휴대폰 번호입니다.로그인 해주세요");
            }

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
.join-container {
  margin-top: 3.5rem;
}

.j_join {
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

.join_btn {
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