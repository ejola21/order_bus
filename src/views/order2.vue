<template>
<div class="order2">
    <div class="order21">
      <div class="ordoer_card_div">
        <img v-if="cd4.length > 4" @click="get_cd_no()" width="100%" src="../assets/img/setCard.png" />
        <img v-else width="100%" src="../assets/img/emptyCard.png" />
      </div>
      <div class="card_input">
      <div class="cd_no_title">
          카드 번호
          <span v-if="cd4.length == 0" class="cd_desc_title">* 1회 결제시 카드가 저장됩니다.</span>
      </div>

      <div class="cd_no">
        <input class="cd1 input_card_box" v-model="cd_no1" type="tel" @keyup="cd_no1_onlyNum" maxlength="4"/>
        <input class="cd_pw input_card_box" v-model="cd_no2" type="tel" @keyup="cd_no2_onlyNum" maxlength="4" />
        <input class="cd_pw input_card_box" v-model="cd_no3" type="tel" @keyup="cd_no3_onlyNum" maxlength="4" />
        <input class="cd_last input_card_box" v-model="cd_no4" type="tel" @keyup="cd_no4_onlyNum" maxlength="4" />
      </div>

      <div class="cd_no_title">
          유효기간 Month/Year
      </div>

      <div class="cd_exp">
        <input class="exp_mon input_card_box" v-model="PExpMon" type="tel" @keyup="exp_mon_onlyNum" maxlength="2"/> <span>&nbsp;/&nbsp;</span>
        <input class="exp_year input_card_box" v-model="PExpYear" type="tel" @keyup="exp_year_onlyNum" maxlength="2" />
      </div>
      </div>
      <div v-if="parseInt(sum_price) >= 50000">
         <v-select class='mx-5' v-model="front_phone" outlined
          :items="h_items"
           item-text="title"
          item-value="value"
          label="할부">
         </v-select>

      </div>

      <div v-show="!auth_confirm" class="phone_insert">
        <div class="phone_insert_title">휴대폰 인증</div>
        <div class="phone_insert_data">
          <img v-show="back_phone.length != 0" @click="close_click" src="../assets/img/close.svg"/>
          <select class="phone_select" v-model="front_phone">
            <option>010</option>
            <option>011</option>
            <option>016</option>
            <option>017</option>
            <option>019</option>
          </select>
          <input class="phone_back_num" v-model="back_phone" type="tel" placeholder="00000000" @keyup="phone_num_custom" maxLength="8"/>
          <div class="number_submit">
              <div class="my-2">
                <v-btn large color="primary" @click="authClick">전송</v-btn>
              </div>
      
          </div>
        </div>
        <div class="auth_div">
          <div class="auth_input">
            <v-col cols="12" sm="6" md="3">
            <v-text-field  ref="f_auth_num" inputClass="_auth_num" full-width v-model="auth_num" type="tel" hintTextClass="j_hint" placeholder="인증번호"></v-text-field>
        </v-col>
      
            <span v-show="timeShow" class="time_3minute">{{min}}:{{second}}</span>
          </div>
          <div class="number_submit">
            <div class="my-2">
              <v-btn large color="primary" @click="confirm_auth">확인</v-btn>
            </div>  
      
          </div>
        </div>
      </div>

      
     <v-row align="center">
      <v-col class="text-center" cols="12" sm="4">
       <div class="my-2">
         <v-btn x-large color="primary" block v-on:click="send_check()" primary class="pay_btn">결제하기</v-btn>
       </div>
      </v-col>
     </v-row> 
      
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Crypto from '../assets/js/Crypto.js';

// import { VueMaskDirective } from 'v-mask'
// Vue.directive('mask', VueMaskDirective);


