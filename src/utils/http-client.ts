import { appRouter } from "@/main";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "./cookies";
import { useUser } from "@/stores/user.store";

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

// Request Interceptor
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { logout } = useUser.getState();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("refreshToken");
        const oldToken = getCookie("token");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${oldToken}`,
            },
          }
        );

        const { token: newAccessToken } = response.data.data;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        setCookie("token", newAccessToken, 7);
        setCookie("refreshToken", response.data.data.refreshToken, 7);

        httpClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        deleteCookie("token");
        deleteCookie("refreshToken");
        appRouter.navigate({ to: "/login" });
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient
