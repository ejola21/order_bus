<template>
  <div class="basket-item">
    <!-- <mu-paper class="demo-paper" :zDepth="1" > -->
    <v-row justify="space-around">
      <v-card class="mx-auto" width="100%">
        <div class="group">
          <!-- <div  class="item">
          <img :src="item.product.img_thumb_url" class="product_img" @error="urlError"/>
        </div> -->
          <!-- <div v-lazy-container="{ selector : 'img'}" class="item">
          <img class="product_img" :data-src='item.product.img_thumb_url' :data-error='default_img' :data-loading='default_img'>
        </div> -->
          <div
            :style="{
              'background-image':
                'url(' + require('../assets/img/noimg.jpg') + ')',
            }"
            style="background-size: 100% 100%"
            class="item"
          >
            <lazy-component>
              <img
                class="product_img"
                :src="item.product.img_thumb_url"
                @error="urlError"
              />
            </lazy-component>
          </div>
          <div class="item_desc">
            <img
              src="../assets/img/order_delete_btn.svg"
              @click="order_delete"
              class="delete"
            />
            <div class="product_name_price">
              <div class="product_name">{{ item.product.product_name }}</div>
              <div v-if="item.product.price_yn == 'N'" class="product_price">
                {{ formatPrice(item.product.price, "default") }}
              </div>
              <div v-else class="product_price">
                {{
                  item.product.sale_price > 0
                    ? formatPrice(item.product.sale_price, "default")
                    : formatPrice(item.product.price, "default")
                }}원
              </div>
            </div>
          </div>
        </div>
        <div class="group2" v-if="options1.length > 0 || m_options.length > 0">
          <div class="options_div" v-if="options1.length > 0">
            <div class="options1">{{ options1[0].p_o_name }}</div>
            <div class="options1_price" v-if="options1.length > 0">
              {{ options1[0].p_o_val > 0 ? "+" : ""
              }}{{ formatPrice(options1[0].p_o_val, "default") }}원
            </div>
          </div>
          <div class="options_div" v-if="options2.length > 0">
            <div class="options2">{{ options2[0].p_o_name }}</div>
            <div class="options2_price" v-if="options1.length > 0">
              {{ options2[0].p_o_val > 0 ? "+" : ""
              }}{{ formatPrice(options2[0].p_o_val, "default") }}원
            </div>
          </div>
          <div class="options_div" v-for="add_option in m_options">
            <div class="options3">
              {{ add_option.add_option }}
            </div>
            <div class="options3_price">
              {{ add_option.add_option_price > 0 ? "+" : ""
              }}{{ formatPrice(add_option.add_option_price, "default") }}원
            </div>
          </div>
        </div>
        <div class="memo_group" v-if="item.memo">
          <span class="memo_title">요청사항 : </span>
          <span class="memo_content"> {{ item.memo }}</span>
        </div>

        <div v-if="item.product.price_yn == 'Y'" class="cnt_group">
          <div class="cnt_item">수량</div>
          <div class="img-wrapper">
            <img
              src="../assets/img/remove_btn.svg"
              @click="cntMinus"
              width="30px"
              class="btn_img"
            />
          </div>
          <span>{{ item.cnt }}</span>
          <div class="img-wrapper">
            <img
              src="../assets/img/add_btn.svg"
              @click="cntPlus"
              width="30px"
              class="btn_img"
            />
          </div>
        </div>
        <div class="item_total_price">
          <div class="one_item_price_title inline_block">총 예약 금액</div>
          <div class="one_item_total_price inline_block">
            {{ formatPrice(item.price, "default") }}원
          </div>
        </div>
      </v-card>
    </v-row>
    <!-- </mu-paper> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "basketItem",
  props: ["item"],
  data() {
    return {
      default_img: require("../assets/img/noimg.jpg"),
    };
  },

  computed: {
    options1() {
      return _.filter(this.item.option, {
        p_o_id: this.item.p_o_id1,
      });
    },
    options2() {
      return _.filter(this.item.option, {
        p_o_id: this.item.p_o_id2,
      });
    },
    m_options() {
      var ret = [];
      var tmp = this.item.option;
      _.forEach(this.item.pm_o_id, function(value) {
        let bb = _.filter(tmp, {
          p_o_id: value,
        });
        ret.push({
          add_option: bb[0].p_o_name,
          add_option_price: bb[0].p_o_val,
        });
        console.log(bb[0]);
      });
      // return ret.toString();
      return ret;
    },
  },
  methods: {
    order_delete() {
      this.$store.commit("del_order", this.item);
      // this.$store.commit('del_order', this.item);
    },
    calcPrice(unit_price) {
      this.item.price = unit_price * this.item.cnt;
    },
    cntPlus() {
      let unit_price = this.item.price / this.item.cnt;
      this.item.cnt += 1;
      this.calcPrice(unit_price);
      this.$store.commit("add_cnt", this.item.product.product_id);
    },
    cntMinus() {
      if (this.item.cnt > 1) {
        let unit_price = this.item.price / this.item.cnt;
        this.item.cnt -= 1;
        this.calcPrice(unit_price);
        this.$store.commit("minus_cnt", this.item.product.product_id);
      }
    },
  },
};
</script>

