import React from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card } from 'antd';
import { Spin, Form, Input, Checkbox,Radio, InputNumber, Empty } from 'antd';
import {Permission} from '../data';
import { DataItem } from '@antv/g2plot/esm/interface/config';
export { DataItem };
import { FormInstance } from 'antd/lib/form';
import { Typography } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';

const { Title } = Typography;

type EditFormProps = {
  selectedKeys: React.Key[];
  loading: boolean;
  permissionList: Array<DataNode>;
  departPermission: string[]
};

const { TextArea } = Input;

const EditDepartPermissionForm: React.FC<EditFormProps> = (props) => {
  const { selectedKeys, loading, permissionList, departPermission} = props;

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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


  const formRef = React.createRef<FormInstance>();

  console.log(permissionList);
  const onReset = () => {
    formRef.current!.resetFields();
  };

  const onFill = () => {
    formRef.current!.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <Spin spinning={loading}>
    {selectedKeys.length>0&&permissionList?
        <Card bordered={false}>
          <Form
            name="basic"
            ref={formRef}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            
            <Title level={5}>所拥有的权限:</Title>
              <Tree 
                checkable={true}
                selectable={true}
                treeData={permissionList}
                defaultCheckedKeys={departPermission}
                
              />
          </Form>
        </Card> :
        <Card>
          <Empty description="请先选择一个部门!" />
        </Card>

        
}
        </Spin>
  );
};

export default EditDepartPermissionForm;
