export const API_ORIGIN = "http://localhost:8787/api";

interface ApiReturn {
  data: any | null;
  error: string | null;
  errorCode?: any;
}
export const API = {
  get: async function (
    endpoint: string,
    includeCredentials: boolean = true,
  ): Promise<ApiReturn> {
    try {
      let res: Response;
      if (includeCredentials) {
        const authToken = localStorage.getItem("token");
        const headers = authToken
          ? {
              Authorization: "Bearer " + authToken,
            }
          : undefined;
        res = await fetch(`${API_ORIGIN}${endpoint}`, {
          headers: headers,
        });
      } else {
        res = await fetch(`${API_ORIGIN}${endpoint}`);
      }

      if (!res.ok)
        return { data: null, error: "Uncaught error. Check connection." };
      const data = await res.json();
      if (!data.success) {
        return {
          data: null,
          error: data.message,
          errorCode: data.errorCode,
        };
      }
      return {
        data: data.data,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: "Uncaught error. Check connection.",
      };
    }
  },
  post: async function (
    endpoint: string,
    body?: any,
    includeCredentials: boolean = true,
  ): Promise<ApiReturn> {
    try {
      let res: Response;
      if (includeCredentials) {
        const authToken = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: "Bearer " + authToken } : {}),
        };
        res = await fetch(`${API_ORIGIN}${endpoint}`, {
          method: "POST",
          headers: headers,
          body: body ? JSON.stringify(body) : null,
        });
      } else {
        res = await fetch(`${API_ORIGIN}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : null,
        });
      }

      if (!res.ok)
        return { data: null, error: "Uncaught error. Check connection." };
      const data = await res.json();
      if (!data.success) {
        return {
          data: null,
          error: data.message,
          errorCode: data.errorCode,
        };
      }
      return {
        data: data.data,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: "Uncaught error. Check connection.",
      };
    }
  },
};
