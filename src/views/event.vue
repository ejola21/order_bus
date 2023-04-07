<template>
 <div class="event_container">
    <div class="select_div">
        <div @click="auctionClick">
            <div class="icon_div">
                <img src="../assets/img/auction.svg" width="60rem" class="face"/>
            </div>
            <div class="span_div">
                <span>경매 하시죠</span>
            </div>
            <!-- <mu-icon right value="keyboard_arrow_right"/> -->
        </div>
        <div v-if="store.board_yn == 'Y'" @click="myBoardMsgClick">
            <div class="icon_div">
                <img src="../assets/img/message.svg" width="60rem" class="face"/>
            </div>
            <div class="span_div">
                <span>한마디 하시죠</span>
            </div>
            <!-- <mu-icon right value="keyboard_arrow_right"/> -->
        </div>
    </div>
    <div class="event_simple_desc_div">
        <div class="big_icon_div">
            <img src="../assets/img/event_hat.svg" width="30%"/>
        </div>
        <div class="page_desc">
            <span>
                이곳은 다양한 소통을 할 수 있는 
            </span>
        </div>
        <div class="page_desc">
            <span>
                이벤트 페이지입니다.
            </span>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
 export default {
  computed: {
      store() {
          return this.$store.getters.store;
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
  },
  methods: {
    auctionClick() {
      this.$router.push('/auction')
    },
    myBoardMsgClick() {
      this.$router.push('/myboard_msg')
    },

  }
}
</script>

<style scoped>
.event_container {
    background-color: #f1f1f1;
    /* padding-top: 3.5rem; */
    height: 100vh;
}
.event_container>.select_div {
    width: 100%;
    background-color: white;
}
.event_container>.select_div>div {
    height: 4.4rem;
    line-height: 4.4rem;
    position: relative;
    border-bottom: solid 1px #bbbbbb;
}
.event_container>.select_div>div>i {
    position: absolute;
    right: 3%;
    font-size: 1.5rem;
    line-height: 4.4rem;
    font-weight: bold;
    color: #8a8a8a;
}
.event_container>.select_div>div>.span_div>span{
    font-size: 1.15rem;
    font-weight: bold;
    color: #474747;
}
.span_div, .icon_div {
    display: inline-block;
}
.icon_div {
    float: left;
    margin:0 2%;
}
.icon_div>img {
    vertical-align: middle;
}
.event_simple_desc_div {
    text-align: center;
}
.event_simple_desc_div>.big_icon_div {
    padding: 4rem 0;
    padding-bottom: 1rem;
}
.event_simple_desc_div>.page_desc>span {
    font-size: 1.1rem;
}
</style>