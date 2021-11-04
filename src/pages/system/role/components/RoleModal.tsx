import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, Checkbox,Radio, InputNumber } from 'antd';
import { RoleItem } from '../data.d';
import _ from '@umijs/deps/compiled/lodash';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onFinish: (values:any) => void;
  model: RoleItem|undefined;
};

const { TextArea } = Input;

const RoleModal: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, model, onFinish, onCancel } = props;
  const [title, setTitle] = useState<string>('');
  
  useEffect(()=> {
    model?.key != undefined?setTitle('编辑'):setTitle('新增');
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

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={onCancel}
      width={800}
    >
      <Form
        name="basic"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={model}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
            name="key"
            hidden
            />  

        <Form.Item
          label="角色编码"
          name="code"
          rules={[{ required: true, message: '请输入角色编码!' }]}
        >
          <Input placeholder="请输入角色编码!"/>
        </Form.Item>

        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称!' }]}
        >
          <Input placeholder="请输入角色名称!"/>
        </Form.Item>

        <Form.Item
          label="描述"
          name="desc"
        >
          <TextArea rows={2} placeholder="请输入角色描述"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleModal;
