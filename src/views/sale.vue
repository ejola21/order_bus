<template>
  <div class="n_container">
    <v-tabs fixed-tabs v-model="tab" @change="tabChange">
      <v-tab class="v_tab" href="#M">버스</v-tab>
      <v-tab class="v_tab" href="#R">리뷰</v-tab>
      <v-tab class="v_tab" href="#I">소개</v-tab>
    </v-tabs>

    <v-divider light></v-divider>

    <v-tabs-items v-model="tab">
      <v-tab-item value="M">
        <v-tabs v-model="tab2" show-arrows background-color="blue lighten-5">
          <v-tab
            v-for="(category, index) in productCategories"
            :key="index"
            :href="'#' + category.p_category_id"
            >{{ category.category_name }}</v-tab
          >
        </v-tabs>

        <v-tabs-items v-model="tab2">
          <v-carousel
            v-if="
              (store.open_yn !== 'Y' && store.biz_time) ||
                (store.board_yn == 'Y' && store.coupon_yn == 'Y') ||
                (store.coupon_yn == 'Y' && time_sale_confirm.length > 0)
            "
            cycle
            hide-delimiters
            show-arrows-on-hover
            height="85px"
          >
            <v-carousel-item
              v-if="store.open_yn !== 'Y' && store.biz_time"
              @click="eventClick"
              class="time_off"
            >
              <v-row>
                <v-col class="open_close_title">영업 준비중</v-col>
              </v-row>
              <v-row>
                <v-col class="open_close_clock"
                  >OPEN {{ store.biz_time }}</v-col
                >
              </v-row>
            </v-carousel-item>

            <v-carousel-item v-if="store.board_yn == 'Y'" @click="eventClick">
              <img width="100%" src="../assets/img/event_tab.png" />
            </v-carousel-item>

            <v-carousel-item
              v-if="store.coupon_yn == 'Y'"
              @click="couponListClick"
            >
              <img width="100%" src="../assets/img/coupon_banner.jpg" />
            </v-carousel-item>

            <v-carousel-item
              v-if="time_sale_confirm.length > 0"
              @click="timeSaleClick"
            >
              <img width="100%" :src="store.ban_img1" />
            </v-carousel-item>
          </v-carousel>

          <v-tab-item
            :value="category"
            v-for="(category, index) in id_list"
            :key="index"
          >
            <!-- <v-container class="grey lighten-5"> -->
            <!-- <v-row no-gutters> -->
            <div v-if="gb == 1">
              <product-list
                v-for="(product, index) in products(category)"
                :key="index"
                :product="product"
                :active="active"
              />
            </div>
            <div v-else-if="gb == 2">
              <product-list2
                v-for="(product, index) in products(category)"
                :key="index"
                :product="product"
                :active="active"
              />
            </div>
            <div v-else>
              <product-list
                v-for="(product, index) in products(category)"
                :key="index"
                :product="product"
                :active="active"
              />
            </div>

            <v-divider></v-divider>
            <!-- </v-row> -->
            <!-- </v-container> -->
          </v-tab-item>
        </v-tabs-items>

        <div
          class="store_info"
          v-if="store.store_info"
          v-html="store.store_info"
        />
        <div
          v-if="store.order_yn == 'Y' || store.pay_yn == 'Y'"
          class="toggle_btn"
          @click="toggleClick"
        >
          <span class="toggle_span">트레킹버스</span>

          <v-icon v-show="!companyShow">mdi-chevron-down</v-icon>
          <v-icon v-show="companyShow">mdi-chevron-up</v-icon>
          <span class="copyright"
            >Copyright&copy;트레킹버스 All rigthts reserved.</span
          >
        </div>
        <div
          class="m_futter"
          v-if="store.order_yn == 'Y' || store.pay_yn == 'Y'"
        >
          <transition name="fade">
            <div v-show="companyShow" ref="animation" class="animation">
              <div class="m_futter1">상호명 : (주)리스타트</div>
              <div class="m_futter2">대표이사 : 노정호</div>
              <div class="m_futter3">
                사업자 등록번호 : 482-81-00235 | 통신판매업 :
                2018-서울강남-00189
              </div>
              <div class="m_futter4">메일 : help@gmail.co.kr</div>
              <div class="m_futter5">
                대표번호 : 1544-3677 | 지사및가맹점모임 : 1522-5744
              </div>
              <div class="m_futter6">
                주소 : 서울 강남구 강남대로198길 단골빌딩 트레킹버스
              </div>
              <div class="m_futter7">호스팅서비스제공자 : (주)리스타트</div>
              <div class="m_futter8">
                전자금융분쟁처리 Tel:1544-3677 / Fax : 02-565-1775
              </div>
            </div>
          </transition>
          <div class="m_futter9">
            리스타트은 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서
            리스타트은 상품거래 정보 및 거래에 대한 책임을 지지 않습니다.
          </div>
          <br />
        </div>
      </v-tab-item>

      <v-tab-item value="R">
        <review></review>
      </v-tab-item>

      <v-tab-item value="I">
        <info></info>
      </v-tab-item>
    </v-tabs-items>

    <!-- <v-btn bottom color="blue" dark fab fixed right @click="dialog = !dialog">
      <v-badge color="teal darken-1" content="6">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>-->
  </div>
