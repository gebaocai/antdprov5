import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Select , Button, Spin, Tree} from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

type RolePermissionProps = {
  hidden: boolean;
  loading: boolean;
  listDepart?: any;
  roleDataScope: any;
  onFinish: (values:any) => void;
};

const RoleDataScope: FC<RolePermissionProps> = (props) => {
  const {hidden, loading, listDepart, roleDataScope, onFinish} = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(roleDataScope?.departIds);
  const [showSelectDepart, setShowSelectDepart] = useState(roleDataScope?.dataScopeType === 5);
  const formRef = React.createRef<FormInstance>();

  useEffect(()=>{
    setCheckedKeys(roleDataScope?.departIds)
    setShowSelectDepart(roleDataScope?.dataScopeType === 5);
    formRef.current!.setFieldsValue({ dataScopeType: roleDataScope?.dataScopeType+"" });
    formRef.current!.setFieldsValue({ departIds: roleDataScope?.departIds?.join() });
    // formRef.current!.setFieldsValue({ dataScopeType: "2" });
  }, [roleDataScope])
  
  const onCheck = (checkedKeysValue: React.Key[], info: any) => {
    console.log('onCheck', checkedKeysValue);
    console.log('onCheck info', info);
    setCheckedKeys(checkedKeysValue);    
    console.log('checkKeyStr', checkedKeysValue.join());
    formRef.current!.setFieldsValue({
      departIds: checkedKeysValue.join()
    });
  };

  const onDataScopeChange = (value: string) => {
    switch (value) {
      case '5':
        setShowSelectDepart(true);
        return;
      default:
        setShowSelectDepart(false);
        return;
    }
  };

  return (<div hidden={hidden}>
          <Spin spinning={loading}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              ref={formRef}
              onFinish={onFinish}
            >
              <Form.Item name="dataScopeType" label="授权范围" rules={[{ required: true }]}>
                <Select onChange={onDataScopeChange}>
                  <Option value='5'>自定义数据</Option>
                  <Option value='4'>仅本人数据</Option>
                  <Option value='3'>本部门数据</Option>
                  <Option value='2'>本部门数据及以下数据</Option>
                  <Option value='1'>全部数据</Option>
                </Select>
              </Form.Item>
              <Form.Item label="选择部门" hidden={!showSelectDepart}>
                <Tree
                        checkable
                        defaultExpandAll={true}
                        selectable={false}
                        // showLine={{showLeafIcon: false}}
                        treeData={listDepart}
                        checkedKeys={checkedKeys}
                        onCheck={onCheck}
                        style={{marginTop:10}}
                        />
              </Form.Item>  
              <Form.Item name="departIds" hidden>
                <Input />
              </Form.Item>  
              <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>  
            </Form>
            
          </Spin>
    </div>
  );
};

export default RoleDataScope;