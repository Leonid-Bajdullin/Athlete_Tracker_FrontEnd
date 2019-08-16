// prettier-ignore

class HelperFunctions {
  static fetchFunc (method: string, data:{}, route: string) {
      let obj = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: method,
        body: ""
      }
      if (method === "POST") {
        obj.body = JSON.stringify(data)
      }
      return fetch(`http://localhost:4000/${route}`, obj)
        .then(res => res.json())
  }
}

export default HelperFunctions;
