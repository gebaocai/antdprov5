// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function addApi(body: AnimationPlaybackEventInit, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function editApi(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function apiList(
  params: {
    pageNo?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}