<style scoped>
.inline_block {
  display: inline-block;
}
.basket-item > .v-card {
  border-radius: 10px;
  overflow: hidden;
}
.basket-item[data-v-295f3d7c] {
  padding: 1.8rem;
  padding-bottom: 0.5%;
}
.memo {
  font-weight: 800;
  word-break: break-all;
  word-wrap: break-word;
}

.cnt_item,
.one_item_price_title,
.one_item_total_price {
  font-size: 1.1rem;
  width: 50%;
  font-weight: bold;
}
.one_item_total_price {
  text-align: right;
  color: #0856c3;
  text-align: right;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cnt_group,
.item_total_price {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  clear: both;
  border-top: 1px solid #e6e6e6;
}

.cnt_group {
  padding: 0 1rem;
}
.item_total_price {
  padding: 0.7rem 1rem;
}
.memo_group {
  text-align: left;
  border-top: 1px solid #e6e6e6;
  padding: 0.7rem 1rem;
}
.memo_title {
  font-size: 0.9rem;
  font-weight: 700;
}
.memo_content {
  font-size: 0.9rem;
  word-wrap: break-word;
}

.cnt_group > span {
  font-size: 1.2rem;
}

.group2 {
  border-top: 1px solid #e6e6e6;
  padding: 0.5rem 1rem;
}
.group2::after {
  content: "";
  display: block;
  clear: both;
}

.group {
  flex-direction: row;
  display: flex;
  /*justify-content: space-between;
  align-items: center;*/
}
.options_div {
  clear: both;
}
.options1,
.options2,
.options3 {
  color: #8a8a8a;
}
.options1,
.options1_price,
.options2,
.options2_price,
.options3,
.options3_price {
  font-size: 1rem;
}
.options1,
.options2,
.options3 {
  float: left;
  width: 70%;
}
.options1_price,
.options2_price,
.options3_price {
  float: right;
  width: 30%;
  text-align: right;
}
.options2 {
  float: left;
}
.options3 {
  float: left;
}
.options2_price {
  float: right;
}
.options3_price {
  float: right;
}
.product_img {
  width: 100%;
}

.mu-text-field-label {
  font-size: 1.3rem;
}

.item {
  width: 40%;
  background-color: #f5f5f5;
}
.item_desc {
  width: 60%;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.delete {
  position: absolute;
  width: 12%;
  right: 3%;
  top: 3%;
}
.product_name_price {
  text-align: left;
  margin: 0 5%;
  margin-top: 13%;
}
.product_name,
.product_price {
  width: 100%;
  clear: both;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: bold;
}

.product_price {
  color: #0856c3;
}

.img-wrapper {
  height: 3rem;
  width: 3rem;
  position: relative;
}

.img-wrapper > img {
  position: absolute;
  top: 17%;
  left: 17%;
}
</style>
