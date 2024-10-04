/**
 * Notes: 报名实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-30 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class JoinModel extends BaseProjectModel {

}

// 集合名
JoinModel.CL = BaseProjectModel.C('join');

JoinModel.DB_STRUCTURE = {
	_pid: 'string|true',
	JOIN_ID: 'string|true',
	JOIN_DAY_ID: 'string|true',
 

	JOIN_COURSE_CNT: 'int|true|default=0',

	JOIN_USER_ID: 'string|true|comment=用户ID',
	JOIN_MEET_ID: 'string|true|comment=老师PK',
	JOIN_MEET_CATE_ID: 'string|true',
	JOIN_MEET_CATE_NAME: 'string|true',
	JOIN_MEET_TITLE: 'string|true|comment=项目',

	JOIN_DAY: 'string|true|comment=日期',
	JOIN_DAY_START: 'string|true|comment=时段开始',
	JOIN_DAY_END: 'string|true|comment=时段结束',

	JOIN_USER_NAME: 'string|true|comment=用户昵称',
	JOIN_USER_MOBILE: 'string|true|comment=联系电话',

	JOIN_STATUS: 'int|true|default=1|comment=状态 1=成功',

	JOIN_REASON: 'string|false',

	JOIN_ADD_TIME: 'int|true',
	JOIN_EDIT_TIME: 'int|true',
	JOIN_ADD_IP: 'string|false',
	JOIN_EDIT_IP: 'string|false',
};

// 字段前缀
JoinModel.FIELD_PREFIX = "JOIN_";
 

module.exports = JoinModel;