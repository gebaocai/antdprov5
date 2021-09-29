import { useRequest } from 'umi';
import React, { useState } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin, message } from 'antd';
import { permissionTree, editPermission, addPermission} from './service';
import {TableListItem} from './data';

import { Table, Divider, Menu, Dropdown, TreeSelect } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Drawer, Radio, Switch} from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { FormInstance } from 'antd/es/form';
import styles from './style.less';
import { request } from 'umi';
import PermissionDrawer  from './components/PermissionDrawer';

const TableList: React.FC = () => {

  const {loading, data, refresh} = useRequest(permissionTree);
  const [visible, setVisible] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [value, setValue] = React.useState(1);
  const [record, setRecored] = useState();

  const [saving, setSaving] = useState(false);



  const formRef = React.createRef<FormInstance>();

  const showDrawer = (record:React.ReactNode) => {
    console.log('selected record is:'+record)
    setRecored(record)
    formRef?.current?.setFieldsValue(record)
    setDrawTitle("编辑")
    setVisible(true);
  };
  const onClose = () => {
    console.log("set visible false")
    setVisible(false);
  };
  const handleAdd = () => {
    setRecored(undefined)
    setVisible(true);
    setDrawTitle("新增")
  };
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onTreeChange = () => {
    setValue(value);
  };

  const onFinish = (values: any) => {
    setSaving(true);
    if (drawTitle === "编辑") {
      editPermission(values).then(function(response) {
        console.log(response);
        setVisible(false);
        refresh();
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(()=>
        setSaving(false)
      );
    }else {
      addPermission(values).then(function(response) {
        console.log(response);
        setVisible(false);
        refresh();
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(()=>
        setSaving(false)
      );
    }
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
      render: (_, record: { key: React.Key }) => (
        <Space size="middle">
          <Button onClick={()=>showDrawer(record)}>编辑</Button>
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
       <Button onClick={handleAdd} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
       <Table<TableListItem> 
        columns={columns}
        dataSource={data} 
        pagination={false} />
     </Card>
     <PermissionDrawer visible={visible} loading={saving} 
      onFinish={onFinish}
      onClose={onClose}
      title={drawTitle}
      record={record}
      treeData={data}

       />
    </>
      
  );
};

export default TableList;
