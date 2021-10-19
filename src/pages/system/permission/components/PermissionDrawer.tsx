import React, { useState, useEffect } from 'react';
import { Card, Spin, TreeSelect, Button } from 'antd';
import { Form, Input, Checkbox, Drawer, Radio, Switch} from 'antd';
import { FormInstance } from 'antd/es/form';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { DataNode } from 'rc-tree-select/lib/interface';

type PermissionDrawerProps = {
  loading: boolean;
  visible: boolean;
  readonly: boolean;
  onClose: (e:any) => void;
//   onCancel: () => void;
  onFinish: (values:any) => void;
  title: string;
  record?: Store;
  treeData?: DataNode[];
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};



const PermissionDrawer: React.FC<PermissionDrawerProps> = (props) => {
  const { loading, visible, readonly, title, onClose, onFinish, record, treeData} = props;
  const formRef = React.createRef<FormInstance>();
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>('success');
  const [show, setShow] = useState(true);
  const [menuType, setMenuType] = useState(record?.menuType);
//   formRef?.current?.setFieldsValue(record)
  

  const onTreeChange = (value: 	string | string[]) => {
    formRef?.current?.setFieldsValue({"parentId": value})
  };

  const menuTypeChange = (e) => {
    const curMenuType = formRef?.current?.getFieldValue("menuType");
    if(curMenuType == 2){
      // this.show = false;
      // formRef?.current?.setFieldsValue({"title": '按钮/权限'});
      setShow(false);
      setMenuType(2);
    } else if (curMenuType == 1){
      // this.show = true;
      // formRef?.current?.setFieldsValue({"title": '菜单名称'});
      setShow(true);
      setMenuType(1);
    } else {
      setMenuType(0);
    }
    console.log("curMenuType is "+curMenuType);
    console.log("menuType is "+menuType);
  }

  

  return (
    <Spin spinning={loading}>
        <Drawer 
            title={title} 
            placement="right"
            width='736px'
            destroyOnClose={true}
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
            <Radio.Group disabled={readonly} onChange={menuTypeChange}>
                <Radio value={0}>一级菜单</Radio>
                <Radio value={1}>子菜单</Radio>
                <Radio value={2}>按钮/权限</Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item
            label="菜单名称"
            name="name"
            validateStatus={validateStatus}
            rules={[{ required: true, message: '请输入菜单名称!' }]}
            >
            <Input/>
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
                defaultValue={record?.parentId}
                disabled={readonly}
            />
            </Form.Item>
            <Form.Item
            hidden={!show}
            label="菜单路径"
            name="url"
            rules={[{ required: true, message: '请输入菜单路径!' }]}
            >
            <Input disabled={readonly}/>
            </Form.Item>
            <Form.Item
            hidden={!show}
            label="前端组件"
            name="componentName"
            rules={[{ required: true, message: '请输入前端组件!' }]}
            >
            <Input disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="默认跳转地址"
            name="redirect"
            tooltip="请转入路由器参数redirect"
            >
            <Input disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="菜单图标"
            name="icon"
            >
            <Input disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="排序"
            name="sortNo"
            >
            <Input disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="是否路由菜单"
            name="redirectMenu"
            >
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="隐藏路由"
            >
            <Switch checkedChildren="是" unCheckedChildren="否" disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="是否缓存路由"
            >
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="聚合路由"
            >
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked disabled={readonly}/>
            </Form.Item>
            <Form.Item
            label="打开方式"
            >
            <Switch checkedChildren="外部" unCheckedChildren="内部" disabled={readonly}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={readonly}>
                提交
            </Button>
        </Form.Item>
        </Form>
        </Card>
        </Drawer>
    </Spin>
  );
};

export default PermissionDrawer;
