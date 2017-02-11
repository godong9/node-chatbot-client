<template>
  <!-- main container-->

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
          <div class="item active">
            <img src="../assets/images/coach_image_kindman.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item">
            <img src="../assets/images/coach_image_kindwoman.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item">
            <img src="../assets/images/coach_image_kindwoman.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item">
            <img src="../assets/images/coach_image_angry.png" style="width:60%; margin:0 auto">
          </div>
          <div class="item">
            <img src="../assets/images/coach_image_odd.png" style="width:60%; margin:0 auto">
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
  export default {
    name: 'chat',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      coach_confirm(){
        alert($('#carousel-example-generic .item.active').index());
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
