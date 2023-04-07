<template>
  <v-content>
    <div class="sub_top">
      <div class="back_btn"><a href="javascript:void(0);"><v-icon>mdi-arrow-left</v-icon></a></div>
      <div class="tit">결제내역</div>
    </div>
    <v-col class="v_col_mnlist">
      <div class="list rv_list">
        <div class="list_con">
          <div class="date">2020. 03. 13</div>
          <div class="con_box">
            <div class="left">
              <div class="name">엑스파워's 베이커리 인천부평점</div>
              <span>아메리카노</span><br/>
              <span>카푸치노</span><br/>
              <span>블루베리 베이글</span><br/>
              <span>허니브레드</span>
            </div>
            <div class="right">
              <div class="fin">19,000원<br/><span>결제완료</span></div>
            </div>
          </div>
          <div class="review_btn">
            <v-btn class="btn">리뷰쓰기</v-btn>
          </div>
        </div>
      </div>
    </v-col>
  </v-content>
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
          this.reply_desc = "결제가 완료 되었습니다. 주문현황에서 주문상태를 볼수 있습니다.",
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

/* rv_list */
.rv_list { width:100%; border-bottom:0; padding-bottom:0; }
.rv_list:last-child { padding-bottom:1rem; }
.rv_list .list_con { width:100%!important; border:1px solid #ccc; padding:0; }
.rv_list .list_con .date { width:100%; padding:0.6rem 1rem; background-color:#ddd; float:left; font-size: 0.9rem;
    font-weight:bold; }
.rv_list .list_con .con_box { float:left; width:78%; padding:1rem; border-right:1px solid #ccc; }
.rv_list .list_con .con_box .left { float:left; width:70%; }
.rv_list .list_con .con_box .left .name { font-size:1rem; margin-bottom:0.4rem; }
.rv_list .list_con .con_box .left span { font-size:0.9rem; }
.rv_list .list_con .con_box .right { float:right; width:25%; height:100%; }
.rv_list .list_con .con_box .right .fin { font-size:1rem; text-align:right; font-weight:bold; }
.rv_list .list_con .con_box .right .fin span { color:#B71C1C; }
.rv_list .list_con .review_btn { float:right; width:22%; padding:1rem 0; }
.rv_list .list_con .review_btn .v-btn { width:80%; margin:0 auto; display:block; }

</style>