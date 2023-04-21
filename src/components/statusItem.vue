<template>
  <div class="status-item">
    <v-row>
      <v-col cols="6"
        >{{ item.product_name }}
        <div class="item_option">
          <div class="item_options" v-show="item.option_name">
            옵션 : {{ item.option_name }}
          </div>
          <div class="item_memo" v-show="item.memo">
            예약요청사항 : {{ item.memo }}
          </div>
        </div>
      </v-col>

      <v-col cols="2">{{ item.cnt + "개" }}</v-col>

      <v-col cols="4" class="pr-7 text-end"
        >{{ formatPrice(item.price, "default") + " 원" }}
      </v-col>
    </v-row>

    <!-- <mu-list-item  disableRipple :title="item.product_name"  :afterText="item.cnt +'개 '+formatPrice(item.price, 'default')+' 원'" afterTextClass="item_price">
     <div class="item_option">
       <div class="item_options" v-show="item.option_name"> 옵션 : {{item.option_name}}</div>
       <div class="item_memo" v-show="item.memo" >예약요청사항 : {{item.memo}}</div>
     </div>
   </mu-list-item> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "statusItem",
  props: ["item"],
};
</script>

<style scoped>
.status-item {
  background-color: white;
  margin-left: 1rem;
}
.item_price {
  font-weight: b;
  /* color: rgb(13, 169, 169); */
}

.item_cnt {
  float: right;
  /*margin-top: -1rem;*/
}

.item_option {
  /* margin-top: 1rem; */
  color: rgb(58, 58, 58);
  word-break: break-all;
  word-wrap: break-word;
  /* background-color: yellow; */
}
.item_options,
.item_memo {
  color: #8a8a8a;
}
</style>
