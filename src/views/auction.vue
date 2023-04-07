<template>
 <div class="auction_container">
  <div v-if="auction_event.status == 'NOT_FOUND'" class="no_auction_div">
    <img src="../assets/img/no_auction.svg" width="60%"/>
  </div>
  <div v-else-if="auction_event.status != 'NOT_FOUND'" class="auction_div">
    <div class="img_div">
      <img :src="auction_event.auction[0].img_url"/>
      <div class="price_div">
        <span v-if="auction_event.status == 'ING'">판매가 {{formatPrice(auction_event.auction[0].price, 'default')}}원</span>
        <span v-else-if="auction_event.status == 'END'">종료된 경매입니다.</span>
      </div>
    </div>
    <div class="auction_desc">
      <div class="auction_desc_title">
        <span>{{auction_event.auction[0].product_name}}</span>
      </div>
      <div class="auction_start_amt">
        <span v-if="auction_event.status == 'ING'">{{formatPrice(auction_event.auction[0].min_amt, 'default')}}원 부터</span>
      </div>
    </div>
    <div class="auction_time">
      <div class="auction_time_title">
        <span>경매시간</span>
      </div>
      <div class="auction_time_desc">
        <span>{{auction_event.auction[0].st_time}} ~ {{auction_event.auction[0].ed_time}}</span>
      </div>
    </div>
    <div v-if="auction_event.status == 'ING'">
      <div v-if="auction_event.bid.length > 0" class="max_bid">
        <div class="table_no">
          <span >T-{{auction_event.bid[0].table_id}}</span>
        </div>
        <div class="max_bid_money">
          <div class="max_money_title">최고가</div>
          <div class="max_money">
            <div>{{formatPrice(auction_event.bid[0].bid_amt, 'default')}}</div>
          </div>
        </div>
        <div class="bid_confirm">
          <mu-raised-button white class="bid_confirm_btn" inputClass="inputPrice" labelClass="bid_btn_label" label="입찰조회" @click="bidConfirmClick"/>
        </div>
      </div>
      <div v-else-if="auction_event.bid.length == 0" class="max_bid">
        <div class="table_no white">
          <span>0</span>
        </div>
        <div class="max_bid_money">
          <div class="max_money_title white">최고가</div>
          <div class="max_money white">
            <div>0</div>
          </div>
        </div>
        <div class="bid_confirm">
          <mu-raised-button white class="bid_confirm_btn" inputClass="inputPrice" labelClass="bid_btn_label" label="입찰조회" @click="bidConfirmClick"/>
        </div>
      </div>
      <div class="my_bid" v-if="auction_event.bid.length == 2">
        <div class="table_no">
          <span>T-{{auction_event.bid[1].table_id}}</span>
          <!-- <span>T-10</span> -->
        </div>
        <div class="my_bid_money">
          <div class="my_money">
            <!-- {{formatPrice(auction_event.bid[1].bid_amt)}} -->
            <v-text-field ref="textField" inputClass="bid_amt"  class="bid_price_input" full-width v-model="bid_amt" type="tel" hintText="입찰가 입력"/>
            <!-- <input class="test123" type="number" /> -->
          </div>
        </div>
        <div class="bid_submit">
          <mu-raised-button ref="bid_input" color="white" backgroundColor="#0856C3" class="bid_submit_btn" labelClass="bid_btn_label" label="입찰하기" @click="bidSubmitClick"/>
        </div>
      </div>
      <div class="my_bid" v-else-if="auction_event.bid.length < 2">
        <div class="table_no">
          <span>T-{{table_id}}</span>
        </div>
        <div class="my_bid_money">
          <div class="my_money">
            <v-text-field ref="textField" inputClass="bid_amt" full-width class="bid_price_input" v-model="bid_amt" type="tel" hintText="입찰가 입력"/>
          </div>
        </div>
        <div class="bid_submit">
          <v-btn color="white" backgroundColor="#0856C3" class="bid_submit_btn" labelClass="bid_btn_label" label="입찰하기" @click="bidSubmitClick"/>
        </div>
      </div>
    </div>
    <div v-else-if="auction_event.status == 'END'">
      <div v-if="auction_event.bid.length > 0" class="end_bid">
        <div class="table_no">
          <span >T-{{auction_event.bid[0].table_id}}</span>
        </div>
        <div class="end_product_price">
          <div class="end_product_title">판매가</div>
          <div class="max_money">
            <div>{{formatPrice(auction_event.auction[0].price, 'default')}}</div>
          </div>
        </div>
        <div class="end_bid_amt">
          <div class="max_money_title">낙찰가</div>
          <div class="max_money">
            <div>{{formatPrice(auction_event.bid[0].bid_amt, 'default')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      bid_amt: '',
    }
  },
  computed: {
      store() {
        return this.$store.getters.store;
      },
      table_id() {
        return this.$store.getters.table_id;
      },
      auction_event() {
        return this.$store.getters.auction_event;
      },
      user_id() {
        return this.$store.getters.user_id;
      }
  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('is_back', true);
    this.$store.commit('is_menu', true);
    if(this.store.call_yn == 'Y')
      this.$store.commit('is_bell', true);
    else
      this.$store.commit('is_bell', false);

    // this.$refs.bid_input.$el
    let params = {
        store_id: this.store.store_id,
        // dt: this.formatDate(),
        dt: '2018-06-28',
        table_id: this.table_id
    }
    
    // var this_ = this
    this.$store.dispatch('ou_r_auction', params)
    .then((res) => {
      console.log(this.auction_event)
      if(this.auction_event.status == 'ING') {
        const bid_price_input = this.$refs.textField.$el.querySelector('.bid_amt')
        bid_price_input.addEventListener('keyup', this.customOrderPrice)
        bid_price_input.addEventListener('focus', this.reset_bid)
        if (this.auction_event.bid.length > 1) {
          this.bid_amt = this.formatPrice(this.auction_event.bid[1].bid_amt, 'default')
        }
      }
    })
  },
  destroyed() {
    // if(this.auction_event.status == 'ING') {
    //   alert(1)
    //   const bid_price_input = this.$refs.textField.$el.querySelector('.bid_amt')
    //   bid_price_input.removeaddEventListener('keyup', this.customOrderPrice)
    //   bid_price_input.removeaddEventListener('focus', this.reset_bid)
    // }
  },
  methods: {
    formatDate() {
        var date = new Date()
        var yyyy = date.getFullYear().toString()
        var mm = (date.getMonth() + 1).toString()
        var dd = date.getDate().toString();
        return yyyy + '-' + (mm[1] ? mm : '0'+mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
    },
    bidConfirmClick() {
      let params = {
        store_id: this.store.store_id,
        // dt: this.formatDate(),
        dt: '2018-06-28',
        table_id: this.table_id
      }
      var _this = this
      this.$store.commit('loading', true);
      this.$store.dispatch('ou_r_auction', params)
      .then(function(res) {
        _this.$store.commit('loading', false);
      })
    },
    bidSubmitClick() {
      let amt = parseInt(this.bid_amt.replace(/[^0-9]/g,""));
      let chk = amt.toString().split('');
      console.log(chk[chk.length - 1]);
      if (parseInt(this.auction_event.auction[0].min_amt) > amt) {
        this.showToast('최소 입찰가보다 작습니다.')
      } else if (this.auction_event.bid.length != 0 && parseInt(this.auction_event.bid[0].bid_amt) > amt) {
        this.showToast('최고 입찰가보다 작습니다.')
      } else if (amt > 200000) {
        this.showToast('20만원 이하로 입찰 할 수 있습니다.')
      } else if (chk[chk.length - 1] != '0' || chk[chk.length - 2] != '0') {
        this.showToast('입찰 단위는 100원 단위입니다.');
      } else {
        let params = {
          store_id: this.store.store_id,
          user_id: this.user_id,
          table_id: this.table_id,
          aid: this.auction_event.auction[0].aid,
          bid_amt: amt,
          adt_id: this.auction_event.auction[0].adt_id
        }
        this.$store.commit('loading', true);
        var _this = this
        this.$store.dispatch('ou_c_auction_bid', params)
        .then(function(res) {
          if(res.result == "SUCCESS") {
            _this.showToast('입찰에 성공했습니다.')
            _this.$store.dispatch('ou_r_auction', params)
            _this.bid_amt = _this.formatPrice(_this.bid_amt, 'default');
          } else if (res.result == 'NOT_MAX_AMT'){
            _this.showToast('입찰가가 최고 입찰가 보다 작습니다.')
          } else if (res.result == 'NO_START') {
            _this.showToast('경매 시간이 아닙니다.')
          } else {
            _this.showToast('연결이 불안정합니다. 다시 시도하세요')
          }
          _this.$store.commit('loading', false);
            
        })
      }
      
    },
    customOrderPrice(event) {
      this.$nextTick(() => {
        this.bid_amt = this.formatPrice(this.bid_amt, 'auction');
      })
    },
    reset_bid(event) {
      this.bid_amt = ''
    },
  }
}
</script>

