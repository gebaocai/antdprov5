// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, Permission } from './data';

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

export async function permissionTree(options?: { [key: string]: any }) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    code?: number;
    message?: string;
  }>('/api/sys/permission/queryTreeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function editPermission(body: Permission, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addPermission(body: Permission, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deletePermission(body: Permission, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteForcePermission(body: Permission, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/deleteForce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function permissionApiList(
  params: {
    permissionId: string;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permissionApi/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

export async function apiTreeList(
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/queryTreeList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function editPermissionApi(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permissionApi/batchSave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}