const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const behavior = require('./admin_meet_time_bh.js'); 
const pageHelper = require('../../../../../../helper/page_helper.js');

Page({

	behaviors: [behavior],
	
	/**
	 * 页面的初始数据
	 */
	data: {
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this,options)) return;

		this._init(this.data.nowDay);
	}, 

})