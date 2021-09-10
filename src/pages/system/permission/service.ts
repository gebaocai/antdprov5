// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, DepartData } from './data';

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
