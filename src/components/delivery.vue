<template>
<div class="delivery-container">
    
    <div class="address_info">

        <v-badge v-if="user_agent_chk" content="1" circle color="#0954ba" badgeClass="badge_size">
            <span class="phone_title">&nbsp;주소 입력</span>
        </v-badge>
        <v-badge v-else content="1" circle color="#0954ba" badgeClass="badge_size_other">
            <span class="phone_title">&nbsp;주소 입력</span>
        </v-badge>

        <div class="address_div" v-show="Object.keys(addr).length == 0">
           
            <div class="text-center">
                <v-btn  x-large label="배달 주소 등록" class="add_address" labelClass="address_text_btn" @click="address_add_click">
                <v-icon left>mdi-map-marker</v-icon>배달 주소 등록</v-btn>
            </div>
          
    
        </div>
        
        <div class="address_div" v-show="Object.keys(addr).length > 0">
            <div class="add_address_have" v-if="store.delivery_name_yn === 'Y'">
                <span class="doroname">{{addr.address1}}&nbsp;&nbsp;{{addr.address_detail}}&nbsp;&nbsp;{{u_name}}</span><div class="address_change" @click="address_add_click">변경</div>
            </div>
            <div class="add_address_have" v-else>
                <span class="doroname">{{addr.address1}}&nbsp;&nbsp;{{addr.address_detail}}</span><div class="address_change" @click="address_add_click">변경</div>
            </div>
            
        </div>

    </div>

    <div class="pay_select">
        <v-badge v-if="user_agent_chk" content="2" circle color="#0954ba" badgeClass="badge_size">
            <span class="pay_title">&nbsp;결제 수단 선택</span>
        </v-badge>
        <v-badge v-else content="2" circle color="#0954ba" badgeClass="badge_size_other">
            <span class="pay_title">&nbsp;결제 수단 선택</span>
        </v-badge>
        <div class="pay_check_prepayment">
            <div v-if="store.pay_yn == 'Y' && store.order_yn == 'Y'" @click="prepayment_click">
              <v-radio-group v-model="select_radio" hide-details>
                  <v-radio name="pay_type3" value="선불" label="선불"></v-radio>
                <!-- <mu-radio name="pay_type3" v-model="select_radio" labelClass="prepayment" label="선불" nativeValue="선불"/> -->
                <span :class="[{'prepayment_desc' : !user_agent}, {'mix_padding' : user_agent}]">&nbsp;&nbsp;(모바일로 미리 결제)</span>
              </v-radio-group>  
            </div>
            <div class="btn_box" v-show="select_radio == '선불'">
                <div class="card_pay" :class="{'select_pay' : select_pay == 0}" @click="default_card_click(0)">
                    <img class="icon_img" :src="select_pay == 0 ? img_s_card : img_n_card" width="23rem"/>
                    <span >신용/체크/법인카드</span>
                </div>
                <div class="appcard_pay" :class="{'select_pay' : select_pay == 1}" @click="card_select">
                    <img class="icon_img" :src="select_pay == 1 ? img_s_appcard : img_n_appcard" width="23rem"/>
                    <span>&nbsp;앱카드</span><span v-show="select_card != ''" class="card_select"></span>
                </div>
            </div>
            <div class="btn_box bottom_btn_box" v-if="is_android && store.store_id != 'dg500004'" v-show="select_radio == '선불'">
                <div class="samsung_pay right_margin" :class="{'select_pay' : select_pay == 2}" @click="default_card_click(2)">
                    <img class="sumsung_img" height="40rem" :src="select_pay == 2 ? img_s_samsung : img_n_samsung"/>
                </div>
                <div class="kakao_pay left_margin" :class="{'select_pay' : select_pay == 3}" @click="default_card_click(3)">
                    <img class="icon_img" :src="select_pay == 3 ? img_s_kakao : img_n_kakao" width="23rem" height="16.42rem"/>
                    <span>&nbsp;pay 카카오페이</span>
                </div>
            </div>
            <div class="btn_box bottom_btn_box" v-if="!is_android && store.store_id != 'dg500004'" v-show="select_radio == '선불'">
                <div class="kakao_pay" :class="{'select_pay' : select_pay == 3}" @click="default_card_click(3)">
                    <img class="icon_img" :src="select_pay == 3 ? img_s_kakao : img_n_kakao" width="23rem" height="16.42rem"/>
                    <span>&nbsp;pay 카카오페이</span>
                </div>
            </div>
            <div v-show="select_radio == '선불'">
              <!-- <span class="hana_card">&nbsp;&nbsp;하나카드는 신용카드, 앱카드 결제만 지원합니다.</span> -->
            </div>
            <v-divider class="hr_tag" shadowInset/>
        </div>
        <div v-if="store.order_yn == 'Y'" class="pay_check_postpay">
            <div @click="postpay_click">
              <v-radio-group v-model="select_radio" hide-details>
                <v-radio name="pay_type1" value="후불" label="후불"></v-radio>
                <!-- <mu-radio v-if="store.pay_yn == 'Y'" name="pay_type3" v-model="select_radio" labelClass="postpay" label="후불" nativeValue="후불"/> -->
                <span :class="[{'postpay_desc' : !user_agent}, {'mix_padding' : user_agent}]">&nbsp;&nbsp;(배달원에게 직접 결제)</span>
              </v-radio-group>  
                <div :class="[{'btn_box_order' : store.pay_yn != 'Y' && store.order_yn == 'Y'}, {'btn_box': store.pay_yn == 'Y'}]" v-show="select_radio == '후불'">
                    <div class="card_pay" :class="{'select_pay' : delivery_pay_gb == 'C'}" @click="card_cash_click('C')">
                        <img class="icon_img" :src="delivery_pay_gb == 'C' ? img_s_card : img_n_card" width="23rem"/>
                        <span>&nbsp;카드</span>
                    </div>
                    <div class="appcard_pay" :class="{'select_pay' : delivery_pay_gb == 'H'}" @click="card_cash_click('H')">
                        <img class="icon_img" :src="delivery_pay_gb == 'H' ? img_s_appcard : img_n_appcard" width="23rem"/>
                        <span>&nbsp;현금</span>
                    </div>
                </div>
                <v-divider class="hr_tag" shadowInset/>
            </div>
        </div>

    </div>

    <div class="insert_phone">
        <v-badge v-if="store.pay_yn == 'Y' && user_agent_chk" content="3" circle color="#0954ba" badgeClass="badge_size">
            <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge v-else-if="store.pay_yn == 'Y' && !user_agent_chk" content="3" circle color="#0954ba" badgeClass="badge_size_other">
            <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge v-else-if="store.pay_yn != 'Y' && user_agent_chk" content="3" circle color="#0954ba" badgeClass="badge_size">
            <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>
        <v-badge v-else content="3" circle color="#0954ba" badgeClass="badge_size_other">
            <span class="phone_title">&nbsp;휴대폰 번호 입력</span>
        </v-badge>

        <div class="phone_insert_data">
          <img v-show="back_phone.length != 0" @click="close_click" src="../assets/img/close.svg"/>
          <select class="phone_select" v-model="front_phone">
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="019">019</option>
          </select>
          <input class="phone_back_num" v-model="back_phone" type="tel" placeholder="00000000" @keyup="phone_num_custom" maxLength="8"/>
        </div>
    </div>

    <div v-show="select_radio == '선불'" class="order_btns">
        <div class="check_term">
              <div class="check-item-wrap">
                <div class="check-accept">위 내용을 확인하였으며 결제에 동의합니다.</div>
              </div>
              <div v-show="!check_term_hide">
                <v-divider class="hr_tag" shadowInset/>
                <div class="check-item-wrap">
                    <div class="check-desc" @click="termClick('term_pay')">전자금융거래 이용약관</div>
                </div>
                <div class="check-item-wrap">
                    <div class="check-desc" @click="termClick('term_p_collect')">개인정보의 수집 및 이용안내</div>
                </div>
                <div class="check-item-wrap">
                    <div class="check-desc" @click="termClick('term_p_offer')">개인정보 제공 및 위탁 안내</div>
                </div>
              </div>
            <div class="icon_arrow" @click="term_hide">
                <v-icon v-if="check_term_hide">mdi-chevron-down</v-icon>
                <v-icon v-else>mdi-arrow-up</v-icon>
     
            </div>
          </div>
      </div>
      
      
       <v-col cols="12" sm="6">
        <pay-btn v-show="select_radio == '선불'" @pay_go_click="pay_go_click" :btn_name="'결제하기 (배달)'"/>
        <v-btn x-large color="#043474" class="btn_order" v-show="select_radio == '후불'" label="주문하기 (배달)" @click="order_click" fullWidth  primary>주문하기 (배달)</v-btn>
      </v-col>
     



    <!-- <mu-dialog :open="dialog" @close="close" title="앱카드 선택" dialogClass="dialog_appcard" bodyClass="dialog_appcard_body" scrollable>

          <div class="app_card_help" >
              <span class="help_color">현대,삼성,NH</span>카드는 크롬 브라우저에서 지원 안함
              <span class="help_color">신용카드 결제추천!</span>
          </div>
         <mu-divider/>
         <mu-menu  @change="card_change" :value="card_gb">
            <mu-menu-item value="1001/BC카드" title="BC카드"/>
            <mu-menu-item value="1002/국민카드" title="국민카드"/>
            <mu-menu-item value="1003/하나카드" title="하나카드"/>
            <mu-menu-item value="1004/삼성카드" title="삼성카드"/>
            <mu-menu-item value="1005/신한카드" title="신한카드"/>
            <mu-menu-item value="1007/우리카드" title="우리카드"/>
            <mu-menu-item value="1008/현대카드" title="현대카드"/>
            <mu-menu-item value="1020/롯데카드" title="롯데카드"/>
            <mu-menu-item value="1015/NH카드" title="NH카드"/>
            <mu-menu-item value="1018/전북카드" title="전북카드"/>
            <mu-menu-item value="1026/씨티카드" title="씨티카드"/>
            <mu-menu-item value="1017/광주카드" title="광주카드"/>
            <mu-menu-item value="1012/수협카드" title="수협카드"/>
         </mu-menu>
         <mu-raised-button primary label="선택" @click="card_check('APPCARD')" slot="actions"/>
       </mu-dialog> -->
