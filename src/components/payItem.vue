<template>
 <div class="payItem">
   <v-list two-line> 


     <v-list-item :key="item.title">

      <v-list-item-content v-on:click="itemSelect(item)" >
        <v-list-item-title v-text="item.store_name"></v-list-item-title>
          <v-list-item-subtitle class="text--primary" v-text="item.product_name ? item.product_name : '없어진 상품'" ></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
      </v-list-item-content>
              
       <v-list-item-action>
          <v-list-item-action-text v-text="item.price+'원'"></v-list-item-action-text>
            <span :class = "item.cancel_yn =='Y' ? 'p_cancel_label':'p_normal_label'" >{{item.cancel_yn =='Y' ? '취소 완료':'결제 완료' }}</span>
        </v-list-item-action>

     </v-list-item>

      <v-list-item  v-if =" item.review_yn == 'Y'">
        <v-btn  block large @click="reviewClick" >리뷰 쓰기</v-btn>
      </v-list-item >
    
      <v-divider></v-divider>

     <!-- <v-row align="center">
        <v-col cols="12" sm="6">
         <div class="text-center"> -->
      <!-- <v-btn block large @click="reviewClick" >리뷰 쓰기</v-btn> -->
         <!-- </div>
        </v-col>
     </v-row> -->
     
     
     <v-divider></v-divider>
   </v-list>
  <!-- <v-list-item  disableRipple v-on:click="itemSelect(item)"  
  :title="item.store_name" :describeText="item.product_name ? item.product_name : '없어진 상품'" 
  :afterText="formatPrice(item.price, 'default')+'원'"
   afterTextClass="p_item_price" titleClass="p_title"  describeTextClass="p_item_title" >
    <span :class = "item.cancel_yn =='Y' ? 'p_cancel_label':'p_normal_label'" >{{item.cancel_yn =='Y' ? '취소 완료':'결제 완료' }}</span>
  </v-list-item> -->
</div>
</template>

<script>
export default {
    name: "payItem",
    props: ['item'],
    computed: {
      store() {
        return this.$store.getters.store
      },
    },
    methods: {
      itemSelect(item) {
        this.$router.push('/receipt/'+item.store_id +'/' +item.order_no);
      },
     reviewClick() {
       this.$router.push('/review_write/0');
     }
    },
}
</script>
<style lang="css">
.p_title{
  font-weight: bold;
  color: rgb(128,128,128);
}
.p_item_price {
  color: rgb(128,128,128);
}
.p_item_title{
  color: rgb(47,47,47);
  font-size: 1.1rem;
}
</style>

<style lang="css" scoped>
.payItem{
  background-color: white;
  font-size:1.1rem;
}
.p_cancel_label{
  font-weight :bold;
  font-size: 80%;
  color: rgb(203,35,35);
  float : right;
  margin-top: -1.2rem;
}
.p_normal_label{
  font-weight :bold;
  font-size: 80%;
  color: rgb(0,56,100);
  float : right;
  margin-top: -1.2rem;
}
.v-list-item__title {
  font-weight: bold;
}
.v-list-item__action-text {
    font-size: 80%;
    color: black !important;
}
</style>