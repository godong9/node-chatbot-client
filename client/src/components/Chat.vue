<template>
  <div class="chat">
        <nav id="nav_container">
            <p class="text-center vertical-center">코치 이름</p>
        </nav>
        <div id="chat_container">
            CHAT
        </div>
        <div id="input_container" class="row">
            <div class="form-group col-xs-10 col-md-10">
                <input type="text" class="form-control">
            </div>
            <div class="btn-group col-xs-2 col-md-2">
                <p id="msg_send_btn" class="text-center vertical-center">전송</p>
            </div>
        </div>
        <div id="cmd_container">
            CMD
        </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
