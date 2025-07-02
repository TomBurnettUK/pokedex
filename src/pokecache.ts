export type CacheEntry<T> = {
  createdAt: number;
  value: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T) {
    this.#cache.set(key, { createdAt: Date.now(), value });
  }

  get<T>(key: string) {
    return this.#cache.get(key)?.value as T;
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  #reap() {
    const expirationTime = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < expirationTime) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }
}
