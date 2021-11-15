import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined, PlusOutlined, CloseCircleOutlined} from '@ant-design/icons';

const UserPage: FC = () => {
  const [roleModalVisiable, setRoleModalVisiable] = useState(false);
  const [leftCardVisiable, setLeftCardVisiable] = useState(false);
  const [showRoleUser, setShowRoleUser] = useState(false);
  const [rightCardSpan, setRightCardSpan] = useState(24);


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
      title: '用户账号',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      align: 'center',
    },
    {
      title: '负责部门',
      dataIndex: 'leaderDepartment',
      key: 'leaderDepartment',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
          <a href="javascript:;" onClick={()=>showCard(record, 1)}>用户</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>showCard(record, 2)}>授权</a>
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

  const showCard = (record:any, type:number) => {
    setLeftCardVisiable(true);
    setRightCardSpan(12);
    if (type == 1) {
      setShowRoleUser(true);
    } else {
      
      setShowRoleUser(false);
    }
  }

  const deleteRecord = (record:any) => {

  }

  const onFinish = (values: any) => {

  }

  return (<>
      <Card>
          <Space align="center">
          <Button type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
          </Space>
          <Table 
            rowSelection={{type:'checkbox'}}
            dataSource={dataSource} 
            columns={columns} />
        </Card>
    </>
  );
};

export default UserPage;