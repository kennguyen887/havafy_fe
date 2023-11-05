export function setItem(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export default function getItem(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function removeItem(key: string) {
  window.localStorage.removeItem(key);
}

export function clear() {
  window.localStorage.clear();
}

export function key(index: number): string | null {
  return window.localStorage.key(index);
}
