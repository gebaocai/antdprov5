import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin, message } from 'antd';
import { DownOutlined, PlusOutlined, CloseCircleOutlined} from '@ant-design/icons';

import RoleModal from './components/RoleModal';
import RoleUser from './components/RoleUser';
import RolePermission from './components/RolePermission';
import { RoleItem } from './data';
import { permissionTree, rolePermission, roleList, addRole, editRole, editRolePermission} from './service';
import { editDepart } from '../depart/service';

const RolePage: FC = () => {
  const [roleModalVisiable, setRoleModalVisiable] = useState(false);
  const [leftCardVisiable, setLeftCardVisiable] = useState(false);
  const [showRoleUser, setShowRoleUser] = useState(false);
  const [rightCardSpan, setRightCardSpan] = useState(24);
  const [model, setModel] = useState<RoleItem>();
  
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
      fixed: 'left',
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
          <a href="#" onClick={()=>showCard(record, 1)}>用户</a>
          <Divider type="vertical" />
          <a href="#" onClick={()=>showCard(record, 2)}>授权</a>
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

  const showCard = (record:any, type:number) => {
    setModel(record);
    setLeftCardVisiable(true);
    setRightCardSpan(12);
    if (type == 1) {
      setShowRoleUser(true);
    } else {
      
      setShowRoleUser(false);
      permissionListReq.run();
      rolePermissionReq.run();
    }
  }

  const deleteRecord = (record:any) => {

  }

  const onFinish = (values: any) => {
    console.log("onFinish " + model);
    model?editRoleReq.run(values):addRoleReq.run(values);
  }

  const onPermissionFinish = (values: any) => {
    console.log("onFinish " + values);
    values.roleId = model?.id;
    editRolePermissionReq.run(values);
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
    roleListReq.run({pageNo:pagination.current, pageSize:pagination.pageSize});
  }

  // function showTotal(total:number) {
  //   return `Total ${total} items`;
  // }

  const permissionListReq = useRequest(permissionTree, {manual: true});
  const rolePermissionReq = useRequest(rolePermission, {manual: true});
  const addRoleReq = useRequest(addRole, {manual: true,
    onSuccess : ()=>{message.success('新增成功');roleListReq.refresh();onCancel();},
    onError : ()=>{message.success('新增失败');},});
  const editRoleReq = useRequest(editRole, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');roleListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});
  const roleListReq = useRequest(roleList);

  const editRolePermissionReq = useRequest(editRolePermission, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');roleListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});

  return (<>
    <Row gutter={16}>
      <Col span={rightCardSpan}> 
        <Card>
          <Space align="center">
          <Button onClick={()=>showRoleModal(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
          </Space>
          <Spin spinning={roleListReq.loading}>
          <Table 
            rowSelection={{type:'radio'}}
            dataSource={roleListReq.data?.records}
            pagination={{current:roleListReq.data?.current, 
              defaultCurrent:1, 
              total:roleListReq.data?.total,
              showTotal:(total, range)=> `${range[0]}-${range[1]} of ${total} items`
               }}
            onChange={onChangePage}
            columns={columns} 
            rowKey={record=>record.id} />
            
          </Spin>  
        </Card>

        <RoleModal 
          modalVisible={roleModalVisiable} 
          model={model}
          onFinish={onFinish}
          onCancel={onCancel} />
      </Col>
      <Col span={12}> 
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
      </Col>  
    </Row>
    </>

  );
};

export default RolePage;