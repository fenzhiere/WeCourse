const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone: '',
		pwd: '',
		remember: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		WorkBiz.clearWorkToken();

		// 记住密码 
		let pwd = cacheHelper.get('work-pwd');
		if (pwd) {
			this.setData({
				phone: pwd.phone,
				pwd: pwd.pwd,
				remember: true
			});
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindBackTap: function (e) {
		wx.reLaunch({
			url: pageHelper.fmtURLByPID('/pages/my/index/my_index'),
		});
	},

	bindLoginTap: async function (e) {
		// 记住密码
		if (this.data.remember) {
			cacheHelper.set('work-pwd', { pwd: this.data.pwd, phone: this.data.phone }, 86400 * 30);
		}
		else {
			cacheHelper.clear('work-pwd');
		}

		return WorkBiz.workLogin(this, this.data.phone, this.data.pwd);
	},
	
	bindRememberTap: function (e) {
		this.setData({
			remember: !this.data.remember
		})
	}

})