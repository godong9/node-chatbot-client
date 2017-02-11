<template>
  <div id="background_gradient">
    <!-- comment container -->
    <div id="comment_container">
      <p class="text-center">당신만을 위한 <b>코치와</b>
        <br> <b>다이어트</b>를 함께하세요!</p>
    </div>
    <!-- coach image container -->
    <div id="coach_image_container">
      <img src="../assets/images/login_img_cute.png"/>
    </div>
    <!-- facebook login container -->
    <div id="facebook_login_container">
      <img id="login_facebook" src="../assets/images/login_btn_fb.png" v-on:click="fb_login"/>
      <p class="text-center">개인의 동의없이 페이스북에 게시되지 않습니다.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coach',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };

//  var vm = new Vue({
//    el: '#comment_container',
//    methods: {
//      fb_login: function () {
//        alert('fb_login');
//
//      }
//    }
//  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
