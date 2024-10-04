const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false, 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!WorkBiz.isWork(this)) return;


		this.setData({
			id: WorkBiz.getWorkId()
		});

		this.setData(await AdminMeetBiz.initFormData()); // 初始化表单数据   

		await this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let meet = await cloudHelper.callCloudData('work/meet_detail', params, opt);

		if (!meet) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,


			// 表单数据   
			formTitle: meet.MEET_TITLE,
			formCateId: meet.MEET_CATE_ID,
			formOrder: meet.MEET_ORDER, 

			formPhone: meet.MEET_PHONE,

			formForms: meet.MEET_FORMS,
 
 
		});
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	}, 

	bindFormEditSubmit: async function () {
		pageHelper.formClearFocus(this);

		if (!WorkBiz.isWork(this)) return;

		let data = this.data; 

		data = validate.check(data, AdminMeetBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = AdminMeetBiz.getCateName(data.cateId);

		try {
			let meetId = this.data.id;
			data.id = meetId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('work/meet_edit', data);

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'meet/', meetId, 'work/meet_update_forms');

			let callback = async function () {
				wx.navigateBack();

			}
			pageHelper.showSuccToast('编辑成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},



	url: function (e) {
		pageHelper.url(e, this);
	},



})