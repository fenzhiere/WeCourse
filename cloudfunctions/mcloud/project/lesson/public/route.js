/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2020-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',

	'home/setup_get': 'home_controller@getSetup',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',

	// 服务者
	'work/home': 'work/work_home_controller@workHome',
	'work/login': 'work/work_home_controller@workLogin',
	'work/pwd': 'work/work_home_controller@pwdWork#demo',
	'work/meet_detail': 'work/work_meet_controller@getMeetDetail',
	'work/meet_edit': 'work/work_meet_controller@editMeet#demo',
	'work/meet_update_forms': 'work/work_meet_controller@updateMeetForms#demo',

	'work/meet_temp_insert': 'work/work_meet_controller@insertMeetTemp#demo',
	'work/meet_temp_list': 'work/work_meet_controller@getMeetTempList',
	'work/meet_temp_del': 'work/work_meet_controller@delMeetTemp#demo',
	'work/meet_temp_select': 'work/work_meet_controller@selectMeetTemp#demo', 

		
	'work/meet_has_day': 'work/work_meet_controller@getHasDayByMonth',
	'work/meet_join_day_time': 'work/work_meet_controller@joinDayTime#demo',
	'work/meet_day_all_time': 'work/work_meet_controller@getDayAllTime',
	'work/meet_insert_day_time': 'work/work_meet_controller@insertDayTime#demo',
	'work/meet_edit_day_time': 'work/work_meet_controller@editDayTime#demo',
	'work/meet_del_day_time': 'work/work_meet_controller@delDayTime#demo',
 
	'work/meet_join_list': 'work/work_meet_controller@getJoinList',
	'work/join_del': 'work/work_meet_controller@delJoin#demo',


	// 管理
	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog#demo',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup#demo',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup#demo',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',


	// 内容  
	'home/list': 'home_controller@getHomeList',
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',


	// 排课
	'meet/list': 'meet_controller@getMeetList', 
	'meet/view': 'meet_controller@viewMeet',
	'meet/one_course_list': 'meet_controller@getOneCourseList',

	'meet/my_join_list': 'meet_controller@getMyJoinList', 
	'meet/my_join_detail': 'meet_controller@getMyJoinDetail',
	'meet/my_join_someday': 'meet_controller@getMyJoinSomeday',

	'admin/stat_user_course': 'admin/admin_meet_controller@statUserCourse',
	'admin/meet_change_course': 'admin/admin_meet_controller@changeCourse#demo',

	'admin/meet_has_day': 'admin/admin_meet_controller@getHasDayByMonth',
	'admin/meet_join_day_time': 'admin/admin_meet_controller@joinDayTime#demo',
	'admin/meet_day_all_time': 'admin/admin_meet_controller@getDayAllTime',
	'admin/meet_insert_day_time': 'admin/admin_meet_controller@insertDayTime#demo',
	'admin/meet_edit_day_time': 'admin/admin_meet_controller@editDayTime#demo',
	'admin/meet_del_day_time': 'admin/admin_meet_controller@delDayTime#demo',

	'admin/meet_list': 'admin/admin_meet_controller@getAdminMeetList',
	'admin/meet_join_list': 'admin/admin_meet_controller@getJoinList',
	'admin/join_del': 'admin/admin_meet_controller@delJoin#demo',
	'admin/meet_insert': 'admin/admin_meet_controller@insertMeet#demo',
	'admin/meet_detail': 'admin/admin_meet_controller@getMeetDetail',
	'admin/meet_edit': 'admin/admin_meet_controller@editMeet#demo',
	'admin/meet_update_forms': 'admin/admin_meet_controller@updateMeetForms#demo',
	'admin/meet_del': 'admin/admin_meet_controller@delMeet#demo',
	'admin/meet_sort': 'admin/admin_meet_controller@sortMeet#demo',
	'admin/meet_vouch': 'admin/admin_meet_controller@vouchMeet#demo',
	'admin/meet_status': 'admin/admin_meet_controller@statusMeet#demo',
	'admin/meet_cancel_time_join': 'admin/admin_meet_controller@cancelJoinByTimeMark#demo', 

	'admin/meet_temp_insert': 'admin/admin_meet_controller@insertMeetTemp#demo',
	'admin/meet_temp_list': 'admin/admin_meet_controller@getMeetTempList',
	'admin/meet_temp_del': 'admin/admin_meet_controller@delMeetTemp#demo',
	'admin/meet_temp_select': 'admin/admin_meet_controller@selectMeetTemp#demo',

	'admin/join_data_get': 'admin/admin_meet_controller@joinDataGet',
	'admin/join_data_export': 'admin/admin_meet_controller@joinDataExport',
	'admin/join_data_del': 'admin/admin_meet_controller@joinDataDel',

}