<template>
  <div class="group_container">
    <div class="flex_div">
      <div v-if="l_store.length > 0" v-for="(store, index) in l_store" :key="index" class="gridList inline_block">
        <store-item :store="store"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import storeItem from '../components/storeItem';
export default {
  components: {
    storeItem,
  },
  data() {
    return {
      l_store: [],
    }
  },
  computed: {

  },
  mounted() {
    this.$store.commit('is_select_store', false);
    this.$store.commit('title', '상점 선택');
    this.$store.commit('is_menu', true);
    this.$store.commit('is_back', false);
    this.$store.commit('is_bell', false);
    this.$store.commit('is_home', false);
    this.$store.commit('table_id', this.$route.params.table_id);
    this.$store.dispatch('l_store', {
        'group_code': this.$route.params.group_code
    }).then((res) => {
        // console.log(res);
        this.l_store = res;
    })

  },
  methods: {

  }
}
</script>

<style scoped>
.group_container {
  margin-top: 3.5rem;
  padding: 0 .2rem;
}
.flex_div {
  padding: .7rem 1%;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
}
.gridList {
  /* margin: 0 1%; */
  margin-bottom: 2%;
  width:49%;
  border-radius: 10px;
  background-color: white;
  border: solid #bbbbbb 1px;
}

</style>