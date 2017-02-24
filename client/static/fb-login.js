  function FBLogin() {

  }
  FBLogin.userLogin = function(params) {
      Cookies.set('facebookToken', params.facebookToken);
      HttpUtil.postData('/users/login', params, function(err, data) {
          if (err) {
              clickFlag = true;
              return alert(err);
          }
          if (data && data.accessToken) {
              Cookies.remove('accessToken');
              Cookies.set('accessToken', data.accessToken);
          }

          if (data && data.coachId) {
            location.href = '/chat';
          } else {
          location.href = '/coach';
          }
      }); //end HttpUtil
  };
