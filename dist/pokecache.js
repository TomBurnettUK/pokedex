export class Cache {
    #cache = new Map();
    #reapIntervalId;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, value) {
        this.#cache.set(key, { createdAt: Date.now(), value });
    }
    get(key) {
        return this.#cache.get(key)?.value;
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
