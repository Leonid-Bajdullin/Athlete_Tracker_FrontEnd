import history from 'history';

export abstract class BaseService {
  public addAuthHeader = (obj: any) => {
    let token = localStorage.getItem('token');
    if (token) {
      obj.headers.Authorization = `Bearer ${token}`;
    }
  };

  // prettier-ignore
  public fetchFunc(method: string, route: string, data?: {}) {
    let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method
    } as any;
    this.addAuthHeader(obj);
    if (method === 'POST' || 'PUT') {
      obj.body = JSON.stringify(data);
    }
    return fetch(`http://localhost:4000/${route}`, obj).then((res) => {
      if (res.status === 401) {
        window.location.href = '/';
        throw new Error('Please log in');
      }
      if (res.status !== 200) {
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    });
  }
}
