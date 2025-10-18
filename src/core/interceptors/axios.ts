import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../config/env';

class AxiosInterceptor {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${env.tmdbApiBaseUrl}/3`,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      params : { api_key: env.tmdbApiKey, language: 'pt-BR' },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error?.response?.data ?? error)
    );
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const axiosInterceptor = new AxiosInterceptor();
