import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, Checkbox,Radio, InputNumber, Button } from 'antd';
import _ from '@umijs/deps/compiled/lodash';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onFinish: (values:any) => void;
};

const ChangePasswordModal: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onFinish, onCancel } = props;
  

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
      title={"修改密码"}
      visible={modalVisible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
      <Form.Item
            label="当前密码"
            name="curPassword"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
            <Input.Password />
        </Form.Item>
        <Form.Item
            label="确认密码"
            name="rePassword"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
            <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 20, span: 4}} >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
