import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const api_url = "http://order.avatacom.com/app/";

// const vuexSession = new VuexPersistence({
//     storage: window.sessionStorage
// })
// const vuexLocal = new VuexPersistence ({
//   storage: window.localStorage,
//   reducer: state => ({auto_login: state.auto_login, user_id:state.user_id, password:state.password})  //only save navigation module
// })

// state 에 object 는 최기화 로 {} 이걸로 하고
// mutation commit 시에는 아래와 같이 함
// let aa = { 'title':'test_click' , 'desc':'test_click_desc' };
// this.$store.commit('test',aa);
// commit


const store = new Vuex.Store({
    /* eslint-disable */
    // plugins: [ vuexSession.plugin,vuexLocal.plugin ],
    plugins: [createPersistedState()],
    state: {
        choice_delivery_yn: 'N',
        arrival_time_s: '',
        auth_confirm: false,
        select_category: {
            store_id: '',
            table_id: '',
            scrollx: 0,
            scrolly: 0,
            select_tab: ''
        },
        check_safari_home: {
            check: false,
            date: '',
            date_calc: false
        },
        store: {},
        addr: {},
        address_page_back_btn: false,
        user_id: '',
        user_phone: '',
        title: '',
        sns_id: '',
        email: '',
        // password: '',
        auto_login: '',
        is_login: '',
        is_sns_login: true,
        table_id: '',
        s_product: [],
        l_product: [],
        l_pay: [],
        r_option: [],
        order_status: {
            status: []
        },
        r_order_status_one: [],
        order_product: [],
        order_product_length: '',
        popup: {},
        //r_receipt :{},

        term_all: false,
        term_p_collect: false,
        term_p_offer: false,
        term_pay: false,
        is_visible: true,
        is_back: false,
        is_menu: false,
        is_bell: false,
        is_order_popup: false,
        is_popup: false,
        is_android: false,
        bf_pay: '',
        cd1: '',
        cd2: '',
        cd3: '',
        cd4: '',
        c_m: '',
        c_y: '',
        store_group_category: [],
        auction_event: '',
        basket_tab: 'default',
        loading: false,
        app_ver: 0,
        u_name: '',
        toast: {
            toast: false,
            toast_msg: '',
        },
        l_coupon: [],
        l_user_coupon: [],
        coupon_obj: '',
        address_input_coupon_id: '',
        languages: [
            {
                value: 'en',
                text: 'Korea'
            },
            {
                value: 'en',
                text: 'English'
            }
        ],
        curLanguage: 'kr',
        is_home: false,
        is_select_store: false,
        home_tab: "M",
        sum_price: 0,   // bastket_all 의 total_price 계산금액 , 현재 order2에만 적용, 나머지 화면에서 total_price 계산하지 말고 sum_price 사용 적용 하시오
    },
    getters: {
        bf_pay: state => state.bf_pay,
        is_login: state => state.is_login,
        arrival_time_s: state => state.arrival_time_s,
        choice_delivery_yn: state => state.choice_delivery_yn,
        is_sns_login: state => state.is_sns_login,
        auth_confirm: state => state.auth_confirm,
        is_visible: state => state.is_visible,
        is_back: state => state.is_back,
        is_menu: state => state.is_menu,
        is_bell: state => state.is_bell,
        is_order_popup: state => state.is_order_popup,
        is_popup: state => state.is_popup,
        is_android: state => state.is_android,
        user_id: state => state.user_id,
        check_safari_home: state => state.check_safari_home,
        user_phone: state => state.user_phone,
        title: state => state.title,
        address_page_back_btn: state => state.address_page_back_btn,
        sns_id: state => state.sns_id,
        email: state => state.email,
        cd1: state => state.cd1,
        cd2: state => state.cd2,
        cd3: state => state.cd3,
        cd4: state => state.cd4,
        c_m: state => state.c_m,
        c_y: state => state.c_y,
        auto_login: state => state.auto_login,
        // password: state => state.password,
        term_all: state => state.term_all,
        term_p_collect: state => state.term_p_collect,
        term_p_offer: state => state.term_p_offer,
        term_pay: state => state.term_pay,
        addr: state => state.addr,
        // r_receipt: state => state.r_receipt,
        popup: state => state.popup,
        l_product: state => state.l_product,
        l_pay: state => state.l_pay,
        r_option: state => state.r_option,
        order_status: state => state.order_status,
        r_order_status_one: state => state.r_order_status_one,
        order_product: state => state.order_product,
        order_product_length: state => state.order_product_length,
        store: state => state.store,
        select_category: state => state.select_category,
        table_id: state => state.table_id,
        s_product: state => state.s_product,
        store_group_category: state => state.store_group_category,
        auction_event: state => state.auction_event,
        basket_tab: state => state.basket_tab,
        loading: state => state.loading,
        home_tab: state => state.home_tab,
        sum_price: state => state.sum_price,
        app_ver: state => state.app_ver,
        u_name: state => state.u_name,
        toast: state => state.toast,
        l_coupon: state => state.l_coupon,
        l_user_coupon: state => state.l_user_coupon,
        coupon_obj: state => state.coupon_obj,
        address_input_coupon_id: state => state.address_input_coupon_id,
        languages: state => state.languages,
        curLanguage: state => state.curLanguage,
        is_home: state => state.is_home,
        is_select_store: state => state.is_select_store,
    },
    mutations: {

        l_product: function (state, payload) {
            // console.log(payload);
            if (!Array.isArray(payload)) {
                state.l_product = payload.l_product;
                document.title = payload.store.store_name;
                state.store = payload.store;


                if (payload.store.logo_yn == 'Y') {
                    if (payload.store.store_id === 's4300006') {
                        state.store.logo_url = 'https://3.34.149.33/mobile/img/icons/' + state.store.store_id + '.svg'
                    }
                    else {
                        state.store.logo_url = 'https://3.34.149.33/mobile/img/icons/' + state.store.store_id + '.png'
                    }

                }
                if (payload.store.app_ver !== state.app_ver) {
                    state.app_ver = payload.store.app_ver;
                    window.location.reload(true);
                }
            }
            // console.log(payload)
            state.term_all = '';
            state.term_pay = '';
            state.term_p_offer = '';
            state.term_p_collect = '';
            state.is_visible = true;

        },
        arrival_time_s: function (state, arrival_time_s) {
            state.arrival_time_s = arrival_time_s;
        },
        r_option: function (state, r_option) {
            state.r_option = r_option;
        },
        bf_pay: function (state, bf_pay) {
            state.bf_pay = bf_pay;
        },
        is_login: function (state, is_login) {
            state.is_login = is_login;
        },
        choice_delivery_yn: function (state, choice_delivery_yn) {
            state.choice_delivery_yn = choice_delivery_yn;
        },
        is_sns_login: function (state, is_sns_login) {
            state.is_sns_login = is_sns_login;
        },
        auth_confirm: function (state, auth_confirm) {
            state.auth_confirm = auth_confirm;
        },
        is_visible: function (state, is_visible) {
            state.is_visible = is_visible;
        },
        is_back: function (state, is_back) {
            state.is_back = is_back;
        },
        is_menu: function (state, is_menu) {
            state.is_menu = is_menu;
        },
        is_bell: function (state, is_bell) {
            state.is_bell = is_bell;
        },
        order_product: function (state, order_product) {
            state.order_product = order_product;
        },
        is_order_popup: function (state, is_order_popup) {
            state.is_order_popup = is_order_popup;
        },
        is_popup: function (state, is_popup) {
            state.is_popup = is_popup;
        },
        is_android: function (state, is_android) {
            state.is_android = is_android;
        },
        user_id: function (state, user_id) {
            state.user_id = user_id;
        },
        check_safari_home: function (state, check_safari_home) {
            state.check_safari_home = check_safari_home;
        },
        user_phone: function (state, user_phone) {
            state.user_phone = user_phone;
        },
        title: function (state, title) {
            state.title = title;
        },

        address_page_back_btn: function (state, address_page_back_btn) {
            state.address_page_back_btn = address_page_back_btn;
        },
        sns_id: function (state, sns_id) {
            state.sns_id = sns_id;
        },
        email: function (state, email) {
            state.email = email;
        },
        auto_login: function (state, auto_login) {
            state.auto_login = auto_login;
        },
        cd1: function (state, cd1) {
            state.cd1 = cd1;
        },
        cd2: function (state, cd2) {
            state.cd2 = cd2;
        },
        cd3: function (state, cd3) {
            state.cd3 = cd3;
        },
        cd4: function (state, cd4) {
            state.cd4 = cd4;
        },
        c_m: function (state, c_m) {
            state.c_m = c_m;
        },
        c_y: function (state, c_y) {
            state.c_y = c_y;
        },

        r_order_status_one: function (state, r_order_status_one) {

            var idx = _.findIndex(state.order_status.status, {
                'order_no': r_order_status_one.order_no
            })

            // state.order_status.status[idx] = r_order_status_one;
            // state.r_order_status_one = r_order_status_one;
            Vue.set(state.order_status.status, idx, r_order_status_one);
            // console.log(state.order_status.status[idx])
        },

        popup: function (state, popup) {
            state.popup = popup;
        },
        // r_receipt: function(state, r_receipt) {
        //   state.r_receipt = r_receipt;
        // },
        table_id: function (state, table_id) {
            state.table_id = table_id;
        },
        s_product: function (state, s_product) {
            state.s_product = s_product;
        },
        order_status: function (state, order_status) {
            state.order_status = order_status;
            state.is_visible = true;
        },
        l_pay: function (state, l_pay) {
            state.l_pay = l_pay;
        },
        add_order: function (state, product) {
            state.order_product.push(product);
            state.order_product_length = state.order_product.length;
        },
        del_order: function (state, product) {
            // console.log('input',product);
            var tmp = _.pull(state.order_product, product);
            // console.log('tmp', tmp)
            state.order_product = [];
            state.order_product = tmp;
            state.order_product_length = state.order_product.length;
            // _.pullAllBy(state.order_product,product, product.product_id);
        },
        del_all_order: function (state) {
            state.order_product = [];
            state.order_product_length = 0;
            // _.pullAllBy(state.order_product,product, product.product_id);
        },

        del_state: function (state) {
            state.s_product = [];
            state.l_product = [];
            state.l_pay = [];
            state.r_option = [];
            state.order_status = [];
            state.r_order_status_one = [];
            state.order_product = [];
            state.order_product_length = '';
            state.popup = '';
            state.term_all = '';
            state.term_pay = '';
            state.term_p_offer = '';
            state.term_p_collect = '';
            state.is_visible = true;
        },
        logout: function (state) {
            state.auto_login = '';
            state.is_login = false;
            state.is_sns_login = false;
            state.is_visible = true;
            state.l_pay = [];
            state.order_status = [];
        },
        addr: function (state, addr) {
            state.addr = addr;
        },
        select_category: function (state, select_category) {
            state.select_category = select_category;
        },
        minus_cnt: function (state, product_id) {
            //버그 같음  // 커밋하면 해당된 거 찾아서 바꿔줌 대신에 그전에 해당 Store를 짖접 바꿔줬음
            // _.forEach(state.order_product, function (o){
            //     if(o.product_id == product_id) {
            //         let unit_price = o.price / o.cnt;
            //         o.cnt -= 1;
            //         o.price = unit_price * o.cnt;
            //     }
            // });

        },
        add_cnt: function (state, product_id) {

            // _.forEach(state.order_product, function (o){
            //     if(o.product_id == product_id) {
            //         o.cnt += 1;
            //     }
            // });

        },
        login: function (state, payload) {
            state.user_id = payload.user_id;
            // state.password = payload.password;
            state.auto_login = payload.auto_login;
            state.is_login = payload.is_login;

        },
        // password: function(state, password) {
        //   state.password = password;
        // },
        term_all: function (state, term_all) {
            state.term_all = term_all;
        },
        term_p_collect: function (state, term_p_collect) {
            state.term_p_collect = term_p_collect;
        },
        term_p_offer: function (state, term_p_offer) {
            state.term_p_offer = term_p_offer;
        },
        term_pay: function (state, term_pay) {
            state.term_pay = term_pay;
        },

        store_group_category: function (state, store_group_category) {
            state.store_group_category = store_group_category;
        },
        auction_event: function (state, auction_event) {
            state.auction_event = auction_event;
        },
        basket_tab: function (state, basket_tab) {
            state.basket_tab = basket_tab;
        },

        loading: function (state, loading) {
            state.loading = loading;
        },
        home_tab: function (state, home_tab) {
            state.home_tab = home_tab;
        },
        sum_price: function (state, sum_price) {
            state.sum_price = sum_price;
        },
        app_ver: function (state, app_ver) {
            state.app_ver = app_ver;
        },
        u_name: function (state, u_name) {
            state.u_name = u_name;
        },
        toast: function (state, toast) {
            state.toast = toast;
        },
        l_coupon: function (state, l_coupon) {
            state.l_coupon = l_coupon;
        },
        l_user_coupon: function (state, l_user_coupon) {
            state.l_user_coupon = l_user_coupon;
        },
        coupon_obj: function (state, coupon_obj) {
            state.coupon_obj = coupon_obj;
        },
        address_input_coupon_id: function (state, address_input_coupon_id) {
            state.address_input_coupon_id = address_input_coupon_id;
        },
        setLanguage: function (state, lang) {
            state.curLanguage = lang;
        },
        is_home: function (state, is_home) {
            state.is_home = is_home;
        },
        is_select_store: function (state, is_select_store) {
            state.is_select_store = is_select_store;
        },
    },
    actions: {
        u_review_status: function (context, params) {
            return axios({
                method: 'get',
                params: params,
                url: api_url + 'u_review_status',
                responseType: 'json',
            });
        },
        r_review: function (context, params) {
            return axios({
                method: 'get',
                params: params,
                url: api_url + 'r_review',
                responseType: 'json',
            });
        },
        l_review: function (context, params) {
            return axios({
                method: 'get',
                params: params,
                url: api_url + 'l_review',
                responseType: 'json',
            });
        },
        cu_review: function (context, params) {
            return axios({
                method: 'post',
                params: params,
                url: api_url + 'cu_review',
                responseType: 'json',
            });
        },

        settle_app_pay: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: 'https://pg.settlebank.co.kr/card/NoAuthCardAction.do',
                    responseType: 'json',
                    headers: { "Access-Control-Allow-Origin": "*" },
                })
                    .then(function (res) {
                        //console.log("settle_app_pay res:", res.data);
                        resolve(res.data);
                    });
            })
        },

        l_product: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'l_product',
                    responseType: 'json',
                })
                    .then(function (res) {
                        context.commit('title', res.data.store.store_name);
                        if (context.state.order_product_length > 0 && context.state.order_product[0].product.store_id != res.data.store.store_id) {
                            //console.log('state init!!!!');
                            context.commit('del_state');
                        }

                        context.commit('l_product',
                            {
                                l_product: res.data.product,
                                store: res.data.store
                            });
                        // context.state.l_product = res.data.product;
                        // context.state.store = res.data.store;

                        resolve(res.data.store);
                    });
            })
        },
        r_option: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'r_option',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("server res:", res.data);
                        resolve(res.data)
                    });
            })
        },

        l_order_rcv: function (context, params) {
            //console.log('order_status params :',params);
            axios({
                method: 'get',
                params: params,
                url: api_url + 'l_order_rcv',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);
                    // context.state.order_status = res.data;
                    if (res.data === []) {
                        context.commit('order_status', {
                            status: []
                        });
                    }
                    else {
                        context.commit('order_status', res.data);
                    }
                });
        },

        l_order_rcv_one: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'l_order_rcv_one',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("r_order_status_one res:", res.data[0]);
                        context.commit('r_order_status_one', res.data[0]);
                        resolve(res.data[0]);
                        // context.state.r_order_status_one = res.data[0];

                    });
            })
        },

        order_status: function (context, params) {
            //console.log('order_status params :',params);
            axios({
                method: 'get',
                params: params,
                url: api_url + 'order_status',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);
                    // context.state.order_status = res.data;
                    context.commit('order_status', res.data);
                });
        },
        order_status2: function (context, params) {
            //console.log('order_status params :',params);
            axios({
                method: 'get',
                params: params,
                url: api_url + 'order_status2',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);
                    // context.state.order_status = res.data;
                    context.commit('order_status', res.data);
                });
        },

        c_sns_user: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'c_sns_user',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("c_sns_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },

        r_receipt: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'r_receipt',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("r_receipt res:", res.data);
                        //console.log('login Success',res.data.data.user_id);
                        // context.commit('r_receipt',res.data);

                        resolve(res.data);

                    });
            });
        },

        f_c_store_bell: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'f_c_store_bell',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("f_c_store_bell res:", res.data);
                        //console.log('login Success',res.data.data.user_id);
                        // context.commit('r_receipt',res.data);

                        resolve(res.data);

                    });
            });
        },

        login: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'login',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("login res:", res.data);


                        if (res.data.result == 'SUCCESS') {
                            //console.log('login Success',res.data.data.user_id);
                            context.commit('login',
                                {
                                    user_id: res.data.data.user_id,
                                    password: params.password,
                                    auto_login: params.auto_login,
                                    is_login: true,
                                });
                        }
                        resolve(res.data);

                    });
            });
        },
        u_pw: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'u_pw',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("login res:", res.data);

                        resolve(res.data);

                    });
            });
        },
        u_pw2: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'u_pw2',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("login res:", res.data);

                        resolve(res.data);

                    });
            });
        },
        u_user_phone: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'u_user_phone',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("login res:", res.data);

                        resolve(res.data);

                    });
            });
        },
        c_user_web: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'c_user_web',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("c_user res:", res.data);

                        if (res.data.result == 'SUCCESS') {

                            // context.state.user_id = params.user_id;

                            context.commit('user_id', params.user_id);

                        }
                        resolve(res.data);

                    });
            });
        },
        u_user: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'u_user',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },
        cu_user_auth: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'cu_user_auth',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },
        cu_user_auth2: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'cu_user_auth2',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },

        cu_user_auth_new: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'cu_user_auth_new',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },

        r_user_auth: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'r_user_auth',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);
                        resolve(res.data);

                    });
            });
        },


        r_user: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'r_user',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);

                        resolve(res.data);

                    });
            });
        },

        f_user_store_bell: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'f_user_store_bell',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("u_user res:", res.data);

                        resolve(res.data);

                    });
            });
        },

        // r_order_status_one: function(context, params) {
        //   return new Promise((resolve, reject) => {
        //     axios({
        //         method: 'get',
        //         params: params,
        //         url: api_url +'r_order_status_one',
        //         responseType: 'json',
        //       })
        //       .then(function(res) {
        //         //console.log("r_order_status_one res:", res.data[0]);
        //         context.commit('r_order_status_one', res.data[0]);
        //         console.log(res.data[0]);
        //         resolve(res.data[0]);
        //         // context.state.r_order_status_one = res.data[0];

        //       });
        //   })
        // },
        r_order_status_one2: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'r_order_status_one2',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("r_order_status_one res:", res.data[0]);
                        context.commit('r_order_status_one', res.data[0]);
                        resolve(res.data[0]);
                        // context.state.r_order_status_one = res.data[0];

                    });
            })
        },


        u_order_cancel_req: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: api_url + 'u_order_cancel_req',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("u_order_cancel_req res:", res);
                        resolve(res.data);
                    });
            })
        },
        c_order: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: api_url + 'c_order',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // alert(res.data)
                        resolve(res.data);
                    });
            })
        },
        c_order2: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: api_url + 'c_order2',
                    responseType: 'json',
                })
                    .then(function (res) {
                        //console.log("server res:", res.data);
                        resolve(res.data);
                    });
            })
        },

        kg_spay: function (context, params) {
            axios({
                // config: { headers: {'Content-Type': 'multipart/form-data' }},
                method: 'post',
                params: params,
                url: api_url + 'c_order',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);
                });
        },
        l_pay: function (context, params) {
            axios({
                // config: { headers: {'Content-Type': 'multipart/form-data' }},
                method: 'post',
                params: params,
                url: api_url + 'l_pay',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);

                    context.commit('l_pay', res.data);
                });
        },
        f_address: function (context, params) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: api_url + 'f_address',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("f_address res:", res.data);
                        resolve(res.data);
                    });
            });
        },
        ou_r_auction: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: "https://3.34.149.33/app50/ou_r_auction",
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log(res.data)
                        context.commit('auction_event', res.data)
                        resolve('성공')
                    })
            })
        },
        ou_c_auction_bid: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: "https://3.34.149.33/app50/ou_c_auction_bid",
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log(res.data)
                        resolve(res.data);
                    })
            })
        },
        ou_c_user_msg: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    params: params,
                    url: "https://3.34.149.33/app50/ou_c_user_msg",
                    responseType: 'json'
                })
                    .then(function (res) {
                        resolve(res.data)
                    })
            })
        },

        l_coupon: function (context, params) {
            axios({
                // config: { headers: {'Content-Type': 'multipart/form-data' }},
                method: 'post',
                params: params,
                url: api_url + 'l_coupon',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);

                    context.commit('l_coupon', res.data);
                });
        },

        l_user_coupon: function (context, params) {
            axios({
                // config: { headers: {'Content-Type': 'multipart/form-data' }},
                method: 'post',
                params: params,
                url: api_url + 'l_user_coupon',
                responseType: 'json',
            })
                .then(function (res) {
                    //console.log("server res:", res.data);

                    context.commit('l_user_coupon', res.data);
                });
        },

        c_user_coupon: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: api_url + 'c_user_coupon',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("server res:", res.data);
                        resolve(res.data);
                    });
            })
        },

        l_store: function (context, params) {
            return new Promise((resolve, reject) => {
                axios({
                    // config: { headers: {'Content-Type': 'multipart/form-data' }},
                    method: 'post',
                    params: params,
                    url: api_url + 'l_store',
                    responseType: 'json',
                })
                    .then(function (res) {
                        // console.log("server res:", res.data);
                        resolve(res.data);
                    });
            })
        },

    }

});

export default store
