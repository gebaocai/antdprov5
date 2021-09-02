import { useRequest } from 'umi';
import { useState, useRef, useEffect } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin, message } from 'antd';
import { depart, departList} from './service';
import { permissionList, departPermission, editDepart} from './service';
import CreateDepartForm  from './components/CreateDepartForm';
import EditDepartPermissionForm  from './components/EditDepartPermissionForm';
import styles from './style.less';
import { Form, Input, Checkbox,Radio, InputNumber, Empty, Alert } from 'antd';
import {DepartData} from './data.d';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
  LoginForm,
} from '@ant-design/pro-form';
import request from '@/utils/request';


const { TabPane } = Tabs;
const { Search } = Input;

const TableList: React.FC = () => {
  const [createFormVisable, setCreateFormVisable] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<String>();

  const formRef = useRef<ProFormInstance>();
  
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
    // detailDepart.run( {
    //   id : info.node.id
    // },);

    permissionListReq.run();

    departPermissionReq.run();
  };

  const onFinish = (values: DepartData) => {
    console.log('Success:', values);
    run(values);
    return true;
  };

  const { run } = useRequest(editDepart, {
    manual: true,
    onSuccess : ()=>{message.success('修改成功');onClearSelected();},
    onError : ()=>{message.success('修改失败');},
  });

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
    console.log('onClearSelected:');
    setSelectedKeys([]);
    setSelectedTitle("");
    detailDepart.data = null;
  };

  const { TextArea } = Input;

  const listDepart = useRequest(departList);
  const detailDepart = useRequest(depart, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      // formRef?.current?.setFieldsValue(data);
    }
  });
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
              {/* <EditDepartForm selectedKeys={selectedKeys} loading={detailDepart.loading} model={detailDepart.data}></EditDepartForm> */}
              {/* <Spin spinning={detailDepart.loading}> */}
                {selectedKeys.length>0?
                    <Card bordered={false}>
                      
                      <ProForm
                        name="basic"
                        formRef={formRef}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}
                        // initialValues={detailDepart.data}
                        onFinish={async () => { onFinish}}
                        onFinishFailed={onFinishFailed}
                        request={()=> 
                          request("/api/sys/sysDepart/info?id=1427796982902165504").then(function(res) {
                            return res.data;
                          })
                        }
                      >
                        <ProFormText name="id" hidden/>
                        <ProFormText
                          width="md"
                          name="departName"
                          label="机构名称"
                          tooltip="请输入机构名称!"
                          placeholder="请输入机构名称"
                          rules={[{ required: true, message: '请输入机构名称!' }]} />
                        <Form.Item
                          label="机构类型"
                          name="departType"
                        >
                        <Radio.Group defaultValue="a">
                            <Radio value="a">公司</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          label="电话"
                          name="phone"
                        >
                          <Input placeholder="请输入电话"/>
                        </Form.Item>

                        <Form.Item
                          label="传真"
                          name="fax"
                        >
                          <Input placeholder="请输入传真"/>
                        </Form.Item>

                        <Form.Item
                          label="地址"
                          name="address"
                        >
                          <Input placeholder="请输入地址"/>
                        </Form.Item>

                        <Form.Item
                          label="排序"
                          name="sort"
                        >
                          <InputNumber defaultValue={0}/>
                        </Form.Item>

                        <Form.Item
                          label="备注"
                          name="memo"
                        >
                          <TextArea rows={2} placeholder="请输入备注"/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                          <Button type="primary" htmlType="submit">
                            提交
                          </Button>
                          <Button htmlType="button" onClick={onClearSelected}>
                            取消
                          </Button>
                        </Form.Item>
                      </ProForm>
                    </Card> :
                    <Card>
                      <Empty description="请先选择一个部门!" />
                    </Card>

                    
            }
                    {/* </Spin> */}
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
