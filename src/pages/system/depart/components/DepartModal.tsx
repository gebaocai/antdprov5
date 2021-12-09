import React from 'react';
import { Modal } from 'antd';
import { Form, Input, Button,Radio, InputNumber, Select } from 'antd';

const { Option } = Select;

type DepartModalProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onFinish: (values:any) => void;
  title: string;
  selectedTitle: string|undefined;
};

const { TextArea } = Input;

const DepartModal: React.FC<DepartModalProps> = (props) => {
  const { modalVisible, onFinish, onCancel, selectedTitle, title } = props;

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
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
      >
        <Form.Item
          label="机构名称"
          name="departName"
          rules={[{ required: true, message: '请输入机构名称!' }]}
        >
          <Input placeholder="请输入机构/部门名称!"/>
        </Form.Item>

        {selectedTitle !=undefined && (<Form.Item
          label="上级部门"
        >
           <Select defaultValue={selectedTitle} disabled />
        </Form.Item>)}

        <Form.Item
          label="机构类型"
          name="departType"
        >
          <Radio.Group defaultValue="a">
            <Radio value="a">公司</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="电话"
          name="phone"
        >
          <Input placeholder="请输入电话"/>
        </Form.Item>

        <Form.Item
          label="传真"
          name="fax"
        >
          <Input placeholder="请输入传真"/>
        </Form.Item>

        <Form.Item
          label="地址"
          name="address"
        >
          <Input placeholder="请输入地址"/>
        </Form.Item>

        <Form.Item
          label="排序"
          name="sort"
        >
          <InputNumber defaultValue={0}/>
        </Form.Item>

        <Form.Item
          label="备注"
          name="memo"
        >
          <TextArea rows={2} placeholder="请输入备注"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button">
            重置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartModal;