<style scoped>
.auction_container {
  /* padding-top: 3.5rem; */
}
.auction_container>.no_auction_div {
  background-color: #f1f1f1;
  padding-top: 3.6rem;
  text-align: center;
  height: 90vh;
}

.auction_container>.auction_div>.img_div {
  position: relative;
}
.auction_container>.auction_div>.img_div>img {
  width: 100%;
}
.auction_container>.auction_div>.img_div>.price_div {
  width: 100%;
  position:absolute;
  background-color: rgba(0, 0, 0, .5);
  bottom: 4px;
  text-align: center;
  padding: 1rem;
}
.auction_container>.auction_div>.img_div>.price_div>span {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
}
.auction_desc, .auction_time {
  background-color: white;
  padding: 1rem;
}
.auction_time {
  padding-top: 0;
  border-bottom: solid 5px #bbbbbb;
}
.auction_div>.auction_desc:after, .auction_div>.auction_time:after {
  content: "";
  clear: both;
  display: table;
}
.auction_desc_title, .auction_start_amt {
  display: inline-block;
}
.auction_desc>.auction_desc_title, .auction_time>.auction_time_title {
  float: left;
  font-size: 1.3rem;
  font-weight: bold;
  width: 50%;
}
.auction_desc>.auction_start_amt, .auction_time>.auction_time_desc {
  float: right;
  font-size: 1.3rem;
  font-weight: bold;
  width:50%;
  text-align: right;
}
.auction_desc>.auction_start_amt {
  color: #0856c3;
}
.max_bid {
  padding: 1rem;
  padding-top: 2.5rem;
  position: relative;
}
.end_bid {
  padding: 1rem;
  position: relative;
}

