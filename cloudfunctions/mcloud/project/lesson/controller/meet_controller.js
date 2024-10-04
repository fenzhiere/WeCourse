/**
 * Notes: 排课模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-10 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const MeetService = require('../service/meet_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const JoinModel = require('../model/join_model.js');

class MeetController extends BaseProjectController {


	// 把列表转换为显示模式
	transMeetList(list) {
		let ret = [];
		for (let k = 0; k < list.length; k++) {
			let node = {};
			node.type = 'meet';
			node.id = list[k]._id;
			node.title = list[k].MEET_TITLE;
			node.desc = list[k].MEET_OBJ.desc;
			node.ext = list[k].openRule;
			node.pic = list[k].MEET_OBJ.cover;
			ret.push(node);
		}
		return ret;
	}

	async getOneCourseList() {

		// 数据校验
		let rules = {
			userId: 'string',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();

		let userId = input.userId;
		if (!userId) userId = this._userId;
 
		let result = await service.getOneCourseList(userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) { 
			list[k].COURSE_ADD_TIME = timeUtil.timestamp2Time(list[k].COURSE_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	} 

	/** 排课列表 */
	async getMeetList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			cateId: 'string',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();
		let result = await service.getMeetList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {  
		}

		//result.list = this.transMeetList(list);

		return result;

	}

	/** 我的排课列表 */
	async getMyJoinList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();
		let result = await service.getMyJoinList(this._userId, input);

		// 数据格式化
		let list = result.list;


		let now = timeUtil.time('Y-M-D h:m');

		for (let k = 0; k < list.length; k++) {

			list[k].JOIN_MEET_DAY = timeUtil.fmtDateCHN(list[k].JOIN_MEET_DAY) + ' (' + timeUtil.week(list[k].JOIN_MEET_DAY) + ')';

			 

			list[k].JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].JOIN_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	}

	/** 我的某日排课列表 */
	async getMyJoinSomeday() {
		// 数据校验
		let rules = {
			day: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();
		let list = await service.getMyJoinSomeday(this._userId, input.day);

		// 数据格式化  
		for (let k = 0; k < list.length; k++) {

		}

		return list;

	}

	/** 我的排课详情 */
	async getMyJoinDetail() {
		// 数据校验
		let rules = {
			joinId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();
		let join = await service.getMyJoinDetail(this._userId, input.joinId);
		if (join) {
 
			join.JOIN_STATUS_DESC = JoinModel.getDesc('STATUS', join.JOIN_STATUS);
			join.JOIN_ADD_TIME = timeUtil.timestamp2Time(join.JOIN_ADD_TIME); 
		}
		return join;

	} 
 

	/** 浏览排课信息 */
	async viewMeet() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MeetService();
		let meet = await service.viewMeet(input.id);

		if (meet) {
			meet.MEET_OBJ.level = Number(meet.MEET_OBJ.level);
			// 显示转换  
		}

		return meet;
	}

  

}

module.exports = MeetController;