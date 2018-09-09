export class API {
  public static get<T extends any>(url: string) {
    return this.request<T>(url, 'GET')
  }

  public static post<T extends any>(url: string, body?: Record<string, any>) {
    return this.request<T>(url, 'POST', body)
  }

  public static put<T extends any>(url: string, body?: Record<string, any>) {
    return this.request<T>(url, 'PUT', body)
  }

  public static delete<T extends any>(url: string, body?: Record<string, any>) {
    return this.request<T>(url, 'DELETE', body)
  }

  private static BASE_URL = 'http://localhost:8080/api'

  private static async request<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: Record<string, any>): Promise<T> {
    const options: RequestInit = { method }
    options.headers = { 'Content-Type': 'application/json' }

    if (method !== 'GET' && body) options.body = JSON.stringify(body)

    try {
      const response = await fetch(`${this.BASE_URL}${url}`, options)
      if (!response.ok) throw new Error('Something went wrong...')

      return this.response(response)
    } catch (e) {
      console.error(e)
    }
  }

  private static response(res: Response) {
    const clone = res.clone()
    try {
      return res.json()
    } catch (e) {
      return clone.text()
    }
  }
}
