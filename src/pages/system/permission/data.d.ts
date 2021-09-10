export interface TableListItem {
  // title: string;
  key: string;
  name: string;
  icon: string;
  menuType: number;
  // sortNo: number;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export interface DepartData {
  departName?: string;
  key?: string;
  phone?: string;
}

export interface Permission {
  title?: string;
  key?: string;
  phone?: string;
}