export default {

  data() {
    return {
      h_items: [
          { title: '일시불', value: '00' },
          { title: '2개월', value: '02' },
          { title: '3개월', value: '03' },
          { title: '4개월', value: '04' },
          { title: '5개월', value: '05' },
          { title: '6개월', value: '06' },
      ],
      cd_no1:'',
      cd_no2:'',
      cd_no3:'',
      cd_no4:'',
      PCardNo: '',
      PExpMon: '',
      PExpYear: '',
      user_pw: '',
      sb_nauth_id: '',
      amt: 0,
      order_no: '',
      product_name: '',
      product_id: '',
      reply_cd: '',
      reply_msg: '',
      buyer_name: '',
      front_phone: '010',
      back_phone:'',
      auth_num: '',
      user_phone_num: '',
      min: 3,
      sec: 0,
      second: '00',
      timer: true,
      timeShow: false,
      interval: null,
      pIntMon: '00',
      calcObj: ''
    }
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    cd1() {
      return this.$store.getters.cd1;
    },
    cd2() {
      return this.$store.getters.cd2;
    },
    cd3() {
      return this.$store.getters.cd3;
    },
    cd4() {
      return this.$store.getters.cd4;
    },
    c_m() {
      return this.$store.getters.c_m;
    },
    c_y() {
      return this.$store.getters.c_y;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    user_id() {
      return this.$store.getters.user_id;
    },

    auto_login() {
      return this.$store.getters.auto_login;
    },
    auth_confirm() {
      return this.$store.getters.auth_confirm;
    },
    // password() {
    //   return this.$store.getters.password;
    // },
    is_login() {
      return this.$store.getters.is_login
    },
    addr() {
      return this.$store.getters.addr;
    },
    basket_tab() {
      return this.$store.getters.basket_tab;
    },
    arrival_time_s() {
      return this.$store.getters.arrival_time_s;
    },
    user_phone() {
      return this.$store.getters.user_phone;
    },
    u_name () {
      return this.$store.getters.u_name;
    },
    coupon_obj() {
      return this.$store.getters.coupon_obj;
    },
    sum_price() {
      return this.$store.getters.sum_price;
    },
  },
  mounted () 
  {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);
    this.front_phone = this.user_phone.substring(0, 3)
    let back_num = this.user_phone.split(this.front_phone)[1]
    this.back_phone = back_num.substring(0, back_num.length)
    this.user_phone_num = this.front_phone + ""+ this.back_phone

    if (this.user_id != this.user_phone_num)
        this.$store.commit('auth_confirm', false);

    var container = document.getElementsByClassName("cd_no")[0];

    container.onkeyup = function(e) {

      var target = e.srcElement || e.target;
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;

      if (myLength >= maxLength) {
          if( target.getAttribute("class")) var aa = target.getAttribute("class");
          var next = target;


          if (aa == "cd_last")
          {
              document.getElementsByClassName("exp_mon")[0].focus();
          }

          while (next = next.nextElementSibling) {
              if (next == null)
              {
                //  console.log('next null');
                  break;
              }
              if (next.tagName.toLowerCase() === "input") {
                  next.focus();
                  break;
              }
          }
      }
      var container2 = document.getElementsByClassName("cd_exp")[0];
      container2.onkeyup = function(e)
      {

        var target = e.srcElement || e.target;
        var maxLength = parseInt(target.attributes["maxlength"].value, 10);
        var myLength = target.value.length;

        if (myLength >= maxLength)
        {
            if( target.getAttribute("class")) var aa = target.getAttribute("class");
            var next = target;


            if (aa == "exp_year")
            {
                //console.log('cd last null');
                document.getElementsByClassName("exp_year")[0].blur();

            }

            while (next = next.nextElementSibling) {
                if (next == null)
                {
                  //  console.log('next null');
                    break;
                }
                if (next.tagName.toLowerCase() === "input") {
                    next.focus();
                    break;
                }
            }
        }
      }

      // Move to previous field if empty (user pressed backspace)
      // else if (myLength === 0) {
      //   console.log('previous');
      //     var previous = target;
      //     while (previous = previous.previousElementSibling) {
      //         if (previous == null)
      //             break;
      //         if (previous.tagName.toLowerCase() === "input") {
      //             previous.focus();
      //             break;
      //         }
      //     }
      // }


    }

    
    let _this = this;

    this.calcObj = {
      pm: [],
      product_id: [],
      p_o_id1: [],
      p_o_id2: [],
      pm_o_id: [],
      price: [],
      cnt: [],
      memo: [],
      total_price: this.sum_price,
      coupon_id: '',
      user_seq: '',
      
      packing_sale: 0
    }

    
    if (this.user_id.substr(0, 1) !== '0') {
      this.calcObj.user_seq = this.user_id;
    }

    _.forEach(this.order_product, function(o) {
        _this.calcObj.pm.push(o.pm_o_id.toString());
        _this.calcObj.product_id.push(o.product.product_id);
        _this.calcObj.p_o_id1.push(o.p_o_id1);
        _this.calcObj.p_o_id2.push(o.p_o_id2);
        _this.calcObj.pm_o_id.push(o.pm_o_id);
        _this.calcObj.price.push(o.price);
        _this.calcObj.cnt.push(o.cnt);
        _this.calcObj.memo.push(o.memo);
      });

      if (this.coupon_obj != '') {

        this.calcObj.coupon_id = this.coupon_obj.coupon_id;
      }
 

      console.log('mmmmmmm',this.calcObj);

      //console.log(this.calcObj.total_price);
    


  },
  methods: {
    login_move() {
      this.$router.push('/login');
    },
    move_status() {
      this.$store.commit('popup', {
        'dialog': false
      });
      this.$router.push('/status/' + this.store.store_id + '/' + this.user_id);
    },
    get_cd_no(){
      // let crypto = new Crypto(this.$store.state.encryption_password);
      let crypto = new Crypto();

      this.cd_no1 = crypto.decrypt(this.cd1);
      this.cd_no2 = crypto.decrypt(this.cd2);
      this.cd_no3 = crypto.decrypt(this.cd3);
      this.cd_no4 = crypto.decrypt(this.cd4);
      this.PExpMon = crypto.decrypt(this.c_m);
      this.PExpYear = crypto.decrypt(this.c_y);
      this.PCardNo =  this.cd_no1 + this.cd_no2 + this.cd_no3 + this.cd_no4;
    },

    send_check(){
      this.PCardNo = this.cd_no1 + this.cd_no2 + this.cd_no3 + this.cd_no4;
      if (this.PCardNo.length < 15) {
        this.showToast("정확한 카드번호를(15자리이상) 입력하세요");
      } else if (this.PExpMon.length != 2) {
        this.showToast("정확한 유효기간 월을 입력하세요");
      } else if (this.PExpYear.length != 2 ) {
        this.showToast("정확한 유효기간 년을 입력하세요.");
      } else if (!this.auth_confirm) {
        this.showToast('휴대폰 인증을 해주세요.')
      } else
        this.pay_send();
    },
    pay_send() {

      let t_user_id = this.user_phone_num

      let address_obj = {
        address1: '',
        address_detail: ''
      }
      let table = this.table_id
      let packing_yn = ''
      let arrival_time = ''
      if (this.basket_tab == 'delivery') {
        address_obj.address1 = this.addr.address1
        address_obj.address_detail = this.addr.address_detail
        if (this.store.delivery_name_yn === 'Y') {
          address_obj.address_detail += ' ' + this.u_name;
        }
        table = 998
      } else if (this.basket_tab == 'packing') {
        table = 0
        packing_yn = 'Y'
        arrival_time = this.arrival_time_s
      }


      if (this.calcObj.total_price > 1000000 && this.store.store_id != 'dg500004') {
        //대구 책나무만 아니면 100만원 이하만 결제 되도록
        this.showToast('1,000,000원 초과시 주문 되지 않습니다.');
        return;
      }
      else if (this.calcObj.total_price > 3000000 && this.store.store_id == 'dg500004') {
        //대구 책나무만 300만원 이하만 결제 되도록
        this.showToast('3,000,000원 초과시 주문 되지 않습니다.');
        return;
      }
      
      let param = {
        'store_id': this.store.store_id,
        'cancel_yn': 'N',
        'user_id': t_user_id,
        'user_seq': this.calcObj.user_seq,
        // 'password': this.user_pw,
        'total_price': this.calcObj.total_price,
        'order_type': 'BEFORE',
        'web_app_gb': 'B2D',
        'table_id': table,
        'memo': this.calcObj.memo,
        'product_id': this.calcObj.product_id,
        'p_o_id1': this.calcObj.p_o_id1,
        'p_o_id2': this.calcObj.p_o_id2,
        'pm_o_id': this.calcObj.pm,
        'price': this.calcObj.price,
        'cnt': this.calcObj.cnt,
        'memo': this.calcObj.memo,
        'pg_store_id': this.store.sb_nauth_id,
        'store_name': this.store.store_name,
        'PCardNo': this.PCardNo,
        'PExpMon': this.PExpMon,
        'PExpYear': this.PExpYear,
        'pay_gb': 'NORMAL',
        'biz_dt': this.store.biz_dt,
        'address1': address_obj.address1,
        'address_detail': address_obj.address_detail,
        'packing_yn': packing_yn,
        'arrival_time' : arrival_time,
        'coupon_id': this.calcObj.coupon_id,
        'pIntMon': this.pIntMon,
      };

      this.$store.commit('loading', true);
      this.$store.dispatch('c_order', param)
        .then((res) => {
          this.$store.commit('loading', false);
          this.$store.commit('coupon_obj', '');

          if (res.result =='CLOSED')
          {
            alert('영업시간이 아닙니다. 직원에게 문의하세요');
            return;
          }
          else if (res.result == 'SOLD_OUT') {
            this.showToast( res.product_name + '재고가 소진 되었습니다. 다른 메뉴를 선택해주세요.');
            return;
          }
          // console.log('c_order dispatch',res.PStateCd, res.PRmesg1);

          if (res.PStateCd == '0021') {

            this.$store.commit('del_all_order');
            let crypto = new Crypto();
            this.$store.commit('cd1',crypto.encrypt(this.cd_no1));
            this.$store.commit('cd2',crypto.encrypt(this.cd_no2));
            this.$store.commit('cd3',crypto.encrypt(this.cd_no3));
            this.$store.commit('cd4',crypto.encrypt(this.cd_no4));
            this.$store.commit('c_m',crypto.encrypt(this.PExpMon));
            this.$store.commit('c_y',crypto.encrypt(this.PExpYear));
            this.$store.commit('user_id', this.user_phone_num)
          }

          this.$router.push('/pay_result/' + res.PStateCd + '/' +  res.PRmesg1 +'/SB');
          // this.p_result(res.PStateCd, res.PRmesg1, 'SB');
          // this.$store.commit('is_order_popup', true);
          // this.$router.push('/menu/'+ this.store.store_id + '/' + this.table_id);
        })
      
    },
    cd_no1_onlyNum(event) {
      this.$nextTick(() => {
        this.cd_no1 = this.cd_no1.replace(/[^0-9]/g,"")
      })
    },
    cd_no2_onlyNum(event) {
      this.$nextTick(() => {
        this.cd_no2 = this.cd_no2.replace(/[^0-9]/g,"")
      })
    },
    cd_no3_onlyNum(event) {
      this.$nextTick(() => {
        this.cd_no3 = this.cd_no3.replace(/[^0-9]/g,"")
      })
    },
    cd_no4_onlyNum(event) {
      this.$nextTick(() => {
        this.cd_no4 = this.cd_no4.replace(/[^0-9]/g,"")
      })
    },
    exp_mon_onlyNum(event) {
      this.$nextTick(() => {
        this.PExpMon = this.PExpMon.replace(/[^0-9]/g,"")
      })
    },
    exp_year_onlyNum(event) {
      this.$nextTick(() => {
        this.PExpYear = this.PExpYear.replace(/[^0-9]/g,"")
      })
    },
    close_click() {
      this.back_phone = ''
    },
    phone_num_custom(event) {
      this.$nextTick(() => {
        this.back_phone = this.back_phone.replace(/[^0-9]/g, "")
      })
    },

    authClick() {
      this.user_phone_num = this.front_phone + ""+ this.back_phone
      this.user_phone_num = this.user_phone_num.replace(/\s/gi,"")

      if (this.user_phone_num.length < 10)
        this.showToast("정확한 회원아이디(핸드폰번호)를 입력하세요");
      else {
        this.min = 3;
        this.sec = 0;
        this.second = '00';
        clearInterval(this.interval);
        this.$store.commit('loading', true);
        var param = {
          'user_id': this.user_phone_num
        };
        this.$store.dispatch('cu_user_auth_new', param)
          .then((res) => {
            this.$store.commit('loading', false);
            if (res.result == 'SUCCESS') {
              this.showToast("카카오톡 또는 SMS 로 메시지를 전송했습니다.");
              this.timeShow = true;
              this.timer = true;
              this.interval = setInterval(() => {
                if (this.min > 0) {
                  if (this.sec <= 10 && this.sec != 0) {
                    if (this.sec > 0) {
                      this.sec--;
                    }
                    this.second = '0' + this.sec;
                  }
                  else if (this.sec === 0) {
                    this.min--;
                    this.sec = 59;
                    this.second = this.sec;
                  }
                  else {
                    this.sec--;
                    this.second = this.sec;
                  }
                }
                else if (this.min === 0 && this.sec === 0) {
                  this.timer = false;
                  clearInterval(this.interval);
                }
                else if (this.sec > 10) {
                  this.sec--;
                  this.second = this.sec;
                }
                else {
                  this.sec--;
                  this.second = '0' + this.sec;
                }
              }, 1000);
              
            }
            else
              this.showToast(res.result);
        })
      }
    },
    confirm_auth() {
      this.user_phone_num = this.front_phone + ""+ this.back_phone
      this.user_phone_num = this.user_phone_num.replace(/\s/gi,"")
      // console.log(this.auth_num)
        if (!this.timer) {
          this.showToast('타이머 시간 안에 인증 해주세요.');
        } else {
          this.$store.commit('loading', true);
          var param = {
            'user_id': this.user_phone_num,
            'auth_num': this.auth_num
          };
          this.$store.dispatch('r_user_auth', param)
          .then((res) => {
            this.$store.commit('loading', false);
            this.showToast(res.result)
            if(res.result == '인증에 성공했습니다.') {
              clearInterval(this.interval);
              this.timeShow = false;
              this.$store.commit('auth_confirm', true);
            }
            this.$store.commit('user_phone', this.user_phone_num);
            this.$store.commit('user_id', this.user_phone_num);
            // console.log(this.user_phone_num)
          })
        }
    }
  }
}
</script>

