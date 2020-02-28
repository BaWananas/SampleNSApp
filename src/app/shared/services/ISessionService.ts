export interface ISessionService {

    user: number;

    loadPersistentData(): void;
    loadLocalUser(): void;
    storeLocalUser(): void;
    clearLocalUser(): void;
}
