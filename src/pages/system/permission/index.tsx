import { useRequest } from 'umi';
import React, { useState } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Popconfirm, Spin, message } from 'antd';
import { permissionTree, editPermission, addPermission, deletePermission} from './service';
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
import PermissionApi  from './components/PermissionApi';
import { permissionApiList, apiTreeList, editPermissionApi } from './service';

const TableList: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [permissionApi, setPermissionApi] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [record, setRecored] = useState();

  const [saving, setSaving] = useState(false);

  const showDrawer = (record:any, type:number) => {
    console.log('selected record is:'+record)
    setRecored(record)
    if (type == 1) {
      setDrawTitle("编辑")
      setReadOnly(false);
      setVisible(true);
      setPermissionApi(false);
    } else if (type == 2) {
      setDrawTitle("详情")
      setReadOnly(true);
      setVisible(true);
      setPermissionApi(false);
    } else if (type == 3){
      setDrawTitle("添加下级")
      const xx:any = {menuType:1, parentId:record.id};
      console.log(xx);
      setRecored(xx);
      setReadOnly(false);
      setVisible(true);
      setPermissionApi(false);
    } else {
      setVisible(false);
      setPermissionApi(true);
      apiTreeListReq.run();
      permissionApiListReq.run({"permissionId": record.id});
    
    }
    
  };

  const deleteRecord = (record:any) => {
    deletePermission(record).then(function(response) {
      console.log(response);
      setVisible(false);
      permissionTreeReq.refresh();
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(()=>
      setSaving(false)
    );
  };

  const onClose = () => {
    console.log("set visible false")
    setVisible(false);
  };
  const onClosePermissionApi = () => {
    console.log("set visible false")
    setPermissionApi(false);
  };
  const onPermissionApiFinish = (values: any) => {
    console.log("onFinish " + values);
    values.permissionId = record?.id;
    editPermissionApiReq.run(values);
  }

  const handleAdd = () => {
    setRecored(undefined)
    setVisible(true);
    setDrawTitle("新增")
  };

  const onFinish = (values: any) => {
    setSaving(true);
    if (drawTitle === "编辑") {
      editPermission(values).then(function(response) {
        console.log(response);
        setVisible(false);
        permissionTreeReq.refresh();
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
        permissionTreeReq.refresh();
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
          <a href="#" onClick={()=>showDrawer(record, 1)}>编辑</a>
          <Divider type="vertical" />
          <a href="#" onClick={()=>showDrawer(record, 4)}>API</a>
          <Divider type="vertical" />
          <Dropdown overlay={showMenu(record)}>
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
  
  const showMenu = (record:React.ReactNode) => {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="javascript:;" onClick={()=>showDrawer(record, 2)}>详情</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="javascript:;" onClick={()=>showDrawer(record, 3)}>添加下级</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" >
          <Popconfirm
            title="确定删除吗?"
            onConfirm={()=>deleteRecord(record)}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return menu;
  }
  
  const permissionApiListReq = useRequest(permissionApiList, {manual: true});
  const apiTreeListReq = useRequest(apiTreeList, {manual: true});
  const editPermissionApiReq = useRequest(editPermissionApi, {manual: true});
  const permissionTreeReq = useRequest(permissionTree);


  return (
    <>
     <Card>
       <Button onClick={handleAdd} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
       <Table<TableListItem> 
        columns={columns}
        dataSource={permissionTreeReq.data} 
        pagination={false} />
     </Card>
     <PermissionDrawer visible={visible} loading={saving} readonly={readOnly}
      onFinish={onFinish}
      onClose={onClose}
      title={drawTitle}
      record={record}
      treeData={permissionTreeReq.data}
       />

      <PermissionApi 
            hidden={permissionApi || permissionApiListReq.loading}
            loading={permissionApiListReq.loading} 
            apiList={apiTreeListReq.data}
            permissionApi={permissionApiListReq.data}
            onFinish={onPermissionApiFinish}
            onClose={onClosePermissionApi}
            />  
    </>
      
  );
};

export default TableList;
