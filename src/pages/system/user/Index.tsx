import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin, message } from 'antd';
import { DownOutlined, PlusOutlined} from '@ant-design/icons';

import { UserItem } from './data';
import { userList, addUser, editUser} from './service';

const UserPage: FC = () => {
  const [roleModalVisiable, setRoleModalVisiable] = useState(false);
  const [leftCardVisiable, setLeftCardVisiable] = useState(false);
  const [showRoleUser, setShowRoleUser] = useState(false);
  const [rightCardSpan, setRightCardSpan] = useState(24);
  const [model, setModel] = useState<UserItem>();
  
  const columns = [
    {
      title: '用户账号',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '真实姓名',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      align: 'center',
      render: function(text:number) {
        if (text == 1) {
          return '男'
        } else if (text == 2) {
          return '女'
        } else {
          return text
        }
      }
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: function(text:number) {
        if (text == 1) {
          return '正常'
        } else if (text == 2) {
          return '冻结'
        } else {
          return text
        }
      }
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'left',
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
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
          <a href="#" onClick={()=>showRoleModal(record, 2)}>编辑</a>
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


  const deleteRecord = (record:any) => {

  }

  const onFinish = (values: any) => {
    console.log("onFinish " + model);
  }

  const onPermissionFinish = (values: any) => {
    console.log("onFinish " + values);
    values.roleId = model?.id;
  }

  const onCancel = () => {
    console.log("onCancel")
    setRoleModalVisiable(false);
  }

  const onCloseCard = () => {
    console.log("onCloseCard")
    setLeftCardVisiable(false);
    setRightCardSpan(24);
  }

  const showRoleModal = (record:any, type: number) => {
    console.log("typeis " + type)
    console.log("record is " + record)
    setRoleModalVisiable(true);
    setModel(record);
  }

  const onChangePage = (pagination, filters, sorter) => {
    // console.log("page pageSize" + page+" "+ pageSize)
    userListReq.run({pageNo:pagination.current, pageSize:pagination.pageSize});
  }

  // function showTotal(total:number) {
  //   return `Total ${total} items`;
  // }


  const addUserReq = useRequest(addUser, {manual: true,
    onSuccess : ()=>{message.success('新增成功');userListReq.refresh();onCancel();},
    onError : ()=>{message.success('新增失败');},});
  const editUserReq = useRequest(editUser, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');userListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});
  const userListReq = useRequest(userList);

  return (<>
    <Row gutter={16}>
      <Col span={rightCardSpan}> 
        <Card>
          <Space align="center">
          <Button onClick={()=>showRoleModal(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
          </Space>
          <Spin spinning={userListReq.loading}>
          <Table 
            rowSelection={{type:'checkbox'}}
            dataSource={userListReq.data?.records}
            pagination={{current:userListReq.data?.current, 
              defaultCurrent:1, 
              total:userListReq.data?.total,
              showTotal:(total, range)=> `${range[0]}-${range[1]} of ${total} items`
               }}
            onChange={onChangePage}
            columns={columns} 
            rowKey={record=>record.id} />
            
          </Spin>  
        </Card>

        {/* <RoleModal 
          modalVisible={roleModalVisiable} 
          model={model}
          onFinish={onFinish}
          onCancel={onCancel} /> */}
      </Col>
      {/* <Col span={12}> 
        <Card bordered={false} hidden={!leftCardVisiable} extra={<CloseCircleOutlined onClick={onCloseCard}/> }>
          <RoleUser hidden={!showRoleUser}></RoleUser>
          <RolePermission 
            hidden={showRoleUser}
            loading={permissionListReq.loading} 
            rolePermission={rolePermissionReq.data}
            permissionList={permissionListReq.data}
            onFinish={onPermissionFinish}
            />
        </Card>
      </Col>   */}
    </Row>
    </>

  );
};

export default UserPage;