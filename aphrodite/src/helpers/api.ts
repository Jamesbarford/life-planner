export interface BaseResponse<T> {
  statusCode: number;
  body: T;
  response: string;
  success: boolean;
}

export class ApiRequest {
  public static readonly route = "/api";

  public static async delete<R>(url: string): Promise<BaseResponse<R>> {
    const deleteRequest = await fetch(url, {
      method: "DELETE",
      mode: "cors"
    });
    const response = await deleteRequest.json();
    return response;
  }

  public static async patch<D, R>(
    url: string,
    data: D
  ): Promise<BaseResponse<R>> {
    const patchRequest = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const response = await patchRequest.json();
    return response;
  }

  public static async post<D, R>(
    url: string,
    data: D
  ): Promise<BaseResponse<R>> {
    const postRequest = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const response = await postRequest.json();
    return response;
  }

  public static async get<R>(url: string): Promise<BaseResponse<R>> {
    const getRequest = await fetch(url, {
      method: "GET",
      mode: "cors"
    });
    const response: Promise<BaseResponse<R>> = await getRequest.json();
    return response;
  }
}
