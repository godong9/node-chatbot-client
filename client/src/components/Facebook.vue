<template>
  <div> facebook
  </div>
</template>

<script>
  if (location.pathname === "/facebook") {
    let facebookToken = window.location.href.split(/=|&/g)[1];
    let params = {
      facebookToken: facebookToken
    };
    FBLogin.userLogin(params);
  }

  export default {
    name: 'coach',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {}//end method
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
