import React, { useEffect } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, message } from 'antd';
import { Spin, Form, Input, Checkbox,Radio, InputNumber, Empty } from 'antd';
import {DepartData} from '../data.d';
import { DataItem } from '@antv/g2plot/esm/interface/config';
export { DataItem };
import { FormInstance } from 'antd/lib/form';

type EditFormProps = {
  selectedKeys: React.Key[];
  loading: boolean;
  model: DepartData;
  onFinish: (values:any) => void;
};

const { TextArea } = Input;

const EditDepartForm: React.FC<EditFormProps> = (props) => {
  const { selectedKeys, loading, model, onFinish} = props;

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


  useEffect(()=>{
    formRef?.current?.setFieldsValue(model);
  });

  
  console.log("loading", loading);
  console.log("model", model);

  const formRef = React.createRef<FormInstance>();


  const onReset = () => {
    // formRef?.current?.resetFields();
    formRef?.current?.setFieldsValue(model);
  };

  return (
    <Spin spinning={loading}>  
    {selectedKeys.length>0&&model?
        
        <Card bordered={false}>
          
          <Form
            name="basic"
            ref={formRef}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            initialValues={model}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
          
            <Form.Item
              label="机构名称"
              name="id"
            >
              <Input hidden />
            </Form.Item>

            <Form.Item
              label="机构名称"
              name="departName"
              rules={[{ required: true, message: '请输入机构名称!' }]}
            >
              <Input placeholder="请输入机构/部门名称!"/>
            </Form.Item>

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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
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

export default EditDepartForm;
