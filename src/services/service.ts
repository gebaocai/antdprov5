// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function changePassword(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/user/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}