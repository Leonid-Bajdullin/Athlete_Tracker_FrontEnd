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
    if (method === 'POST' || 'PUT') {
      obj.body = JSON.stringify(data);
    }
    return fetch(`http://localhost:4000/${route}`, obj).then((res) =>
      {
        if (res.status !== 200) {
          return res.json().then(data => {
            throw new Error(data.message);
          });          
        }
        return res.json();
      }
    );
  }
}
