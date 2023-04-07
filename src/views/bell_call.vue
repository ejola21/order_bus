<template>
<div class="bell_call_container">
    <popup-cancel @req_bell_call="req_bell_call"/>
    <div class="bell_call">
    <div class="bell_login">
      <div class="bell_call1">

        <div class="bell_call_title_container">
          <div class="bell_title">
          <strong class="point_color"> 요청사항</strong>을 작성해주세요.
        </div>
        <div class="bell_title1">
          * 추가 메뉴 주문은 주문하기를 이용해 주세요 ^^ *
        </div>
        </div>
        <div class="arrow_box2">
         
        <v-textarea
          outlined
          v-model ="msg"
          name="input-7-4"
          label="요청 사항"
          counter
            maxlength="50"
        ></v-textarea>

           <!-- <v-text-field
            v-model="msg"
         
            label="요청사항"
            counter
            maxlength="50"
          ></v-text-field> -->
            <!-- <v-text-field fullWidth v-model ="msg" hintText="전달사항" :errorText="inputErrorText" @textOverflow="handleInputOverflow" labelClass="l_label_title" hintTextClass="l_hint" :maxLength="20"/> -->
        </div>

        <div class="circle1">{{table_id}}</div>
        <div class="circle1_title">테이블번호</div>
      </div>
      <div class="bell_footer">
        <v-btn clss="btn_bell"  v-on:click="staff_call()" width="100%" dark large>직원 호출</v-btn>
  <!-- <sns-login></sns-login> -->
    <!-- <mu-raised-button class ="btn_bell" label="직원 호출" fullWidth v-on:click="staff_call()" primary/> -->
  </div>
      <div class="bell_call2" v-if="receive1">
        <div class="recv">
          <div class="recv_item1">{{receive1}}</div>
          <div class="recv_item2">{{receive2}}</div>
          <div class="recv_item3">{{receive3}}</div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
/* eslint-disable */
import popupCancel from '../components/popup_cancel';
export default {
  components: {
    popupCancel
  },
  computed: {
    store() {
      return this.$store.getters.store
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    // is_login() {
    //   return this.$store.getters.is_login
    // },
    // is_sns_login() {
    //   return this.$store.getters.is_sns_login
    // },
  },
  data() {
    return {
      msg: '',
      longitude: '',
      latitude: '',
      receive1: '',
      receive2: '',
      receive3: '',
      windowHeight: '',
      inputErrorText: '',
    }
  },
  created() {
    // 뷰가 생성되고 데이터가 이미 감시 되고 있을 때 데이터를 가져온다.
    // console.log("bell_call created");
    console.log("111",this.$store);
    this.windowHeight = window.innerHeight - 112;
    this.windowHeight += 'px'
    this.$store.commit('is_back', false);
    this.getData()
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route': 'fetchData'
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', false);
    this.$store.commit('is_menu', true);
    this.$store.commit('is_bell', false);
  },
  methods: {
    getData() {
      let param = {
        'store_id': this.store.store_id,
        'table_id': this.table_id
      };

      this.$store.dispatch('f_user_store_bell', param)
        .then((res) => {
          // console.log("res", res);
          if (res.length > 0) {
            this.receive1 = res[0].call_time;
            this.receive2 = res[0].msg;
            this.receive3 = "전송완료";
          }
        })

    },
    staff_call() {
      this.msg = this.msg.trim();
      if (this.msg.length > 20) {
        this.showToast("전달사항은 20자 이내로 작성해주세요.");
      }
      else {
        this.$store.commit('is_popup', {
          is_popup: true,
          title: '호출 하기',
          desc: '정말 호출을 하시겠습니까?'
        })
      }
    },

    req_bell_call() {

      if (this.msg === '') {
        this.msg = '직원을 호출 하였습니다.'
      }
      
      let param = {
          'user_id': this.user_id,
          'store_id': this.store.store_id,
          'table_id': this.table_id,
          'msg': this.msg
        };
        this.$store.commit('loading', true);

        this.$store.dispatch('f_c_store_bell', param)
          .then((res) => {
            this.$store.commit('is_popup', {
            is_popup: false,
            title: '',
            desc: ''
          });
            this.$store.commit('loading', false);

            if (res.result == 'SUCCESS') {

              if(this.user_id == '')
              {
                  this.$store.commit('user_id', res.user_id);
                  // this.$store.commit('is_sns_login', true);
              }
              //this.$store.commit('user_seq', res.user_seq);
              this.msg = '';
              this.showToast("직원 호출을 하였습니다. 잠시만 기다리세요.");
              this.getData();
            } else if (res.result == 'DUP') {
              this.showToast("이미 호출 하셨습니다. 죄송하지만 잠시만 기다리세요.");
            } else if (res.result == 'CLOSED') {
              this.showToast("영업시간이 아닙니다.");
            } else if (res.result == 'NO_TABLE') {
              //this.showToast("");
              this.showToast("잘못된 접근입니다.(TABLE)");
            } else if (res.result == 'BLOCK_USER') {
              this.showToast("잘못된 접근입니다.(BLOCK)");
            } else if (res.result == 'ALREADY_MSG') {
              this.showToast("이미 호출 하셨습니다. 죄송하지만 잠시만 기다리세요.");
            } else
              this.showToast("통신에러 입니다. 잠시후에 다시 시도해 주세요.");
          })
    },
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '전달사항이 너무 깁니다.' : ''
    },
  }
}
</script>