</div>
</template>

<script>
/* eslint-disable */
// import orderBtn from '../components/orderBtn';
import payBtn from '../components/payBtn';
export default {
  name: "delivery",
  components: {
    // orderBtn,
    payBtn,
  },
  computed: {
    store() {
      return this.$store.getters.store;
    },
    user_id() {
      return this.$store.getters.user_id;
    },
    user_phone() {
      return this.$store.getters.user_phone;
    },
    is_android() {
        return this.$store.getters.is_android;
    },
    table_id() {
      return this.$store.getters.table_id;
    },
    order_product() {
      return this.$store.getters.order_product;
    },
    addr(){
      return this.$store.getters.addr
    },
    total_price() {
      var _price = 0;
      _.forEach(this.order_product, function(value, key) {
        //console.log('value : ', value, value.price, key);
        _price = _price + parseInt(value.price);
      });
      let coupon = this.$store.getters.coupon_obj;
      
      if (coupon != '' && coupon.coupon_type === 'P') {
        _price -= parseInt(coupon.amt);
      }
      else if (coupon != '' && coupon.coupon_type === 'R') {
        _price -= _price * (coupon.amt / 100);
        _price /= 100;
        _price = Math.ceil(_price) * 100;
        // 100단위 올림
      }

      if(this.store.delivery_amt)
        this.delivery_total_amt = _price + parseInt(this.store.delivery_amt)
      else
        this.delivery_total_amt = _price
      return _price;
    },
    u_name () {
      return this.$store.getters.u_name;
    },
    coupon_obj() {
      return this.$store.getters.coupon_obj;
    },
    cost() {
      var _price = 0;
      _.forEach(this.order_product, function(value, key) {
        //console.log('value : ', value, value.price, key);
        _price = _price + parseInt(value.price);
      });
      return _price;
    },
  },
  data() {
      return {
          front_phone: '',
          back_phone: '',
          select_radio: '선불',
          toast:false,
          toast_msg: '',
          img_n_card: require('../assets/img/n_card.svg'),
          img_s_card: require('../assets/img/s_card.svg'),
          img_n_appcard: require('../assets/img/n_appcard.svg'),
          img_s_appcard: require('../assets/img/s_appcard.svg'),
          img_n_samsung: require('../assets/img/n_samsung.svg'),
          img_s_samsung: require('../assets/img/s_samsung.svg'),
          img_n_kakao: require('../assets/img/n_kakao.svg'),
          img_s_kakao: require('../assets/img/s_kakao.svg'),


          dialog: false,
          card_gb: '',
          select_card: '',
          select_pay: '0',
          delivery_pay_gb: 'C',
          check_term_hide: true,
          pay_gb: 'NORMAL',
          pay_go: false,
          params: {},
          delivery_total_amt: 0,
          user_agent: '',
          user_agent_chk: '',
      }
  },
  mounted() {
    if (navigator.userAgent.match(/SM|iPhone/i))
        this.user_agent_chk = true;
    else
        this.user_agent_chk = false;
    
    // console.log(this.store.delivery_amt != 0)
    this.user_agent = navigator.userAgent.match('MIX')
    if(this.store.pay_yn == 'Y' && this.store.order_yn == 'Y') {
        this.select_radio = '선불'
    }
    else if (this.store.pay_yn == 'Y') {
      this.select_radio = '선불'
    }
    else {
      this.select_radio = '후불'
    }

    if (this.user_id.length > 9 ) {
      this.front_phone = this.user_id.substring(0, 3)
      let back_num = this.user_id.split(this.front_phone)[1]
      this.back_phone = back_num.substring(0, back_num.length)
    }

    else if(this.user_phone != '' && this.user_id.length < 9   || this.user_phone != '') {
      this.front_phone = this.user_phone.substring(0, 3)
      let back_num = this.user_phone.split(this.front_phone)[1]
      this.back_phone = back_num.substring(0, back_num.length)
    }
    else {
      this.front_phone = '010'
    }
    // console.log(this.front_phone)

  },
  methods: {
    hideToast() {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },

    close_click() {
      this.back_phone = ''
    },
    phone_num_custom(event) {
      this.$nextTick(() => {
        this.back_phone = this.back_phone.replace(/[^0-9]/g, "")
      })
    },
    termClick(gb) {
        this.$router.push('/'+gb);
    },

    address_add_click() {
      if (this.coupon_obj != '') {
        this.$store.commit('address_input_coupon_id', this.coupon_obj.coupon_id);
      }
      this.$router.push('/address');
    },

    card_check(gb){
      if (this.card_gb == '' || !this.card_gb.match('/'))
        this.showToast('카드선택을 하세요');
      else {
          this.pay_gb = gb
          let card_ = this.card_gb
          this.card_gb = card_.split('/')[0]
          this.select_card = card_.split('/')[1];
          this.dialog = false;
          this.select_pay = '1'
      }

    },

    card_change(card) {
      this.card_gb = card;
    },

    card_select() {
    //   this.dialog = true;
        this.select_pay = '1';
        this.pay_gb = 'APPCARD';
    },
    close() {
      this.dialog = false
    },
    card_cash_click(value) {
      this.delivery_pay_gb = value
    },
    default_card_click(value) {
        this.select_pay = value;
        if (value == 0) {
            this.card_gb = ''
            this.select_card = ''
            this.pay_gb = 'NORMAL'
        }
        else if (value == 2) {
            this.card_gb = ''
            this.pay_gb = 'SSPAY'
        }
        else if (value == 3) {
            this.card_gb = ''
            this.select_card = ''
            this.pay_gb = 'KAKAO'
        }
    },
    term_hide() {
        this.check_term_hide = !this.check_term_hide
    },
    pay_go_click() {
        let phone_num = this.front_phone + '' + this.back_phone
        if (this.store.min_delivery_amt && this.store.min_delivery_amt > this.cost) {
          this.showToast('최소 배달 금액보다 주문 금액이 작습니다.')
        }
        else if (Object.keys(this.addr).length == 0) {
          this.showToast('배달 주소를 입력하세요');
        }
        else if (phone_num.length < 10 || phone_num == '') {
          this.showToast('휴대폰 번호를 확인하세요.')
        }
        else if (this.u_name === '' && this.store.delivery_name_yn === 'Y') {
          this.showToast('배달 주소 변경을 눌러 이름을 입력해주세요');
        }
        else {
          let address_detail_chk = this.addr.address_detail;
          if (this.store.delivery_name_yn === 'Y') {
            address_detail_chk += ' ' + this.u_name;
          }
          this.params = {
              pay_gb: this.pay_gb,
              card_gb: this.card_gb,
              phone: this.front_phone + '' + this.back_phone,
              arrival_time: '',
              packing_yn: '',
              address1: this.addr.address1,
              address_detail: address_detail_chk,
              table_id: 998
          }
          this.$store.commit('user_phone', this.front_phone + '' + this.back_phone);
          this.$children[this.$children.length - 2].pay_send(this.params);
        }
    },
    order_click() {
        let phone_num = this.front_phone + '' + this.back_phone

        if (this.store.min_delivery_amt && this.store.min_delivery_amt > this.cost) {
          this.showToast('최소 배달 금액보다 주문 금액이 작습니다.')
        }
        else if (Object.keys(this.addr).length == 0) {
          this.showToast('배달 주소를 입력하세요')
        }
        else if (phone_num.length < 10 || phone_num == '') {
          this.showToast('휴대폰 번호를 확인하세요.')
        }
        else if (this.u_name === '' && this.store.delivery_name_yn === 'Y') {
            this.showToast('배달 주소 변경을 눌러 이름을 입력해주세요');
        }
        else {
          this.order_send2()
        }

    },
    order_send2() {

        let pm = [];
        let product_id = [];
        let p_o_id1 = [];
        let p_o_id2 = [];
        let pm_o_id = [];
        let price = [];
        let cnt = [];
        let memo = [];
        let total_price = 0;
        let pay_gb = '';
        let coupon_id = '';
        let user_seq = '';

        if (this.user_id.substr(0, 1) !== '0') {
          user_seq = this.user_id;
        }

        _.forEach(this.order_product, function(o) {
            pm.push(o.pm_o_id.toString());
            product_id.push(o.product.product_id);
            p_o_id1.push(o.p_o_id1);
            p_o_id2.push(o.p_o_id2);
            pm_o_id.push(o.pm_o_id);
            price.push(o.price);
            total_price += parseInt(o.price);
            cnt.push(o.cnt);
            memo.push(o.memo);
        });

        if (this.coupon_obj != '') {
          if (this.coupon_obj.coupon_type === 'P') {
            total_price -= parseInt(this.coupon_obj.amt);
          }
          else if (this.coupon_obj.coupon_type === 'R') {
            total_price -= total_price * (this.coupon_obj.amt / 100);
            total_price /= 100;
            total_price = Math.ceil(total_price) * 100;
            //100단위 올림
          }
          coupon_id = this.coupon_obj.coupon_id;
        }

        let tmp_user_id = this.front_phone+''+this.back_phone

        if(this.store.delivery_amt != 0) {
          total_price += parseInt(this.store.delivery_amt)
        }
        let address_detail_chk = this.addr.address_detail;
        if (this.store.delivery_name_yn === 'Y') {
          address_detail_chk += ' ' + this.u_name;
        }



        let param = {
            'store_id': this.store.store_id,
            'cancel_yn': 'N',
            'user_id': tmp_user_id,
            'user_seq': user_seq,
            'total_price': total_price,
            'order_type': 'AFTER',
            'table_id': 998,
            'memo': memo,
            'product_id': product_id,
            'p_o_id1': p_o_id1,
            'p_o_id2': p_o_id2,
            'pm_o_id': pm,
            'price': price,
            'cnt': cnt,
            'memo': memo,
            'pay_gb': 'ORDER',
            'biz_dt': this.store.biz_dt,
            'address1': this.addr.address1,
            'address_detail': address_detail_chk,
            'web_app_gb': 'A2D',
            'delivery_pay_gb': this.delivery_pay_gb,
            'coupon_id': coupon_id
            // 'card_yn': this.card_yn
        };

        this.$store.commit('loading', true);
        this.$store.dispatch('c_order2', param)
        .then((res) => {
            this.$store.commit('loading', false);
            this.$store.commit('coupon_obj', '');
            if (res.result == 'CLOSED') {
              this.showToast('영업시간이 아닙니다. 직원에게 문의하세요');
              return;
            }
            else if (res.result == 'BLOCK_USER') {
              this.showToast("잘못된 접근입니다.(BLOCK)");
              return;
            }
            else if (res.result == 'FAIL') {
              this.showToast('통신 에러 입니다. 다시 시도 하세요');
              return;
            }
            else if (res.result == 'SOLD_OUT') {
              this.showToast( res.product_name + '재고가 소진 되었습니다. 다른 메뉴를 선택해주세요.');
              return;
            }
            else if (res.result == 'SUCCESS') {

            this.$store.commit('user_id', res.user_id);

            //sns id 회원가입만 한경우 입력된 전화번호로 올릴것인가?
            // if (this.user_id.substr(0,1)  == 'K' && tmp_user_id.length > 2 )
            //    this.$store.commit('user_id', tmp_user_id);
            this.$store.commit('del_all_order');
            // this.$router.push('/status/' + this.store.store_id + '/' + this.user_id);
            this.$router.push('/order_result');

            // this.$store.commit('is_order_popup', true);
            // this.$router.push('/menu/'+ this.store.store_id + '/' + this.table_id);
            }

        })



    },
    postpay_click() {
        this.select_radio = '후불'
    },
    prepayment_click() {
        this.select_radio = '선불'
    },

  }
}
</script>

