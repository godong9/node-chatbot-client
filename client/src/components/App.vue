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
  import * as Cookies from "js-cookie";
  /*
   //쿠키에 로그인 페북토큰 체크
   if (Cookies.get('fb_login') == undefined) {
   //로그인 페이지로 이동
   console.log('go to login');
   } else {
   //챗 페이지로 이동
   console.log('go to chat');
   if (location.pathname == '/') {
   location.href = "/chat";
   Cookies.remove('fb_login');
   }
   }
   */
  export default {
    name: 'coach',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      fb_login() {
        //로그인 체크
        FB.getLoginStatus(function (response) {
          if (response.status != 'connected') {
            //로그인해야됨
            FB.login(function (response) {
              console.log(response.status);
            });
          }
          //로그인 되어있음
          console.log(response.authResponse.accessToken);
          Cookies.set('fb_token', response.authResponse.accessToken);
          /**
           *서버에 토큰 확인 요청 보내기
           */
//          if (location.pathname == '/') {
//            location.href = "/coach";
//          }
        });
      },
    }
  };

  /**
   * [START] FB Login
   */
  //SDK
  window.fbAsyncInit = function () {
    FB.init({
      appId: '1431941220171678',
      xfbml: true,
      version: 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
