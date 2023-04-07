<template>
  <mu-paper class="login_div">
    <div v-if= "store.pay_yn == 'N'" class="l_login">

        <div class="join_desc">
          투디페이가 처음 이신가요?
        </div>

        <mu-raised-button label="휴대폰 번호로 가입" fullWidth v-on:click="joinClick()" icon="phone_iphone" primary class="join_btn"/>
        <!-- 원래는 2dpay 회원가입 -->
        <mu-divider/>

        <div class="login_desc">
          이미 가입 하셨나요?
        </div>

        <mu-text-field ref="user_id" fullWidth label="휴대폰번호(회원ID)" v-model="m_user_id" hintText="숫자만 입력" type="tel"  inputClass="_user_id" labelClass="l_label_title" hintTextClass="l_hint" />
        <mu-text-field ref="user_password" fullWidth label="비밀번호(6자리이상)" v-model="password" hintText="패스워드 입력" inputClass="password" type="password" labelClass ="l_label_title" hintTextClass="l_hint"/>

        <div class="l_login_button">
          <mu-raised-button label="휴대폰 번호로 로그인" color="#0856c3" icon="phone_iphone"fullWidth v-on:click="loginClick()" class="login_btn"/>
          <!-- 2DPAY 로그인 이였음 -->
        </div>

        <div class="pw_btn" v-on:click="pwClick()">
          비밀번호 찾기
        </div>
    </div>
    <div v-if= "store.order_yn == 'Y' || store.call_yn == 'Y'" class="order_menu_login_div">
        <div class="order_menu_title">
          <img src="../assets/img/alram.png"/>
        </div>
        <sns-login  v-if= "store.order_yn == 'Y' || store.call_yn == 'Y'" class="sns_login"></sns-login>
    </div>
  </mu-paper>
</template>

<script>
/* eslint-disable */
import snsLogin from '../components/snsLogin';
export default {
  components: {
    snsLogin
  },
  data() {
    return {
      m_user_id: '',
      password: '',
      auto_login: true,
      info:''
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
    // this.$store.commit('title', '로그인');
    this.m_user_id = this.user_id;
    if (this.store.pay_yn == 'Y') {
      const password_input = this.$refs.user_password.$el.querySelector('.password')
      password_input.addEventListener('keyup', (e) => {
        if(e.key == 'Enter')
          this.loginClick()
      })
    const user_id_input = this.$refs.user_id.$el.querySelector('._user_id')
        user_id_input.addEventListener('keyup', (e) => {
          this.$nextTick(() => {
            this.m_user_id = this.m_user_id.replace(/[^0-9]/g,"")
            if(e.key == 'Enter')
            password_input.focus()
          })
      })
      this.info = "결제는 간단한 회원가입이 필요합니다.";
    }
    else
      this.info = "2DPAY 회원가입시 다양한혜택을 제공합니다.";
    
    
  },
  computed: {
    user_id() {
      return this.$store.getters.user_id;
    },
    bf_pay() {
      return this.$store.getters.bf_pay;
    },
    store() {
      return this.$store.getters.store;
    },
  },

  methods: {
    loginClick() {
      //console.log('loginClick');

      if (this.password.length < 6) {
        this.showToast("정확한 비밀번호(6자리이상)를 입력하세요");
      } else if (this.m_user_id.length < 10) {
        this.showToast("정확한 회원아이디(휴대폰번호)를 입력하세요");
      } else {
        this.$store.commit('loading', true);
        let param = {
          'user_id': this.m_user_id,
          'password': this.password,
          'auto_login': this.auto_login,
        };
        this.$store.dispatch('login', param)
          .then((res) => {
            this.$store.commit('loading', false);
            if (res.result == 'SUCCESS') {
              this.showToast("로그인 되었습니다.");

             if (this.bf_pay =='NORMAL')
              {
                this.$store.commit('bf_pay','');
                this.$router.push("/order2");
              }
              else
              {
                this.$store.commit('bf_pay','');
                this.$router.go(-1);
                //this.$router.push("/basket/1/1/NO");
              }

            } else if (res.result == 'NO_ACCOUNT')
              this.showToast("회원 아이디가 없습니다.");
            else if (res.result == 'FAIL_PASSWORD')
              this.showToast("비밀번호가 틀렸습니다.");
        })
      }

    },
    pwClick() {
      this.$router.push('/pwd_find');

    },
    joinClick() {
      this.$router.push('/join');
    },
  }
}
</script>

<style scoped>
.point_color {
  color: rgb(238, 40, 40);
  font-size: 0.9rem;
}


.l_login {
  padding-top: 0.1rem;
  padding-left:  2rem;
  padding-right: 2rem;

}
.l_login>.join_desc, .l_login>.login_desc {
  text-align: center;
  margin: 1rem;
  font-size: 1rem;
}

.l_label_title {
  font-size: 0.9rem;
  font-weight: bold;
}

.l_hint {
  font-size: 0.8rem;
  font-weight: normal;
  margin-left: 0.8rem;
}

.l_login_button {
  width :100%;
  border: solid 2px #0856c3;
}

.mu-text-field-label{
  font-size:1.1rem;
}

.mu-raised-button{
  font-size:1rem;
}

.l_hint{
  font-size:1rem;
}

.join_btn {
  margin-bottom: 1rem;
}

.login_div {
  /* margin: 1rem; */
  margin-top: 3.5rem;
}

.login_div .mu-divider {
  margin-bottom: 1rem;
  background-color: #BBBBBB;
}

</style>

<style scoped>
.order_menu_login_div {
  width:100%;
  color: white;
  padding: 1rem;
}


.pw_btn{
  padding: 1rem;
  text-align: center;
  text-decoration: underline;
  color: gray;
  /* background-color: rgb(220, 220, 230);
  color: rgb(73, 73, 73); */
}
.order_menu_title {
  padding: 1rem;
  text-align: center;
}

.order_menu_title>img {
  vertical-align: middle;
  width: 100%;
}
</style>