<style scoped>
.bell_call_container {
  background-color: #f1f1f1;
  height: 90.5vh;
}
html, body {
    height: 100%;
}
.bell_call_title_container {
  margin-bottom: 1rem;
}
.bell_login {
  background-color: rgba(241, 241, 241,0.87);
}
.no_login {
  text-align: center;
  font-size: 1rem;
  background-color: rgb(227, 242, 254);
  padding: 1rem;
  margin-bottom: 1rem;
  color: rgb(30, 30, 30);
}
.point_color2{
  font-size:1.05rem;
}
.btn_login
{
  margin-top: 1.5rem;
}
.bell_call1{
  padding: 2rem 1rem 1rem 1rem;
  background-color: rgba(255, 255, 255,0.87);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.bell_footer{
  width: 100%;
}
.btn_bell {
  height: 3.5rem;
}
.v-btn.v-size--large {
    height: 3.5rem;
    min-width: 100%;
    font-size:1.2rem;
    font-weight: bolder;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #043474;
}
.recv{
  display:flex;
  flex-direction:row;
  justify-content: space-around;
}
.recv_item1{
  width: 15%;
  font-weight: bold;
}
.recv_item2{
  width: 60%;
  word-wrap: break-word;
  overflow: hidden;
}
.recv_item3{
  color: #a80000;
  font-weight: bold;
  /* width: 20%; */
}
.circle1_title{
    margin: 1rem auto;
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    color:#043474;
}
.circle1 {
 margin: 0 auto;
 width: 6rem;
 height:6rem;
 line-height: 6rem;
 border-radius:100px;
 box-shadow: 0px 0px 10px #0099f9;
 -moz-border-radius : 100px;
 -webkit-border-radius : 100px;
 -ms-border-radius :100px;
 -khtml-border-radius : 100px;
 -o-border-radius :100px;
 background : #043474;
 font-size: 4rem;
 color:#fff;
 text-align:center;
}

.arrow_box2{
   padding: 0 1rem; 
   /* padding-bottom: 2rem; */
   /* padding-top: 1rem; */
   /* background-image: url("../assets/img/say_window.png"); */
   background-size: 100% 100%;
   background-repeat: no-repeat;
   /* background-repeat: no-repeat;
   background-attachment: fixed; */
   background-position: center;
   margin: 5% 0;
}
.bell_title{
  font-size : 1.2rem;
  text-align: center;
  font-weight: bold;
}



.point_color {
  color: #a80000;
  font-size : 1.3rem;
}
.bell_call2 {
  padding: 1rem;
}
.bell_call2>.recv {
  font-size: 1.1rem;
}
.bell_title1 {
  font-size: 0.9rem;
  text-align: center;
  font-weight: bold;
  color: #a80000;
}
</style>