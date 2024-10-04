/**
 * Notes: 课时变动记录实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-03-08 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');
class CourseModel extends BaseProjectModel { }

// 集合名
CourseModel.CL = BaseProjectModel.C('course');

CourseModel.DB_STRUCTURE = {
	_pid: 'string|true',
	COURSE_ID: 'string|true',


	COURSE_USER_ID: 'string|true|comment=用户ID',

	COURSE_MEET_ID: 'string|false|comment=老师项目PK',

	COURSE_DESC: 'string|false|comment=备注',

	COURSE_TYPE: 'int|true|default=1|comment=类型 0=增加,1=减少', 

	COURSE_CHANGE_CNT: 'int|true|default=0|comment=当变动课时数(可正负)', 

	COURSE_ADD_TIME: 'int|true',
	COURSE_ADD_IP: 'string|false',

	COURSE_EDIT_TIME: 'int|true',
	COURSE_EDIT_IP: 'string|false',
}

// 字段前缀
CourseModel.FIELD_PREFIX = "COURSE_";

/**
 * 类型 0=增加,1=减少
 */
CourseModel.TYPE = {
	REDUCE: 0,
	ADD: 1
}



module.exports = CourseModel;