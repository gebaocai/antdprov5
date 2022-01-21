import { useRequest } from 'umi';
import React, { FC, useState } from 'react';
import { Table, Card, Space, Button, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin, message } from 'antd';
import { DownOutlined, PlusOutlined} from '@ant-design/icons';

import { addApi, editApi, apiList} from './service';
import InterfaceModal from './components/InterfaceModal';
import styles from './style.less';

const ApiPage: FC = () => {
  const [changeModalVisiable, setChangeModalVisiable] = useState(false);
  const [api, setApi] = useState();
  
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
        </Space>
      ),
    }
  ];

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
  

  const onChangePage = (pagination, filters, sorter) => {
    // console.log("page pageSize" + page+" "+ pageSize)
    apiListReq.run({pageNo:pagination.current, pageSize:pagination.pageSize});
  }

  // function showTotal(total:number) {
  //   return `Total ${total} items`;
  // }
  const showApiModal = (record:any, type: number) => {
    console.log("typeis " + type)
    console.log("record is " + record)
    setChangeModalVisiable(true);
    setApi(record);
  }

  const addApiReq = useRequest(addApi, {manual: true,
    onSuccess : ()=>{message.success('新增成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('新增失败');},});
  const editApiReq = useRequest(editApi, {manual: true,
    onSuccess : ()=>{message.success('编辑成功');apiListReq.refresh();onCancel();},
    onError : ()=>{message.success('编辑失败');},});
  const apiListReq = useRequest(apiList);

  return (<>
      <Card bordered={false}>
        <Space align="center">
        <Button onClick={()=>showApiModal(null, 1)} type="primary" shape="round" icon={<PlusOutlined />} style={{marginBottom: 20}}>新增</Button> 
        </Space>
        <Spin spinning={apiListReq.loading}>
        <Table 
          rowSelection={{type:'checkbox'}}
          dataSource={apiListReq.data?.records}
          pagination={{current:apiListReq.data?.current, 
            defaultCurrent:1, 
            total:apiListReq.data?.total,
            showTotal:(total, range)=> `${range[0]}-${range[1]} of ${total} items`
              }}
          onChange={onChangePage}
          columns={columns} 
          rowKey={record=>record.id} />
          
        </Spin>  
      </Card>
      
      <InterfaceModal 
        modalVisible={changeModalVisiable}
        model={api}
        onFinish={onFinish}
        onCancel={onCancel}
        />  
    </>

  );
};

export default ApiPage;