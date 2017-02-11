const HOST_PATH = 'https://dadocbot.herokuapp.com';

function HttpUtil() {

}

HttpUtil.getData = function(url, params, callback) {
  $.ajax({
    url: HOST_PATH + url,
    type: 'GET',
    data: params,
    headers: {
      authorization: "bearer " + Document.cookie && Document.cookie.accessToken
    },
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      callback(null, data)
    }
  });
};

HttpUtil.postData = function(url, params, callback) {
  $.ajax({
    url: HOST_PATH + url,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    headers: {
      authorization: "bearer " + Document.cookie && Document.cookie.accessToken
    },
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      callback(null, data)
    }
  });
};

HttpUtil.putData = function(url, params, callback) {
  $.ajax({
    url: HOST_PATH + url,
    type: 'PUT',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    headers: {
      authorization: "bearer " + Document.cookie && Document.cookie.accessToken
    },
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      callback(null, data)
    }
  });
};

HttpUtil.deleteData = function(url, params, callback) {
  $.ajax({
    url: HOST_PATH + url,
    type: 'DELETE',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: JSON.stringify(params),
    headers: {
      authorization: "bearer " + Document.cookie && Document.cookie.accessToken
    },
    error: function errorHandler(jqXHR) {
      alert(jqXHR.responseText);
      callback(jqXHR.responseText || "Error");
    },
    success: function successHandler(data) {
      callback(null, data)
    }
  });
};