</template>

<script>
export default {
  components: {
    productList: () => import("../components/productList.vue"),
    productList2: () => import("../components/productList2.vue"),
    info: () => import("../components/info.vue"),
    review: () => import("../components/review.vue"),
  },
  computed: {
    productCategories() {
      var ret = _.map(_.uniqBy(this.l_product, "p_category_id"), function(
        item
      ) {
        // console.log(item.p_category_id);
        return {
          p_category_id: item.p_category_id,
          category_name: item.category_name,
        };
      });
      // console.log('product',ret);
      if (
        ret[0] &&
        (this.select_category.store_id == "" ||
          this.select_category.store_id != this.$route.params.store_id)
      )
        this.active = 0;
      this.c_list = ret;

      this.id_list = [];
      for (let i = 0; i < ret.length; i++) {
        this.id_list.push(ret[i].p_category_id);
      }
      return ret;
    },
    time_sale_confirm() {
      return _.filter(this.l_product, {
        sale_gb: "T",
      });
    },
    l_product() {
      return this.$store.getters.l_product;
    },

    r_option() {
      return this.$store.getters.r_option;
    },
    store() {
      this.test = this.$store.getters.store.open_yn;
      // console.log(this.test);
      return this.$store.getters.store;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    select_category() {
      return this.$store.getters.select_category;
    },
    total_price() {
      var _price = 0;
      _.forEach(this.order_product, function(value, key) {
        //console.log('value : ', value, value.price, key);
        _price = _price + parseInt(value.price);
      });
      return _price;
    },
    home_tab() {
      return this.$store.getters.home_tab;
    },
    check_safari_home() {
      return this.$store.getters.check_safari_home;
    },
  },
  data() {
    return {
      gb: 2,
      tab: null,
      tab2: null,
      p_category_id: "",
      active: 0,
      is_android: false,
      bottomPopup: false,
      click_ddabong: require("../assets/img/ddabong_blue.svg"),
      unclick_ddabong: require("../assets/img/ddabong_gray.svg"),
      default_img: require("../assets/img/noimg.jpg"),
      windowHeight: 0,
      heightObj: {},
      flexObj: {},
      companyShow: false,
      c_list: [],
      id_list: [],
      category_index: 0,
      left: 0,
      right: 0,
      thema: "",
      test: false,
      select: false,
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        //   loop: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true,
      },
      banner: {
        notNextTick: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        direction: "horizontal",
        loop: true,
      },
    };
  },
  created() {
    this.$store.commit("is_back", false);
    this.$store.commit("is_menu", true);

    console.log("created tab", this.$route.params);

    this.tab = this.home_tab;
    this.gb = this.$route.params.gb;

    if (this.home_tab == "M") {
      var param = {
        store_id: this.$route.params.store_id,
        table_id: this.$route.params.gb,
      };
      // console.log(this.$route.params)
      this.$store.commit("l_product", []);
      this.$store.dispatch("l_product", param).then((res) => {
        if (res.group_code) {
          this.$store.commit("is_select_store", true);
        } else {
          this.$store.commit("is_select_store", false);
        }
        this.$store.commit("is_back", false);

        if (res.call_yn == "Y") {
          this.$store.commit("is_bell", true);
        } else {
          this.$store.commit("is_bell", false);
        }
      });
    }

    this.$store.commit("title", this.store.store_name);
    this.$store.commit("table_id", this.$route.params.table_id);
  },
  mounted() {
    if (
      this.select_category.store_id == this.$route.params.store_id &&
      this.select_category.table_id == this.$route.params.table_id
    ) {
      // console.log(this.select_category.select_tab);
      if (this.select_category.select_tab == "rangking") {
        if (this.c_list[0] == "rangking") {
          this.active = this.select_category.select_tab;
        } else {
          this.active = 0;
          this.$store.commit("select_category", {
            store_id: "",
            table_id: "",
            select_tab: 0,
            scrollx: 0,
            scrolly: 0,
          });
        }
      } else {
        this.active = this.select_category.select_tab;
        //this.swiper.slideTo(this.active, 500, false);
      }

      // this.$refs.category_menu.scrollLeft = this.select_category.scrollx;
    } else if (
      this.select_category.store_id != this.$route.params.store_id ||
      this.select_category.table_id != this.$route.params.table_id
    )
      this.$store.commit("select_category", {
        store_id: "",
        table_id: "",
        select_tab: "",
        scrollx: 0,
        scrolly: 0,
      });
    if (this.store.delivery_yn == "N" || !this.store.delivery_yn)
      this.$store.commit("choice_delivery_yn", "N");
    if (this.store.pay_yn != "Y" && this.store.order_yn != "Y") {
      this.windowHeight = window.innerHeight - 56;
      if (this.$refs.height.clientHeight < this.windowHeight) {
        this.heightObj.maxHeight = this.windowHeight;
        this.heightObj.height = this.windowHeight;
        this.heightObj.maxHeight += "px";
        this.heightObj.height += "px";
      }
    }
    let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

    if (varUA.match("android") != null) {
      this.$store.commit("is_android", true);
      this.is_android = true;
    } else {
      this.$store.commit("is_android", false);
      this.is_android = false;
    }

    this.$store.commit("is_home", true);
    this.$store.commit("is_popup", {
      is_popup: false,
      title: "",
      desc: "",
    });

    let date;
    let msec;
    if (
      navigator.userAgent.match("iPhone") &&
      navigator.userAgent.match("Safari")
    ) {
      date = new Date();
      msec = 1000 * 60 * 60 * 24 * 7;

      if (this.check_safari_home.date == "") {
        this.$store.commit("check_safari_home", {
          check: true,
          date: date.getTime(),
          date_calc: true,
        });
      } else if (this.check_safari_home.date + msec < date.getTime()) {
        this.$store.commit("check_safari_home", {
          check: true,
          date: date.getTime(),
          date_calc: true,
        });
      }
    }
  },
  methods: {
    tabChange() {
      console.log("tabChange", this.tab);
      this.$store.commit("home_tab", this.tab);
    },
    handleTabClick(value, index) {
      //console.log("handleTabClick", index);
      this.active = index;
      this.swiper.slideTo(index, 500, false);
    },
    basketNav() {
      this.$router.push("/basket_all");
    },
    home_screen_close() {
      let date = new Date();
      this.$store.commit("check_safari_home", {
        check: true,
        date: date.getTime(),
        date_calc: false,
      });
    },
    eventClick() {
      this.$router.push("/event");
    },
    toggleClick() {
      this.companyShow = !this.companyShow;
    },
    products(id) {
      let ret = _.filter(this.l_product, {
        p_category_id: id,
      });
      return ret;
    },
    couponListClick() {
      this.$router.push("/coupon_list");
    },
    rightClick() {
      if (this.productCategories.length - 1 > this.active) {
        this.active++;
        this.swiper.slideTo(this.active, 500, false);
      }
    },
    timeSaleClick() {
      this.$router.push("/time_sale_desc");
    },
  },
};
</script>

