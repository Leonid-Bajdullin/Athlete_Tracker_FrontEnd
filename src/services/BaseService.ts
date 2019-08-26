// prettier-ignore

export abstract class BaseService {
  public fetchFunc(method: string, route: string, data?: {}) {
    let obj = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: method
      // body: ""
    } as any;
    if (method === 'POST') {
      obj.body = JSON.stringify(data);
    }
    return fetch(`http://localhost:4000/${route}`, obj).then((res) =>
      res.json()
    );
  }

  // public abstract getConnectionUrl(): string;
}
