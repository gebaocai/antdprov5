﻿export default [
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
        icon: 'smile',
        component: './system/user',
      },
      {
        path: '/system/interface',
        name: 'interface',
        icon: 'smile',
        component: './system/interface',
      },
      {
        path: '/system/role',
        name: 'role',
        icon: 'smile',
        component: './system/role',
      },
      {
        path: '/system/depart',
        name: 'depart',
        icon: 'smile',
        component: './system/depart',
      },
      {
        path: '/system/permission',
        name: 'permission',
        icon: 'smile',
        component: './system/permission',
      },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: '404',
  },
];
