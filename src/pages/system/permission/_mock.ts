// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

function departPermission(req: Request, res: Response, u: string) {
  const treeData = ["9502685863ab87f0ad1134142788a385"];
  return res.json({
    data: treeData,
  });
}

export default {
  'GET /api/departPermission': departPermission,
};
