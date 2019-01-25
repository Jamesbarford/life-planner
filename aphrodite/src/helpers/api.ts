export async function getRequest<T>(url: string): Promise<T> {
  const response = await fetch(url, { method: "GET", mode: "cors" });
  const data: T = await response.json();
  return data;
}

export async function postRequest<T, U>(url: string, data: U) {
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
  const response: T = await postRequest.json();
  return response;
}

export const Api = "/api";
