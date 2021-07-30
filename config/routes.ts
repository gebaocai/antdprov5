export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/index',
    name: 'index',
    icon: 'smile',
    component: './Index/',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    access: 'canAdmin',
    component: './system/user',
    routes: [
      {
        path: '/system/user',
        name: 'user',
        component: './system/user/',
      },
      {
        path: '/system/depart',
        name: 'depart',
        component: './system/depart/',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
