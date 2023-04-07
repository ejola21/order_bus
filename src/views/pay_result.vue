<template>
  <div class="pay_result_container" :style="{ maxHeight : windowHeight , minHeight: windowHeight}">
        <div class="pay_result_title">
            <div class="pay_title_img">
                <img v-if="reply_result" src="../assets/img/pay_success.png">
                <img v-else src="../assets/img/pay_fail.png">
            </div>
            <div class="pay_title_desc">
                <span v-if="reply_result">결제가 정상적으로 완료 되었습니다.</span>
                <span v-else>결제가 실패하였습니다.</span>
                <br>
                <span v-if="!reply_result">가맹점 관리자에게 문의해 주십시오.</span>
                <br v-if="!reply_result">
                <span>{{reply_desc}}</span>
            </div>
        </div>
        <div v-if="reply_result" class="payResult_btns">
          <v-row align="center">
          <v-col class="text-center" cols="12" sm="4">
           <div class="my-2">
             <v-btn x-large color="#043474" v-if="store.group_code" class="group_store_go" @click="go_group_click">상점으로 가기</v-btn>
             <v-btn x-large color="#043474" class="pay_result_status_go_btn" @click="go_status_click">주문 상태 보기</v-btn>
             <v-btn x-large color="#ffffff" class="pay_result_menu_go_btn" @click="go_menu_click">메뉴 더 보기</v-btn>
          <!-- <div v-if="store.group_code" class="group_store_go" @click="go_group_click">상점으로 가기</div>
          <div class="pay_result_status_go_btn" @click="go_status_click">주문 상태 보기</div>
          <div class="pay_result_menu_go_btn" @click="go_menu_click">메뉴 더 보기</div> -->
           </div>
          </v-col>
          </v-row>
        </div>
        <div v-else class="payResult_btns" >
          <v-row align="center">
          <v-col class="text-center" cols="12" sm="4">
           <div class="my-2">
              <v-btn x-large color="#474747" class="pay_result_basket_go_btn" @click="go_basket">장바구니 이동</v-btn>
            <!-- <div class="pay_result_basket_go_btn" @click="go_basket">장바구니 이동</div> -->
            </div>
          </v-col>
          </v-row>
        </div>

    </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      reply_result : true,
      btn_label:'',
      reply_desc: '',
      windowHeight: 0,

    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    table_id() {
        return this.$store.getters.table_id;
    },
    user_phone() {
        return this.$store.getters.user_phone;
    }
  },
  methods: {
    move_status() {
      if(this.reply_result)
        this.$router.push('/status/' + this.store.store_id + '/' + this.user_id);
      else
        this.$router.push("/basket_all");
    },

    go_status_click() {
        this.$router.push('/status/'+ this.store.store_id+'/'+ this.user_id);
    },
    go_menu_click() {
        this.$router.push('/menu/'+ this.store.store_id+'/'+ this.table_id);
    },
    go_basket() {
      this.$router.push("/basket_all");
    },
    go_group_click () {
      this.$router.push('/group/'+this.store.group_code+'/'+this.table_id);
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
    // window.location.reload();
    Allat_Mobile_Close();
    // document.getElementById("ALLAT_MOBILE_PAY").style.display = "none";
    this.$store.commit('is_popup', {
        is_popup: false,
        title: '',
        desc: ''
    });
    if (this.$route.params.pg == 'KG') {
      if (this.$route.params.reply_cd == '0000') {
          this.reply_desc = "주문현황에서 주문상태를 볼수 있습니다.",
          this.$store.commit('del_all_order');
          this.reply_result = true;
          if (this.user_phone != '') this.$store.commit('user_id',this.user_phone);
      }
      else if (this.$route.params.reply_cd == '9999') {
        this.reply_desc = "결제를 취소 하였습니다";
        this.reply_result = false;
      }
      else {
          this.reply_desc = this.$route.params.reply_msg + "( " + this.$route.params.pg + " - " + this.$route.params.reply_cd + ")";
          this.reply_result = false;
      }

    } else if (this.$route.params.pg == 'SB') {
      if (this.$route.params.reply_cd == '0021') {
          this.reply_desc = "주문현황에서 주문상태를 볼수 있습니다.",
          this.$store.commit('del_all_order');
          this.reply_result = true;
          if (this.user_phone != '') this.$store.commit('user_id',this.user_phone);
      } else {
        this.reply_desc = this.$route.params.reply_msg + "( " + this.$route.params.pg + " - " + this.$route.params.reply_cd + ")";
        this.reply_result = false;
      }
    }

    this.windowHeight = window.innerHeight - 56;
    this.windowHeight += 'px'

  }
}
</script>

<style scoped>
.pay_result_container {
    /* margin-top: 3.5rem; */
    background-color: white;
}
.pay_result_container>.pay_result_title {
    margin: 1rem;
}
.pay_result_container>.pay_result_title>.pay_title_img {
    padding: 1rem 3rem;
}
.pay_result_container>.pay_result_title>.pay_title_img>img {
    width: 100%;
}
.pay_title_desc {
    text-align: center;
    /* padding: 1rem; */
    padding-top: 0;
}
.pay_title_desc>span {
    color: #8a8a8a;
    font-size: 1rem;
}

.payResult_btns {
    padding: 0rem 1rem;
}


.pay_result_status_go_btn {
    color: white;
    background-color: #0856c3;

}
.pay_result_menu_go_btn {
    color: #043474;
    border: 0.05rem solid #043474 !important;
    background-color: white;
}
.pay_result_basket_go_btn {
  background-color: #474747;
  color: white;
}
.group_store_go {
  color: white;
  background-color: #00295a;
}
.pay_result_menu_go_btn, .pay_result_status_go_btn, .pay_result_basket_go_btn, .group_store_go {
    margin: 0.7rem 0;
    text-align: center;
    line-height: 80px;
    width: 100%;
    height: 80px;
    font-size: 1.5rem;
    font-weight: bold;
}
.v-btn:not(.v-btn--round).v-size--x-large {
    height: 4rem;
}
</style>