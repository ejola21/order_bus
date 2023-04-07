<template>
 <div class="top">
  <div v-if="store" class="receipt">
    <div class="title" >신용 전표</div>
    <p  class="sub_title">(지출 증빙용)</p>
    <div class="cancel_yn">
      {{ store.cancel_yn == 'Y' ?  "취소 거래" : "" }}
    </div>

    <p>상호명 : {{store.store_name}} </p>
    <p>주 소 : {{store.address}} </p>
    <p>대표자 : {{store.ceo_name}} </p>
    <p>전화번호 : {{store.phone}} </p>
    <p>일 자 : {{store.approval_time}} </p>
    <p>카드 승인번호 : {{store.approval_no}} </p>
    <p>거래 번호 : {{$route.params.order_no}} </p>
    <p>구 매 자 : {{user_id}} </p>
    <hr width="100%">
    <div class="p_items">
      <span class="p_item1">품 명</span>
      <span class="p_item2">단가</span>
      <span class="p_item3">수량</span>
      <span class="p_item4">금액</span>
    </div>
    <hr width="100%">
    <v-list-item v-for="(item, index) in items" :key="index">
      <v-list-item-content>
      <receipt-item :item="item"></receipt-item>
      </v-list-item-content>
    </v-list-item>
    <div class="p_bottoms">
      <span class="p_bottom1">소 계 : </span><span class="p_bottom2">{{formatPrice(store.amt, 'receipt')}} </span>
    </div>
    <hr width="100%">
    <div class="p_bottoms">
      <span class="p_bottom1">부가 세액 : </span><span class="p_bottom2">{{formatPrice(store.vat, 'receipt')}} </span>
    </div>
    <div class="p_bottoms">
      <span class="p_bottom1">공급 가액 : </span><span class="p_bottom2">{{formatPrice(store.supply_amt, 'receipt')}} </span>
    </div>
    <div class="p_bottoms">
      <span class="p_bottom1">청구 금액 : </span><span class="p_bottom2">{{formatPrice(store.amt, 'receipt')}} </span>
    </div>
  </div>
  <v-row align="center">
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
          <v-btn v-if="btn === 'ios'"  x-large  class="mail_btn" width="100%">영수증 다운로드</v-btn>
    <!-- <mu-raised-button v-else label="영수증 다운로드2" fullWidth  primary class="mail_btn" @click="pdfSave"/> -->
       <div v-else-if="btn === 'and'">
         <v-btn x-large  class="mail_btn" @click="pdfSave" width="100%">영수증 다운로드</v-btn>
       </div>
      </div>
    </v-col>
  </v-row>
</div>

</template>

<script>
import receiptItem from '../components/receiptItem';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default {
  components: { receiptItem },
  data() {
    return {
      store: null,
      items: [],
      loading: false,
      img_src: null,
      chk_num: 0,
      pdf: null,
      btn: null,
    }
  },
  mounted () {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
  },
  updated () {
    if (this.chk_num === 0) {
      this.makeImg();
    }
  },
  methods: {
    getData()
    {
      var param = {
        'store_id':  this.$route.params.store_id,
        'order_no':  this.$route.params.order_no
      };
      this.$store.dispatch('r_receipt', param)
      .then((res) => {
        this.store  = res.store[0];
        this.items  = res.items;

        if(this.store.call_yn == 'Y')
          this.$store.commit('is_bell', true);
        else
          this.$store.commit('is_bell', false);
      });
    },
    makeImg() {
      window.html2canvas = html2canvas;
      let that = this;
      let ele = document.querySelector('.receipt');
      let width = ele.offsetWidth;
      let height = ele.offsetHeight;

      this.pdf = new jsPDF('p', 'pt', [width, height], true);
      let canvas = this.pdf.canvas;
      canvas.width = width;

      if (!ele) {
        console.warn(selector + 'is exist.')
        return false;
      }


      html2canvas(ele).then((canvas) => {
        let position = 0;
        const imgData = canvas.toDataURL('image/png');
        // this.img_src = pdf.output();
        this.img_src = imgData;
        if (/iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
          this.btn = 'ios';
        }
        else if (/Daum|NAVER/i.test(navigator.userAgent)) {
          this.btn = null;
        }
        else {
          this.pdf.addImage(imgData, 'png', 0, position, width, height, undefined, 'slow');
          this.btn = 'and';
        }
        
        this.chk_num = 1;
      })
    },
    pdfSave () {
      this.pdf.save(this.store.approval_time + ' ' + this.store.approval_no + '.pdf');
    }
  },
  computed: {
    // is_login() {
    //   return this.$store.getters.is_login
    // },
    user_id() {
      return this.$store.getters.user_id;
    },

  },
  created() {
    this.$store.commit('is_back', true);
    this.getData();
  },
  watch:{
    '$route': 'getData'
  }
}
</script>

<style scoped>
.title{
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.cancel_yn{
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color : red;
}
.sub_title{
  text-align: center;
  margin: 0
}
.top{
  margin-top: 1rem;
  margin-left : 1rem;
  margin-right : 1rem;
  margin-bottom : 1rem;
  background-color: white;
}
.receipt{
  padding:  1rem;
  border: 1px solid black;
  font-family: sans-serif;
}
.mail_btn
{
  /* margin-top: 1rem; */
  color: #ffffff;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #043474;
}
.p_items{
  display:flex;
  flex-direction:row;
}
.p_item1{
  text-align: center;
  width :50%;
}
.p_item2{
  width :20%;
  text-align: center;
}
.p_item3{
  width :20%;
  text-align: right;
}
.p_item4{
  width :20%;
  text-align: right;
}
.p_bottoms{

  display:flex;
  flex-direction:row;
}
.p_bottom1{
  text-align: left;
  width :50%;
}
.p_bottom2{
  width :50%;
  text-align: right;
}
</style>