<style scoped>
.delivery-container {
    background-color: #f1f1f1;
}
.badge_size {
    font-size: 1.1rem;
    font-weight: bold;
}
.pay_title, .phone_title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-left: 1.875rem;
}
.pay_check_prepayment {
    position: relative;
    /* padding: 1rem 0; */
    padding-bottom: 0.5rem;
}
.prepayment, .postpay {
    font-size: 1.1rem;
    font-weight: bold;
}
.v-input--selection-controls {
    margin-top: 0.5rem;
    padding-top: 4px;
    font-weight: bold;
}
.prepayment_desc, .postpay_desc {
    position: absolute;
    font-size: 1rem;
    margin-left: 4.5rem;
    font-weight: bold;
}
.mix_padding {
    /* 중국폰만 이상하게 먹어서 혼자 css먹임 */
    position: absolute;
    padding-top: .0001rem;
    font-size: 1rem;
}
.total_price {
    padding: 1rem;
    background-color: white;
    border-bottom: 1px #bbbbbb solid;
}
.delivery-container>.insert_phone, .delivery-container>.pay_select {
    margin-top: .5rem;
    background-color: white;
    padding: 1rem;
    border-top: 1px #bbbbbb solid;
    border-bottom: 1px #bbbbbb solid;
}
.address_info {
  background-color: white;
  padding: 1rem;
  border-bottom: 1px #bbbbbb solid;
}
.phone_insert_data>.phone_back_num {
  font-size: 1.4rem;
  border: none;
  border-bottom: 1px solid #707070;
  height: 2.2rem;
  margin-left: 5%;
  padding-left: 5%;
  width: 68%;
  border-radius: 0px;
  font-weight: 900;
}
.phone_insert_data {
  padding: .5rem 0;
  position:relative;
}
.phone_insert_data>img {
  position: absolute;
  right: 0;
  bottom: 25%;
}
.phone_select {
  width: 24%;
  border: 0px solid white;
  -webkit-apprearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/img/under_arrow.svg) no-repeat 100% 50%;
  font-size: 1.4rem;
  border-bottom: 1px solid #707070;
  border-radius: 0px;
  text-align-last: center;
  padding-right: 7%;
  font-weight: 600;
  height: 2.2rem;
  font-weight: 900;
}
.select::-ms-expand {
  display: none;
}
.hr_tag {
    background-color: #bbbbbb;
    margin-top: 5px;
}
.check_term>.hr_tag {
    margin-bottom: .5rem;
}

