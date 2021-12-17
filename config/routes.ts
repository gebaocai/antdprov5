export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
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
    icon: 'setting',
    name: 'system',
    routes: [
      {
        path: '/system/user',
        name: 'user',
        component: './system/user',
      },
      {
        path: '/system/role',
        name: 'role',
        component: './system/role',
      },
      {
        path: '/system/depart',
        name: 'depart',
        component: './system/depart',
      },
      {
        path: '/system/permission',
        name: 'permission',
        component: './system/permission',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: '404',
  },
];
