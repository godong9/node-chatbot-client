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

  let clickFlag = true;

  //쿠키에 로그인 페북토큰 체크
  if (Cookies.get('accessToken') != undefined) {
    console.log('go to chat');
    if (location.pathname == '/') {
      location.href = "/chat";
    }
  }
  export default {
    name: 'coach',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      fb_login() {
        if (clickFlag) {
          clickFlag = false;
          //로그인 체크
          FB.getLoginStatus(function (response) {
            if (response.status !== 'connected' || (!response.authResponse || !response.authResponse.accessToken)) {
              //로그인해야됨
              FB.login(function (response) {
                let params = {
                  facebookToken: response.authResponse.accessToken
                };
                FBLogin.userLogin(params)
              });
            }
            //로그인 되어있음
            console.log('already: '+response.authResponse.accessToken);
            /**
             *서버에 토큰 확인 요청 보내기
             */
            let params = {
              facebookToken: response.authResponse.accessToken
            };
            FBLogin.userLogin(params)
          });//end getLoginStatus
        }//end clickFlag if

      },//end login method
    }//end method
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
  #comment_container {
    height: 35%;
  }

  #comment_container > p {
    font-size: 25px;
    color: white;
    padding: 25% 0% 0% 0%;
    text-align: center;
  }

  #coach_image_container {
    height: 45%;
    text-align: center;

  }

  #coach_image_container > img {
    height: 60%;
  }

  #facebook_login_container {
    height: 10%;
    text-align: center;

  }

  #facebook_login_container > img {
    width: 70%;
    vertical-align: bottom;
  }

  #facebook_login_container > p {
    height: 10%;
    color: white;
    font-size: 10px;
    margin: 10px;

  }
</style>
