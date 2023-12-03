export function setItem(key: string, value: string) {
  global?.window && window.localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
  return global?.window && window.localStorage.getItem(key);
}

export function removeItem(key: string) {
  global?.window && window.localStorage.removeItem(key);
}

export function clear() {
  global?.window && window.localStorage.clear();
}

export function key(index: number): string | null {
  return global?.window && window.localStorage.key(index);
}
