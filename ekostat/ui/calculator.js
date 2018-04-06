/**
 * Custom Error Class for handling of errors defined on by the calculator.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 */
class CalculatorError extends Error {
  constructor(response) {
    super(response.error_message);

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CalculatorError);
    }

    this.response = response;
  }
}

/**
 * Core class responsible for handling request/response communication
 * between client and server.
 */
class Calculator {
  static async requestSubsetAdd(data) {
    return this._request('POST', 'subsets/add', data);
  }

  static async requestSubsetList(uuid) {
    return this._request('GET', `subsets/${uuid}`);
  }

  static async requestWorkspaceAdd(data) {
    return this._request('POST', 'workspaces/add', data);
  }

  static async requestWorkspaceEdit(uuid, data) {
    return this._request('POST', `workspaces/edit/${uuid}`, data);
  }

  static async requestWorkspaceList() {
    return this._request('GET', 'workspaces/');
  }

  static async _request(method, path, data = {}) {
    const response = await fetch(`/api/${path}`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=UTF8'
      },
      body: method === 'POST' ? JSON.stringify(data) : undefined,
      method
    });

    if (!response.ok) {
      throw new CalculatorError((await response.json()));
    }

    return response.json();
  }
}

export {Calculator, CalculatorError};
