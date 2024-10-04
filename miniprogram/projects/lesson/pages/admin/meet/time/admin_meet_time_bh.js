const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');

module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {

		oprt: 'admin',

		hasDays: [],

		nowDay: timeHelper.time('Y-M-D'),
		dayList: [],

		curId: '',
		start: '',
		end: '',

		daysTimeOptions: AdminMeetBiz.getDaysTimeOptions(),
		showTimeModal: false,

		saveTempModalShow: false,
		formTempName: '',

	},

	methods: {

		_init: async function (day) {

			let dayDesc = timeHelper.fmtDateCHN(this.data.nowDay) + ' (' + timeHelper.week(this.data.nowDay) + ')';
			this.setData({ dayDesc });

			let params = {
				meetId: this.data.id,
				day
			}
			let options = {
				title: '加载中'
			}
			try {
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_day_all_time', params, options).then(res => {
					this.setData({
						dayList: res.data
					});
				})
			}
			catch (err) {
				console.error(err);
			}

			this._getHasDays(timeHelper.time('Y-M'));
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
		onUnload: function () { },

		model: function (e) {
			pageHelper.model(this, e);
		},

		_saveTempModal: function (e) {
			let dayList = this.data.dayList;
			if (dayList.length <= 0) return pageHelper.showModal('该日期下没有设置时段，无法保存为模板，请先添加时段');
			this.setData({
				saveTempModalShow: true,
			});
		},

		_selectTemp: function (e) {

			wx.navigateTo({
				url: '../temp/' + this.data.oprt + '_meet_temp',
			});
		},

		bindDaySetTap: async function (e) {
			let itemList = ['选用模板配置', '保存为模板'];
			wx.showActionSheet({
				itemList,
				success: async res => {
					let idx = res.tapIndex;
					if (idx == 0) { // 选用模板配置
						this._selectTemp(e);
					}
					if (idx == 1) { // 保存为模板 
						this._saveTempModal(e);
					}
				},
				fail: function (res) { }
			})
		},

		bindSaveTempCmpt: async function (e) {
			try {
				let name = this.data.formTempName;
				if (name.length <= 0) return pageHelper.showNoneToast('请填写模板名称');
				if (name.length > 20) return pageHelper.showNoneToast('模板名称不能超过20个字哦');

				let dayList = this.data.dayList;
				if (dayList.length <= 0) return pageHelper.showNoneToast('至少需要包含一个时段');
				if (dayList.length > 20) return pageHelper.showNoneToast('时段不能超过20个');

				let temps = [];
				for (let k = 0; k < dayList.length; k++) {
					let node = {};
					node.start = dayList[k].DAY_START;
					node.end = dayList[k].DAY_END;
					temps.push(node);
				}
				let opt = {
					title: '模板保存中'
				}
				let params = {
					name,
					times: temps
				}
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_temp_insert', params, opt).then(res => {
					pageHelper.showSuccToast('保存成功');
					this.setData({
						saveTempModalShow: false,
						formTempName: '',
					});
				})
			} catch (err) {
				console.log(err);
			};
		},

		bindOpenEditTimeModal: function (e) {
			let curId = pageHelper.dataset(e, 'id');
			let start = pageHelper.dataset(e, 'start');
			let end = pageHelper.dataset(e, 'end');

			if (!curId) return;

			this.setData({
				curId,
				start,
				end,
				showTimeModal: true
			});
		},

		bindTimeStartCmpt: function (e) {
			let start = e.detail.join(':');
			this.setData({
				start
			});
		},

		bindTimeEndCmpt: function (e) {
			let end = e.detail.join(':');

			this.setData({
				end
			});
		},

		bindDayClickCmpt: function (e) {
			let nowDay = e.detail.day;
			this.setData({ nowDay });
			this._init(nowDay);
		},

		bindDelTime: async function (e) {
			let id = pageHelper.dataset(e, 'id');
			let idx = pageHelper.dataset(e, 'idx');

			let params = {
				id
			}
			let options = {
				title: '删除中'
			}

			let cb = async () => {
				try {
					await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_del_day_time', params, options).then(res => {

						let dayList = this.data.dayList;
						dayList.splice(idx, 1);
						this.setData({
							dayList
						});

						this._getHasDays(this.data.nowDay);

						pageHelper.showSuccToast('删除成功');

					})
				}
				catch (err) {
					console.error(err);
				}
			}

			pageHelper.showConfirm('确认删除该时段？', cb);

		},

		bindInsertTimeCmpt: async function (e) {
			let start = this.data.start;
			let end = this.data.end;

			if (!start) return pageHelper.showModal('开始时间不能为空');
			if (!end) return pageHelper.showModal('结束时间不能为空');
			if (start >= end) return pageHelper.showModal('开始时间不能大于等于结束时间');

			let params = {
				meetId: this.data.id,
				day: this.data.nowDay,
				start,
				end
			}
			let options = {
				title: '保存中'
			}
			try {
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_insert_day_time', params, options).then(res => {

					this.setData({
						dayList: res.data,
						curId: '',
						start: '',
						end: '',
						showTimeModal: false
					});

					this._getHasDays(this.data.nowDay);
				})
			}
			catch (err) {
				console.error(err);
			}
		},

		_getHasDays: async function (month, title = '加载中') {
			if (!month) return;
			if (month.length == 10) month = month.split('-')[0] + '-' + month.split('-')[1];

			let params = {
				meetId: this.data.id,
				month,
			}
			let options = {
				title
			}
			try {
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_has_day', params, options).then(res => {

					this.setData({
						hasDays: res.data,
					});

				})
			}
			catch (err) {
				console.error(err);
			}
		},

		bindMonthCmpt: async function (e) {
			let month = e.detail.yearMonth;
			await this._getHasDays(month);

		},

		bindEditTimeCmpt: async function (e) {
			let start = this.data.start;
			let end = this.data.end;
			let id = this.data.curId;
			if (!id) return;

			if (!start) return pageHelper.showModal('开始时间不能为空');
			if (!end) return pageHelper.showModal('结束时间不能为空');
			if (start >= end) return pageHelper.showModal('开始时间不能大于等于结束时间');

			let params = {
				id,
				meetId: this.data.id,
				day: this.data.nowDay,
				start,
				end
			}
			let options = {
				title: '保存中'
			}
			try {
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_edit_day_time', params, options).then(res => {

					this.setData({
						dayList: res.data,
						curId: '',
						start: '',
						end: '',
						showTimeModal: false
					});

				})
			}
			catch (err) {
				console.error(err);
			}
		},

		bindJoinTap: function (e) {
			let dayId = pageHelper.dataset(e, 'id');

			let cb = async (mobile) => {
				let params = {
					dayId,
					mobile
				}
				let options = {
					title: '提交中'
				}
				try {
					await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_join_day_time', params, options).then(res => {

						cacheHelper.remove('day-mobile');
						pageHelper.showNoneToast('添加成功，已扣除该学员' + res.data.courseCnt + '个课时');

						this.setData({
							dayList: res.data.list,
						});

					})
				}
				catch (err) {
					console.error(err);
				}
			}

			wx.showModal({
				title: '请填写学员手机',
				editable: true,
				content: cacheHelper.get('day-mobile', ''),
				async success(res) {
					if (res.confirm) {
						let mobile = res.content;
						cacheHelper.set('day-mobile', mobile, 60);
						if (!mobile) return pageHelper.showModal('请填写手机号码');
						if (mobile.length != 11) return pageHelper.showModal('请填写正确的手机号码');
						await cb(mobile);
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			});
		},

		url: function (e) {
			pageHelper.url(e, this);
		},


		onPageScroll: function (e) {
			if (e.scrollTop > 100) {
				this.setData({
					topShow: true
				});
			} else {
				this.setData({
					topShow: false
				});
			}
		},

		bindTimeAddTap: function (e) {
			this.setData({
				curId: '',
				start: '',
				end: '',
				showTimeModal: true
			});
		},


		bindTopTap: function () {
			wx.pageScrollTo({
				scrollTop: 0
			})
		},

	}
})