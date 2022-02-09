import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { Form, Input, Select, Button, Tree} from 'antd';
import { FormInstance } from 'antd/lib/form';
const { Option } = Select;

type UserDataScopeProps = {
  show: boolean;
  loading: boolean;
  listDepart?: any;
  userDataScope: any;
  onFinish: (values:any) => void;
  onCancel: () => void;
};

const UserDataScopeModal: React.FC<UserDataScopeProps> = (props) => {
  const {show, loading, listDepart, userDataScope, onFinish, onCancel} = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(userDataScope);
  const formRef = React.createRef<FormInstance>();

  useEffect(()=>{
    setCheckedKeys(userDataScope)
    formRef?.current?.setFieldsValue({ departIds: userDataScope?.join() });
  }, [userDataScope])
  
  const onCheck = (checkedKeysValue: React.Key[], info: any) => {
    console.log('onCheck', checkedKeysValue);
    console.log('onCheck info', info);
    setCheckedKeys(checkedKeysValue);    
    console.log('checkKeyStr', checkedKeysValue.join());
    formRef.current!.setFieldsValue({
      departIds: checkedKeysValue.join()
    });
  };

  return (
    <Modal
      destroyOnClose
      title={"授权数据"}
      visible={show}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Spin spinning={loading}>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        ref={formRef}
        onFinish={onFinish}
      >
        <Form.Item name="dataScopeType" label="授权范围" >
          <Select defaultValue='5' disabled>
            <Option value='5'>自定义数据</Option>
            <Option value='4'>仅本人数据</Option>
            <Option value='3'>本部门数据</Option>
            <Option value='2'>本部门数据及以下数据</Option>
            <Option value='1'>全部数据</Option>
          </Select>
        </Form.Item>
        <Form.Item label="选择部门">
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
    </Modal>
  );
};

export default UserDataScopeModal;
