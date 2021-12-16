import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin, message } from 'antd';
import { DownOutlined, PlusOutlined} from '@ant-design/icons';

import { UserItem } from './data';
import { userList, addUser, editUser, roleList, departList, userRoleList, changePassword} from '../service';
import UserDrawer from './components/UserDrawer';
import ChangePasswordModal from './components/ChangePasswordModal';
import styles from './style.less';
import { editRole } from '../role/service';

const UserPage: FC = () => {
  const [userDrawerVisiable, setUserDrawerVisiable] = useState(false);
  const [changePWVisiable, setChangePWVisiable] = useState(false);
  const [user, setUser] = useState();
  
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
      dataIndex: 'gender',
      key: 'gender',
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
      title: '部门',
      dataIndex: 'departNames',
      key: 'departNames',
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
          <a href="#" onClick={()=>showUserDrawer(record, 2)}>编辑</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="#" onClick={()=>showChangePW(record, 2)}>修改密码</a>
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

  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['birthday'].format('YYYY-MM-DD'),
      'roleIds': fieldsValue['roleIds'].join(',')
    };
    console.log("onFinish " + values);
    if (values['id']) {
      editUserReq.run(values);
    } else {
      addUserReq.run(values);
    }
  }

  const onChangePWFinish = (values: any) => {
    changePasswordReq.run(values);
  }


  const onCancel = () => {
    console.log("onCancel")
    setUserDrawerVisiable(false);
  }

  const onChangePWCancel = () => {
    console.log("onCancel")
    setChangePWVisiable(false);
  }
  
  const showChangePW = (record:any, type: number) => {
    setChangePWVisiable(true)
    setUser(record)
  }

  const showUserDrawer = (record:any, type: number) => {
    console.log("typeis " + type)
    console.log("record " + record);
    setUserDrawerVisiable(true)
    listRole.run();
    listDepart.run();
    if (record) {
      record.roleIds = [];
      userRoleListReq.run({userId: record.id});
    } 
    setUser(record)
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
  const changePasswordReq = useRequest(changePassword, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');setChangePWVisiable(false)},
    onError : ()=>{message.success('编辑失败');},});  
  const userListReq = useRequest(userList);
  const listRole = useRequest(roleList, {manual: true});
  const listDepart = useRequest(departList, {manual: true});
  const userRoleListReq = useRequest(userRoleList, {manual: true});

  return (<>
      <Card bordered={false}>
        <Space align="center">
        <Button onClick={()=>showUserDrawer(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
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
      
      <UserDrawer 
        visible={userDrawerVisiable}
        user={user}
        listDepart={listDepart}
        listRole={listRole}
        userRoleList={userRoleListReq}
        onFinish={onFinish}
        onClose={onCancel}
        />
      <ChangePasswordModal 
        modalVisible={changePWVisiable}
        model={user}
        onFinish={onChangePWFinish}
        onCancel={onChangePWCancel}
        />  
    </>

  );
};

export default UserPage;