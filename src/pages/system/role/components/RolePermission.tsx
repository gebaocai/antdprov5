import React, { FC, useState, useEffect } from 'react';
import { Form, Typography, Tree, Button, Spin, Input} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DataNode } from 'rc-tree/lib/interface';
import {RoleItem} from '../data.d';

const { Title } = Typography;

type RolePermissionProps = {
  hidden: boolean;
  loading: boolean;
  permissionList: Array<DataNode>;
  rolePermission: string[];
  onFinish: (values:any) => void;
};

const RolePermission: FC<RolePermissionProps> = (props) => {
  const {hidden, loading, permissionList, rolePermission, onFinish} = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(rolePermission);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // let checkKeyStr=checkedKeys.join();
  let checkKeyStr = '';
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

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    // setCheckKeyStr(checkedKeysValue.join());
    console.log('checkKeyStr', checkedKeysValue.join());
    formRef.current!.setFieldsValue({
      permissionIds: checkedKeysValue.join()
    });
  };

  useEffect(()=>{
    setCheckedKeys(rolePermission);
  }, [rolePermission])

  const formRef = React.createRef<FormInstance>();

  return (<div hidden={hidden}>
          <Spin spinning={loading}>
            <Form
              name="basic"
              ref={formRef}
              labelCol={labelCol}
              wrapperCol={wrapperCol}
              initialValues={{ permissionIds: checkKeyStr}}
              onFinish={onFinish}
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
            
          </Spin>
    </div>
  );
};

export default RolePermission;