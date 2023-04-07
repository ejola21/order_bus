<template>
  <div class="order">
    <!-- <div class="order_title"> -->
      <div class="title_name_img">
        <div class="main_image inline_block">
          <!-- <div v-lazy-container="{ selector : 'img'}">
          <img :data-src='s_product.img_url' :data-error='default_img' :data-loading='default_img'>
          </div>-->
          <div
            :style="{ 'background-image' : 'url(' + require('../assets/img/noimg.jpg') + ')' }"
            style="background-size: 100% 100%"
          >
            <lazy-component>
              <img :src="s_product.img_url" @error="urlError" />
            </lazy-component>
          </div>
          <!-- <img :src="s_product.img_url" @error="urlError"> -->
          <div class="sale_tag" v-if="s_product.sale_price > 0">할인</div>
          <div
            class="content_bottom"
            v-if="s_product.sale_gb == 'T' && (timeCalc(s_product.sale_st_time1, s_product.sale_ed_time1) || timeCalc(s_product.sale_st_time2, s_product.sale_ed_time2))"
          >
            <div class="grid_pruduct_title">
              <div slot="title" class="packing_sale_desc time_sale_content">포장시 추가 할인</div>
            </div>
          </div>
        </div>
      </div>
      <div class="product_desc inline_block">
        <div class="product_title_name inline_block">{{s_product.product_name}}</div>
        <div
          v-if="s_product.price_yn == 'Y' && isSoldOut"
          class="product_title_price inline_block sold_out_color"
        >{{ s_product.sale_price > 0 ? formatPrice(s_product.sale_price, 'default') : formatPrice(s_product.price, 'default') }}원</div>
        <div
          v-else-if="s_product.price_yn == 'Y' && !isSoldOut"
          :class="isSalePrice ? 'sale_title_price_color': 'title_price_color'"
          class="product_title_price inline_block"
        >{{ s_product.sale_price > 0 ? formatPrice(s_product.sale_price, 'default') : formatPrice(s_product.price, 'default') }}원</div>
        <div
          v-else-if="s_product.price_yn == 'N'"
          class="product_title_price inline_block"
        >{{ formatPrice(s_product.price, 'default') }}</div>
        <div class="p_desc" v-if=" s_product.desc.length > 0">
          <div class="desc_desc">
           <!-- <span class="desc_title">메뉴 정보</span> -->
            <div class="product_desc_small">{{s_product.desc}}</div>
          </div>
        </div>

        <div class="p_origin" v-if=" s_product.origin.length > 0">
          <div>
            <span class="p_origin_title">원산지:</span>
            <span class="p_origin_desc">{{s_product.origin}}</span>
          </div>
        </div>
      </div>
      <div class="product_option">
        <div class="select_option_name" v-if="s_product.p_grp_id1 > 0">
          <div class="select_option_title option_margin">{{options1[0].p_grp_name}}</div>
          <div class="select_option_item option_margin" v-for="option in options1">
            
            <v-row no-gutters align="center" justify="space-between" class="option_cap">

              <v-col cols="7">
                {{option.p_o_name}}
              </v-col>

              <v-col cols="4" style="text-align: right;">
                {{option.p_o_val > 0 ? option.p_o_val+'원' : option.p_o_val+'원'}}
              </v-col>

              <v-col cols="1">
                  <v-radio-group  v-model="p_o_id1">
                    
                    <v-radio
                     :value="option.p_o_id"
                      @change="radio1Change(option.p_o_val)"
                    >

                    </v-radio>
                 </v-radio-group>
              </v-col>

            </v-row>

          </div>
        </div>
      </div>

      <div class="product_option">
        <div class="select_option_name" v-if="s_product.p_grp_id2 > 0">
          <div class="select_option_title option_margin">{{options2[0].p_grp_name}}</div>
          <div class="select_option_item option_margin" v-for="option in options2">

             <v-row  no-gutters  align="center" justify="space-between" class="option_cap">

              <v-col cols="7">
                {{option.p_o_name}}
              </v-col>

              <v-col cols="4" style="text-align: right;">
                {{option.p_o_val > 0 ? option.p_o_val+'원' : option.p_o_val+'원'}}
              </v-col>

              <v-col cols="1">
                <v-radio-group  v-model="p_o_id2">
                  <v-radio
                  :value="option.p_o_id"
                    @change="radio2Change(option.p_o_val)">
                  </v-radio>
                </v-radio-group>
              </v-col>

            </v-row>


          </div>
        </div>
      </div>

      <div class="product_option">
        <div class="select_option_name" v-if="s_product.pm_grp_id > 0">
          <div class="select_option_title option_margin">{{m_options[0].p_grp_name}}</div>

          <div class="select_option_item option_margin" v-for="(option,index) in m_options">


            <!-- 옵션타임 할인 현재 미사용, 옵션내용만 나오고 첵크버튼은 미구현 -->
            <!-- <div class="option_cap time_color select_option_item" v-if="s_product.sale_gb =='T'">
              <div class="option_p_o_name inline_block">타임할인 {{timeSaleDesc(s_product.sale_st_time1, s_product.sale_ed_time1,s_product.sale_st_time2, s_product.sale_ed_time2)}}</div>

                <div class="inline_block radio_width">
                  <div class="mu-checkbox-wrapper">
                    <div class="mu-ripple-wrapper mu-checkbox-ripple-wrapper"></div>
                    <div class="mu-checkbox-label time_color">{{option.p_o_val}}원</div>
                    <div class="mu-checkbox-icon"></div>
                  </div>
                </div>

            </div> -->

            <v-row  no-gutters  align="center" justify="space-between" class="option_cap">

              <v-col cols="7">
                {{option.p_o_name}}
              </v-col>

              <v-col cols="4" style="text-align: right;">
                {{option.p_o_val > 0 ? option.p_o_val+'원' : option.p_o_val+'원'}}
              </v-col>

              <v-col cols="1">
                  <v-checkbox
                    v-model="chk[index]"
                    v-on:change="checkChange(option.p_o_val, option.p_o_id,chk[index])">
                  </v-checkbox>
              </v-col>

            </v-row>


          </div>

        </div>
      </div>

      <div v-if="s_product.sold_out_yn == 'N' && s_product.price_yn == 'Y'" class="group">
        <div class="item">수량</div>
        <div class="icon_span">
          <div class="img-wrapper-left img-wrapper inline_block">
            <img src="../assets/img/-.svg" height="35rem" width="35rem" @click.stop="cntMinus" />
          </div>
          <div class="inline_block cnt_div">
            <span>{{cnt}}</span>
          </div>

          <div class="img-wrapper-right img-wrapper inline_block">
            <img src="../assets/img/+.svg" height="35rem" width="35rem" @click.stop="cntPlus" />
          </div>
        </div>
      </div>
        
      <div v-if="s_product.sold_out_yn == 'N' && s_product.sale_gb =='T'" class="price">
        <div class="price_title">총 주문 금액</div>
        <div class="price_content">
          {{formatPrice(this.total_price-this.dummy_p_o_val, 'default')}}
          <span>원</span>
        </div>
      </div>
      <div v-else class="price">
        <div class="price_title">총 주문 금액</div>
        <div class="price_content">
          {{formatPrice(this.total_price, 'default')}}
          <span>원</span>
        </div>
      </div>

      <div
        class="memo_background"
        v-if=" (store.pay_yn == 'Y'|| store.order_yn == 'Y') && s_product.price_yn == 'N' && s_product.sold_out_yn == 'N'"
      >
        <v-card class="demo-paper memo_window" :zDepth="1">
          <v-text-field
            ref="textField"
            v-model="u_price"
            type="tel"
            hintTextClass="u_price_hint"
            inputClass="u_price"
            :errorText="minPriceError"
            hintText="주문 금액 1000원 이상"
            @input="priceChange()"
            icon="edit"
          />
        </v-card>
        <!-- <input type="tel" @keyup="customOrderPrice()"> -->
      </div>

      <div
        class="memo_background"
        v-if="s_product.sold_out_yn == 'N' && (store.pay_yn == 'Y' || store.order_yn == 'Y')"
      >
        <v-card class="demo-paper memo_window" :zDepth="1">
          <v-text-field
            v-model="memo"
            placeholder="주문 요청 사항(선택) "
            prepend-inner-icon="mdi-message-processing"
            counter
            maxlength="50"
            hint="최대 50자이내"
            :errorText="inputErrorText"
            @textOverflow="handleInputOverflow" />
        </v-card>
      </div>
      <div
        v-if="s_product.img_url2"
        :style="{ 'background-image' : 'url(' + require('../assets/img/noimg.jpg') + ')' }"
        style="background-size: 100% 100%"
      >
        <lazy-component>
          <img width="100%" :src="s_product.img_url2" @error="urlError" />
        </lazy-component>
      </div>
    <!-- </div> -->


    <v-row v-if="s_product.sold_out_yn == 'Y'"  class="btns">
      <v-col >
        <v-btn class="btn_sold_out" label="준비중입니다" v-on:click="soldOutClick()" />
      </v-col>
    </v-row>
    <v-row no-gutters v-else >
      <v-col cols="6">
         <v-btn class="btn_basket" color="#ffffff" width="100%" x-large v-on:click="basketClick()">장바구니 담기</v-btn>
      </v-col>
      <v-col cols="6">
         
         <v-btn class="btn_basket_move" color="primary" width="100%" x-large v-on:click="payClick()" >{{select}}</v-btn>
      </v-col>
        <!-- <v-btn class="btn_basket" color="#00295a" tile x-large v-on:click="basketClick()" >장바구니 담기</v-btn>
        <v-btn class="btn_basket_move" color="primary" tile x-large v-on:click="payClick()" >{{select}}</v-btn> -->

        <!-- <v-btn class="btn_basket" v-on:click="basketClick()" />장바구니 담기</v-btn>
        <v-btn class="btn_basket_move"  v-on:click="payClick()" />{{select}}</v-btn> -->
        <!-- <div  class="btn_basket" v-on:click="basketClick()" value="장바구니 담기">장바구니 담기</div> -->
        <!-- <div  class="btn_basket_move" v-on:click="payClick()" value="바로 주문">바로 주문</div> -->
      
    </v-row>
    

  </div>