<style scoped>
.o_label_title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>

<style scopped>

/* Transparent Overlay */
.cd_no_title{
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.cd_exp{
  display:flex;
  flex-direction:row;
  margin-bottom: 1rem;
}
.cd_exp>input{
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.cd_no{
  display:flex;
  flex-direction:row;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.cd_pw{
  -webkit-text-security: disc;
}

.cd1, .cd_pw, .cd_last, .exp_year, .exp_mon {
  border: 1px solid #8b8b8b;
  border-radius: 5px;
  width : 23%;
  padding: 0.3rem;
}

.o2_info {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgb(227, 242, 254);
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
  color: rgb(30, 30, 30);
}

.order2 {
  /* margin-top: 3.5rem; */
  background-color: white;
  /* padding: 1.5rem; */
  height: auto;
}

.order2>.order21>.ordoer_card_div>.save-card-num {
  border-radius: 10px;
}
.order2>.order21>.ordoer_card_div {
  text-align: center;
  padding: 2rem 4rem;
}

.save-card-num{
  margin:10px 0;
  color: white;
}
.pay_btn{
  /* padding: 1.7rem !important;
  margin-top: 1.4rem; */
  font-size: 1.2rem;
  font-weight: bold;
}


.cd_desc_title {
  color:#004DDF;
  font-size: .9rem;
}
.order21>.mu-text-field>.mu-text-field-content>.mu-text-field-hint {
  font-size: 0.8rem;
}
.input_card_box {
  line-height: 1.5rem;
}
.cd_exp>span {
  line-height: 1.5rem;
  padding-top: 0.2rem;
  font-size: 1.5rem;
}

.phone_insert {
  background-color: white;
  padding: 1rem;
  font-size: 0;
}
.phone_insert>.phone_insert_title {
  color: #474747;
  font-size: 1rem;
  font-weight: 900;
}

.phone_insert>.phone_insert_data>.phone_back_num {
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid #707070;
  height: 1.875rem;
  margin-left: 5%;
  width: 40%;
  border-radius: 0px;
  font-weight: 900;
}
.phone_insert_data {
  padding: .5rem 0;
  padding-top: 1rem;
  position:relative;
}
.phone_insert_data>img {
  position: absolute;
  right: 29%;
  bottom: 25%;
}
.phone_select {
  width: 25%;
  border: 0px solid white;
  -webkit-apprearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/img/under_arrow.svg) no-repeat 100% 50%;
  font-size: 1.2rem;
  border-bottom: 1px solid #707070;
  border-radius: 0px;
  text-align-last: center;
  padding-right: 7%;
  font-weight: 600;
  height: 1.875rem;
  font-weight: 900;
}
.number_submit {
  display: inline-block;
  margin-left: 2%;
  width: 27%;
  vertical-align: top;
  position: absolute;
  bottom: 10%;
  right: 0;
}
.number_submit>button {
  background-color: #00295a;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  height: 46px;
  border:0;
  outline:0;
  width: 100%;
  padding: 0 1rem;
}
.j_hint {
  font-weight: normal;
}
.auth_input {
  width: 68%;
  position: relative;
}
.time_3minute {
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: .5rem;
  right: 0;
}
.auth_div {
  position: relative;
}
.auth_div>.number_submit {
  position: absolute;
  right: 0;
  bottom: 26%;
}
.auth_div ._auth_num {
  font-size: 1.2rem;
  font-weight: bold;
}
.auth_div .j_hint {
  font-size: 1.2rem;
  font-weight: bold;
}
.none {
  display: none;
}
.theme--light.v-input input, .theme--light.v-input textarea {
    font-size: 1.2rem;
    font-weight: bold;
}
.card_input {
  border-top: 0.05rem solid lightgray;
  /* border-bottom: 0.05rem solid lightgray; */
  padding: 1rem;    
}
.v-btn:not(.v-btn--round).v-size--x-large {
    height: 52px;
    min-width: 92px;
    padding: 0 23.1111111111px;
    width: 90%;
}
.v-btn.v-size--x-large {
    font-size: 1.3rem;
    color: white;
}
.v-btn:not(.v-btn--round).v-size--large {
    height: 44px;
    min-width: 78px;
    padding: 0 19.5555555556px;
    width: 100%;
}
.v-btn.v-size--large {
    font-size: 1rem;
    color: white;
}
.col-sm-6.col-md-3.col-12 {
  padding: inherit;
}
.col-12 {
    padding-top: inherit;
}
</style>