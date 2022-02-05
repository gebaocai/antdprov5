// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { DepartData } from './data';

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

export async function departPermission(
  params: {
    departId: string;
  },
  options?: { [key: string]: any }) 
  {
  return request<Record<string, any>>('/api/sys/departPermission/list', {
    method: 'GET',
    params,
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

export async function addDepart(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/sysDepart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function editDepartPermission(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/departPermission/batchSave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
