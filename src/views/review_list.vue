<template>
  <v-content>
    <div class="review_top">
      <div class="review_count">리뷰 <span>3</span>개</div>
      <!--
        <div class="review_btn">
          <a href="javascript:void(0);"><v-btn class="btn">리뷰쓰기</v-btn></a>
        </div>
        -->
      <div class="review_btn">
        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on }">
            <a href="javascript:void(0);">
              <v-btn color="grey lighten-4" black v-on="on">
                리뷰쓰기
              </v-btn>
            </a>
          </template>

          <v-card>
            <!--
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Privacy Policy
              </v-card-title>
              -->
            <v-card-text>
              예약 후, 리뷰 작성이 가능합니다.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <v-col class="v_col_mnlist rvlist">
      <div class="list">
        <img src="http://xpowerint.com/new/test/img/list_img_2.jpg" />
        <div class="list_con">
          <div class="name">플레인 베이글<span class="star">★★★★★</span></div>
          <span class="rv_con"
            >따뜻해서 더 맛있어요. 점심시간마다 방문하고 있습니다. 맛도 좋은데
            친절하시기까지!</span
          >
          <br /><span class="rv_num">05**</span>
        </div>
      </div>
      <div class="list">
        <img src="http://xpowerint.com/new/test/img/list_img_2.jpg" />
        <div class="list_con">
          <div class="name">플레인 베이글<span class="star">★★★★★</span></div>
          <span class="rv_con"
            >따뜻해서 더 맛있어요. 점심시간마다 방문하고 있습니다. 맛도 좋은데
            친절하시기까지!</span
          >
          <br /><span class="rv_num">05**</span>
        </div>
      </div>
      <div class="list">
        <img src="http://xpowerint.com/new/test/img/list_img_2.jpg" />
        <div class="list_con">
          <div class="name">플레인 베이글<span class="star">★★★★★</span></div>
          <span class="rv_con"
            >따뜻해서 더 맛있어요. 점심시간마다 방문하고 있습니다. 맛도 좋은데
            친절하시기까지!</span
          >
          <br /><span class="rv_num">05**</span>
        </div>
      </div>
    </v-col>

    <template>
      <div class="text-center">
        <v-pagination v-model="page" :length="4" circle></v-pagination>
      </div>
    </template>
  </v-content>
</template>

<script>
export default {};
</script>

<style scoped>
/* 리뷰 */
.rvlist {
  padding-top: 0.2rem !important;
}
.review_top {
  padding: 0.4rem 1.6rem;
  height: 3.2rem;
  border-bottom: 1px solid #ccc;
}
.review_top .review_count {
  float: left;
  letter-spacing: -0.03rem;
  font-size: 0.9rem;
  line-height: 2.3rem;
}
.review_top .review_count span {
  font-weight: bold;
}
.review_top .review_btn .v-btn.v-size--default {
  float: right;
  letter-spacing: -0.02rem;
  font-size: 0.8rem;
}
.review_top .review_btn .btn {
  border: 1px solid #ccc;
  float: right;
  letter-spacing: -0.02rem;
  font-size: 0.8rem;
}
.v-dialog > .v-card > .v-card__text {
  padding: 30px 24px !important;
  text-align: center;
  font-size: 1rem;
  color: #000 !important;
}
.v-card__actions {
  display: block !important;
  padding: 2px 8px !important;
  text-align: center;
}
.rvlist .list .list_con {
  padding-top: 0.3rem;
  padding-bottom: 0;
}
.list .list_con .star {
  color: #ffa726;
  display: inline-block;
  vertical-align: middle;
  margin-top: -0.6rem;
  margin-left: 0.4rem;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
}
.list .list_con .rv_con {
  display: inline-block;
  margin-top: 0.4rem;
  line-height: 1.1rem;
}
.list .list_con .rv_num {
}
</style>
