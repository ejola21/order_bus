<template>
  <div class="myboard_msg_container">
  <div class="myboard_title">
    <p>보드판으로 메시지가 전송됩니다.</p>
  </div>

    <v-textarea class="mx-4" solo  counter v-model="msg"
     placeholder=" 메시지를 입력해주세요" />
    </v-textarea>

  <div class="myboard_submit_div">
    <v-btn @click="submitBtnClick" block color="primary">메시지 전송</v-btn>
  </div>
  <div class="info_desc">
    <div>
      <span>욕설 및 부적절한 단어 사용시 삭제 처리됩니다.</span>
    </div>

  </div>
</div>
</template>

<script>
/* eslint-disable */
 export default {
  data() {
    return {
      inputErrorText: '',
      msg: ''
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    user_id() {
      return this.$store.getters.user_id;
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
  },
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '30자 이내로 적어주세요.' : ''
    },
    submitBtnClick() {
      this.msg = this.msg.trim();
      if (this.msg.length > 30) {
        this.showToast('메시지를 30자 이내로 적어주세요.');
      }
      else if (this.msg === '') {
        this.showToast('메시지를 입력하세요.');
      }
      else {
        let params = {
          store_id : this.store.store_id,
          biz_dt : this.store.biz_dt,
          table_id : this.table_id,
          user_id : this.user_id,
          msg : this.msg
        }
        this.$store.commit('loading', true);
        this.$store.dispatch('ou_c_user_msg', params)
        .then((res) => {
          this.$store.commit('loading', false);
          if(res[0].result == 'SUCCESS') {
            this.showToast('메시지를 성공적으로 전송하였습니다.')
            this.msg = ''
          }
          else
            this.showToast(res.result)
        })
        .catch((err) => {
          console.log(err)
        })
        
      }
    }

  }
}
</script>

<style scoped>
.myboard_msg_container {
  height: 100vh;
  background-color: #f1f1f1;
}
.myboard_msg_container>.myboard_title {
  text-align: center;
  width: 100%;
  padding-top: 90px;
  margin-bottom: 34px;
}
.myboard_msg_container>.myboard_title>p {
  color: #0856c3;
  font-size: 1.2rem;
  font-weight: 600;
}
.myboard_msg_container>.myboard_text {
  margin: 0 1rem;
  padding: 1.5rem;
  padding-bottom: 0;
  background-color: white;
  border-left: 2px solid #707070;
  border-right: 2px solid #707070;
  border-top: 2px solid #707070;
  box-sizing: border-box;
}
.myboard_msg_container>.myboard_text>.msg_box {
  font-size: 2rem;
}
.mu-text-field-multiline {
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
}
.multi-line {
  width: 80vw!important;
}
.myboard_msg_container>.myboard_submit_div {
  margin: 0 1rem;
}
.myboard_text>.multi-line>.mu-text-field-content>div>.mu-text-field-line,
.myboard_text>.multi-line>.mu-text-field-content>div>.mu-text-field-focus-line
{
  background-color: white;
}
.myboard_msg_container>.info_desc {
  margin: 0 1rem;
  margin-top: 34px;
  text-align: center;
}
.myboard_msg_container>.info_desc>div>span {
  color: #8a8a8a;
  font-size: .7rem;
  font-weight: bold;
}
.myboard_msg_container>.info_desc>div>i {
  vertical-align: middle;
}
.hint {
  margin: .5rem;
  font-size: 1.5rem;
}
</style>