export class RESTClient {
  protected baseUrl: string;
  protected headers: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async get<T>({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T> {
    const queryParams = new URLSearchParams(params);

    const response = await fetch(
      `${this.baseUrl}${path}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonResponse = await response.json();

    return jsonResponse;
  }
}
