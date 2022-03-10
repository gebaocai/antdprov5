// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function machineInfo(
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sysMachine/query', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}