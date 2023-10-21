import { Modal } from 'antd';
import React, { useState } from 'react';

import LoginForm from '@/components/users/LoginForm';

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>Login</button>
      <button
        onClick={showModal}
        className='block rounded-md bg-slate-700 px-5 py-2 text-white'
      >
        Register
      </button>

      <Modal
        title=''
        footer={null}
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LoginForm />
      </Modal>
    </>
  );
}
