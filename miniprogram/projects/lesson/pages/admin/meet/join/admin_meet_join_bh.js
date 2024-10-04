const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');



module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {

		oprt: 'admin',

		isLoad: false,

		doDate: false,

		meetId: '',
		dayId: '',

		title: '',
		titleEn: '',

	},

	methods: {

		_init: function (options) {
			// 附加参数 
			if (options && options.meetId) {
				//设置搜索菜单 
				this._getSearchMenu();

				let _params = {
					meetId: options.meetId
				}
				if (options.dayId) _params.dayId = options.dayId;
				this.setData({
					_params,
					meetId: options.meetId,
					isLoad: true
				}
				);
				if (options.dayId) this.setData({ dayId: options.dayId });
			}

			if (options && options.title) {
				let title = decodeURIComponent(options.title);
				this.setData({
					title,
					titleEn: options.title
				});
				wx.setNavigationBarTitle({
					title: '排课名单 - ' + title
				});
			}
			if (options.dayId) {
				wx.setNavigationBarTitle({
					title: '本时段排课名单'
				});
			}
		},


		bindDateTap: function (e) {
			this.setData({ search: '', doDate: !this.data.doDate });
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

		url: async function (e) {
			pageHelper.url(e, this);
		},


		bindDelTap: async function (e) {

			let callback = async () => {
				let idx = Number(pageHelper.dataset(e, 'idx'));
				let dataList = this.data.dataList;
				let joinId = dataList.list[idx]._id;
				let params = {
					joinId
				}
				let opts = {
					title: '取消中'
				}
				try {
					await cloudHelper.callCloudSumbit(this.data.oprt + '/join_del', params, opts).then(res => {

						let cb = () => {
							let dataList = this.data.dataList;
							dataList.list.splice(idx, 1);
							dataList.total--;
							this.setData({
								dataList
							});

							let parent = pageHelper.getPrevPage(2);
							if (parent) {
								parent.setData({
									dayList: res.data.list
								});
							}
						}

						pageHelper.showNoneToast('取消成功，已经退回用户' + res.data.courseCnt + '个课时', 1000, cb);
					});
				} catch (err) {
					console.error(err);
				}
			}

			pageHelper.showConfirm('确认取消？ 取消后将退回用户所扣课时', callback);


		},

		bindCommListCmpt: function (e) {
			pageHelper.commListListener(this, e);
		},

		// 修改与展示状态菜单
		_getSearchMenu: function () {

			let sortItems = [];
			let sortMenus = [];
			this.setData({
				sortItems,
				sortMenus
			})


		},


	}
})