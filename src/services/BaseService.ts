// prettier-ignore
export abstract class BaseService {
  public addAuthHeaderMiddleware = () => {
    return localStorage.getItem("token");
  }

  public fetchFunc(method: string, route: string, data?: {}) {
    // debugger;
    const authorization = this.addAuthHeaderMiddleware();
    let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`
      },
      method: method
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
