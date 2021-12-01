// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { RoleItem, RolePermissionItem } from './data';

export async function permissionTree(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/queryTreeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function rolePermission(
  params: {
    roleId: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/sys/rolePermission/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function addRole(body: RoleItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function editRole(body: RoleItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function roleList(
  params: {
    pageNo?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

export async function editRolePermission(body:RolePermissionItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/savePermission', {
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
    roleId: string;
    pageNo?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/user/listByRoleId', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}