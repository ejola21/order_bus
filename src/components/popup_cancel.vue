<template>
  <div class="popup_background" v-if="is_popup.is_popup">
    <div class="popup_window">
      <div class="popup_title">
        <span>{{ is_popup.title }}</span>
      </div>
      <div class="popup_desc">
        <span>{{ is_popup.desc }}</span>
      </div>
      <div class="popup_btn_div">
        <div class="popup_close_btn" @click="popup_close_btn">
          <span>닫기</span>
        </div>
        <div v-if="is_popup.title == '주문 취소요청'" class="popup_cancel_req" @click="$emit('cancel_req')">
          <span>취소요청</span>
        </div>
        <div v-else-if="is_popup.title == '리뷰 삭제 요청'" class="popup_cancel_req" @click="$emit('cancel_req')">
          <span>삭제</span>
        </div>
        <div v-else-if="is_popup.title == '호출 하기'" class="popup_cancel_req" @click="$emit('req_bell_call')">
          <span>호출하기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "popupCancel",
  computed: {
    is_popup() {
      return this.$store.getters.is_popup;
    }
  },
  methods: {
    popup_close_btn() {
      this.$store.commit('is_popup', {
        is_popup: false,
        title: '',
        desc: ''
      });
    },
  }
}
</script>

<style scoped>
.popup_background {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.popup_window {
  background-color: white;
  position: fixed;
  top: 30%;
  left: 10%;
  width: 80%;
  
}
.popup_title {
  padding: 2rem;
  padding-bottom: 1rem;
  font-size: 2.3rem;
  text-align: center;
}

.popup_title>img {
  width: 100%;
}
.popup_desc {
  padding: 2rem 1rem;
  padding-top: 0; 
  text-align: center;
}
.popup_desc>span {
  color: #8A8A8A;
  font-size: 1.2rem;
}

.popup_btn_div {
  text-align: center;
  width : 100%;
}
.popup_btn_div::after {
  content: '';
  clear: both;
  display: block;
}
.popup_close_btn {
  background-color: #00295A;
  color: white;
  width:50%;
  float: left;
}

.popup_cancel_req {
  background-color: #0856C3;
  color: white;
  width:50%;
  float: right;
}
.popup_close_btn, .popup_cancel_req {
  height: 3.3rem;
}

.popup_close_btn>span, .popup_cancel_req>span {
  line-height: 3.3rem;
}
</style>