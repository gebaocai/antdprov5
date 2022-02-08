import React, { FC, useState, useEffect } from 'react';
import { Form, Typography, Select , Button, Spin, Tree} from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

type RolePermissionProps = {
  hidden: boolean;
  loading: boolean;
  listDepart?: any;
  roleDataScope: any;
};

const RoleDataScope: FC<RolePermissionProps> = (props) => {
  const {hidden, loading, listDepart, roleDataScope} = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [showSelectDepart, setShowSelectDepart] = useState(roleDataScope?.dataScopeType === 5);
  const formRef = React.createRef<FormInstance>();

  useEffect(()=>{
    setShowSelectDepart(roleDataScope?.dataScopeType === 5);
    formRef.current!.setFieldsValue({ dataScopeType: roleDataScope?.dataScopeType+"" });
    // formRef.current!.setFieldsValue({ dataScopeType: "2" });
  }, [roleDataScope])

  const onCheck = (checkedKeysValue: React.Key[], info: any) => {
    console.log('onCheck', checkedKeysValue);
    console.log('onCheck info', info);
    setCheckedKeys(checkedKeysValue);    
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case '5':
        setShowSelectDepart(true);
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
            >
              <Form.Item name="dataScopeType" label="授权范围" rules={[{ required: true }]}>
                <Select onChange={onGenderChange}>
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