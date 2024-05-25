function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getQuiz<T>(key: string): Promise<T | null> {
  return delay(500).then(() => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  });
}

export function setQuiz<T>(key: string, value: T): Promise<void> {
  return delay(500).then(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export function removeQuiz(key: string): Promise<void> {
  return delay(500).then(() => {
    localStorage.removeItem(key);
  });
}
