<template>
 <div v-if="store.order_yn == 'Y'" class="sns_control_container" :style="{ maxHeight : windowHeight , minHeight: windowHeight}">
      <div class="sns_control_div">
          <div class="title_name">
              <span class="sns_con_title">메세지 </span>
              <span class="sns_con_desc"> 메뉴 완료시 메세지 알림</span>
          </div>
          <div class="sns_content_div">
              <span>메뉴 완료 메세지 수신</span>
              <div class="sns_content_icon">
                  <span v-if="alram_">ON</span>
                  <span v-else>OFF</span>
              </div>
          </div>
          <div v-if="!is_login" class="sns_content_div_margin" @click="alramClick">
              <span>메세지 알림 전화번호 설정</span>
              <div class="sns_content_icon">
                  <mu-icon value="keyboard_arrow_right"/>
              </div>
          </div>
          
      </div>

  </div>
</template>

<script>
/* eslint-disable */
export default {
    
    computed: {
        store() {
            return this.$store.getters.store;
        },
        is_login() {
            return this.$store.getters.is_login;
        },
        table_id() {
            return this.$store.getters.table_id;
        },
    },
    data() {
        return {
            windowHeight: 0,
            alram_: false,
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
        if (this.$store.getters.user_id.charAt(0) != 'K')
            this.alram_ = true;
        if(!this.$store.getters.is_sns_login && !this.$store.getters.is_login)
            this.$router.push('/login');
        this.windowHeight = window.innerHeight - 56;
        this.windowHeight += 'px'
    },
    methods: {
        alramClick() {
            this.$router.push('/sns_alram_control');
        }
    }
}
</script>

<style scoped>
 .sns_control_container {
        margin-top: 3.5rem;
        background-color:#f1f1f1;
    }

    .sns_control_container>.sns_control_div>.title_name {
        padding: 2rem;
        padding-bottom: 1rem;

    }
    .sns_control_container>.sns_control_div>.title_name>.sns_con_title {
        color: #474747;
        font-weight: blod;
        font-size: 1.4rem;
    }
    .sns_control_container>.sns_control_div>.title_name>.sns_con_desc {
        font-size: 1rem;
        color: #8a8a8a;
    }
    .sns_control_container>.sns_control_div>.sns_content_div, .sns_control_container>.sns_control_div>.sns_content_div_margin {
        padding: 1rem 2rem;
        background-color: white;
        border-top: solid 1px #bbbbbb;
        border-bottom: solid 1px #bbbbbb;
        margin-top: -1px;
    }
    .sns_control_container>.sns_control_div>.sns_content_div_margin {
        padding-right: 1.3rem;
    }
    .sns_control_container>.sns_control_div>.sns_content_div>span, .sns_control_container>.sns_control_div>.sns_content_div_margin>span {
        font-size: 1.3rem;
    }
    .sns_content_icon {
        /* position: absolute;
        right: 5%;
        top: 20%; */
        float:right;
        vertical-align: middle;
    }
    .sns_control_container>.sns_control_div>.sns_content_div>.sns_content_icon>span {
        color: #bbbbbb;
        font-size: 1.3rem;
    }
</style>

