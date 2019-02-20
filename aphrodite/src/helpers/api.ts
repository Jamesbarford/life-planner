export interface BaseResponse<T> {
  statusCode: number;
  body: T;
  response: string;
  success: boolean;
}

export async function getRequest<T>(url: string): Promise<BaseResponse<T>> {
  const getRequest = await fetch(url, { method: "GET", mode: "cors" });
  const response = await getRequest.json();
  return response;
}

export async function postRequest<U, R>(
  url: string,
  data: U
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

export async function patchRequest<T, R>(
  url: string,
  data: T
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

export async function deleteRequest<R>(url: string): Promise<BaseResponse<R>> {
  const deleteRequest = await fetch(url, { method: "DELETE", mode: "cors" });
  const response = await deleteRequest.json();
  return response;
}

export const Api = "/api";
