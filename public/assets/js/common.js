$('#logout').on('click', function () {
  var isConfirm = confirm('您确定退出吗');
  if (isConfirm) {
    $.ajax({
      type: "post",
      url: "/logout",
      success: function (response) {
        location.href = 'login.html'
      }
    });
  }
})