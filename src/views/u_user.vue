<template>
 <div class="u_user">

  <div class="u_user_login">
    <mu-paper class="u_user1" :zDepth="1"  >
      <div class="user_number">
        <span class="user_id">{{user_id}}</span>
        <span> 님</span>
      </div>
      <div class="user_info_desc">
        <div class="desc_img">
          <img src="../assets/img/userinfo_desc.png">
        </div>
        <!-- <span class="material-icons md-18">ic_notifications_none</span> -->

      </div>
      <!-- <div class="content1">
        <mu-text-field fullWidth label="핸드폰번호 - 회원ID" :value ="user_id"  type="number"  labelClass="u_label_title" hintTextClass="l_hint" disabled/>

        <mu-select-field fullWidth v-model="age" label="나이" labelClass="u_label_title">
           <mu-menu-item value="10" title="10대"/>
           <mu-menu-item value="20" title="20대"/>
           <mu-menu-item value="30" title="30대"/>
           <mu-menu-item value="40" title="40대"/>
           <mu-menu-item value="50" title="50대"/>
           <mu-menu-item value="60" title="60대"/>
           <mu-menu-item value="70" title="70대"/>
           <mu-menu-item value="80" title="80대"/>
        </mu-select-field>

        <div class="u_gender">
          <span class="u_label_title">성별</span>
          <mu-radio label="남" nativeValue="M" :value="gender" v-model="gender" labelClass = "u_label_radio" />
          <mu-radio label="여" nativeValue="W" :value="gender" v-model="gender" labelClass = "u_label_radio" />
        </div>
        <mu-raised-button class="u_buttons" label="회원 정보 수정" fullWidth v-on:click="u_user_click()" primary/>
      </div> -->

    </mu-paper>

    <mu-paper class="u_user2 demo-paper" :zDepth="1"  >
      <!-- <mu-appbar title="비밀번호 변경" class="member-title-bar"></mu-appbar> -->
      <div class="content2">
        <mu-text-field fullWidth v-model="password" label="신규 비밀번호 - 6자리이상"  hintText="입력하세요" type="password" labelClass ="u_label_title"  :maxLength="6"/>
        <mu-text-field fullWidth v-model="re_password" label="신규 비밀번호 재입력"  hintText="입력하세요" type="password" labelClass ="u_label_title" :maxLength="6" />
        <mu-raised-button class="pw_btn" label="비밀번호 변경" fullWidth v-on:click="pw_click()"/>
      </div>
      <div class="leave_go_btn" v-on:click="logoutClick()">
        로그아웃
      </div>
      <!-- <div class="leave_go_btn" v-on:click="leave_move()">
        회원탈퇴
      </div> -->
    </mu-paper>
  </div>
</div>
</template>

<script>
/* eslint-disable */
 export default {
  data() {
    return {
      user_id: '',
      password: '',
      re_password: '',
    }
  },
  computed: {
    is_login() {
      return this.$store.getters.is_login
    },
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
    
    if(!this.$store.getters.is_login)
      this.$router.push('/login');

    this.user_id = this.$route.params.user_id;
    var param = {
      'user_id': this.$route.params.user_id
    };
    this.$store.dispatch('r_user', param)
      .then((res) => {
        //  console.log(res);
        // this.gender = res[0].gender;
        // this.age = res[0].age;
      })
  },
  methods: {
    leave_move() {
      this.$router.push('/leave');
    },
    u_user_click() {

      var param = {
        'user_id': this.user_id,
        'sender': 'u_user'
      };
      this.$store.dispatch('u_user', param)
        .then((res) => {
          if (res.result == 'SUCCESS') {
            this.showToast("회원정보가 변경되었습니다.");
          } else {
            this.showToast("통신 에러 입니다.잠시후에 다시 하세요.");
          }
        })
    },
    pw_click() {

      if (this.password.length < 6) {
        this.showToast("정확한 비밀번호(6자리이상)를 입력하세요");
      } else if (this.password != this.re_password) {
        this.showToast("비밀번호가 서로 틀립니다.");
      } else {

        var param = {
          'user_id': this.user_id,
          'password': this.password,
          'sender': 'u_pw'
        };
        this.$store.dispatch('u_user', param)
          .then((res) => {
            if (res.result == 'SUCCESS') {
              this.showToast("비밀번호가 변경되었습니다.");
            } else {
              this.showToast("통신 에러 입니다.잠시후에 다시 하세요.");
            }
          })
      }
    },
    logoutClick() {
            this.$store.commit('logout');
            this.$router.push('/menu/'+ this.store.store_id+'/'+ this.table_id);
    },


  }
}
</script>

<style scoped>
.u_label_title {
  font-size: 1.4rem;
  font-weight: bold;
}

/* .mu-text-field-label {
  margin-left: 0px !important;
} */

/* .mu-appbar-title {
  font-weight: bold;
} */

/* .u_label_radio {
  margin-left: 0rem;
} */
</style>

<style scoped>
.u_user1 {
  padding: 5%;
}
.leave_go_btn{
  padding: 1rem;
  text-align: center;
  text-decoration: underline;
  color: gray;
  /* background-color: rgb(220, 220, 230);
  color: rgb(73, 73, 73); */
}
.desc_img {
  padding: 0 1rem;
  width: 100%;
}
.desc_img>img {
  width: 100%;
}


.u_user2 {
  /* margin: 1rem; */
}
.user_number {
  text-align: center;
}
.user_number>span {
  font-size: 1.5rem;
}
.user_number>.user_id {
  font-size: 2rem;
  font-weight: 600;
}

.user_info_desc span {
  color: #8a8a8a;
  font-size: 1rem;
}

.user_info_desc {
  padding-bottom: 1%;
  text-align: center;
}

.u_user {
  margin-top: 3.5rem;
}

/* .u_buttons {
  margin-top: 2rem;
  font-size: 1.0rem;
} */

.pw_btn {
  margin-top: 2rem;
  background-color: #0856c3;
  color: white;
}


/* .u_gender span {
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.1rem;
} */

/* .content1 {
  padding: 1rem;
} */

.content2 {
  padding: 1rem;
}

/* .pw_label {
  margin-top: 0.5rem;
  position: relative;
  vertical-align: middle;
} */

/* .mu-radio {
  vertical-align: middle;
  margin-left: 1rem;
} */

</style>
