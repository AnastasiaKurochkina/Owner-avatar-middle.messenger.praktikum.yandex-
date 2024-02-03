// eslint-disable-next-line no-shadow
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

function queryStringify(data: { [key: string]: any }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

interface IOptions {
  timeout?: number;
  data?: object;
  headers?: { [key: string]: string };
  method?: string;
}

// type HTTPMethod = (url: string, options?: IOptions) => Promise<unknown>;


export class HTTPTransport {
  protected apiUrl = 'https://ya-praktikum.tech/api/v2';

  constructor(apiPath: string) {
    this.apiUrl = `${this.apiUrl}${apiPath}`;
  }

  get<TResponse>(url: string, options: IOptions = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<TResponse>(url: string, options: IOptions = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  request = <TResponse>(
    url: string,
    options: IOptions = {},
    timeout = 5000,
  ): Promise<TResponse> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(JSON.parse(xhr.response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
