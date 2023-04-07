<template>
  <div class="sns-login">
      <img src="../assets/img/kakaotalk_hambuger.svg" v-if= "!is_sns_login" @click="kakao_login" class="kakao_btn"/>
      <!-- <img src="../assets/img/kakao_btn.png" @click="kakao_login" class="kakao_btn"/> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "snsLogin",
  computed: {
    user_id() {
      return this.$store.getters.user_id;
    },
    sns_id() {
      return this.$store.getters.sns_id;
    },
    is_login() {
      return this.$store.getters.is_login
    },
    is_sns_login() {
      return this.$store.getters.is_sns_login
    },
  },
  mounted() {
    this.kakao_init();
  },
  methods: {

    kakao_init() {

      let el = document.createElement('script'),
      self = this;
      el.setAttribute('type', 'text/javascript');
      el.setAttribute('src', '//developers.kakao.com/sdk/js/kakao.min.js');
      document.getElementsByTagName('head')[0].appendChild(el);
    },

    kakao_login() {

      Kakao.init('80575535bf9f398544ff4f258b7b17b0');
      var _user_id = this.user_id;
      var gg = this;
      Kakao.Auth.login({
        success: function(authObj) {
          //alert('authlogin success');
          Kakao.API.request({
             url: '/v2/user/me',
             success: function(res) {
               // console.log(res);
               if (_user_id.length == 0)
                 _user_id = 'K' + res.id;
               //alert(_user_id);
               let param = {
                 'user_id': _user_id,
                 'email': res.kaccount_email,
                 'sns_id': 'K'+ res.id
               };
               gg.$store.dispatch('c_sns_user', param)
                 .then((res) => {

                  // this.loading = false;
                   if (res.result == 'SUCCESS') {
                     //this.showToast("로그인 되었습니다.");
                     gg.$store.commit('is_sns_login', true);
                     gg.$store.commit('user_id', _user_id);
                     gg.$store.commit('sns_id', param.sns_id);
                     gg.$router.go(-1);
                    

                     //alert("카카오톡 로그인에 성공하였습니다.");
                     console.log('sns login success',this.user_id);
                   } else {
                     alert("통신 오류입니다. 잠시후 다시 시도하세요.");
                   }
               })
               //alert(JSON.stringify(res));
             },

             fail: function(error) {
               alert(JSON.stringify(error));
             }
           });
          //alert(JSON.stringify(authObj));
        },
        fail: function(err) {
          console.log("res", err.error);

          //let res = JSON.stringify(err);

          //alert(JSON.stringify(err));
        }
      });

    }
  }
}
</script>

<style scoped>
.kakao_btn {
  display: block;
  width: 100%;
  /* text-align: center; */
  margin-left: auto;
  margin-right: auto;
  /* margin-top: 1rem; */

}
</style>