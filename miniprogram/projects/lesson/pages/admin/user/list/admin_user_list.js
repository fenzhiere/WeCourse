const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

const CACHE_USER_CHECK_REASON = 'CACHE_USER_CHECK_REASON';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userRegCheck: projectSetting.USER_REG_CHECK,
		checkModalShow: false,

		formReason: '',
		curIdx: -1,


		lessonModalShow: false,
		lessonType: 1,
		formLessonChangeCnt: 0,
		formLessonDesc: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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


	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindLessonTap: async function (e) {
		let curIdx = pageHelper.dataset(e, 'idx');
		let lessonType = pageHelper.dataset(e, 'type');

		this.setData({
			formLessonChangeCnt: '',
			curIdx,
			lessonModalShow: true,
			lessonType,
			formLessonDesc: '',
		});

	},

	bindLessonCmpt: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let idx = this.data.curIdx;

		let dataList = this.data.dataList;
		let id = dataList.list[idx].USER_MINI_OPENID;

		let cnt = Math.abs(Number(this.data.formLessonChangeCnt.trim()));
		if (!cnt) return pageHelper.showModal('课时数不能为空或者小于等于0');

		let desc = this.data.formLessonDesc;
		if (!desc) return pageHelper.showModal('请填写说明');
		let type = this.data.lessonType;

		let params = {
			id,
			cnt,
			type,
			desc
		}

		try {
			await cloudHelper.callCloudSumbit('admin/meet_change_course', params).then(res => {

				this.setData({
					['dataList.list[' + idx + '].USER_COURSE_TOTAL_CNT']: res.data.total,
					['dataList.list[' + idx + '].USER_COURSE_USED_CNT']: res.data.used,
					lessonModalShow: false,
					formLessonChangeCnt: '',
					curIdx: -1,
					lessonType: 1,
					formLessonDesc: ''
				});
				pageHelper.showNoneToast(type == 1 ? '课时增加成功' : '课时减少成功');
			});

		}
		catch (e) {
			console.log(e);
		}
	},

	bindStatLessonTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let idx = pageHelper.dataset(e, 'idx');

		let dataList = this.data.dataList;
		let userId = dataList.list[idx].USER_MINI_OPENID;


		let params = {
			userId
		}

		try {
			await cloudHelper.callCloudSumbit('admin/stat_user_course', params).then(res => {
				this.setData({
					['dataList.list[' + idx + '].USER_COURSE_TOTAL_CNT']: res.data.total,
					['dataList.list[' + idx + '].USER_COURSE_USED_CNT']: res.data.used,
				});
				pageHelper.showSuccToast('统计完成');
			});

		}
		catch (err) {
			console.error(err);
		}
	},

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/user_del', params, opts).then(res => {

					pageHelper.delListNode(id, this.data.dataList.list, 'USER_MINI_OPENID');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},


	bindClearReasonTap: function (e) {
		this.setData({
			formReason: ''
		})
	},

	bindCheckTap: function (e) {
		let curIdx = pageHelper.dataset(e, 'idx');
		this.setData({
			formReason: cacheHelper.get(CACHE_USER_CHECK_REASON) || '',
			curIdx,
			checkModalShow: true,
		});
	},

	bindCheckCmpt: async function () {
		let e = {
			currentTarget: {
				dataset: {
					status: 8,
					idx: this.data.curIdx
				}
			}
		}
		cacheHelper.set(CACHE_USER_CHECK_REASON, this.data.formReason, 86400 * 365);
		await this.bindStatusTap(e);
	},

	bindStatusTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let status = pageHelper.dataset(e, 'status');

		let idx = Number(pageHelper.dataset(e, 'idx'));

		let dataList = this.data.dataList;
		let id = dataList.list[idx].USER_MINI_OPENID;

		let params = {
			id,
			status,
			reason: this.data.formReason
		}

		let cb = async () => {
			try {
				await cloudHelper.callCloudSumbit('admin/user_status', params).then(res => {
					let sortIndex = this.selectComponent('#cmpt-comm-list').getSortIndex();

					if (sortIndex != -1 && sortIndex != 5 && !this.data.search) { // 全部或者检索的结果
						dataList.list.splice(idx, 1);
						dataList.total--;
						this.setData({
							dataList: this.data.dataList
						});
					} else {
						let data1Name = 'dataList.list[' + idx + '].USER_CHECK_REASON';
						let data2Name = 'dataList.list[' + idx + '].USER_STATUS';
						this.setData({
							[data1Name]: this.data.formReason,
							[data2Name]: status
						});
					}

					this.setData({
						checkModalShow: false,
						formReason: '',
						curIdx: -1,
					});
					pageHelper.showSuccToast('操作成功');
				});
			} catch (e) {
				console.log(e);
			}
		}

		if (status == 8) {
			pageHelper.showConfirm('该用户审核不通过，用户修改资料后可重新提交审核', cb)
		}
		else
			pageHelper.showConfirm('确认执行此操作?', cb);
	},

	_getSearchMenu: async function () {

		let sortItems1 = [
			{ label: '注册时间', type: '', value: '' },
			{ label: '注册时间从早到晚', type: 'sort', value: 'USER_ADD_TIME|asc' },
			{ label: '注册时间从晚到早', type: 'sort', value: 'USER_ADD_TIME|desc' },
		];
		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '正常', type: 'status', value: 1 },
			{ label: '禁用', type: 'status', value: 9 },
			{ label: '剩余课时▽', type: 'sort', value: 'USER_COURSE_TOTAL_CNT|desc' },
			{ label: '剩余课时△', type: 'sort', value: 'USER_COURSE_TOTAL_CNT|asc' },
			{ label: '已用课时▽', type: 'sort', value: 'USER_COURSE_USED_CNT|desc' },
			{ label: '已用课时△', type: 'sort', value: 'USER_COURSE_USED_CNT|asc' }, 

		]

		if (projectSetting.USER_REG_CHECK) {
			sortMenus = sortMenus.concat([
				{ label: '待审核', type: 'status', value: 0 },
				{ label: '审核未过', type: 'status', value: 8 }
			]);
		}
		this.setData({
			search: '',
			sortItems: [sortItems1],
			sortMenus,
			isLoad: true
		})


	}

})