<style scoped>
.theme--light.v-divider {
  display: none;
}
.v-tab {
  font-size: 1.1rem;
  font-weight: bold;
}

.store_info {
  padding: 0.7rem;
  font-family: sans-serif;
  color: rgb(125, 125, 125);
  font-size: 0.7rem;
  background-color: #ccc;
}
.toggle_span {
  font-size: 1rem;
  font-weight: bold;
  color: #03a9f4;
  font-family: sans-serif;
}
.icon_span,
.copyright {
  font-size: 1rem;
  font-weight: bold;
  flex: 1 1 auto;
  justify-content: center;
}

.copyright {
  font-size: 0.8rem;
  font-weight: 400;
  align-items: flex-end;
  text-align: right;
}

.ft_wrap {
  background-color: #f3f3f3;
  padding-top: 0.8rem;
  clear: both;
  padding-bottom: 56px;
  border-top: 1px solid #ccc;
}

.toggle_btn {
  display: flex;
  padding: 0 0.7rem 0.1rem;
}

/* 애니메이션 코드 */
.m_futter {
  padding: 0 0.7rem;
  font-size: 0.8rem;
}

.m_futter > .fade-enter-active,
.m_futter > .fade-leave-active {
  transition: margin-top 0.3s ease-out;
}
.m_futter > .fade-enter,
.m_futter > .fade-leave-to {
  margin-top: -104px;
}
.m_futter > .fade-enter-to,
.m_futter > .fade-leave {
  margin-top: 0px;
}
.v-tab.v-tab {
  padding: 0.5rem;
  width: 100%;
}

.time_off {
  /* background-image:url("../assets/img/open_close.jpeg"); */
  background-color: #4c5457;
  color: #ffea00;
}
.two_line {
  height: 6rem;
}
.open_close_title {
  font-size: 1.8rem;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0rem;
}
.open_close_clock {
  font-size: 1rem;
  text-align: center;
  padding-top: 0.1rem;
}
</style>
