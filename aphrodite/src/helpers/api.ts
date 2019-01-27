export interface BaseResponse<T> {
  statusCode: number;
  body: T;
  response: string;
  success: boolean;
}

export async function getRequest<T>(
  url: string
): Promise<BaseResponse<Array<T>>> {
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

export const Api = "/api";
