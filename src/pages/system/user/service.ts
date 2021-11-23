// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { UserItem } from './data';

export async function addUser(body: UserItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/user/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function editUser(body: UserItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function userList(
  params: {
    pageNo?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/user/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

export async function departList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/sysDepart/treeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function roleList(
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/listAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}