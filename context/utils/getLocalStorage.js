export default function GetLocalStorage(name) {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(name);
    if (!data) return [];

    return JSON.parse(data);
  }
}
