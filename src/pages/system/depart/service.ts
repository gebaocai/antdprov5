// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, DepartData } from './data';

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function departList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/sysDepart/treeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function depart(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/sys/sysDepart/info', {
    method: 'GET',
    // params: params,
    params,
    ...(options || {}),
  });
}

export async function permissionList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/permissionList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function permissionTree(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/queryTreeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function departPermission(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/departPermission', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function editDepart(body: DepartData, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/sysDepart/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
