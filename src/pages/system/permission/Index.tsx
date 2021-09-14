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
import { Table, Divider, Menu, Dropdown } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import { Drawer} from 'antd';


// const data:TableListItem[] = [
//   {name: "a",
//   menuType: 1,
//   icon: "",
//   key: "1"}
// ];



const TableList: React.FC = () => {

  const {loading, data} = useRequest(permissionTree);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const columns: ColumnsType<TableListItem> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: function(text) {
        if (text == 0) {
          return '菜单'
        } else if (text == 1) {
          return '菜单'
        } else if (text == 2) {
          return '按钮/权限'
        } else {
          return text
        }
      }
    },/*{
      title: '权限编码',
      dataIndex: 'perms',
      key: 'permissionCode',
    },*/{
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      ellipsis: true,
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: 70
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      render: () => (
        <Space size="middle">
          <Button onClick={showDrawer}>编辑</Button>
          <Divider type="vertical" />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多 <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      align: 'center',
      width: 200
    }
  ];
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        {/* <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com"> */}
          
          <Button onClick={showDrawer}>详情</Button>
        {/* </a> */}
      </Menu.Item>
      <Menu.Item key="1">
        {/* <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> */}
          添加下级
        {/* </a> */}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <>
     <Card>
       <Button>点我！</Button>
       <Table<TableListItem> 
        columns={columns}
        dataSource={data} 
        pagination={false} />
     </Card>
     <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    </>
      
  );
};

export default TableList;
