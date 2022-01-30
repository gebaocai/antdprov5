import { useRequest } from 'umi';
import React, { FC, useState, useEffect} from 'react';
import { Form, Typography, Tree, Button, Spin, Input, Drawer} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DataNode } from 'rc-tree/lib/interface';

const { Title } = Typography;

type PermissionApiProps = {
  hidden: boolean;
  loading: boolean;
  apiList?: Array<DataNode>;
  permissionApi?: string[];
  onFinish: (values:any) => void;
  onClose: (e:any) => void;
};


const PermissionApi: FC<PermissionApiProps> = (props) => {
  const {hidden, loading, apiList, permissionApi, onFinish, onClose} = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(permissionApi);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  let checkKeyStr = '';
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
      apiIds: checkedKeysValue.join()
    });
  };

  useEffect(()=>{
    setCheckedKeys(permissionApi);
  }, [permissionApi])

  const formRef = React.createRef<FormInstance>();

  return (
    <Drawer 
            // title={title} 
            placement="right"
            width='736px'
            destroyOnClose={true}
            onClose={onClose} 
            visible={hidden}>
    <Form
              name="basic"
              ref={formRef}
              initialValues={{ apiIds: checkKeyStr}}
              onFinish={onFinish}
            >
              
              <Title level={5}>关联的后端接口:</Title>
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
                  treeData={apiList}
                  checkStrictly={false}
                  
                />
              <Form.Item name="apiIds" hidden>
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
            </Drawer>
  );
};

export default PermissionApi;