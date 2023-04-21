<template>
  <div class="address_container">
    <v-row v-show="!address_select">
      <v-col cols="8" class="ml-3">
        <v-text-field
          label="동 또는 도로명 입력하세요"
          prepend-inner-icon="mdi-magnify"
          v-model="s_addr"
          solo
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-btn class="mt-1" large v-on:click="search" primary @click="search"
          >검색</v-btn
        >
      </v-col>
    </v-row>

    <div v-show="address_select"></div>
    <div v-show="searching && !address_select" class="search_result_desc">
      <span class="red_text">'{{ s_addr }}'</span>
      <span>&nbsp;에 대한 검색 결과입니다.</span>
      <v-divider></v-divider>
    </div>

    <div v-show="!address_select" class="search_result_div">
      <div v-for="(address, index) in l_address" :key="index">
        <address-item :item="address" @item-select="itemSelect"></address-item>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-show="address_select" class="select_addr_div">
      <div class="selectItem">
        <img
          class="select_img"
          src="../assets/img/search_place.png"
          width="20rem"
        />
        <div class="jibun">
          {{ this.jibun_address }}
        </div>
        <div class="road">
          {{ this.road_address }}
        </div>
      </div>
      <div class="address_detail">
        <v-text-field
          placeholder="상세주소 입력"
          full-width
          v-model="address_detail"
        ></v-text-field>
      </div>
      <div class="address_detail" v-if="store.delivery_name_yn === 'Y'">
        <v-text-field
          placeholder="예약자 성함 입력"
          full-width
          v-model="user_name"
        ></v-text-field>
      </div>
      <div class="address_add_div">
        <v-btn
          primary
          block
          v-if="store.delivery_name_yn === 'Y'"
          class="address_add_btn"
          @click="addr_add"
          >주소/이름 입력 완료</v-btn
        >
        <v-btn primary block v-else class="address_add_btn" @click="addr_add"
          >주소 입력 완료</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import addressItem from "../components/addressItem";
export default {
  components: {
    addressItem,
  },
  data() {
    return {
      s_addr: "",
      l_address: [],
      searching: false,
      road_address: "",
      jibun_address: "",
      address_select: false,
      address_detail: "",
      user_name: "",
    };
  },
  computed: {
    addr() {
      return this.$store.getters.addr;
    },
    store() {
      return this.$store.getters.store;
    },
    u_name() {
      return this.$store.getters.u_name;
    },
  },
  mounted() {
    this.$store.commit("is_select_store", false);
    this.$store.commit("is_menu", true);
    if (this.store.call_yn == "Y") this.$store.commit("is_bell", true);
    else this.$store.commit("is_bell", false);
    this.$store.commit("address_page_back_btn", false);
    this.$store.commit("basket_tab", "address_add");
    this.s_addr = "";
    this.l_address = [];
    // this.$store.commit('title', '배달주소 등록');
    this.$store.commit("is_back", true);
    this.user_name = this.u_name;
  },
  methods: {
    search() {
      this.$store.commit("loading", true);
      let param = {
        keyword: this.s_addr,
      };

      this.$store.dispatch("f_address", param).then((res) => {
        //   console.log(res)
        this.$store.commit("loading", false);
        this.searching = true;
        //console.log('res',res);
        if (res.results.common.errorCode == "0")
          this.l_address = res.results.juso;
        else {
          this.showToast(res.results.common.errorMessage);
        }
        console.log(this.l_address);
        //console.log('juso',this.l_address);
      });
    },
    itemSelect(item) {
      console.log(item);
      this.road_address = item.roadAddr;
      this.jibun_address = item.jibunAddr;
      this.address_select = true;
      this.$store.commit("address_page_back_btn", true);
    },
    addr_add() {
      if (this.address_detail.length === 0) {
        this.showToast("상세 주소를 입력하세요");
      } else if (
        this.user_name.length === 0 &&
        this.store.delivery_name_yn === "Y"
      ) {
        this.showToast("이름을 입력하세요");
      } else {
        let addr = {
          address1: this.road_address,
          address2: this.jibun_address,
          address_detail: this.address_detail,
        };
        this.$store.commit("address_page_back_btn", false);
        // this.$store.commit('addr', addr);
        if (this.store.delivery_name_yn === "Y") {
          this.$store.commit("u_name", this.user_name);
        }
        this.$store.commit("addr", addr);
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
.address_container > div > .address_div {
  width: 70%;
  margin-left: 1rem;
  display: inline-block;
}
.v-input {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  padding-left: 0.5vh;
}
.address_container {
  padding-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  /* margin-top: 3.5rem; */
}
.address_btn {
  width: 15%;
  display: inline-block;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #043474;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 5.5vh;
  min-width: 22vw;
  margin-bottom: 2vh;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #bdbdbd;
}
.theme--light.v-btn {
  color: #ffffff;
}
.v-btn:not(.v-btn--round).v-size--default[data-v-4f039e6c] {
  height: 100%;
  min-width: 100%;
  margin-bottom: 2vh;
  padding: 3vh;
}
.v-btn.v-size--default {
  font-size: 2.7vh;
  font-weight: bolder;
}
.search_result_desc > span {
  font-size: 1rem;
}
.search_result_desc > .red_text {
  font-size: 1rem;
  color: red;
  font-weight: bold;
}
.search_result_desc {
  padding-left: 1.2rem;
}
.search_result_div {
  padding: 0.7rem;
}
.selectItem {
  font-size: 1rem;
  padding: 0.5rem;
  position: relative;
}
.selectItem > div {
  padding-left: 5%;
}
.select_img {
  position: absolute;
  left: 0;
}
.select_addr_div {
  padding: 0.5rem;
}
.address_add_btn {
  padding: 2rem;
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
