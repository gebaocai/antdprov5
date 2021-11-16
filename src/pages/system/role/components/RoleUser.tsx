import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';


type RoleUserProps = {
  hidden: boolean;
};


const RoleUser: FC<RoleUserProps> = (props) => {
  const {hidden} = props;



  const dataSource = [
    {
      key: '1',
      account: 'gebaocai',
      name: '葛葛',
      state: '0'
    },
    {
      key: '2',
      account: 'yuan',
      name: '思远',
      state: '1'
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
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: function(text:any) {
        if (text == 0) {
          return '正常'
        } else if (text == 1) {
          return '禁用'
        } else {
          return text
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
          <a href="#" onClick={()=>showDrawer(record, 1)}>编辑</a>
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

  const showDrawer = (record:any, type:number) => {

  }

  const deleteRecord = (record:any) => {

  }

  const onFinish = (values: any) => {

  }



  return (<div hidden={hidden}>

          <Space align="center">
          <Button type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
          </Space>
          <Table 
            rowSelection={{type:'checkbox'}}
            dataSource={dataSource} 
            columns={columns} />
 
    </div>
  );
};

export default RoleUser;