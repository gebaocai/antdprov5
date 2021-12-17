export interface RoleItem {
  id: string;
  code: string;
  key: string;
  name:string;
  desc?: string;
}

export interface RolePermissionItem {
  roleId: string;
  permissionId: string;
}
