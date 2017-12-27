import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models.map(m => import(`../models/${m}.js`)),
    component,
  });

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () =>
      import('../layouts/BasicLayout')
    ),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      // {
      //   name: 'Dashboard',
      //   icon: 'dashboard',
      //   path: 'dashboard',
      //   children: [
      //     {
      //       name: '分析页',
      //       path: 'analysis',
      //       component: dynamicWrapper(app, ['chart'], () =>
      //         import('../routes/Dashboard/Analysis')
      //       ),
      //     },
      //     {
      //       name: '监控页',
      //       path: 'monitor',
      //       component: dynamicWrapper(app, ['monitor'], () =>
      //         import('../routes/Dashboard/Monitor')
      //       ),
      //     },
      //     {
      //       name: '工作台',
      //       path: 'workplace',
      //       component: dynamicWrapper(
      //         app,
      //         ['project', 'activities', 'chart'],
      //         () => import('../routes/Dashboard/Workplace')
      //       ),
      //     },
      //   ],
      // },
      // {
      //   name: '用户列表',
      //   path: 'user-list',
      //   icon: 'user',
      //   exact: true,
      //   component: dynamicWrapper(app, ['user'], () =>
      //     import('../routes/User/UserList')
      //   ),
      // },
      // {
      //   name: '用户详情',
      //   path: 'user-list/:id',
      //   icon: 'user',
      //   exact: true,
      //   isHide: true,
      //   component: dynamicWrapper(app, ['user'], () =>
      //     import('../routes/User/UserDetail')
      //   ),
      // },
      // {
      //   name: '表单页',
      //   path: 'form',
      //   icon: 'form',
      //   children: [
      //     {
      //       name: '基础表单',
      //       path: 'basic-form',
      //       component: dynamicWrapper(app, ['form'], () =>
      //         import('../routes/Forms/BasicForm')
      //       ),
      //     },
      //     {
      //       name: '分步表单',
      //       path: 'step-form',
      //       component: dynamicWrapper(app, ['form'], () =>
      //         import('../routes/Forms/StepForm')
      //       ),
      //       children: [
      //         {
      //           path: 'confirm',
      //           component: dynamicWrapper(app, ['form'], () =>
      //             import('../routes/Forms/StepForm/Step2')
      //           ),
      //         },
      //         {
      //           path: 'result',
      //           component: dynamicWrapper(app, ['form'], () =>
      //             import('../routes/Forms/StepForm/Step3')
      //           ),
      //         },
      //       ],
      //     },
      //     {
      //       name: '高级表单',
      //       path: 'advanced-form',
      //       component: dynamicWrapper(app, ['form'], () =>
      //         import('../routes/Forms/AdvancedForm')
      //       ),
      //     },
      //   ],
      // },
      // {
      //   name: '列表页',
      //   path: 'list',
      //   icon: 'table',
      //   children: [
      //     {
      //       name: '查询表格',
      //       path: 'table-list',
      //       component: dynamicWrapper(app, ['rule'], () =>
      //         import('../routes/List/TableList')
      //       ),
      //     },
      //     {
      //       name: '标准列表',
      //       path: 'basic-list',
      //       component: dynamicWrapper(app, ['list'], () =>
      //         import('../routes/List/BasicList')
      //       ),
      //     },
      //     {
      //       name: '卡片列表',
      //       path: 'card-list',
      //       component: dynamicWrapper(app, ['list'], () =>
      //         import('../routes/List/CardList')
      //       ),
      //     },
      //     {
      //       name: '搜索列表（项目）',
      //       path: 'cover-card-list',
      //       component: dynamicWrapper(app, ['list'], () =>
      //         import('../routes/List/CoverCardList')
      //       ),
      //     },
      //     {
      //       name: '搜索列表（应用）',
      //       path: 'filter-card-list',
      //       component: dynamicWrapper(app, ['list'], () =>
      //         import('../routes/List/FilterCardList')
      //       ),
      //     },
      //     {
      //       name: '搜索列表（文章）',
      //       path: 'search',
      //       component: dynamicWrapper(app, ['list'], () =>
      //         import('../routes/List/SearchList')
      //       ),
      //     },
      //   ],
      // },
      // {
      //   name: '详情页',
      //   path: 'profile',
      //   icon: 'profile',
      //   children: [
      //     {
      //       name: '基础详情页',
      //       path: 'basic',
      //       component: dynamicWrapper(app, ['profile'], () =>
      //         import('../routes/Profile/BasicProfile')
      //       ),
      //     },
      //     {
      //       name: '高级详情页',
      //       path: 'advanced',
      //       component: dynamicWrapper(app, ['profile'], () =>
      //         import('../routes/Profile/AdvancedProfile')
      //       ),
      //     },
      //   ],
      // },
      // {
      //   name: '结果',
      //   path: 'result',
      //   icon: 'check-circle-o',
      //   children: [
      //     {
      //       name: '成功',
      //       path: 'success',
      //       component: dynamicWrapper(app, [], () =>
      //         import('../routes/Result/Success')
      //       ),
      //     },
      //     {
      //       name: '失败',
      //       path: 'fail',
      //       component: dynamicWrapper(app, [], () =>
      //         import('../routes/Result/Error')
      //       ),
      //     },
      //   ],
      // },
      // {
      //   name: '异常',
      //   path: 'exception',
      //   icon: 'warning',
      //   children: [
      //     {
      //       name: '403',
      //       path: '403',
      //       component: dynamicWrapper(app, [], () =>
      //         import('../routes/Exception/403')
      //       ),
      //     },
      //     {
      //       name: '404',
      //       path: '404',
      //       component: dynamicWrapper(app, [], () =>
      //         import('../routes/Exception/404')
      //       ),
      //     },
      //     {
      //       name: '500',
      //       path: '500',
      //       component: dynamicWrapper(app, [], () =>
      //         import('../routes/Exception/500')
      //       ),
      //     },
      //   ],
      // },
      {
        name: '数据管理',
        path: 'dataManage',
        icon: 'warning',
        children: [
          {
            name: '培训班次管理',
            path: 'classManage',
            component: dynamicWrapper(app, [], () => import('../routes/DataManage/ClassManage/ClassManage')),
          },
          {
            name: '学员信息管理',
            path: 'studentInfoManage',
            component: dynamicWrapper(app, [], () => import('../routes/DataManage/StudentInfoManage/StudentInfoManage')),
          },
          {
            name: '教师信息管理',
            path: 'teacherInfoManage',
            component: dynamicWrapper(app, [], () => import('../routes/DataManage/TeacherInfoManage/TeacherInfoManage')),
          },
          {
            name: '标签参数管理',
            path: 'labelParamsManage',
            component: dynamicWrapper(app, [], () => import('../routes/DataManage/LabelParamsManage/LabelParamsManage')),
          },
        ],
      },
      {
        name: '考试管理',
        path: 'testManage',
        icon: 'warning',
        children: [
          {
            name: '考试计划安排',
            path: 'testPlan',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/TestPlan/TestPlan')),
          },
          {
            name: '考生信息管理',
            path: 'examineeInfoManage',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/ExamineeInfoManage/ExamineeInfoManage')),
          },
          {
            name: '考试内容管理',
            path: 'testContentManage',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/TestContentManage/TestContentManage')),
          },
          {
            name: '考场管理',
            path: 'examinationRoomManage',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/ExaminationRoomManage/ExaminationRoomManage')),
          },
          {
            name: '考务人员管理',
            path: 'examinatersManage',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/ExaminatersManage/ExaminatersManage')),
          },
          {
            name: '考试成绩生成',
            path: 'testResultGenerate',
            component: dynamicWrapper(app, [], () => import('../routes/TestManage/TestResultGenerate/TestResultGenerate')),
          },
        ],
      },
      {
        name: '成绩管理',
        path: 'resultManage',
        icon: 'warning',
        children: [
          {
            name: '学生成绩管理',
            path: 'studentResultManage',
            component: dynamicWrapper(app, [], () => import('../routes/ResultManage/StudentResultManage/StudentResultManage')),
          },
        ],
      },
      {
        name: '题库管理',
        path: 'question',
        icon: 'warning',
        children: [
          {
            name: '操作题',
            path: 'operationQuestion',
            component: dynamicWrapper(app, ['question'], () => import('../routes/Question/OperationQuestion/OperationQuestion')),
          },
          {
            name: '单选题',
            path: 'radioQuestion',
            component: dynamicWrapper(app, ['question'], () => import('../routes/Question/RadioQuestion/RadioQuestion')),
          },
          {
            name: '判断题',
            path: 'judgeQuestion',
            component: dynamicWrapper(app, ['question'], () => import('../routes/Question/JudgeQuestion/JudgeQuestion')),
          },
        ],
      },
      {
        name: '试卷管理',
        path: 'paperManage',
        icon: 'warning',
        children: [
          {
            name: '出题规则',
            path: 'paperRules',
            component: dynamicWrapper(app, ['paperRules', 'question'], () => import('../routes/PaperManage/PaperRules/PaperRules')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            isHide: true,
            component: dynamicWrapper(app, ['login'], () =>
              import('../routes/User/Login')
            ),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () =>
              import('../routes/User/Register')
            ),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () =>
              import('../routes/User/RegisterResult')
            ),
          },
        ],
      },
    ],
  },
  // {
  //   component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
  //   layout: 'BlankLayout',
  //   children: {
  //     name: '使用文档',
  //     path: 'http://pro.ant.design/docs/getting-started',
  //     target: '_blank',
  //     icon: 'book',
  //   },
  // },
];
