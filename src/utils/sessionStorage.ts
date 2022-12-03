export default {
  set(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data))
  },
  get(key: string) {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },
}
