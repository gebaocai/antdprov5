import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin, message } from 'antd';
import { DownOutlined, PlusOutlined} from '@ant-design/icons';

import { addApi, editApi, queryTreeList} from './service';
import InterfaceModal from './components/InterfaceModal';
import styles from './style.less';

const ApiPage: FC = () => {
  const [changeModalVisiable, setChangeModalVisiable] = useState(false);
  const [api, setApi] = useState();
  const [modalTitle, setModalTitle] = useState("新增");
  
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: function(text) {
        if (text == 0) {
          return '菜单'
        } else if (text == 1) {
          return '菜单'
        } else if (text == 2) {
          return '接口'
        } else {
          return text
        }
      }
    },
    {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
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
          <a href="#" onClick={()=>showApiModal(record, 2)}>编辑</a>
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
        
          <Menu.Item key="1" hidden={record?.menuType==2}>
            <a href="javascript:;" onClick={()=>showApiModal(record, 3)}>添加下级</a>
          </Menu.Item>
          {record?.menuType!=2?<Menu.Divider />:null}
        
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
    console.log("onFinish " + values);
    if (values['id']) {
      editApiReq.run(values);
    } else {
      addApiReq.run(values);
    }
  }


  const onCancel = () => {
    console.log("onCancel")
    setChangeModalVisiable(false);
  }
  

  // function showTotal(total:number) {
  //   return `Total ${total} items`;
  // }
  const showApiModal = (record:any, type: number) => {
    console.log("typeis " + type)
    console.log("record is " + record)
    setChangeModalVisiable(true);
    setApi(record);
    if (type == 1) {
      setApi({menuType: 0});
    } else if (type == 2) {
      setModalTitle("编辑");
    } else if (type == 3) {
      setModalTitle("添加下");
      const xx:any = {parentId:record.id};
      setApi(xx);
    }
    apiApiMenuReq.run({fetchType:"menu"});
  }

  const addApiReq = useRequest(addApi, {manual: true,
    onSuccess : ()=>{message.success('新增成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('新增失败');},});
  const editApiReq = useRequest(editApi, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});
  const apiListReq = useRequest(queryTreeList);
  const apiApiMenuReq = useRequest(queryTreeList, {manual: true});

  return (<>
      <Card bordered={false}>
        <Space align="center">
        <Button onClick={()=>showApiModal(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
        </Space>
        <Spin spinning={apiListReq.loading}>
        <Table 
          dataSource={apiListReq.data}
          pagination={false}
          columns={columns} />
        </Spin>  
      </Card>
      
      <InterfaceModal 
        title={modalTitle}
        loading={apiApiMenuReq.loading}
        modalVisible={changeModalVisiable}
        model={api}
        treeData={apiApiMenuReq.data}
        onFinish={onFinish}
        onCancel={onCancel}
        />  
    </>

  );
};

export default ApiPage;