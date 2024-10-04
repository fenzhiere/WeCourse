/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const NewsModel = require('../model/news_model.js');
const MeetModel = require('../model/meet_model.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {
		let where = {
			NEWS_STATUS: 1
		};
		let orderBy = {
			'NEWS_VOUCH': 'desc',
			'NEWS_ORDER': 'asc',
			'NEWS_ADD_TIME': 'desc'
		}
		let fields = 'NEWS_TITLE,NEWS_CATE_NAME,NEWS_PIC,NEWS_DESC,NEWS_ADD_TIME';
		let newsList = await NewsModel.getAll(where, fields, orderBy, 5);
		for (let k = 0; k < newsList.length; k++) {
			newsList[k].NEWS_ADD_TIME = timeUtil.timestamp2Time(newsList[k].NEWS_ADD_TIME, 'Y-M-D');
		}


		where = {
			MEET_STATUS: 1
		};
		orderBy = {
			'MEET_VOUCH': 'desc',
			'MEET_ORDER': 'asc',
			'MEET_ADD_TIME': 'desc'
		}
		fields = 'MEET_TITLE,MEET_CATE_NAME,MEET_OBJ.cover,MEET_OBJ.level';
		let meetList = await MeetModel.getAll(where, fields, orderBy, 10);
		for (let k = 0; k < meetList.length; k++) {
			meetList[k]['MEET_OBJ'].level = Number(meetList[k]['MEET_OBJ'].level);
		}

		return { newsList, meetList }
	}
}

module.exports = HomeService;