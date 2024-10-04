/**
 * Notes: 排课日期设置实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-01-25 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class DayModel extends BaseProjectModel {

}

// 集合名
DayModel.CL = BaseProjectModel.C('day');

DayModel.DB_STRUCTURE = {
	_pid: 'string|true',
	DAY_ID: 'string|true',
	DAY_MEET_ID: 'string|true',
	DAY_START: 'string|true|comment=开始时间点hh:mm',
	DAY_END: 'string|true|comment=结束时间点hh:mm',

	DAY_DATE: 'string|true|comment=日期 yyyy-mm-dd', 

	DAY_CNT: 'int|true|default=0|comment=已约课人数',
	DAY_SUCC_CNT: 'int|true|default=0',  

	DAY_ADD_TIME: 'int|true',
	DAY_EDIT_TIME: 'int|true',
	DAY_ADD_IP: 'string|false',
	DAY_EDIT_IP: 'string|false',
};

// 字段前缀
DayModel.FIELD_PREFIX = "DAY_";



module.exports = DayModel;