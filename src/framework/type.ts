import { RequestHandler } from 'express';

type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type Action = {
  path: string;
  method: Method;
  action: RequestHandler;
};
