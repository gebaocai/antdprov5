import { useRequest } from 'umi';
import React, { useState, useRef, useEffect } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin, message } from 'antd';
import { depart, departList} from './service';
import { permissionTree, departPermission, editDepart, addDepart} from './service';
import DepartModal  from './components/DepartModal';
import EditDepartPermissionForm  from './components/EditDepartPermissionForm';
import EditDepartForm  from './components/EditDepartForm';
import styles from './style.less';
import {Input, Alert } from 'antd';
import {DepartData} from './data.d';
import { FormInstance } from 'antd/es/form';


const { TabPane } = Tabs;
const { Search } = Input;

const TableList: React.FC = () => {
  const [createFormVisable, setCreateFormVisable] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>();
  
  const callback = (key:any) => {
    console.log(key);
  };

  const handleAdd = (num:any) => {
    
    if (num == 1) {
      setCreateFormVisable(true);
    } else if (num == 2) {
      
      if (selectedTitle == undefined) {
        message.warning('请先选择一个部门!');
      } else {
        setCreateFormVisable(true);
      }
    }
    console.log(num);
  };

  const onCancle = () => {
    setCreateFormVisable(false);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect keys', selectedKeysValue);
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
    setSelectedTitle(info.node.title);
    detailDepart.run( {
      id : info.node.id
    },);

    permissionListReq.run();

    departPermissionReq.run();
  };

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck keys', checkedKeys);
    console.log('onCheck', info);
    if (info.checked) {
      checkedKeys = [info.node.id];
      setSelectedKeys(checkedKeys);
      setSelectedTitle(info.node.title);
      detailDepart.run( {
        id : info.node.id
      },);
  
      permissionListReq.run();
  
      departPermissionReq.run();
    } else {
      setSelectedKeys([]);
      setSelectedTitle(undefined);
    }
  };	

  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (values['id']) {
      editDepartReq.run(values);
    } else {
      addDepartReq.run(values);
    }
  };

  const onCreateFinish = (values: any) => {
    console.log('Success:', values);
    if (selectedKeys.length>0) {
      values.parentId = selectedKeys[0];
    }
    addDepartReq.run(values);
  };

  const onPermissionFinish = (values: any) => {
    console.log('Success:', values);
    return true;
  };

  const editDepartReq = useRequest(editDepart, {
    manual: true,
    onSuccess : ()=>{message.success('修改成功');onClearSelected();},
    onError : ()=>{message.success('修改失败');},
  });

  const addDepartReq = useRequest(addDepart, {
    manual: true,
    onSuccess : ()=>{message.success('添加成功');setCreateFormVisable(false); onClearSelected();},
    onError : ()=>{message.success('加失败');},
  });

  const getCurrSelectedTitle = () => {
    return "当前选择：" + selectedTitle;
  };

  const onClearSelected = () => {
    setSelectedKeys([]);
    setSelectedTitle(undefined);
    detailDepart.data = null;
    listDepart.refresh();
  };

  const listDepart = useRequest(departList);
  const detailDepart = useRequest(depart, {
    manual: true,
    // onSuccess: (data) => {
    //   console.log(data);
    //   formRef?.current?.setFieldsValue(data);
    }
  );
  const permissionListReq = useRequest(permissionTree, {manual: true});
  const departPermissionReq = useRequest(departPermission, {manual: true});

  return (
      <Row justify="space-between" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={11}>
          <Card>
            <Space size='small'>
              <Button type="primary" onClick={()=>handleAdd(1)}>添加部门</Button>
              <Button type="primary" onClick={()=>handleAdd(2)}>添加下级</Button>
              <Button type="primary">导出</Button>
              <Button type="primary">导入</Button>
              <Button type="primary" danger>删除</Button>
            </Space>
            
            {selectedKeys.length>0?
            <Alert message={getCurrSelectedTitle()} type="info" showIcon style={{marginTop:15}} action={
              <Space>
                <Button size="small" type="ghost" onClick={onClearSelected}>
                  取消选择
                </Button>
              </Space>
            }/>:null}

            <Spin spinning={listDepart.loading}>
              <Tree
                checkable
                // showLine={{showLeafIcon: false}}
                treeData={listDepart.data}
                selectedKeys={selectedKeys}
                checkedKeys={selectedKeys}
                onSelect={onSelect}
                onCheck={onCheck}
                style={{marginTop:10}}
                />
              </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="基本信息" key="1">
              <EditDepartForm 
                selectedKeys={selectedKeys} 
                loading={detailDepart.loading} 
                model={detailDepart.data} 
                onFinish={onFinish}/>
            </TabPane>
            <TabPane tab="部门权限" key="2">
              <EditDepartPermissionForm selectedKeys={selectedKeys} 
                loading={permissionListReq.loading} 
                permissionList={permissionListReq.data} 
                departPermission={departPermissionReq.data} 
                onFinish={onPermissionFinish}/>
        
            </TabPane>
          </Tabs>
        </Col>
        <DepartModal modalVisible={createFormVisable} selectedTitle={selectedTitle} onCancel={onCancle} onFinish={onCreateFinish} title="新增" />
      </Row>
      
  );
};

export default TableList;
