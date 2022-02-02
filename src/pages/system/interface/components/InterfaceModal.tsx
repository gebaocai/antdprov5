import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { Form, Input, Checkbox,Radio, TreeSelect, Button } from 'antd';
import _ from '@umijs/deps/compiled/lodash';
import { FormInstance } from 'antd/es/form';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onFinish: (values:any) => void;
  model: any;
  treeData?: any;
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const ChangePasswordModal: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, model, onFinish, onCancel, treeData} = props;
  const formRef = React.createRef<FormInstance>();
  const [menuType, setMenuType] = useState(model?.menuType);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const menuTypeChange = (e) => {
    const curMenuType = formRef?.current?.getFieldValue("menuType");
    if(curMenuType == 2){
      // this.show = false;
      // formRef?.current?.setFieldsValue({"title": '按钮/权限'});
      setMenuType(2);
    } else if (curMenuType == 1){
      setMenuType(1);
    } else {
      setMenuType(0);
    }
  }

  return (
    <Drawer
      destroyOnClose
      title={"修改密码"}
      visible={modalVisible}
      onClose={onCancel}
      placement="right"
      width='736px'
      footer={null}
    >
      <Form
        {...layout} 
        ref={formRef} 
        name="basic"
        initialValues={model}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
            name="id"
            hidden
            />  

        <Form.Item
            label="菜单类型"
            name="menuType"
            required={true}
            >
            <Radio.Group onChange={menuTypeChange}>
                <Radio value={0}>菜单</Radio>
                {/* <Radio value={1}>子菜单</Radio> */}
                <Radio value={2}>接口</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称!' }]}
            >
            <Input />
        </Form.Item>
        <Form.Item
                hidden={menuType==0}
                label="上级菜单"
                name="parentId"
                // help={'请选择上级菜单!'}
                required={menuType!==0}
            >
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择上级菜单!"
            allowClear
            treeDefaultExpandAll
            // onChange={onTreeChange}
            treeData={treeData}
            defaultValue={model?.parentId}
        />
        </Form.Item>    
        <Form.Item
            hidden={menuType!=2}
            label="地址"
            name="url"
            rules={[{ required: menuType==2, message: '请输入地址!' }]}
            >
            <Input />
        </Form.Item>
        <Form.Item
            label="描述"
            name="description"
            >
            <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 20, span: 4}} >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ChangePasswordModal;
