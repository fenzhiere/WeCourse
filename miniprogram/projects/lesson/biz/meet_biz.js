/**
 * Notes: 排课模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-10 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js'); 
const projectSetting = require('../public/project_setting.js');

class MeetBiz extends BaseBiz {
 
	/** 取得分类 */
	static getCateList() {
		let cateList = projectSetting.MEET_CATE;
		let arr = [];
		for (let k = 0; k < cateList.length; k++) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',
				val: cateList[k].id, //for options
				value: cateList[k].id, //for list
			})
		}
		return arr;
	}

	static setCateTitle() {
		return BaseBiz.setCateTitle(projectSetting.MEET_CATE);

	}

}

module.exports = MeetBiz;