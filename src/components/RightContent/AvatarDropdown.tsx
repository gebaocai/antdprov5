import React, { useCallback, useState } from 'react';
import { SecurityScanOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, message} from 'antd';
import { useRequest, history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import ChangePasswordModal from './ChangePasswordModal';
import {changePassword} from '../../services/service'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const mymessage = message;

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [changePWVisiable, setChangePWVisiable] = useState(false);

  const onChangePWFinish = (values: any) => {
    changePasswordReq.run(values);
  }

  const onChangePWCancel = () => {
    console.log("onCancel")
    setChangePWVisiable(false);
  }

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: undefined });
        loginOut();
        return;
      } else if (key === 'changePW' && initialState) {
        setChangePWVisiable(true);
        return;
      }
      history.push(`/account/${key}`);
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  console.log(initialState);

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.nickname) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="changePW">
        <SecurityScanOutlined />
        修改密码
      </Menu.Item>

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  // const changePasswordReq = useRequest(changePassword, {manual: true,
  //   onSuccess : (data)=>{
  //     console.log("code is "+data);
  //     // console.log("message is "+message);
  //     // if(res!==200){
  //     //   message.error(message);
  //     // }else{
  //     //   message.success('编辑成功');
  //     //   setChangePWVisiable(false);
  //     // }
  //   },
  //   onError
  // });  

  // const changePasswordReq = useRequest(changePassword, {manual: true,
  //   onSuccess : (data)=>{
  //     console.log("data is "+data);
  //     message.success('编辑成功');setChangePWVisiable(false)
  //   },
  //   onError : ()=>{
  //     message.success('编辑失败');
  //   },
  // }); 
  const changePasswordReq = useRequest(changePassword, {manual: true,
    formatResult: ({code, message})=>{
      console.log("code is "+code);
      console.log("message is "+message);
      if(code!==200){
        mymessage.error(message);
      }else{
        mymessage.success(message);
        setChangePWVisiable(false);
      }
      // console.log("res is "+ JSON.stringify(res));
    }
  }); 

  return (<>
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
      </span>
    </HeaderDropdown>
    <ChangePasswordModal 
        modalVisible={changePWVisiable}
        onFinish={onChangePWFinish}
        onCancel={onChangePWCancel}
        />
    </>
  );
};

export default AvatarDropdown;
