<template>
  <div >

      <popup-cancel @cancel_req="cancel_req"/>
      <div class="review_top">
        <div class="review_count">리뷰 <span>{{l_review.length}}</span>개</div>
        <div class="review_btn"  v-if="review_cnt > 0" >
          <v-btn class="btn" @click="writeClick" >리뷰쓰기</v-btn>
        </div>
      </div>

      <v-col class="v_col_mnlist rvlist">

        <div class="list"  v-for="(review,index) in l_review" :key="index" >

          <img v-if = "review.content_url.length > 0" :src= "review.content_url"/>
            <div class="list_con">
              <span class="rv_num">{{review.cu_time}}</span> 

                <v-row>
                  <v-col cols="9">
                    <v-rating
                      v-model="review.score"
                      readonly
                      dense
                      background-color="rightgray"
                      color="#ffa726">
                    </v-rating> 
                  </v-col> 
                  <v-col cols ="3">
                    <v-btn v-show="review.user_id == user_id" @click="d_review(review.rid)">삭제</v-btn>
                  </v-col>
                </v-row>
              <span class="rv_con">{{review.content}}</span>
            
          </div>
        </div>

      </v-col>

      <!-- <template>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="4"
            circle
          ></v-pagination>
        </div>
       </template> -->
    </div>

</template>

<script>
  import popupCancel from "../components/popup_cancel";

 export default {
  // name: "review",
  components: {
    popupCancel
  },
  computed: {
    store() {
       return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
  },
  data() {
    return {
      page :0,
      review_cnt : 0,
      l_review : '',
      select_rid :''
    }
  },
  created() {
      
      this.fetchData();
  },
  methods: {
    fetchData() {

      let param = {
        store_id: this.store.store_id,
        user_id: this.user_id
      };

      this.$store.commit("loading", true);

      this.$store.dispatch("l_review", param).then(res => {

        this.$store.commit("loading", false);
        console.log('l_review', res.data);
        this.l_review = res.data.list;
        this.review_cnt = res.data.review_cnt;
        
      });
    },

    cancel_req() {
  
      this.$store.commit("is_popup", {
        is_popup: false,
        title: "",
        desc: ""
      });

      let param = {
        rid: this.select_rid,
        status: 'D',
      };

      this.$store.commit("loading", true);

      this.$store.dispatch("u_review_status", param).then(res => {

        this.$store.commit("loading", false);

         if (res.data.result =="SUCCESS")
         {
           this.showToast("삭제처리 되었습니다.");
           this.fetchData();
         }
         else
         {
            this.showToast("통신에 문제가 있습니다. -" + res.data.result );
         }
        
      });
    },

    d_review(rid) {

      this.select_rid = rid;
      this.$store.commit("is_popup", {
        is_popup: true,
        title: "리뷰 삭제 요청",
        desc: "정말로 삭제를 하시겠습니까?"
      });

    },
    writeClick(){
      this.$router.push("/review_write/0");
    }
  }
}

</script>

<style scoped>

/* 리뷰 */
.review_top { padding:0.3rem 1rem; height:2.75rem; border-bottom:1px solid #ccc; background-color:#fff; }
.review_top .review_count { float:left; letter-spacing:-0.03rem; font-size:0.9rem; line-height:2.3rem; }
.review_top .review_count span { font-weight:bold; }
.review_top .review_btn .btn { border:1px solid #ccc; float:right; letter-spacing:-0.02rem; font-size:0.8rem; }
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) { background-color:#fff; }
.v-btn:not(.v-btn--round).v-size--default { height:32px; }

.rvlist { background-color:#fff; margin-bttom:0; }
.list { margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid #ccc; }
.list:last-child { margin-bottom:0; }
.list .img_box { width:100%; height:40vh;
  background-image:url('http://xpowerint.com/new/test/img/main_top_img.jpg');
  background-position:center center;
  background-repeat:no-repeat;
  background-size:cover; }
.list img { display:block; width:100%; margin:0 auto; }

.rvlist .list .list_con { padding-top:1rem; padding-bottom:0; }
.rvlist .list .list_con .name { font-weight:bold; }
.list .list_con .star { color:#ffa726;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.4rem;
    margin-left: 0.4rem;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    }
.list .list_con .rv_con { line-height: 1rem; display: inline-block; font-size:0.8rem; }
.list .list_con .rv_num { display:block; margin-top:-0.3rem; font-size:0.8rem; }



.text-center { background-color:#fff; padding:0 0 1rem;}
</style>