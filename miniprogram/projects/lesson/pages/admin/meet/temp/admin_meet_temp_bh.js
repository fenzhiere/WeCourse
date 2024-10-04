const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');

module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {

		oprt: 'admin',


		isLoad: false,

		temps: [],

		curIdx: -1,


	},

	methods: {
		switchModel: function (e) {
			pageHelper.switchModel(this, e, 'bool');
		},


		_loadList: async function () {
			try {
				let opts = {
					title: 'bar'
				}
				await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_temp_list', {}, opts).then(res => {
					this.setData({
						isLoad: res.data.length == 0 ? null : true,
						temps: res.data
					})
				})
			} catch (err) {
				console.log(err);
			};
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {

		},

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

		onPullDownRefresh: async function () {
			await this._loadList();
			wx.stopPullDownRefresh();
		},

		bindSelectTap: function (e) {

			let curIdx = pageHelper.dataset(e, 'idx');
			let name = this.data.temps[curIdx].TEMP_NAME;
			let tempId = pageHelper.dataset(e, 'id');

			let parent = pageHelper.getPrevPage(2);
			if (!parent) return;
			let day = parent.data.nowDay;
			let meetId = parent.data.id;

			let cb = async () => {
				try {
					let params = {
						tempId,
						day,
						meetId
					}
					await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_temp_select', params).then(res => {


						let cb = () => {
							parent._getHasDays(parent.data.nowDay);
							parent.setData({
								dayList: res.data
							});
							wx.navigateBack();
						}

						pageHelper.showSuccToast('操作成功', 1500, cb);

					})
				}
				catch (err) {
					console.error(err);
				}

			}

			pageHelper.showConfirm('确认要选用模板 「' + name + '」吗?', cb);
		},

		bindDelTap: async function (e) {
			let curIdx = pageHelper.dataset(e, 'idx');
			let temps = this.data.temps;
			let id = temps[curIdx]._id;
			let name = temps[curIdx].TEMP_NAME;

			let cb = async () => {
				try {
					let opts = {
						title: '删除中'
					}
					let params = {
						id
					}
					await cloudHelper.callCloudSumbit(this.data.oprt + '/meet_temp_del', params, opts).then(res => {
						let temps = this.data.temps;
						temps.splice(curIdx, 1);
						this.setData({
							temps
						});
						if (temps.length == 0) {
							this.setData({
								isLoad: null
							});
						}
						pageHelper.showSuccToast('删除成功');
					})
				} catch (err) {
					console.log(err);
				};
			}
			pageHelper.showConfirm('确认要删除模板 「' + name + '」吗?', cb);
		}

	}
})