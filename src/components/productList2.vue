<template>
  <div class="prd_list_wrap">
    
      <v-card class="ma-2"  v-on:click="itemSelect(product)">
        <lazy-component @show="handler" class="img_div">
          <v-img :src="product.img_thumb_url" :lazy-src="product.img_thumb_url" aspect-ratio="1.4">
            <v-row
              v-if="product.sold_out_yn == 'Y'"
              class="black pt-8 pbfill-height"
              style="opacity:0.5;"
            >
              <v-col>
                <div class="white--text text-center">준비중</div>
              </v-col>
            </v-row>
          </v-img>

          <img src="../assets/img/time_sale.png" class="sale_tag" />

          <!-- <div class="sale_tag">할인</div> -->
        </lazy-component>

        <div class="pa-3 list_con">
          <div class="name">
            {{product.product_name}}
            <v-chip
              v-if="product.sale_price > 0"
              class="ma-2"
              color="light-blue darken-3"
              text-color="white"
            >SALE</v-chip>
            <v-chip
              v-if="product.sold_out_yn == 'Y'"
              class="ma-2"
              color="red darken-2"
              text-color="white"
            >SOLD OUT</v-chip>
          </div>

          <span class="d-inline-block text-truncate" style="max-width: 60vw">{{product.desc}}</span>

          <div v-if="product.sale_price > 0">
            <span class="sale_price">{{formatPrice(product.price,'default')}}</span>
            <span class="price">{{formatPrice(product.sale_price,'default')}}</span>
          </div>
          <div v-else>
            <span class="price">{{formatPrice(product.price,'default')}}</span>
          </div>
        </div>
      </v-card>

 
    <v-divider light></v-divider>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["product", "active"],
  data() {
    return {
      default_img: require("../assets/img/noimg.jpg"),
      before_loading: false
    };
  },
  created() {
    console.log("productlist created");
  },
  methods: {
    itemSelect(product) {
      this.$store.commit("s_product", product);

      var param = {
        product_id: product.product_id
      };
      let _this = this;

      this.$store.dispatch("r_option", param).then(res => {
        let param;
        param = {
          store_id: _this.$route.params.store_id,
          select_tab: _this.active,
          table_id: _this.$store.getters.table_id
          // scrollx: _this.$parent.$parent.$parent.$refs.category_menu.scrollLeft
        };

        _this.$store.commit("select_category", param);
        _this.$store.commit("r_option", res);
        _this.$router.push("/order");
      });
    },
    handler() {
      this.before_loading = true;
    }
  }
};
</script>

<style scoped>
.list {
  padding: 0;
  line-height: 1.2rem;
  overflow: hidden;
  letter-spacing: -0.05rem;
  margin-left: 0.1rem;
}
img {
  width: 100%;
}

.sale_tag {
  position: absolute;
  width: 6rem;
  height: 6rem;
  top: 4%;
  left: 4%;
}
.black_bg {
  display: inline-block;
  background-color: #000;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  color: #fff;
  text-align: center;
  line-height: 80px;
  font-weight: bold;
}

/* .list_con { float:left; width:74%; } */
.list_con span {
  font-size: 0.8rem;
}
.list_con .name {
  font-weight: bold;
  font-size: 1.1rem;
  padding-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.list_con .name i {
  font-size: 1.2rem;
}
.list_con .price {
  color: #b71c1c;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 0.4rem;
}
.list_con .sale_price {
  display: block;
  float: left;
  margin-right: 0.6rem;
  color: #aaa;
  font-size: 0.9rem;
  font-weight: normal;
  text-decoration: line-through;
}

/* icon */
.v-chip.v-size--default {
  height: 18px; /*line-height:21px;*/
  font-weight: 500;
  letter-spacing: 0.1px;
  margin-top: -0.2rem !important;
  margin-bottom: 0rem !important;
}
.list .list_con .name i {
  font-size: 0.9rem;
  margin-top: 0.1rem;
}
.v-chip {
  padding: 0 7px;
  margin-left: 5px !important;
  margin-right: 0px !important;
  font-size: 0.6rem !important;
}

@media (max-width: 767px) {
  .prd_list_wrap {
    float: none;
    width: 100%;
  }
  .prd_list_wrap:nth-child(2n) {
    float: none;
  }
  .prd_list_wrap:nth-last-child(2) {
    border-bottom: 1px solid #ccc;
  }
  .list .list_con {
    width: 75%;
  }
}
</style>