.address_info {
    padding-bottom: 0;
}
.v-btn:not(.v-btn--round).v-size--x-large {
    height: 52px;
    min-width: 92px;
    width: 100%;
    border: 0.1rem solid gray;
}
.check_term {
  padding: .5rem 1rem;
  background-color: #f1f1f1;
  /* border-bottom: 1px solid #bbbbbb; */
  position: relative;
}
.check-item-wrap {
  display: table;
}
.check-desc {
  color: #474747;
  border-bottom: 1px solid #474747;
  margin: .5rem;
}
.check-accept, .check-desc {
  font-size: .9rem;
}
.check-accept {
  font-size: 1rem;
  color:#8a8a8a;
  margin: .5rem;
}
.icon_arrow {
    position:absolute;
    right: .5rem;
    top: .5rem;
}

.btn_box {
    display: flex;
    padding: 1rem 0;
}
.btn_box_order {
    display: flex;
    padding: 1rem 0;
    padding-top: 2rem;
}
.card_pay, .appcard_pay {
    border: 2px solid #8a8a8a;
    padding:1rem .5rem;
    width: 48%;
    text-align: center;
}
.samsung_pay {
    text-align: center;
    width: 48%;
    border:2px solid #8a8a8a;
    height: 3.4rem;
}
.samsung_pay>img {
    margin: 5px;
}
.kakao_pay {
    text-align: center;
    width: 48%;
    border:2px solid #8a8a8a;
    height: 3.4rem;
    padding: 1rem .5rem;
}
.card_pay {
    margin-right: 2%;
}
.appcard_pay {
    margin-left: 2%;
}
.card_pay>span, .appcard_pay>span, .samsung_pay>span, .kakao_pay>span {
    color: #8a8a8a;
    font-weight: bold;
    font-size: 3vw;
}
.card_icon {
    font-size: 5vw;
    vertical-align: middle;
    color: #8a8a8a;
}
.appcard_pay>.card_select {
    color: red;
}

