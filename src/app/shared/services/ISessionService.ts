/**
 * Represent an SessionService used to manage persistent data.
 */
export interface ISessionService {
    /**
     * The authenticated user.
     */
    user: number;

    /**
     * Load data from the local storage.
     */
    loadPersistentData(): void;

    /**
     * Load the last authenticated user from the local data.
     */
    loadLocalUser(): void;

    /**
     * Store the current user in the local storage.
     */
    storeLocalUser(): void;

    /**
     * Clear user from the local storage (e.g. logout).
     */
    clearLocalUser(): void;
}
