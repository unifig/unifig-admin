<template>
  <div class="content">
    <div class="msglist">
      <search></search>
      <chatlist></chatlist>
    </div>
    <div class="chatbox">
      <message></message>
      <v-text></v-text>
    </div>
  </div>
</template>

<script>
  import search from '../../../components/wx/search/search'
  import chatlist from '@/components/wx/chatlist/chatlist'
  import message from '@/components/wx/message/message'
  import vText from '@/components/wx/text/text'
  export default {
    components: {
      search,
      chatlist,
      message,
      vText
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    display: flex
    width: 800px
    margin-top :100px
    .msglist
      width: 250px
      background: rgb(230,230,230)
    .chatbox
      flex: 1
</style>