.select_pay {
    border: 2px solid #0856c3;
}
.select_pay>.card_icon {
    color:#0856c3;
}
.select_pay>span {
    color:#0856c3;
}

.dialog_appcard {
  background-color: #ffffff;
  max-height: 30rem !important;
  height: 28rem;
}
.dialog_appcard_body {
  color: rgba(0, 0, 0, 0.6);
  max-height: 19rem !important;
}
.bottom_btn_box {
    padding-top: 0;
}
.icon_img {
    vertical-align: middle;
}

.address_div {
  background-color: white;
  padding: 1rem 0;
}
.delivery-container>.address_info>.address_div>.add_address {
  background-color: #f9f9f9;
  color: #bbbbbb;
  border: solid 2px #8a8a8a;
  border-radius: 10px;
  padding: 2rem;
}
.add_address_have {
  background-color: #f9f9f9;
  color: #474747;
  border-radius: 10px;
  padding: 1rem 1rem;
  font-size: 1rem;
  border: solid 1px #8a8a8a;
  font-weight: 500;
  position: relative;
}
.address_div>.add_address_have>.doroname {
  width: 71vw;
}
.doroname {
  display: inline-block;
}
.address_div>.add_address>.mu-raised-button-wrapper>.address_text_btn {
  font-size: 1.5rem;
  color:#bbbbbb;
}
.address_change {
  color: #0856c3;
  /* border-bottom: 1px solid #0856c3; */
  display: inline-block;
  max-width:10%;
  z-index: 5;
  right: 5%;
  position: absolute;
}
.total_price_money, .delivery_money, .total_pay_money {
    padding: .25rem 0;
    font-size: 1rem;
    color: #474747;
}
.total_pay_money {
    padding-top: 1rem;
    color:#0856c3;
}
.total_pay_money_span {
    color: #0856c3;
    font-size: 1.2rem;
}
.delivery_money_span, .total_price_money_span, .total_pay_money_span {
    float: right;
}

.address_div>.add_address>.mu-raised-button-wrapper>i {
    color: #bbbbbb;
}
.delivery-container>.btn_order, .delivery-container>.btn_pay {
    height: 4rem;
}
.pay_check_postpay {
    position: relative;
}

.left_margin {
    margin-left: 2%;
}
.right_margin {
    margin-right: 2%;
}

/* 하나카드 결제 관련 문구 때문에 만듬. 해결되면 삭제 */
/* .hana_card {
    display:table;
    margin-left: auto;
    margin-right: auto;
    color: #0856C3;
    font-weight: bold;
} */
.btn_order {
  color: white;
  font-size: 1.3rem;
}
.btn_order2 {
  color: white;
  font-size: 1.3rem;
}
.add_address {
  color: #bbbbbb;
}
</style>