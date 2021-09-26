import { useRequest } from 'umi';
import React, { useState } from 'react';
import { Space, Row, Col, Tree, Tabs, Button, Card, Spin, message } from 'antd';
import { permissionTree, editPermission} from './service';
import {TableListItem} from './data';

import { Table, Divider, Menu, Dropdown } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Drawer, Radio, Switch} from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { FormInstance } from 'antd/es/form';
import styles from './style.less';
import { request } from 'umi';

const TableList: React.FC = () => {

  const {loading, data, refresh} = useRequest(permissionTree);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = React.useState(1);
  const [record, setRecored] = useState();
  const formRef = React.createRef<FormInstance>();

  const showDrawer = (record:React.ReactNode) => {
    console.log('selected record is:'+record)
    setRecored(record)
    formRef?.current?.setFieldsValue(record)
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };

  const columns: ColumnsType<TableListItem> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: function(text) {
        if (text == 0) {
          return '菜单'
        } else if (text == 1) {
          return '菜单'
        } else if (text == 2) {
          return '按钮/权限'
        } else {
          return text
        }
      }
    },/*{
      title: '权限编码',
      dataIndex: 'perms',
      key: 'permissionCode',
    },*/{
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      ellipsis: true,
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: 70
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: true,
      render: (_, record: { key: React.Key }) => (
        <Space size="middle">
          <Button onClick={()=>showDrawer(record)}>编辑</Button>
          <Divider type="vertical" />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多 <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      align: 'center',
      width: 200
    }
  ];
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        {/* <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com"> */}
          
          <Button onClick={showDrawer}>详情</Button>
        {/* </a> */}
      </Menu.Item>
      <Menu.Item key="1">
        {/* <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> */}
          添加下级
        {/* </a> */}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        删除
      </Menu.Item>
    </Menu>
  );

  const onFinish = (values: any) => {
    console.log("onFinsh");
    editPermission(values).then(function(response) {
      console.log(response);
      setVisible(false);
      refresh();
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  return (
    <>
     <Card>
       <Button>点我！</Button>
       <Table<TableListItem> 
        columns={columns}
        dataSource={data} 
        pagination={false} />
     </Card>
     <Drawer 
        title="编辑" 
        placement="right"
        width='736px'
        onClose={onClose} 
        visible={visible}>
          <Card>
            
       <Form {...layout} 
        ref={formRef} 
        initialValues={record}
        onFinish={onFinish}>
        <Form.Item
          name="id"
          hidden
        />  
        <Form.Item
          label="菜单类型"
          name="menuType"
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>一级菜单</Radio>
            <Radio value={2}>子菜单</Radio>
            <Radio value={3}>按钮/权限</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="菜单路径"
          name="url"
          rules={[{ required: true, message: '请输入菜单路径!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="前端组件"
          name="componentName"
          rules={[{ required: true, message: '请输入前端组件!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="默认跳转地址"
          name="redirect"
          tooltip="请转入路由器参数redirect"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="菜单图标"
          name="icon"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="排序"
          name="sortNo"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="是否路由菜单"
          name="redirectMenu"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>
        <Form.Item
          label="隐藏路由"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>
        <Form.Item
          label="是否缓存路由"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>
        <Form.Item
          label="聚合路由"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>
        <Form.Item
          label="打开方式"
        >
          <Switch checkedChildren="外部" unCheckedChildren="内部"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
      </Form.Item>
    </Form>
      </Card>
    </Drawer>
    </>
      
  );
};

export default TableList;
