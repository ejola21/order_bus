<template>
  <v-content class="order_detail">
    <div class="sub_top">
      <div class="back_btn">
        <a href="javascript:void(0);"><v-icon>mdi-arrow-left</v-icon></a>
      </div>
      <div class="tit">예약상세</div>
    </div>

    <template>
      <v-container class="px-0" fluid>
        <v-radio-group v-model="radioGroup">
          <v-radio
            v-for="n in 3"
            :key="n"
            :label="`Radio ${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>

        <div class="option_list">
          <div class="text">Add Shot</div>
          <v-checkbox v-model="checkbox" :label="`+500원`"></v-checkbox>
        </div>
        <div class="option_list">
          <div class="text">Whipping</div>
          <v-checkbox v-model="checkbox" :label="`+500원`"></v-checkbox>
        </div>
      </v-container>
    </template>
  </v-content>
</template>

<script>
export default {};
</script>

<style scoped>
/* 예약상세 */
.order_detail .option_list {
  width: 100%;
  float: left;
  padding: 0.4rem 2rem 0 2rem;
}
.order_detail .option_list .text {
  float: left;
}

.order_detail .option_list .v-input__slot {
  display: block;
  margin: 0;
}
.order_detail
  .option_list
  .v-application--is-ltr
  .v-input--selection-controls__input {
  float: right;
  margin-right: 0 !important;
  margin-left: 8px !important;
}
.order_detail .option_list .v-input--selection-controls {
  float: right;
  margin: 0;
  padding: 0;
}
.order_detail .option_list .v-input--selection-controls__input {
  float: right;
  margin-right: 0 !important;
  margin-left: 8px !important;
}
.order_detail .option_list .v-label {
  float: left;
  margin-top: 0.2rem;
}

.order_detail .option_list .v-messages {
  min-height: 0;
}
</style>