.my_bid {
  padding: 1rem;
  position: relative;
}
.max_bid>.table_no>span {
  font-size: 2rem;
  font-weight: bold;
  color: #8A8A8A;
}
.end_bid>.table_no>span {
  font-size: 2rem;
  font-weight: bold;
  color: #8A8A8A;
}
.my_bid>.table_no>span {
  font-size: 2rem;
  font-weight: bold;
  color: #0856C3;
}
.table_no {
  width: 25%;
  float: left;
}
.my_bid>.table_no {
  padding: 0;
}
.end_bid>.table_no {
  float: left;
  padding-top: 2rem;
}
.max_bid>.max_bid_money, .my_bid>.my_bid_money, .end_bid>.end_product_price {
  width: 40%;
  position: relative;
  text-align: right;
  /* overflow: hidden; */
}
.end_bid>.end_bid_amt {
  width: 33%;
  position: relative;
  text-align: right;
}
.max_bid>.max_bid_money>.max_money_title {
  position:absolute;
  top: -20px;
  right: .5rem;
  font-size: 1.2rem;
  color: #F71F66;
  font-weight: bold;
}

.end_bid>.end_product_price>.end_product_title {
  position:absolute;
  top: -20px;
  right: 0;
  font-size: 1.2rem;
  color: #8a8a8a;
  font-weight: bold;
}
.end_bid>.end_bid_amt>.max_money_title {
  position:absolute;
  top: -20px;
  right: 0;
  font-size: 1.2rem;
  color: #F71F66;
  font-weight: bold;
}
.end_bid>.end_product_price>.max_money>div {
  font-size: 2rem;
  font-weight: 900;
  color: #8a8a8a;
  white-space: nowrap;
  overflow: hidden;
  /* width: 100%; */
}
.end_bid>.end_bid_amt>.max_money>div {
  font-size: 2rem;
  font-weight: 900;
  color: #F71F66;
  white-space: nowrap;
  overflow: hidden;
  /* width: 100%; */
}
.max_bid>.max_bid_money>.max_money>div {
  font-size: 2rem;
  font-weight: 900;
  padding-right: .5rem;
  color: #F71F66;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
.my_bid>.my_bid_money>.my_money .bid_amt {
  font-size: 2rem;
  font-weight: 900;
  padding-right: .5rem;
}
.max_bid>.bid_confirm>.bid_confirm_btn {
  position:absolute;
  right:1rem;
  bottom: 1.5rem;
  width: 30%;
  border: solid 1px black;
  height: 3.75rem;
}
.my_bid>.bid_submit>.bid_submit_btn {
  position:absolute;
  right:1rem;
  bottom: 1.5rem;
  width: 30%;
  height: 3.75rem;
}
.bid_btn_label {
  font-size: 1.3rem;
}
.table_no, .max_bid_money, .bid_confirm, .bid_submit, .my_bid_money, .end_product_price, .end_bid_amt{
  display: inline-block;
}
.my_money>.mu-text-field>.mu-textx-field-content>input {
  text-align: right;
  font-size: 2rem;
}
.bid_price_input>.mu-text-field-content>.bid_amt {
  text-align: right;
  width: 100%;
  font-size: 2rem;
}
.bid_price_input>.mu-text-field-content>.mu-text-field-hint {
  font-size: 1.5rem;
  text-align: right;
}

.max_bid>.max_bid_money>.white>div, .max_bid>.white>span, .max_bid>.max_bid_money>.white {
  color: white;
}
.end_product_price {
  margin-top: 2rem;
}
</style>