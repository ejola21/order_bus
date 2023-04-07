import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auction",
    name: "auction",
    component: () =>
      import(/* webpackChunkName: "auction" */ "../views/auction.vue"),
  },
  {
    path: "/address",
    name: "address",
    component: () =>
      import(/* webpackChunkName: "address" */ "../views/address.vue"),
  },
  {
    path: "/menu/:store_id/:table_id",
    name: "menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/menu.vue"),
  },
  {
    path: "/sale/:store_id/:gb",
    name: "sale",
    component: () => import(/* webpackChunkName: "sale" */ "../views/sale.vue"),
  },
  {
    path: "/basket_all",
    name: "basket_all",
    component: () =>
      import(/* webpackChunkName: "basket_all" */ "../views/basket_all.vue"),
  },
  {
    path: "/bell_call",
    name: "bell_call",
    component: () =>
      import(/* webpackChunkName: "bell_call" */ "../views/bell_call.vue"),
  },
  {
    path: "/coupon_list",
    name: "coupon_list",
    component: () =>
      import(/* webpackChunkName: "coupon_list" */ "../views/coupon_list.vue"),
  },
  {
    path: "/event",
    name: "event",
    component: () =>
      import(/* webpackChunkName: "event" */ "../views/event.vue"),
  },
  {
    path: "/group",
    name: "group",
    component: () =>
      import(/* webpackChunkName: "group" */ "../views/group.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () => import(/* webpackChunkName: "join" */ "../views/join.vue"),
  },
  {
    path: "/leave",
    name: "leave",
    component: () =>
      import(/* webpackChunkName: "leave" */ "../views/leave.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/my_coupon",
    name: "my_coupon",
    component: () =>
      import(/* webpackChunkName: "my_coupon" */ "../views/my_coupon.vue"),
  },
  {
    path: "/myboard_msg",
    name: "myboard_msg",
    component: () =>
      import(/* webpackChunkName: "myboard_msg" */ "../views/myboard_msg.vue"),
  },
  {
    path: "/order_result",
    name: "order_result",
    component: () =>
      import(
        /* webpackChunkName: "order_result" */ "../views/order_result.vue"
      ),
  },
  {
    path: "/order",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "order" */ "../views/order.vue"),
  },
  {
    path: "/order2",
    name: "order2",
    component: () =>
      import(/* webpackChunkName: "order2" */ "../views/order2.vue"),
  },
  {
    path: "/pay_result/:reply_cd/:reply_msg/:pg",
    name: "pay_result",
    component: () =>
      import(/* webpackChunkName: "pay_result" */ "../views/pay_result.vue"),
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import(/* webpackChunkName: "pay" */ "../views/pay.vue"),
  },
  {
    path: "/pwd_find",
    name: "pwd_find",
    component: () =>
      import(/* webpackChunkName: "pwd_find" */ "../views/pwd_find.vue"),
  },
  {
    path: "/receipt/:store_id/:order_no",
    name: "receipt",
    component: () =>
      import(/* webpackChunkName: "receipt" */ "../views/receipt.vue"),
  },
  {
    path: "/sns_alram_control",
    name: "sns_alram_control",
    component: () =>
      import(
        /* webpackChunkName: "sns_alram_control" */ "../views/sns_alram_control.vue"
      ),
  },
  {
    path: "/sns_control",
    name: "sns_control",
    component: () =>
      import(/* webpackChunkName: "sns_control" */ "../views/sns_control.vue"),
  },
  {
    path: "/status/:store_id/:user_id",
    name: "status",
    component: () =>
      import(/* webpackChunkName: "status" */ "../views/status.vue"),
  },
  {
    path: "/storeInfo",
    name: "storeInfo",
    component: () =>
      import(/* webpackChunkName: "storeInfo" */ "../views/storeInfo.vue"),
  },
  {
    path: "/term_p_collect",
    name: "term_p_collect",
    component: () =>
      import(
        /* webpackChunkName: "term_p_collect" */ "../views/term_p_collect.vue"
      ),
  },
  {
    path: "/term_p_offer",
    name: "term_p_offer",
    component: () =>
      import(
        /* webpackChunkName: "term_p_offer" */ "../views/term_p_collect.vue"
      ),
  },
  {
    path: "/term_pay",
    name: "term_pay",
    component: () =>
      import(/* webpackChunkName: "term_pay" */ "../views/term_pay.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "../views/test.vue"),
  },
  {
    path: "/time_sale_desc",
    name: "time_sale_desc",
    component: () =>
      import(
        /* webpackChunkName: "time_sale_desc" */ "../views/time_sale_desc.vue"
      ),
  },
  {
    path: "/u_user",
    name: "u_user",
    component: () =>
      import(/* webpackChunkName: "u_user" */ "../views/u_user.vue"),
  },
  {
    path: "/review_write/:rid",
    name: "review_write",
    component: () =>
      import(
        /* webpackChunkName: "review_write" */ "../views/review_write.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
