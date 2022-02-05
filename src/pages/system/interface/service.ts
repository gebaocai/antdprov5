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

export async function deleteApi(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteForceApi(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/deleteForce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function queryTreeList(
  params: {
    fetchType?: string;
  },
  options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/api/queryTreeList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}