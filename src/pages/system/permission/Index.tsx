import { useRequest } from 'umi';
import React, { useState, useRef, useEffect } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin, message } from 'antd';
import { depart, permissionTree} from './service';
import { permissionList, departPermission, editDepart} from './service';
import CreateDepartForm  from './components/CreateDepartForm';
import EditDepartPermissionForm  from './components/EditDepartPermissionForm';
import styles from './style.less';
import { Form, Input, Checkbox,Radio, InputNumber, Empty, Alert } from 'antd';
import {TableListItem} from './data';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
  LoginForm,
} from '@ant-design/pro-form';
import request from '@/utils/request';
import { FormInstance } from 'antd/es/form';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


// const data:TableListItem[] = [
//   {name: "a",
//   menuType: 1,
//   icon: "",
//   key: "1"}
// ];

const columns: ColumnsType<TableListItem> = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType',
    // customRender: function(text) {
    //   if (text == 0) {
    //     return '菜单'
    //   } else if (text == 1) {
    //     return '菜单'
    //   } else if (text == 2) {
    //     return '按钮/权限'
    //   } else {
    //     return text
    //   }
    // }
  },/*{
    title: '权限编码',
    dataIndex: 'perms',
    key: 'permissionCode',
  },*/{
    title: 'icon',
    dataIndex: 'icon',
    key: 'icon'
  },
  // {
  //   title: '组件',
  //   dataIndex: 'component',
  //   key: 'component',
  //   scopedSlots: { customRender: 'component' }
  // },
  // {
  //   title: '路径',
  //   dataIndex: 'url',
  //   key: 'url',
  //   scopedSlots: { customRender: 'url' }
  // },
  // {
  //   title: '排序',
  //   dataIndex: 'sortNo',
  //   key: 'sortNo'
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   fixed: true,
  //   scopedSlots: { customRender: 'action' },
  //   // align: 'center',
  //   width: 150
  // }
];

const TableList: React.FC = () => {

  const {loading, data} = useRequest(permissionTree);

  return (
     <Card>
       <Button>点我！</Button>
       <Table<TableListItem> 
        columns={columns}
        dataSource={data} 
        pagination={false} />
     </Card>
      
  );
};

export default TableList;
