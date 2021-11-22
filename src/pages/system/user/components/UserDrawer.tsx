import React, { useState, useEffect } from 'react';
import { Card, Select, Button } from 'antd';
import { Form, Input, Checkbox, Drawer, Radio, DatePicker} from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'rc-field-form/lib/interface';
import moment from 'moment';
const { Option } = Select;

type UserDrawerProps = {
  visible: boolean;
  onClose: (e:any) => void;
//   onCancel: () => void;
  onFinish: (values:any) => void;
  user?: Store;
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const UserDrawer: React.FC<UserDrawerProps> = (props) => {
  const { visible, onClose, onFinish, user} = props;
  const formRef = React.createRef<FormInstance>();

  if (user) {
    user.birthday = moment(user?.birthday, 'YYYY-MM-DD');
  }
  

  return (
    
        <Drawer 
            // title={title} 
            placement="right"
            width='736px'
            destroyOnClose={true}
            onClose={onClose} 
            visible={visible}>
            
            <Card>
                
        <Form {...layout} 
            ref={formRef} 
            initialValues={user}
            onFinish={onFinish}>
            <Form.Item
            name="id"
            hidden
            />  
            <Form.Item
            label="用户账号"
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
            >
            <Input/>
            </Form.Item>
            <Form.Item
            label="真实姓名"
            name="nickname"
            rules={[{ required: true, message: '请输入姓名!' }]}
            >
            <Input/>
            </Form.Item>
            <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item
            label="生日"
            name="birthday"
            >
            <DatePicker placeholder="请选择生日！" style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item
            label="性别"
            name="gender"
            >
            <Select placeholder="请输入性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
            </Select>
            </Form.Item>

            <Form.Item
                label="电子邮件"
                name="email"
                >
                <Input/>
            </Form.Item>

            <Form.Item
                label="电话"
                name="phone"
                >
                <Input/>
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                提交
            </Button>
        </Form.Item>
        </Form>
        </Card>
        </Drawer>
    
  );
};

export default UserDrawer;
