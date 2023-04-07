<template>
 <div class="items">
    <div class="receiptItem">
      <span class="p_name" v-if="item.product_name">
        {{item.product_name}}
      </span>
      <span class="p_name" v-else>
        없어진 상품
      </span>
      <span class="p_unit_price" v-if="item.unit_price">
        {{formatPrice(item.unit_price, 'receipt')}}
      </span>
      <span class="p_unit_price" v-else>
        0
      </span>
      <span class="p_cnt">
        {{item.cnt}}
      </span>
      <span class="p_sum_price">
        {{formatPrice(item.sum_price, 'receipt')}}
      </span>
    </div>
    <hr width="100%">
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: "receiptItem",
  props: ['item'],
}
</script>

<style scoped>
.receiptItem {
  display: flex;
  flex-direction: row;
}

.p_name {
  text-align: left;
  width: 50%;
}

.p_unit_price {
  width: 20%;
  text-align: center;
}

.p_cnt {
  width: 10%;
  text-align: right;
}

.p_sum_price {
  width: 20%;
  text-align: right;
}
</style>