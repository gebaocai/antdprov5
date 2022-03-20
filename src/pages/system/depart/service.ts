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

export async function exportExcel(options?: { [key: string]: any }) {
  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };
  let filename = "";
  return fetch('/api/sys/sysDepart/export', {
    method: 'GET',
    responseType: 'blob',
    headers: authHeader,
    parseResponse: false
  }).then((res:any) => {
    let contentDisposition = res.headers.get("content-disposition");
    console.log(contentDisposition);
    contentDisposition = contentDisposition.replace("attachment; filename=", "");
    contentDisposition = contentDisposition.replaceAll("\"", "");
    console.log(contentDisposition);
    filename = contentDisposition;
    res.blob()
  .then((res:any) => {
    console.log(res);
    const aLink = document.createElement('a');
    document.body.appendChild(aLink);
    aLink.style.display = 'none';
    aLink.href = window.URL.createObjectURL(res);
    aLink.setAttribute('download', filename);
    aLink.click();
    document.body.removeChild(aLink);
  })})
}