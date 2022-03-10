import { useRequest } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { Table, Card, Space, Button, Modal, Col, Row} from 'antd';
import { Divider, Menu, Dropdown, Popconfirm, Spin } from 'antd';
import { List } from 'antd';
import { DownOutlined, PlusOutlined} from '@ant-design/icons';

import { machineInfo } from './service';
import styles from './style.less';
const { confirm } = Modal;

const sysOsInfoData = (sysOsInfo:any):any[]=> {
  console.log(sysOsInfo);
  return [{title: "系统名称:", value:sysOsInfo?.osName},
  {title: "系统架构:", value:sysOsInfo?.osArch},
  {title: "系统版本:", value:sysOsInfo?.osVersion},
  {title: "主机名称:", value:sysOsInfo?.osHostName},
  {title: "主机ip地址:", value:sysOsInfo?.osHostAddress},]
}

const sysJavaInfoData = (sysJavaInfo:any):any[]=> {
  console.log(sysJavaInfo);
  return [{title: "虚拟机名称:", value:sysJavaInfo?.jvmName},
  {title: "虚拟机版本:", value:sysJavaInfo?.jvmVersion },
  {title: "虚拟机供应商:", value:sysJavaInfo?.osVerjvmVendor},
  {title: "java名称:", value:sysJavaInfo?.javaName },
  {title: "java版本:", value:sysJavaInfo?.javaVersion },]
}

const sysJvmMemInfoData = (sysJvmMemInfo:any):any[]=> {
  console.log(sysJvmMemInfo);
  return [{title: "最大内存:", value:sysJvmMemInfo?.jvmMaxMemory, title1: "可用内存:", value1:sysJvmMemInfo?.jvmUsableMemory },
  {title: "总内存:", value:sysJvmMemInfo?.jvmTotalMemory , title1: "已使用内存:", value1:sysJvmMemInfo?.jvmUsedMemory  },
  {title: "空余内存:", value:sysJvmMemInfo?.jvmFreeMemory , title1: "使用率:", value1:sysJvmMemInfo?.jvmMemoryUsedRate  },]
}

const MachinePage: FC = () => {

  const machineInfoReq = useRequest(machineInfo);
  const [sysOsInfo, setSysOsInfo] = useState(sysOsInfoData(machineInfoReq.data?.sysOsInfo));
  const [sysJavaInfo, setSysJavaInfo] = useState(sysJavaInfoData(machineInfoReq.data?.sysJavaInfo));
  const [sysJvmMemInfo, setSysJvmMemInfo] = useState(sysJvmMemInfoData(machineInfoReq.data?.sysJvmMemInfo));

  useEffect(() => {
    setSysOsInfo(sysOsInfoData(machineInfoReq.data?.sysOsInfo));
    setSysJavaInfo(sysJavaInfoData(machineInfoReq.data?.sysJavaInfo));
    setSysJvmMemInfo(sysJvmMemInfoData(machineInfoReq.data?.sysJvmMemInfo));
  }, [machineInfoReq.loading, machineInfoReq.data]);

  const sysInfoColumns = [
    {
      dataIndex: 'title',
      key: 'title',
    },
    {
      dataIndex: 'value',
      key: 'value',
    }
  ];

  const sysInfoColumns1 = [
    {
      dataIndex: 'title',
      key: 'title',
    },
    {
      dataIndex: 'value',
      key: 'value',
    },
    {
      dataIndex: 'title1',
      key: 'title1',
    },
    {
      dataIndex: 'value1',
      key: 'value1',
    }
  ];



  return (<>

        <Spin spinning={machineInfoReq.loading}>
       <Row justify="space-between" gutter={24}>
        <Col span={12}>
          <Card loading={machineInfoReq.loading} title={"系统信息"} bordered={false} style={{marginBottom: '20px'}}>
            <Table showHeader={false} className="sysInfo_table" dataSource={sysOsInfo} columns={sysInfoColumns} pagination={false}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={machineInfoReq.loading} title={"Java信息"} bordered={false} style={{marginBottom: '20px'}}>
            <Table showHeader={false} className="sysInfo_table" dataSource={sysJavaInfo} columns={sysInfoColumns} pagination={false}/>
          </Card>
        </Col>
        
      </Row>
      <Card loading={machineInfoReq.loading} title={"JVM内存信息"} bordered={false} >
            <Table showHeader={false} className="sysInfo_table" dataSource={sysJvmMemInfo} columns={sysInfoColumns1} pagination={false}/>
      </Card>
      </Spin>
    </>

  );
};

export default MachinePage;