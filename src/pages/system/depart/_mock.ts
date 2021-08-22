// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { log } from 'lodash-decorators/utils';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: (Math.floor(Math.random() * 10) % 4).toString(),
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as TableListParams;
  console.log(params);

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  // const sorter = JSON.parse(params.sorter as any);
  // if (sorter) {
  //   dataSource = dataSource.sort((prev, next) => {
  //     let sortNumber = 0;
  //     Object.keys(sorter).forEach((key) => {
  //       if (sorter[key] === 'descend') {
  //         if (prev[key] - next[key] > 0) {
  //           sortNumber += -1;
  //         } else {
  //           sortNumber += 1;
  //         }
  //         return;
  //       }
  //       if (prev[key] - next[key] > 0) {
  //         sortNumber += 1;
  //       } else {
  //         sortNumber += -1;
  //       }
  //     });
  //     return sortNumber;
  //   });
  // }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

function departList(req: Request, res: Response, u: string) {
  const treeData = [
    {
      "title": '北京中国软件公司',
      "key": 'a1',
      "children": [
        {
          "title": '研发部',
          "key": 'a1-a1',
        },
        {
          "title": '产品部',
          "key": 'a1-a2',
        },
      ],
    },
    {
      "title": '美国中国软件公司',
      "key": 'a2'
    },
  ];
  return res.json({
    data: treeData,
  });
}

function depart(req: Request, res: Response, id: string) {
  const data = 
  {
    "title": '北京中国软件公司',
    "key": 'a1',
    "phone": '18810618113'
  };
  return res.json({
    id: id,
    data: data,
  });
}

function permissionList(req: Request, res: Response, u: string) {
  const treeData = [
    {
    "key":"9502685863ab87f0ad1134142788a385",
    "title":"首页",
    "slotTitle":"首页",
    "isLeaf":true,
    "icon":null,
    "ruleFlag":0,
    "scopedSlots":{
    "title":"hasDatarule"
    },
    "children":null,
    "parentId":"",
    "label":null,
    "value":"9502685863ab87f0ad1134142788a385"
    },
    {
    "key":"baf16b7174bd821b6bab23fa9abb200d",
    "title":"个人办公",
    "slotTitle":"个人办公",
    "isLeaf":false,
    "icon":null,
    "ruleFlag":0,
    }
  ];
  return res.json({
    data: treeData,
  });
}

function departPermission(req: Request, res: Response, u: string) {
  const treeData = ["9502685863ab87f0ad1134142788a385"];
  return res.json({
    data: treeData,
  });
}


export default {
  'GET /api/rule': getRule,
  'GET /api/departList': departList,
  'GET /api/depart': depart,
  'POST /api/rule': postRule,
  'GET /api/permissionList': permissionList,
  'GET /api/departPermission': departPermission,
};
