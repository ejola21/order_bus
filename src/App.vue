<template>
  <v-app>
    <!-- 사이드 메뉴  -->

    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" right app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <!-- <v-list-item-avartar>
            <v-icon>mdi-store-outline</v-icon>
          </v-list-item-avartar>-->
          <img src="./assets/img/cc_logo.png" width="100%" />
          <!-- <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>-->

          <v-list-item-content>
            <v-list-item-title>{{store.store_name}}</v-list-item-title>
            <!-- <v-list-item-subtitle>고객님 반가워요!</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link @click="bellClick">
          <v-list-item-action>
            <v-icon>mdi-store-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>가게 정보</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="menuClick">
          <v-list-item-action>
            <v-icon>mdi-silverware-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>메뉴</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="basketClick">
          <v-list-item-action>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>장바구니</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="statusClick">
          <v-list-item-action>
            <v-icon>mdi-folder-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>주문 현황</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="bellClick">
          <v-list-item-action>
            <v-icon>mdi-comment-text-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>리 뷰</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="bellClick">
          <v-list-item-action>
            <v-icon>mdi-bell-ring-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>요청 메시지</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 타이틀바 -->
    <v-app-bar
      color="primary"
      app absolute
      dark
    >
      <v-btn v-show="is_back" @click="backNav" icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="store_name">{{store.store_name}}</v-toolbar-title>
      <v-spacer />

      <!-- <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white" />
    </v-app-bar>

    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto">
      <v-content style="height:2.2rem;"></v-content>

      <v-container fluid style="padding:0;">
        <router-view></router-view>
        <br />
        <!-- <br /> -->
      </v-container>
    </v-sheet>

    <!-- 풋터 -->
    <!-- <v-bottom-navigation 
          v-show ="!is_back"
          :value="activeBtn"
          grow
          color="#757575"
          style="position:fixed"
        >
          <v-btn value = "home" @click="menuClick">
            <span>홈</span>
            <v-icon color="#757575">mdi-home-outline</v-icon>
          </v-btn>

          <v-btn @click="basketClick">
            <span>장바구니</span>
            <v-icon color="#757575">mdi-cart-outline</v-icon>
            <v-badge v-if ="order_product.length > 0"
              color="light-blue"
              :content="order_product.length.toString()"
            >
            </v-badge>
          </v-btn>

          <v-btn @click="statusClick">
            <span>주문현황</span>
            <v-icon color="#757575">mdi-comment-text-outline</v-icon>
          </v-btn>

          <v-btn @click="payClick" >
            <span>결제내역</span>
            <v-icon color="#757575">mdi-credit-card-clock-outline</v-icon>
          </v-btn>

      

          <v-btn @click="bellClick">
            <span>호출</span>
            <v-icon color="#757575">mdi-bell-ring-outline</v-icon>
          </v-btn>

    </v-bottom-navigation>-->

    <v-snackbar
      class="toast"
      v-model="toast.toast"
      :timeout="toast.timeout"
      @close="hideToast"
    >{{toast.toast_msg}}</v-snackbar>

    <v-overlay :value="loading">
      <v-progress-circular :indeterminate="loading" color="white"></v-progress-circular>
    </v-overlay>

    <!-- [Vue warn]: Do not use built-in or reserved HTML elements as component id: circle 에러 원인 아래꺼대문임-->
    <!-- <mu-circular-progress v-show="loading" :size="60" :strokeWidth="5" /> -->
  </v-app>
</template>

<script>
export default {
  name: "app",
  computed: {
    user_id() {
      return this.$store.getters.user_id;
    },
    is_back() {
      return this.$store.getters.is_back;
    },
    is_menu() {
      return this.$store.getters.is_menu;
    },
    is_bell() {
      return this.$store.getters.is_bell;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    store() {
      return this.$store.getters.store;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    title() {
      return this.$store.getters.title;
    },
    is_order_popup() {
      return this.$store.getters.is_order_popup;
    },
    is_android() {
      return this.$store.getters.is_android;
    },
    address_page_back_btn() {
      return this.$store.getters.address_page_back_btn;
    },
    loading() {
      return this.$store.getters.loading;
    },
    toast() {
      return this.$store.getters.toast;
    },
    is_home() {
      return this.$store.getters.is_home;
    },
    is_select_store() {
      return this.$store.getters.is_select_store;
    }
  },
  data: () => ({
    dialog: false,
    drawer: null,
    open: false,
    docked: true,
    login_name: "",
    title_name: "",
    activeBtn: "home",
    d_img: require("./assets/img/no_img1.jpeg")
  }),
  mounted() {
    this.$store.commit("loading", false);

    this.$store.commit("toast", {
      toast: false,
      toast_msg: ""
    });
  },
  methods: {
    staff_call() {
      this.$router.push("/bell_call");
    },
    backNav() {
      // alert(window.location.href)
      if (this.address_page_back_btn) {
        window.location.reload();
        this.$store.commit("address_page_back_btn", false);
      } else this.$router.go(-1);
    },
    toggle(flag) {
      this.open = !this.open;
      this.docked = !flag;
    },
    statusClick() {
      if (this.user_id == "")
        this.$router.push("/status/" + this.store.store_id + "/qq");
      else
        this.$router.push(
          "/status/" + this.store.store_id + "/" + this.user_id
        );
    },
    titleClick() {
      this.$store.commit("select_category", {
        store_id: "",
        table_id: "",
        select_tab: "",
        scrollx: 0,
        scrolly: 0
      });
      this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
    },
    basketClick() {
      this.$router.push("/basket_all/");
    },
    homeClick() {
      this.$router.push(
        "/group/" + this.store.group_code + "/" + this.table_id
      );
    },
    menuClick() {
      this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
    },
    payClick() {
      this.$router.push("/pay");
    },
    bellClick() {
      this.$router.push("/bell_call");
    },

    eventClick() {
      this.open = !this.open;
      this.$router.push("/event");
    },

    myCouponClick() {
      this.open = !this.open;
      this.$router.push("/my_coupon");
    }
  }
};
</script>

<style lang="scss">
// @import '@/styles/overrides.scss';
</style>

<style scoped>
.toast {
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.87);
}
.store_name {
  font-weight: bold;
  font-size: 1.4rem;
  color: white;
}

@media (min-width: 960px) {
  .container {
    max-width: 100% !important;
  }
  .col-md-4 {
    max-width: 100% !important;
  }
}

@media (min-width: 600px) {
  .col-sm-6 {
    max-width: 100% !important;
  }
}
</style>