</template>

<script>
/* eslint-disable */
export default {
  computed: {
    s_product() {
      return this.$store.getters.s_product;
    },
    r_option() {
      return this.$store.getters.r_option;
    },
    store() {
      return this.$store.getters.store;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    auto_login() {
      return this.$store.getters.auto_login;
    },
    // is_login() {
    //   return this.$store.getters.is_login;
    // },
    options1() {
      // console.log(this.r_option)
      return _.filter(this.r_option, {
        p_grp_id: this.s_product.p_grp_id1
      });
    },
    options2() {
      return _.filter(this.r_option, {
        p_grp_id: this.s_product.p_grp_id2
      });
    },
    time_sale_confirm() {
      if (this.s_product.sale_gb == "T") return this.s_product;
    },
    m_options() {
      return _.filter(this.r_option, {
        p_grp_id: this.s_product.pm_grp_id
      });
    }
  },
  data() {
    return {
      
      dummy_p_o_val: 1000,
      cnt: 1,
      u_price: "",
      price: 0,
      total_price: 0,
      radio_option_price: 0,
      chk_option_price: 0,
      p_o_id1: "",
      p_o_id2: "",
      pm_o_id: [],
      chk: [],
      memo: "",
      p_o_id1_color: false,
      check: "red",
      times: "black",
      windowHeight: 0,
      input: "",
      inputErrorText: "",
      minPriceError: "",
      default_img: require("../assets/img/noimg.jpg"),
      isSoldOut: false,
      heightObj: {},
      isSalePrice: false,
      select: "주문 "
    };
  },
  mounted() {
    console.log(this.r_option);
    this.$store.commit("is_select_store", false);
    this.$store.commit("is_back", true);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    // this.windowHeight = window.innerHeight - 112
    // if(this.windowHeight > this.$refs.height.clientHeight) {
    //   this.heightObj.maxHeight = this.windowHeight;
    //   this.heightObj.height = this.windowHeight;
    // }
    // // console.log(this.heightObj)

    // this.heightObj.maxHeight += 'px'
    // this.heightObj.height += 'px'
    // 이벤트 리스너 안에서는 this가 vue객체가 아님.
    // 하지만 es6문법으로 mounted를 이렇게 선언 하고 쓰면 안에서도 vue의 this를 불러 올수 있다.
    if (this.s_product.sale_price > 0) this.isSalePrice = true;
    if (this.s_product.sold_out_yn == "Y") this.isSoldOut = true;
    if (
      this.s_product.price_yn == "N" &&
      (this.store.pay_yn == "Y" || this.store.order_yn == "Y")
    ) {
      const u_price_input = this.$refs.textField.$el.querySelector(".u_price");
      u_price_input.addEventListener("keyup", e => {
        this.customOrderPrice();
      });
    }

    //console.log('order mounted auto_login: ', this.auto_login);

    // this.windowHeight += 'px'
    

    if (this.s_product.price_yn == "N") this.price = 0;
    else
      this.price =
        this.s_product.sale_price > 0
          ? this.s_product.sale_price
          : this.s_product.price;
    this.total_price = this.price;

    if (this.s_product.p_grp_id1 > 0) {
      let idx = _.findIndex(this.options1, {
        p_o_default: "Y"
      });
      // console.log('idx',idx);

      if (idx > -1)
      {
        this.p_o_id1 = this.options1[idx].p_o_id;
        this.radio_option_price = this.options1[idx].p_o_val;
      }
    }

    if (this.s_product.p_grp_id2 > 0) {
      let idx2 = _.findIndex(this.options2, {
        p_o_default: "Y"
      });

      if (idx2 > -1)
      {
        this.p_o_id2 = this.options2[idx2].p_o_id;
        this.radio_option_price =  parseInt(this.radio_option_price) + parseInt(this.options2[idx2].p_o_val);
      }
    }

    this.calcPrice();
  },

  methods: {
    radio1Change(value) {
      var op = _.filter(this.options1, {
        p_o_id: this.p_o_id1
      });
      var val = op.length == 0 ? 0 : op[0].p_o_val;
      // console.log(val)
      //console.log("radio1Change", value, this.p_o_id1, this.p_o_id2,val);

      //this.price = (value > 0) ? parseInt(this.price) + parseInt(value) - parseInt(val) : parseInt(this.price) - parseInt(val);
      this.radio_option_price =
        value > 0
          ? parseInt(this.radio_option_price) + parseInt(value) - parseInt(val)
          : parseInt(this.radio_option_price) + parseInt(value) - parseInt(val);
      this.calcPrice();
    },
    radio2Change(value) {
      var op = _.filter(this.options2, {
        p_o_id: this.p_o_id2
      });
      var val = op.length == 0 ? 0 : op[0].p_o_val;
      // console.log(val)

      // console.log("radio2Change", value, this.p_o_id1, this.p_o_id2,val);

      //this.price = (value > 0) ? parseInt(this.price) + parseInt(value) - parseInt(val) : parseInt(this.price) - parseInt(val);
      this.radio_option_price =
        value > 0
          ? parseInt(this.radio_option_price) + parseInt(value) - parseInt(val)
          : parseInt(this.radio_option_price) + parseInt(value) - parseInt(val);
      this.calcPrice();
    },
    checkChange(value, id,status) {
      console.log("checkChange1", value, id, status);

      if (status) 
        this.pm_o_id.push(id);
      else
      {
        _.remove(this.pm_o_id, function(n) {
          return n == id;
        });
      }
      // if (value > 0)
      this.chk_option_price = status
        ? parseInt(this.chk_option_price) + parseInt(value)
        : parseInt(this.chk_option_price) - parseInt(value);
      
      this.calcPrice();
    },
    calcPrice() {
      this.total_price =
        (parseInt(this.price) +
          parseInt(this.radio_option_price) +
          parseInt(this.chk_option_price)) *
        parseInt(this.cnt);
      this.select = "주문 " + this.formatPrice(this.total_price) + "원";
      // console.log("total_price", this.total_price);
    },
    priceChange() {
      if (this.$store.getters.s_product.price_yn == "N" && this.u_price == "")
        this.price = 0;
      else this.price = this.u_price;
      this.total_price = this.price;
    },
    cntPlus() {
      this.cnt += 1;
      this.calcPrice();
    },
    cntMinus() {
      if (this.cnt > 1) {
        this.cnt -= 1;
        this.calcPrice();
      }
    },

    basketClick() {

      if (this.order_product.length > 9) {
        this.showToast("장바구니가 꽉 찼습니다. (최대 10개)");
      } else {
        if (this.memo.length > 50) {
          this.showToast(" 주문요청사항을 50자리 이내로 입력하세요");
        } else if (this.total_price < 100) {
          this.showToast(" 주문금액은 100원 이상이여야 합니다.");

        } else if ( this.options1.length > 0 &&  this.p_o_id1 == "" ) {
          this.showToast( this.options1[0].p_grp_name + " 선택해주세요.");    
        } else if ( this.options2.length > 0 && this.p_o_id2 == "") {
          this.showToast( this.options2[0].p_grp_name + " 선택해주세요.");  
        } else {
          var product = {
            //바스켓클릭하게되면  파람값으로 product 키에 this.s_product를 밸류로 담습니다.
            product: this.s_product,
            p_o_id1: this.p_o_id1,
            p_o_id2: this.p_o_id2,
            pm_o_id: this.pm_o_id,
            price: this.total_price,
            cnt: this.cnt,
            memo: this.memo,
            option: this.r_option
          };
          this.$store.commit("add_order", product);
          this.showToast("장바구니에 담았습니다");
          this.$router.push(
            "/menu/" + this.store.store_id + "/" + this.table_id
          );
        }
      }
      // this.$router.go(-1)
    },
    payClick() {
      // if (this.order_product.length > 9) {
      //   this.showToast("장바구니가 꽉 찼습니다. (최대 10개)");
      // } 
      // else {
        if (this.memo.length > 50) {
          this.showToast(" 주문요청사항을 50자리 이내로 입력하세요");
        } else if (this.total_price < 100) {
          this.showToast(" 주문금액은 100원 이상이여야 합니다.");
        } else if (this.s_product.sold_out_yn == "Y") {
          this.showToast(" 현재 준비중인 상품입니다.");
        } else if ( this.options1.length > 0 &&  this.p_o_id1 == "" ) {
          this.showToast( this.options1[0].p_grp_name + " 선택해주세요.");    
        } else if ( this.options2.length > 0 && this.p_o_id2 == "") {
          this.showToast( this.options2[0].p_grp_name + " 선택해주세요.");  
        } else {
          var product = {
            // 주문하기 클릭시 파람값으로 product 키에 this.s_product를 밸류로 담습니다.
            product: this.s_product,
            p_o_id1: this.p_o_id1,
            p_o_id2: this.p_o_id2,
            pm_o_id: this.pm_o_id,
            price: this.total_price,
            cnt: this.cnt,
            memo: this.memo,
            option: this.r_option
          };
          this.$store.commit("add_order", product);
          this.$router.push("/basket_all");
        }
      // }
    },
    soldOutClick() {
      this.showToast(" 현재 준비중인 상품입니다.");
    },
    handleInputOverflow(isOverflow) {
      this.inputErrorText = isOverflow ? "요청사항이 너무 깁니다" : "";
    },
    customOrderPrice() {
      this.$nextTick(() => {
        this.u_price = this.u_price.replace(/[^0-9]/g, "");
        if (this.u_price > 1000000) {
          this.showToast("1,000,000원 초과시 주문이 되지 않습니다.");
          this.u_price = this.u_price.replace(this.u_price, 1000000);
        }
        if (this.u_price < 100 && this.u_price != "")
          this.minPriceError = "주문 금액을 100원 이상으로 수정하세요";
        else this.minPriceError = "";
      });
    }
  }
};
</script>


<style>
.time_color {
  color: #d10000 !important;
}
.v-radio-label {
  font-size: 1.1rem !important;
}

.mu-checkbox-label {
  font-size: 1.1rem;
  /* margin-left: 0.5rem; */
}
/*
.mu-text-field-label {
  margin-top: -0.3rem;
  background-color: rgb(238, 238, 238);
  font-weight: bold;
  font-size: 1.4rem;
  color : black;
}
*/
/* .mu-text-field-input {
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  font-size: 0.9rem;
} */

.mu-text-field-help {
  /* padding: 1rem; */
  /* 요청사항 다른 페이지 가서 노필요임 */
}
</style>


<style scoped>
.sold_out_color {
  color: #8a8a8a;
}
.memo_background {
  /* background-color: #f1f1f1; */
  padding: 0 1rem;
  padding-bottom: 2rem; 
}
.memo_window,
.add_menu_btn {
  border-radius: 10px;
}
.memo_window {
  padding: 0.5rem;
  border: 0.05rem solid #043474;
}
.add_menu_btn {
  margin: 0.5rem;
  padding: 0.5rem;
}
.btns .add_menu_btn > div > img {
  vertical-align: bottom;
}
.add_menu_btn > div > span {
  vertical-align: middle;
  color: #8a8a8a;
  font-size: 1rem;
}
.add_menu_btn > div {
  text-align: center;
}
.order_title .memo_window .mu-text-field {
  width: 93%;
}

.title_name_img {
  background-color: #f1f1f1;
  position: relative;
  line-height: 0;
}

.order_title {
  width: 100%;
  background-color: white;
}
.main_image {
  width: 100%;
  line-height: 0;
  position: relative;
}
.main_image img {
  width: 100%;
}
.inline_block {
  display: inline-block;
}
.product_desc {
  width: 100%;
  padding: 5%;
  position: relative;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}
.product_title_name,
.product_title_price {
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: bold;
}
.product_title_name {
  width: 60%;
  /* margin-top: 14%; */
}
.title_price_color {
  color: #d10000;
}
.sale_title_price_color {
  color: #d10000;
}
.product_title_price {
  position: absolute;
  right: 6%;
  width: 30%;
  text-align: right;
}
.select_option_title {
  padding: 1% 0;
  font-weight: 800;
}
.option_margin {
  padding-left: 1rem;
  padding-right: 1rem;
  /* padding-bottom: 0.5rem; */
  
}
.select_option_name {
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}
.option_cap {
  /* position: relative; */
  height: 2rem;
}
.cnt_div {
  width: 60%;
  text-align: center;
}
.radio_place {
  color: #8a8a8a !important;
}
.option_p_o_name {
  width: 60%;
  height: 24px;
  line-height: 24px;
}
.radio_width {
  position: absolute;
  right: 0;
}

.img-wrapper,
.img-wrapper-left,
.img-wrapper-right {
  height: 3rem;
  width: 3rem;
  margin-top: 10%;
}
.img-wrapper-left {
  float: left;
}
.img-wrapper-right {
  float: right;
}

.group {
  position: relative;
  flex-direction: row;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  /* border-bottom: 1px solid rgba(230, 230, 230, 1); */
}
.icon_span {
  width: 30%;
  position: absolute;
  right: 3.5%;
  flex-direction: row;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

.group > .icon_span > .inline_block > span {
  font-size: 1rem;
}

.item {
  font-size: 1rem;
  width: 50%;
  font-weight: bold;
  padding: 1rem;
}

.price {
  text-align: center;
  padding: 1.5rem;
  padding-top: 1rem;
  /* background-color: #f1f1f1; */
}

.price_title {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(30, 30, 30);
}
.price_content > span,
.price_content {
  font-weight: bold;
  color: #0856c3;
}

.price_content {
  font-size: 3rem;
  text-align: center;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}
.price_content > span {
  font-size: 2rem;
}
.order_btns {
  width: 100%;
  /* position: fixed; */
  bottom: 0;
}
.product_desc_small {
  font-size: 0.9rem;
  white-space: pre-wrap;
}


.wrapper {
  position: relative;
  /* important(so we can absolutely position the description div */
}

.description {
  position: absolute;
  /* absolute position (so we can position it where we want)*/
  bottom: 0px;
  /* position will be on bottom */
  left: 0px;
  width: 100%;
  height: 3.5rem;
  font-size: 1rem;
  padding: 0.3rem;
  font-weight: bold;
  /* styling bellow */
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  /*opacity: 0.4;*/
  /* transparency */
}

.total_price {
  float: right;
  margin-right: 0.5rem;
}

.unit_price {
  text-decoration: line-through;
  float: right;
  margin-right: 0.9rem;
  font-weight: bold;
  font-size: 1rem;
}

.product_name {
  margin-left: 0.5rem;
  clear: both;
  font-weight: bold;
  font-size: 1.2rem;
}

.memo {
  width: 95%;
  margin-left: 0.5rem;
}

.bottom {
  margin-top: 4rem;
}

.mu-radio {
  width: 100%;
}

.mu-checkbox {
  width: 100%;
  /* margin-bottom: 0.9rem; */
}

.option_title {
  font-size: 1.1rem;
  font-weight: 700;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  /* margin-top: 0.5rem; */
  color: rgb(30, 30, 30);
  background-color: rgb(238, 238, 238);
}

.ask_title {
  font-size: 1.1rem;
  font-weight: 700;
  padding-left: 1rem;
  margin-top: 1rem;
  /* margin-top: 0.5rem; */
  color: rgb(30, 30, 30);
  background-color: rgb(238, 238, 238);
}

.p_origin_title {
  font-size: 0.9rem;
  font-weight: 700;
}
.p_origin_desc {
  font-size: 0.9rem;
}
.desc_title {
  font-size: 0.9rem;
  font-weight: 700;
}
.desc_desc {
  text-align: left;
}
.option_item {
  margin-bottom: -0.2rem;
  font-size: 1.3rem;
  margin-right: 1.8rem;
}

.btn_basket_move {
  color: #ffffff;
 } 


.btns {
  margin-bottom: 1rem;
}


.btn_sold_out {
  background-color: #5d5d5d;
  width: 100%;
  text-align: center;
  white-space: normal;
  color: white;
  font-weight: bold;
  height: 65px;
}

.btn_basket {
  background-color: #043474;
  border: 0.05rem solid #043474 !important;
  color: #043474 !important;
}



.memo_window .order_text_hint {
  font-weight: bold !important;
}

.btn_img {
  width: 10%;
}
.main_image > .sale_tag {
  position: absolute;
  color: white;
  background-color: #d10000;
  border-radius: 20px;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  top: 5%;
  right: 5%;
}

.content_bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5%;
  padding-right: 6%;
}

.grid_pruduct_title {
  /* text-align: center; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 1.3rem;
}

.content_bottom .packing_sale_desc {
  font-size: 1.1rem;
  letter-spacing: -0.5px;
  font-weight: bold;
  color: white;
  opacity: 1;
  line-height: 1.1rem;
  display: inline-block;
}
.time_sale_content {
}
.order_title > div > div > img {
  width: 100%;
}
</style>