/**
 * Notes: 模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-08 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');
const AdminMeetService = require('../../service/admin/admin_meet_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const MeetModel = require('../../model/meet_model.js');
const contentCheck = require('../../../../framework/validate/content_check.js');

class AdminMeetController extends BaseProjectAdminController {

	async statUserCourse() {
		await this.isAdmin();

		let rules = {
			userId: 'must|string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.statUserCourse(input.userId);
	}

	async changeCourse() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.changeCourse(input.id, input.type, input.cnt, input.desc);
	}

	async getHasDayByMonth() {
		await this.isAdmin();

		let rules = {
			meetId: 'must|id',
			month: 'must|string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.getHasDayByMonth(input.meetId, input.month);
	}

	async joinDayTime() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.joinDayTime(input.mobile, input.dayId);
	}

	async getDayAllTime() {
		await this.isAdmin();

		let rules = {
			meetId: 'must|id',
			day: 'must|date',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.getDayAllTime(input.meetId, input.day);
	}

	async insertDayTime() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.insertDayTime(input);
	}

	async editDayTime() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.editDayTime(input);
	}

	// 时段删除
	async delDayTime() {
		await this.isAdmin();

		let rules = {
			id: 'must|id'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.delDayTime(input.id);
	}

	/** 排课删除 */
	async delJoin() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			joinId: 'must|id'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.delJoin(input.joinId);
	}

	/** 排序 */
	async sortMeet() { // 数据校验
		await this.isAdmin();

		let rules = {
			meetId: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		await service.sortMeet(input.meetId, input.sort);
	}

	/** 首页设定 */
	async vouchMeet() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		await service.vouchMeet(input.id, input.vouch);
	}

	/** 状态修改 */
	async statusMeet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			meetId: 'must|id',
			status: 'must|int|in:0,1,9,10',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await MeetModel.getOneField(input.meetId, 'MEET_TITLE');

		let service = new AdminMeetService();
		await service.statusMeet(input.meetId, input.status);

		if (title)
			this.logOther('修改了《' + title + '》的状态为：' + MeetModel.getDesc('STATUS', input.status));
	}


	/** 项目列表 */
	async getAdminMeetList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int|default=10',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let result = await service.getAdminMeetList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {

			list[k].MEET_ADD_TIME = timeUtil.timestamp2Time(list[k].MEET_ADD_TIME);
			list[k].MEET_EDIT_TIME = timeUtil.timestamp2Time(list[k].MEET_EDIT_TIME);

		}
		result.list = list;

		return result;

	}

	/** 名单列表 */
	async getJoinList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			meetId: 'must|id',
			dayId: 'id',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int|default=10',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let result = await service.getJoinList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].JOIN_ADD_TIME);

		}
		result.list = list;

		return result;

	}

	/** 发布 */
	async insertMeet() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminMeetService();
		let result = await service.insertMeet(this._adminId, input);


		this.logOther('创建了新《' + input.title + '》');

		return result;

	}


	/** 获取信息用于编辑修改 */
	async getMeetDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let detail = await service.getMeetDetail(input.id);
		return detail;
	}

	/** 编辑 */
	async editMeet() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminMeetService();
		let result = service.editMeet(input);


		this.logOther('修改了《' + input.title + '》');

		return result;
	}


	/** 更新图片信息 */
	async updateMeetForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminMeetService();
		return await service.updateMeetForms(input);
	}


	/** 删除 */
	async delMeet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			meetId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await MeetModel.getOneField(input.meetId, 'MEET_TITLE');

		let service = new AdminMeetService();
		await service.delMeet(input.meetId);


		if (title)
			this.logOther('删除了《' + title + '》');
	}


	// 删除某时段记录
	async cancelJoinByTimeMark() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			meetId: 'must|id',
			timeMark: 'must|string',
			reason: 'string'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.cancelJoinByTimeMark(input.meetId, input.timeMark, input.reason);
	}

	/** 创建模板 */
	async insertMeetTemp() {
		await this.isAdmin();

		let rules = {
			name: 'must|string|min:1|max:20|name=名称',
			times: 'must|array|name=模板时段',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let result = await service.insertMeetTemp(input);

		return result;

	}

	/** 选择模板 */
	async selectMeetTemp() {
		await this.isAdmin();

		let rules = {
			tempId: 'must|id',
			meetId: 'must|id',
			day: 'must|string'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return service.selectMeetTemp(input);
	}

	/** 模板列表 */
	async getMeetTempList() {
		await this.isAdmin();

		let service = new AdminMeetService();
		let result = await service.getMeetTempList();

		return result;
	}

	/** 删除模板 */
	async delMeetTemp() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		await service.delMeetTemp(input.id);

	}


	/**************排课数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async joinDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();

		if (input.isDel === 1)
			await service.deleteJoinDataExcel(); //先删除

		return await service.getJoinDataURL();
	}

	/** 导出数据 */
	async joinDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.exportJoinDataExcel(input);
	}

	/** 删除导出的排课数据文件 */
	async joinDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.deleteJoinDataExcel();
	}


}

module.exports = AdminMeetController;