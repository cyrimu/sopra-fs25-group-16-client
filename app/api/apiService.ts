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
  public async postForm<T>(endpoint: string, data: Record<string, any>): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const formBody = new URLSearchParams();
    for (const key in data) {
      formBody.append(key, data[key]);
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
  }/**
 * GET base64 image from internal Next.js API or return placeholder.
 * Always returns a full data:image/png;base64,... string.
 */
public async getBase64Image(imageId: string): Promise<string> {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Image API] TEMP fetch: returning placeholder for image ID: ${imageId}`);
  }

  // ✅ Full base64 string with data prefix (your working version)
  const base64WithPrefix =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";

  return base64WithPrefix;

  // ❌ Uncomment to re-enable real API fetch
  /*
  const remoteBaseUrl = "https://sopra-fs25-group-16-server.oa.r.appspot.com";
  const url = `${remoteBaseUrl}/image/${imageId}`;

  if (process.env.NODE_ENV !== "production") {
    console.log(`[Image API] Fetching image ID: ${imageId}`);
    console.log(`[Image API] URL: ${url}`);
  }

  const start = performance.now();
  const res = await fetch(url);
  const duration = (performance.now() - start).toFixed(2);

  if (process.env.NODE_ENV !== "production") {
    console.log(`[Image API] Fetch took ${duration}ms`);
  }

  if (!res.ok) {
    console.error(`[Image API] Failed to fetch image ${imageId} – Status: ${res.status}`);
    throw new Error(`Failed to fetch base64 image (${res.status})`);
  }

  const text = await res.text();
  const result = text.startsWith("data:image/")
    ? text
    : `data:image/png;base64,${text}`;

  console.log(`[Image API] Image ${imageId} fetched successfully`);
  return result;
  */
}
}