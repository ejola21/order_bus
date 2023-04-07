<template>
  <div>
  <!-- <mu-raised-button label="dialog" @click="open"/> -->
  <mu-dialog :open="popup.dialog" :title="popup.title" @close="close">
    {{popup.desc}}
    <mu-flat-button v-show="popup.btn1" slot="actions" @click="close" primary label="닫기"/>
    <mu-flat-button v-show="popup.btn2" slot="actions" primary @click="$emit('move_status')" label="주문현황이동"/>
    <mu-flat-button v-show="popup.btn3" slot="actions" primary @click="$emit('cancel_req')" label="취소요청"/>
  </mu-dialog>

</div>
</template>

<script>
/* eslint-disable */
export default {
  computed: {
    popup() {
      return this.$store.getters.popup;
    }
  },
  methods: {
    open() {
      this.popup.dialog = true;
    },
    close() {
      var popup = {
        'dialog': false
      }
      this.$store.commit('popup', popup);

    }

  }
}
</script>

<style scoped>

</style>