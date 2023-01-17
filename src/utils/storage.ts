export function getLocalStorage<T>(name: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(name);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setLocalStorage(name: string, value: any) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function getSessionStorage<T>(name: string, defaultValue: T): T {
  try {
    const val = sessionStorage.getItem(name);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setSessionStorage(name: string, value: any) {
  sessionStorage.setItem(name, JSON.stringify(value));
}
