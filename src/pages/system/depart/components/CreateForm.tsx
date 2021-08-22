import React from 'react';
import { Modal } from 'antd';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
  title: string;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, title } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
