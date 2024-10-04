module.exports = { //lesson
	PROJECT_COLOR: '#FF4343',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#FF4343',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
	],

	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftpic' },
	],
	NEWS_FIELDS: [

	],

	MEET_NAME: '老师',
	MEET_CATE: [
		{ id: 1, title: '健身', style: 'leftbig1' },
		{ id: 2, title: '瑜伽', style: 'leftbig1' },
		{ id: 3, title: '书法美术', style: 'leftbig1' },
		{ id: 4, title: '培训班', style: 'leftbig1' },
		{ id: 5, title: '早教', style: 'leftbig1' },
		{ id: 6, title: '声乐器乐', style: 'leftbig1' },
		{ id: 7, title: '舞蹈', style: 'leftbig1' },
		{ id: 8, title: '游泳', style: 'leftbig1' },

	],
	MEET_CAN_NULL_TIME: false, // 是否允许有无时段的日期保存和展示
	MEET_FIELDS: [
		{ mark: 'coursecnt', title: '每次扣课数', type: 'int', must: true },
		{ mark: 'tag', title: '特点标签', type: 'rows', ext: { titleName: '标签', maxCnt: 5, minCnt: 0 }, must: false },
		{ mark: 'content', title: '详情', type: 'content', must: true },
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
	],

	MEET_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, min: 2, max: 30, edit: false },
		{ mark: 'phone', type: 'text', len: 11, title: '手机号', must: true, edit: false },
	],

	// 时间默认设置
	MEET_NEW_NODE: { mark: 'mark-no', start: '10:00', end: '10:59' },
	MEET_NEW_NODE_DAY: [
		{ mark: 'mark-am', start: '09:00', end: '11:59' },
		{ mark: 'mark-pm', start: '14:00', end: '17:59' }
	],


}