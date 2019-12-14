//用户管理页面js
// 当添加用户表单发生提交事件
$('#userForm').on('submit', function () {
	// 获取表单提交的内容 转换成键值对
	var formData = $(this).serialize();
	// console.log(formData);
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: "post",
		url: "/users",
		data: formData,
		success: function () {
			// 刷新页面
			location.reload()
		},
		error: function () {
			alert('用户添加失败')
		}
	});
	// 首先阻止表单的默认提交行为
	return false;
})

// FormData表单对象 上传头像
$('#modifyBox').on('change', '#avatar', function () {
	// console.log(this.files[0]);
	var formData = new FormData();
	formData.append('avatar', this.files[0]);
	// console.log(formData.avatar);

	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 告诉$.ajax不要解析请求参数  !!! 二进制文件上传不需要文件解析
		processData: false,
		// 告诉$.ajax不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			// console.log(response);
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
		}
	});
})

// 向服务器端发送请求  索要用户列表数据
$.ajax({
	type: "get",
	url: "/users",
	success: function (response) {
		// console.log(response); // 数组
		// 使用模板引擎将 数据 与 html字符串 拼接
		var html = template('userTpl', {
			data: response
		});
		// console.log(html);
		// 渲染用户列表
		$('#userBox').html(html)
	}
});

$('#userBox').on('click', '.edit', function () {
	// 被点击用户的id值
	var id = $(this).attr('data-id');

	$.ajax({
		type: "get",
		url: "/users/" + id,
		success: function (response) {
			// console.log(response);
			var html = template('modifyTpl', response);
			$('#modifyBox').html(html)

		}
	});
})

$('#modifyBox').on('submit', '#modifyForm', function () {
	// 获取表单提交数据 抓换成键值对 
	var formData = $(this).serialize();
	var id = $(this).attr('data-id');
	$.ajax({
		type: "put",
		url: "/users/" + id,
		data: formData,
		success: function (response) {
			location.reload()
		}
	});
	return false;
});

$('#userBox').on('click', '.delete', function () {
	// 被点击用户的id值
	var id = $(this).attr('data-id');
	var isConfirm = confirm('您确定退出吗');
	if (isConfirm) {
		$.ajax({
			type: "delete",
			url: "/users/" + id,
			success: function (response) {
				location.reload();
			}
		});
	}
})

