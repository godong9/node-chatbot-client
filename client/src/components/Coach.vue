<template>
  <!-- main container-->
  <!--로그인 성공시 서버에서 받은 값을 로컬 쿠키에 저장-->
  <!--로그인페이지 첫실행시 쿠키값 체크(존재>>챗페이지, 없음>>로그인페이지)-->

  <div id="background_gradient">
    <!-- comment container-->
    <div id="comment_container">
      <p class="text-center">코치를 선택해 주세요</p>
    </div>
    <!-- start coach select container -->
    <div id="coach_select_container">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="false">
        <!-- Indicators -->
        <!-- Wrapper for slides -->
        <div class=" carousel-inner " role="listbox">
          <div class="item active" data-id="1">
            <img src="../assets/images/coach_image_kindman.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item" data-id="2">
            <img src="../assets/images/coach_image_kindwoman.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item" data-id="3">
            <img src="../assets/images/coach_image_odd.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item" data-id="4">
            <img src="../assets/images/coach_image_angry.png" style="width:60%; margin:0 auto">
          </div>
        </div>
        <!-- Controls -->
        <a class="carousel-background left carousel-control" href="#carousel-example-generic" role="button"
           data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-background right carousel-control" href="#carousel-example-generic" role="button"
           data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <!-- coach confirm select -->
    <div id="coach_confirm_container">
      <img src="../assets/images/coach_btn_check.png" v-on:click="coach_confirm"/>
    </div>
  </div>
</template>
<script>
console.log('access  '+Cookies.get('accessToken'));
console.log('facebook  '+Cookies.get('facebookToken'));

  let clickFlag = true;
  export default {
    name: 'chat',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      coach_confirm(){
        if (clickFlag) {
          clickFlag = false;
          let params = {
            coachId: $('#carousel-example-generic .item.active').data('id')
          };
          let fbParams = {
              facebookToken: Cookies.get('facebookToken')
          };   
     

          HttpUtil.putData('/users', params, function (err) {
            if (err) {
              clickFlag = true;
              return alert(err);
            }
                 FBLogin.userLogin(fbParams);
            // location.href = '/chat';
          });
        }
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*comment container*/

  #comment_container {
    height: 30%;
    /*background-color: #60579D;*/
  }

  #comment_container > p {
    font-size: 20px;
    color: white;
    padding: 40% 0% 0% 0%;
  }

  /*start coach select container*/

  #coach_select_container {
    height: 55%;
    /*background-color: #62279D;*/
  }

  #coach_select_container .btn-left-arrow {
    display: table-cell;
    width: 20%;
    vertical-align: middle;
    height: 100%;
    text-align: right;
  }

  #coach_select_container .btn-left-arrow > img {
    width: 20%
  }

  #coach_select_container .img-coach {
    display: table-cell;
    width: 60%;
    vertical-align: middle;
    height: 100%;
  }

  #coach_select_container .img-coach > img {
    width: 100%;
  }

  #coach_select_container .btn-right-arrow {
    display: table-cell;
    width: 20%;
    vertical-align: middle;
    height: 100%;
  }

  #coach_select_container .btn-right-arrow > img {
    width: 20%
  }

  /* TODO: for carousel
  div > div > div> img 어덯게 ??*/

  #coach_select_container .coach-carousel > img {
    width: 55%;
  }

  .carousel-background {
    background-image: none !important;
  }

  /*end coach select container*/

  /*confirm coach container*/

  #coach_confirm_container {
    height: 15%;
    /*background-color: #30579D;*/
    text-align: center;
  }

  #coach_confirm_container > img {
    height: 50%;
    /*margin: 5% 0% 5% 0%;*/

  }
</style>
