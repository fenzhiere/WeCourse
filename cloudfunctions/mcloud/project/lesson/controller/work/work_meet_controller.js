/**
 * Notes:服务者控制器模块
 * Ver : CCMiniCloud Framework 2.0.3 ALL RIGHTS RESERVED BY cclinuX0730 (wechat)
 * Date: 2023-01-16 19:20:00 
 */

const BaseProjectWorkController = require('./base_project_work_controller.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const AdminMeetService = require('../../service/admin/admin_meet_service.js');

class WorkMeetController extends BaseProjectWorkController {


	/** 获取信息用于编辑修改 */
	async getMeetDetail() {
		await this.isWork();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let detail = await service.getMeetDetail(this._workId);
		return detail;
	}


	/** 编辑 */
	async editMeet() {
		await this.isWork();

		let rules = {
			id: 'must|id',
			title: 'must|string|min:2|max:50|name=标题',
			cateId: 'must|id|name=分类',
			cateName: 'must|string|name=分类',
			order: 'must|int|min:0|max:9999|name=排序号',
			phone: 'must|string|len:11|name=登录手机',
			password: 'string|min:6|max:30|name=登录密码',
			forms: 'array|name=表单'
		};

		// 取得数据
		let input = this.validateData(rules);
		input.id = this._workId;


		let service = new AdminMeetService();
		let result = service.editMeet(input);


		return result;
	}


	/** 更新图片信息 */
	async updateMeetForms() {
		await this.isWork();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);
		input.id = this._workId;


		let service = new AdminMeetService();
		return await service.updateMeetForms(input);
	}

	async getHasDayByMonth() {
		await this.isWork();

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
		await this.isWork();

		let rules = {
			dayId: 'must|id',
			mobile: 'must|mobile',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.joinDayTime(input.mobile, input.dayId);
	}

	async getDayAllTime() {
		await this.isWork();

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
		await this.isWork();

		let rules = {
			meetId: 'must|id',
			day: 'must|date',
			start: 'must|string',
			end: 'must|string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.insertDayTime(input);
	}

	async editDayTime() {
		await this.isWork();

		let rules = {
			id: 'must|id',
			meetId: 'must|id',
			day: 'must|date',
			start: 'must|string',
			end: 'must|string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.editDayTime(input);
	}

	// 时段删除
	async delDayTime() {
		await this.isWork();

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
		await this.isWork();

		// 数据校验
		let rules = {
			joinId: 'must|id'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		return await service.delJoin(input.joinId);
	}


	/** 创建模板 */
	async insertMeetTemp() {
		await this.isWork();

		let rules = {
			name: 'must|string|min:1|max:20|name=名称',
			times: 'must|array|name=模板时段',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		let result = await service.insertMeetTemp(input, this._workId);

		return result;

	}

	/** 选择模板 */
	async selectMeetTemp() {
		await this.isWork();

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
		await this.isWork();

		let service = new AdminMeetService();
		let result = await service.getMeetTempList(this._workId);

		return result;
	}

	/** 删除模板 */
	async delMeetTemp() {
		await this.isWork();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMeetService();
		await service.delMeetTemp(input.id, this._workId);

	}

	/** 名单列表 */
	async getJoinList() {
		await this.isWork();

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
		input.meetId = this._workId;

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

}

module.exports = WorkMeetController;