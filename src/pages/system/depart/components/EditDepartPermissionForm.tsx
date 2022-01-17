import React, { useState, useRef, useEffect } from 'react';
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
  selectedKeys: string[];
  loading: boolean;
  permissionList: Array<DataNode>;
  departPermission: string[];
  onFinish: (values:any) => void;
};

const { TextArea } = Input;

const EditDepartPermissionForm: React.FC<EditFormProps> = (props) => {
  const { selectedKeys, loading, permissionList, departPermission, onFinish} = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(departPermission);

  useEffect(()=>{
    setCheckedKeys(departPermission);
  }, [departPermission])

  // const [checkKeyStr, setCheckKeyStr] = useState<string>(checkedKeys.join());
  // const [selectedKeys2, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

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

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // formRef.current!.setFieldsValue({
  //   checkKeyStr: checkKeyStr
  // });
  let checkKeyStr = '';
  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    // setCheckKeyStr(checkedKeysValue.join());
    console.log('checkKeyStr', checkedKeysValue.join());
    formRef.current!.setFieldsValue({
      permissionIds: checkedKeysValue.join()
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
            initialValues={{ permissionIds: checkKeyStr }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            
            <Title level={5}>所拥有的权限:</Title>
              <Tree 
                checkable={true}
                // selectable={true}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                // defaultCheckedKeys={departPermission}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                // onSelect={onSelect}
                treeData={permissionList}
                checkStrictly={false}
                
              />
            <Form.Item name="permissionIds" hidden>
              <Input />
            </Form.Item>  
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button">
                取消
              </Button>
            </Form.Item>  
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
