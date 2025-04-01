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
    shouldTransformResponse = false,
  }: {
    path: string;
    params?: Record<string, any>;
    shouldTransformResponse?: boolean;
  }): Promise<T> {
    try {
      const queryParams = new URLSearchParams(params);
      const url = `${this.baseUrl}${path}?${queryParams.toString()}`;

      console.log("url", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await response.json();

      if (shouldTransformResponse) {
        return transformResponse(jsonResponse);
      }

      return jsonResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

interface NbaApiResponse {
  resource: string;
  parameters: Record<string, any>;
  resultSets: Array<{
    name: string;
    headers: string[];
    rowSet: any[][];
  }>;
}

export function transformResponse<T>(
  response: NbaApiResponse,
  resultSetIndex: number = 0
): T {
  const resultSet = response.resultSets[resultSetIndex];
  const headers = resultSet.headers;

  return resultSet.rowSet.map((row) => {
    return headers.reduce<Record<string, any>>((acc, header, index) => {
      acc[header] = row[index];
      return acc;
    }, {});
  }) as T;
}
