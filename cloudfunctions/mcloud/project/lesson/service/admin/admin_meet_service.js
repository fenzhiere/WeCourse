/**
 * Notes: 后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-08 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const MeetService = require('../meet_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');;
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const md5Lib = require('../../../../framework/lib/md5_lib.js');

const MeetModel = require('../../model/meet_model.js');
const UserModel = require('../../model/user_model.js');
const JoinModel = require('../../model/join_model.js');
const DayModel = require('../../model/day_model.js');
const TempModel = require('../../model/temp_model.js');

const exportUtil = require('../../../../framework/utils/export_util.js');
const CourseModel = require('../../model/course_model.js');


// 导出报名数据KEY
const EXPORT_JOIN_DATA_KEY = 'EXPORT_JOIN_DATA';

class AdminMeetService extends BaseProjectAdminService {

	// 用户统计
	async statUserCourse(userId) {
		let total = await CourseModel.sum({ COURSE_USER_ID: userId, COURSE_TYPE: 1 }, 'COURSE_CHANGE_CNT');
		let used = await CourseModel.sum({ COURSE_USER_ID: userId, COURSE_TYPE: 0 }, 'COURSE_CHANGE_CNT');
		used = Math.abs(used);

		let data = {
			USER_COURSE_USED_CNT: used,
			USER_COURSE_TOTAL_CNT: total - used,
			USER_COURSE_TIME: this._timestamp
		};

		await UserModel.edit({ USER_MINI_OPENID: userId }, data);

		let user = await UserModel.getOne({ USER_MINI_OPENID: userId });
		if (!user) this.AppError('用户不存在');

		return { total: user.USER_COURSE_TOTAL_CNT, used: user.USER_COURSE_USED_CNT };
	}


	// 课程变动
	async changeCourse() {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 给用户排课
	async joinDayTime() {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 统计某个时段的人数
	async statDayTimeCnt(dayId) {
		let joinCnt = await JoinModel.count({ JOIN_DAY_ID: dayId });
		await DayModel.edit(dayId, { DAY_CNT: joinCnt });
	}

	// 取得某天所有时段
	async getDayAllTime(meetId, day) {
		let where = {
			DAY_MEET_ID: meetId,
			DAY_DATE: day,
		};
		let orderBy = {
			DAY_START: 'asc'
		}

		return await DayModel.getAll(where, 'DAY_DATE,DAY_START,DAY_END,DAY_CNT', orderBy);
	}

	// 给某天插入时段
	async insertDayTime() {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 修改某天的某个时段
	async editDayTime() {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 删除某一时间节点
	async delDayTime(id) {

		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}



	// 更新forms信息
	async updateMeetForms({
		id,
		hasImageForms
	}) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**添加 */
	async insertMeet() {

		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}




	/**删除数据 */
	async delMeet(id) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取信息 */
	async getMeetDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let meet = await MeetModel.getOne(where, fields);
		if (!meet) return null;

		let meetService = new MeetService();

		return meet;
	}


	/**更新数据 */
	async editMeet() {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');


	}

	/**名单分页列表 */
	async getJoinList({
		meetId,
		dayId,
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
			'JOIN_DAY_START': 'desc',

			'JOIN_ADD_TIME': 'desc'
		};
		let fields = 'JOIN_COURSE_CNT,JOIN_DAY,JOIN_DAY_START,JOIN_DAY_END,JOIN_ID,JOIN_REASON,JOIN_USER_ID,JOIN_MEET_ID,JOIN_MEET_TITLE,JOIN_MEET_DAY,JOIN_MEET_TIME_START,JOIN_MEET_TIME_END,JOIN_USER_NAME,JOIN_USER_MOBILE,JOIN_STATUS,JOIN_ADD_TIME';

		let where = {
			JOIN_MEET_ID: meetId
		};

		if (dayId) where.JOIN_DAY_ID = dayId;

		if (util.isDefined(search) && search) {
			if (search.includes('#')) {
				let arr = search.split('#');
				where.JOIN_DAY = ['between', arr[0], arr[1]];
			}
			else {
				where.JOIN_USER_MOBILE = {
					$regex: '.*' + search,
					$options: 'i'
				};
			}


		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					// 按类型
					sortVal = Number(sortVal);
					if (sortVal == 1099) //取消的2种
						where.JOIN_STATUS = ['in', [10, 99]]
					else
						where.JOIN_STATUS = Number(sortVal);
					break;
			}
		}

		return await JoinModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**项目分页列表 */
	async getAdminMeetList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'MEET_ORDER': 'asc',
			'MEET_ADD_TIME': 'desc'
		};
		let fields = 'MEET_CATE_ID,MEET_CATE_NAME,MEET_TITLE,MEET_STATUS,MEET_ADD_TIME,MEET_EDIT_TIME,MEET_ORDER,MEET_VOUCH,MEET_QR,MEET_OBJ.coursecnt';

		let where = {};
		if (util.isDefined(search) && search) {
			where.MEET_TITLE = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status': {
					// 按类型
					where.MEET_STATUS = Number(sortVal);
					break;
				}
				case 'cateId': {
					// 按类型
					where.MEET_CATE_ID = sortVal;
					break;
				}
				case 'vouch': {
					where.MEET_VOUCH = 1;
					break;
				}
				case 'top': {
					where.MEET_ORDER = 0;
					break;
				}
			}
		}

		return await MeetModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/** 删除排课 */
	async delJoin(joinId) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**修改项目状态 */
	async statusMeet(id, status) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶排序设定 */
	async sortMeet(id, sort) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**首页设定 */
	async vouchMeet(id, vouch) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	//##################模板
	/**添加模板 */
	async insertMeetTemp({
		name,
		times,
	}, meetId = 'admin') {

		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**选择模板 */
	async selectMeetTemp({ tempId, meetId, day }) {

		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**删除数据 */
	async delMeetTemp(id, meetId = 'admin') {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**模板列表 */
	async getMeetTempList(meetId = 'admin') {
		let orderBy = {
			'TEMP_ADD_TIME': 'desc'
		};
		let fields = 'TEMP_NAME,TEMP_TIMES';

		let where = {
			TEMP_MEET_ID: meetId
		};
		return await TempModel.getAll(where, fields, orderBy);
	}

	// #####################导出报名数据
	/**获取报名数据 */
	async getJoinDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_JOIN_DATA_KEY);
	}

	/**删除报名数据 */
	async deleteJoinDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_JOIN_DATA_KEY);
	}

	/**导出报名数据 */
	async exportJoinDataExcel({
		meetId,
		startDay,
		endDay
	}) {
		this.AppError('[排课]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminMeetService;