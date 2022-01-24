import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row, Spin, message} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Drawer } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { permissionApiList, addPermissionApi, delPermissionApi } from '../service';

type PermissionApiProps = {
  hidden: boolean;
  apiListReq?: any;
  onClose: (e:any) => void;
};


const PermissionApi: FC<PermissionApiProps> = (props) => {
  const {hidden, apiListReq, onClose} = props;
  const [userDrawerVisiable, setUserDrawerVisiable] = useState(false);
  const [user, setUser] = useState();
  
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      align: 'center',
      render: (text:any, record: { key: React.Key }) => (
        <Space size="middle">
          <a href="#" onClick={()=>showDrawer(record, 1)}>删除</a>
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
    // setUserDrawerVisiable(true);
    // listDepart.run();
    // listRole.run();
    // if (record) {
    //   record.roleIds = [];
    //   userRoleListReq.run({userId: record.id});
    // } 
    // setUser(record)
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
    addPermissionApiReq.run(values);
  }

  const onCancel = () => {
    console.log("onCancel")
    setUserDrawerVisiable(false);
  }

  const addPermissionApiReq = useRequest(addPermissionApi, {manual: true,
    onSuccess : ()=>{message.success('新增成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('新增失败');},});
  const delPermissionApiReq = useRequest(delPermissionApi, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});  
  return (
    <Drawer 
            title={"后端api接口"} 
            placement="right"
            width='736px'
            destroyOnClose={true}
            onClose={onClose} 
            visible={hidden}>

          <Space align="center">
          <Button onClick={()=>showDrawer(undefined, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
          </Space>
          <Spin spinning={apiListReq?.loading}>
          <Table 
            rowSelection={{type:'checkbox'}}
            dataSource={apiListReq?.data} 
            columns={columns} />
          </Spin>
    </Drawer>
  );
};

export default PermissionApi;