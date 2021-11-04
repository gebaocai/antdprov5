import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Drawer } from 'antd';
import { Divider, Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

import RoleModal from './components/RoleModal';
import { RoleItem } from './data';

const RolePage: FC = () => {
  const [roleModalVisiable, setRoleModalVisiable] = useState(false);
  const [model, setModel] = useState<RoleItem>();

  const dataSource = [
    {
      key: '1',
      code: 'hr',
      name: '人力资源',
      createDate: '2021-8-1 11:11:11'
    },
    {
      key: '2',
      code: 'it',
      name: '开发技术',
      createDate: '2021-8-1 11:11:11'
    },
  ];
  
  const columns = [
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
          <a href="javascript:;" onClick={()=>showDrawer(record, 1)}>用户</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>showDrawer(record, 1)}>授权</a>
          <Divider type="vertical" />
          <Dropdown overlay={showMenu(record)}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多 <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    }
  ];

  const showMenu = (record:React.ReactNode) => {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="javascript:;" onClick={()=>showRoleModal(record, 2)}>编辑</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" >
          <Popconfirm
            title="确定删除吗?"
            onConfirm={()=>deleteRecord(record)}
            okText="确定"
            cancelText="取消"
          >
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return menu;
  }

  const showDrawer = (record:any, type:number) => {

  }

  const deleteRecord = (record:any) => {

  }

  const onFinish = (values: any) => {

  }

  const onCancel = () => {
    console.log("onCancel")
    setRoleModalVisiable(false);
  }

  const showRoleModal = (record:any, type: number) => {
    console.log("typeis " + type)
    console.log("record is " + record)
    setRoleModalVisiable(true);
    setModel(record);
  }

  return (<>
    <Card>
      <Space align="center">
      <Button onClick={()=>showRoleModal(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
      </Space>
      <Table 
        rowSelection={{type:'radio'}}
        dataSource={dataSource} 
        columns={columns} />
    </Card>

    <RoleModal 
      modalVisible={roleModalVisiable} 
      model={model}
      onFinish={onFinish}
      onCancel={onCancel} />
    
    </>
  );
};

export default RolePage;