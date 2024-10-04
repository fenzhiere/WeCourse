/**
 * Notes: 排课模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-10 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const MeetModel = require('../model/meet_model.js');
const JoinModel = require('../model/join_model.js');
const CourseModel = require('../model/course_model.js');
const LogUtil = require('../../../framework/utils/log_util.js');
const projectConfig = require('../public/project_config.js');


class MeetService extends BaseProjectService {

	constructor() {
		super();
		this._log = new LogUtil(projectConfig.MEET_LOG_LEVEL);
	}

	/**
	 * 抛出异常
	 * @param {*} msg 
	 * @param {*} code 
	 */
	AppError(msg) {
		this._log.error(msg);
		super.AppError(msg);
	}

	async getOneCourseList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'COURSE_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			COURSE_USER_ID: userId
		}; 
 

		if (util.isDefined(search) && search) {
			where['COURSE_DESC'] = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {

				case 'type': {
					if (sortVal) where.COURSE_TYPE = Number(sortVal);
					break;
				}

			}
		}
		let result = await CourseModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}


	/**  详情 */
	async viewMeet(meetId) {

		let fields = '*';

		let where = {
			_id: meetId,
			MEET_STATUS: ['in', [MeetModel.STATUS.COMM, MeetModel.STATUS.OVER]]
		}
		let meet = await MeetModel.getOne(where, fields);
		if (!meet) return null;

		return meet;
	}


	/** 取得排课分页列表 */
	async getMeetList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		cateId, //分类查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'MEET_ORDER': 'asc',
			'MEET_ADD_TIME': 'desc'
		};
		let fields = 'MEET_TITLE,MEET_OBJ,MEET_CATE_NAME,MEET_CATE_ID';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (cateId && cateId !== '0') where.and.MEET_CATE_ID = cateId;

		where.and.MEET_STATUS = ['in', [MeetModel.STATUS.COMM, MeetModel.STATUS.OVER]]; // 状态  

		if (util.isDefined(search) && search) {
			where.or = [
				{ MEET_TITLE: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'NEWS_ADD_TIME');
					break;
				}
				case 'cateId': {
					if (sortVal) where.and.MEET_CATE_ID = String(sortVal);
					break;
				}
			}
		}
		let result = await MeetModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}


	/** 取得我的排课详情 */
	async getMyJoinDetail(userId, joinId) {

		let fields = '*';

		let where = {
			_id: joinId,
			JOIN_USER_ID: userId
		};
		return await JoinModel.getOne(where, fields);
	}

	/** 取得我的排课分页列表 */
	async getMyJoinList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'JOIN_DAY': 'desc',
			'JOIN_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			JOIN_USER_ID: userId
		};
		 

		if (util.isDefined(search) && search) {
			where['JOIN_MEET_TITLE'] = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {

				case 'cateId': {
					if (sortVal) where.JOIN_MEET_CATE_ID = String(sortVal);
					break;
				}
				case 'today': {
					where.JOIN_DAY = timeUtil.time('Y-M-D');
					break;
				}
				case 'tomorrow': {
					where.JOIN_DAY = timeUtil.time('Y-M-D', 86400);
					break;
				}
				case 't3': { 
					where.JOIN_DAY = timeUtil.time('Y-M-D', 86400 * 2);
					break;
				}
				case 'all': { //所有 
					break;
				}

			}
		}
		let result = await JoinModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

	/** 取得我的某日排课列表 */
	async getMyJoinSomeday(userId, day) {

		let fields = 'JOIN_MEET_ID,JOIN_MEET_TITLE,JOIN_MEET_DAY,JOIN_MEET_TIME_START,JOIN_MEET_TIME_END,JOIN_STATUS,JOIN_ADD_TIME';

		let where = {
			JOIN_USER_ID: userId,
			JOIN_MEET_DAY: day
		};
		//where.MEET_STATUS = ['in', [MeetModel.STATUS.COMM, MeetModel.STATUS.OVER]]; // 状态  

		let orderBy = {
			'JOIN_MEET_TIME_START': 'asc',
			'JOIN_ADD_TIME': 'desc'
		}

		return await JoinModel.getAll(where, fields, orderBy);


	}
}

module.exports = MeetService;