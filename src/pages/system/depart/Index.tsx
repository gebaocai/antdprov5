import { useRequest } from 'umi';
import { useState } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { depart, departList} from './service';
import { permissionList, departPermission} from './service';
import CreateDepartForm  from './components/CreateDepartForm';
import EditDepartForm  from './components/EditDepartForm';
import EditDepartPermissionForm  from './components/EditDepartPermissionForm';
import styles from './style.less';
import { Form, Input, Checkbox,Radio, InputNumber, Empty, Alert } from 'antd';


const { TabPane } = Tabs;
const { Search } = Input;

const TableList: React.FC = () => {
  const [createFormVisable, setCreateFormVisable] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<String>();
  
  const callback = (key:any) => {
    console.log(key);
  };

  const handleAdd = (num:any) => {
    if (num == 1) {
      setCreateFormVisable(true);
    } else if (num == 2) {
      
      
    } else {
      
    }
    console.log(num);
  };

  const handleCancle = (num:any) => {
    if (num == 1) {
      setCreateFormVisable(false);
    } else if (num == 2) {
      
      
    } else {
      
    }
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
    setSelectedTitle(info.node.title);

    detailDepart.run( {
      id: info.node.key
    },);

    permissionListReq.run();

    departPermissionReq.run();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const labelCol = { // 24格栅格系统，label所占为 a
    xxl: 5, // ≥1600px 响应式栅格
    xl: 8, // ≥1200px 响应式栅格
    lg: 10, // ≥992px 响应式栅格
    md: 12 // ≥768px 响应式栅格
  };
  const wrapperCol = { // 24格栅格系统，label后面内容所占为 24-a
    xxl: 19,
    xl: 16,
    lg: 14,
    md: 12
  };

  const getCurrSelectedTitle = () => {
    return "当前选择：" + selectedTitle;
  };

  const onClearSelected = () => {
    setSelectedKeys([]);
    setSelectedTitle("");
    detailDepart.data = null;
  };

  const { TextArea } = Input;

  const listDepart = useRequest(departList);
  const detailDepart = useRequest(depart, {manual: true});
  const permissionListReq = useRequest(permissionList, {manual: true});
  const departPermissionReq = useRequest(departPermission, {manual: true});

  return (
      <Row justify="space-between" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={11}>
          <Card>
            <Space size='small'>
              <Button type="primary" onClick={()=>handleAdd(1)}>添加部门</Button>
              <Button type="primary">添加下级</Button>
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
                showLine={{showLeafIcon: false}}
                treeData={listDepart.data}
                selectedKeys={selectedKeys}
                onSelect={onSelect}
                style={{marginTop:10}}
                />
              </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="基本信息" key="1">
              <EditDepartForm selectedKeys={selectedKeys} loading={detailDepart.loading} model={detailDepart.data}></EditDepartForm>
            </TabPane>
            <TabPane tab="部门权限" key="2">
              <EditDepartPermissionForm selectedKeys={selectedKeys} loading={permissionListReq.loading} permissionList={permissionListReq.data} departPermission={departPermissionReq.data}></EditDepartPermissionForm>
            </TabPane>
          </Tabs>
        </Col>
        <CreateDepartForm modalVisible={createFormVisable} onCancel={()=>handleCancle(1)} title="新增" />
      </Row>
      
  );
};

export default TableList;
