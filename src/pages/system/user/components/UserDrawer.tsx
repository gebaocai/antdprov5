import { useRequest } from 'umi';
import React, { useState, useEffect } from 'react';
import { Card, Select, Button, Modal, Spin } from 'antd';
import { Form, Input, Tree, Drawer, DatePicker} from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'rc-field-form/lib/interface';
import {ApartmentOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Option } = Select;
import { departList, roleList } from '../service';
import { values } from '@antv/util';

type UserDrawerProps = {
  visible: boolean;
  onClose: (e:any) => void;
//   onCancel: () => void;
  onFinish: (values:any) => void;
  user?: Store;
  listDepart?: any;
  listRole?: any;
  userRoleList?: any;
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const UserDrawer: React.FC<UserDrawerProps> = (props) => {
  const { visible, onClose, onFinish, user, listDepart, listRole, userRoleList} = props;
  const formRef = React.createRef<FormInstance>();
  const [showDepartModal, setShowDepartModal] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [departNames, setDepartNames] = useState<string>(user?.departNames);
  // const [options, setOptions] = useState(user?.roleIds);

  if (user) {
    user.birthday = moment(user?.birthday, 'YYYY-MM-DD');
  }

  const selectDepart=() => {
    
    if (user?.departIds) {
      setShowDepartModal(user.departIds.split(","));
    }
    setShowDepartModal(true);
  }
  const handleOk = () => {
    formRef.current!.setFieldsValue({
      departIds: checkedKeys.join(","),
      departNames: departNames
    });
    setShowDepartModal(false);
  };

  const handleCancel = () => {
    setShowDepartModal(false);
  };

  const handleRoleChange = (value) =>{
    console.log(`selected ${value}`);
    // setOptions(value);
  }

  const onCheck = (checkedKeysValue: React.Key[], info: any) => {
    console.log('onCheck', checkedKeysValue);
    console.log('onCheck info', info);
    setCheckedKeys(checkedKeysValue);
    const departNames = info.checkedNodes.map(a=>a.title).join(',');
    setDepartNames(departNames);
  };

  useEffect(()=>{
    // console.log("before optioins is " + options);
    if (user && !userRoleList.loading) {
      formRef.current?.setFieldsValue({
        roleIds: userRoleList.data
      });
    }
    const x = formRef.current?.getFieldValue('roleIds');
    console.log("after optioins is " + x);
    
  }, [user?.id, userRoleList.data]);

  
  return (
        <>
        <Spin spinning={listRole.loading || userRoleList.loading}>
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
            label="角色分配"
            name="roleIds"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={options}
                onChange={handleRoleChange}
                // options={options}
              >
                {listRole.data?.map((item, index)=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
            name="departIds"
            rules={[{ required: true, message: '请输入密码!' }]}
            hidden={true}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="部门分配"
            name="departNames"
            rules={[{ required: true, message: '请输入密码!' }]}
            >
            <Input prefix={<ApartmentOutlined />} onClick={selectDepart}/>
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
        </Spin>
        <Spin spinning={listDepart.loading}>
        <Modal
          title={"选择部门"}
          visible={visible && showDepartModal}
          destroyOnClose
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <Tree
              checkable
              defaultExpandAll={true}
              selectable={false}
              // showLine={{showLeafIcon: false}}
              treeData={listDepart.data}
              checkedKeys={checkedKeys}
              onCheck={onCheck}
              style={{marginTop:10}}
              />
          </Modal>
          </Spin>
        </>
  );
};

export default UserDrawer;
