export type Request<Payload extends Record<string, any>> = {
  url: string;
  method: HTTPMethods;
  query?: Record<string, any>;
  urlParams?: Record<string, any>;
  payload?: Payload;
  headers?: HeadersInit;
  timeout?: number;
  queryOptions?: qs.IStringifyOptions;
};

export class RequestError<T> extends Error {
  statusCode?: number;
  data?: T;
  url: string;
  method: HTTPMethods;
  headers?: Record<string, string[]>;
  timestamp: number;

  constructor(args: RequestErrorArgs<T>) {
    const { message, statusCode, data, url, method, headers, timestamp } = args;
    super(message);

    this.name = 'RequestError';
    this.statusCode = statusCode;
    this.data = data;
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.timestamp = timestamp;
  }
}

type RequestErrorArgs<T> = {
  url: string;
  method: HTTPMethods;
  timestamp: number;
  statusCode?: number;
  message: string;
  data?: T;
  headers?: Record<string, string[]>;
};

export type ResponseHandler = (response: Response) => Promise<any>;

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ResponseData<TData extends Record<string, any> = {}> {
  status: 'success' | 'failed';
  data: TData;
  msg?: string;
}
