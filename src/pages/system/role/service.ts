// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function permissionTree(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/permission/queryTreeList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function rolePermission(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/departPermission', {
    method: 'GET',
    ...(options || {}),
  });
}
