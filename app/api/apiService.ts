import { getApiDomain } from "../../utils/domain";

export class ApiService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = getApiDomain();
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  /**
   * Helper function to check the response, parse JSON,
   * and throw an error if the response is not OK.
   */
  private async processResponse<T>(res: Response, errorMessage: string): Promise<T> {
    if (!res.ok) {
      let errorDetail = res.statusText;
      try {
        const errorInfo = await res.json();
        if (errorInfo?.message) {
          errorDetail = errorInfo.message;
        } else {
          errorDetail = JSON.stringify(errorInfo);
        }
      } catch {
        // fallback to res.statusText
      }
      const detailedMessage = `${errorMessage} (${res.status}: ${errorDetail})`;
      throw new Error(detailedMessage);
    }

    return res.headers.get("Content-Type")?.includes("application/json")
      ? ((await res.json()) as Promise<T>)
      : Promise.resolve(res as T);
  }

  /**
   * GET request.
   */
  public async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.defaultHeaders,
    });
    return this.processResponse<T>(res, "An error occurred while fetching the data.\n");
  }

  /**
   * POST request.
   */
  public async post<T>(endpoint: string, data: unknown): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });
    return this.processResponse<T>(res, "An error occurred while posting the data.\n");
  }

  /**
   * POST form request.
   */
  public async postForm<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const formBody = new URLSearchParams();
    for (const key in data) {
      formBody.append(key, String(data[key]));
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: formBody.toString(),
    });

    return this.processResponse<T>(res, "An error occurred while posting the data.\n");
  }

  /**
   * PUT request.
   */
  public async put<T>(endpoint: string, data: unknown): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });
    return this.processResponse<T>(res, "An error occurred while updating the data.\n");
  }

  /**
   * DELETE request.
   */
  public async delete(endpoint: string, data: unknown): Promise<void> {
    const url = `${this.baseURL}${endpoint}`;
    await fetch(url, {
      method: "DELETE",
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });
  }


  public async getBase64Image(imageId: string): Promise<string> {
    const remoteBaseUrl = "https://sopra-fs25-group-16-server.oa.r.appspot.com";
    const url = `${remoteBaseUrl}/image/${imageId}`;
  
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch base64 image (${res.status})`);
    }
  
    const text = await res.text();
    return text.startsWith("data:image/")
      ? text
      : `data:image/png;base64,${text}`;
  }
}