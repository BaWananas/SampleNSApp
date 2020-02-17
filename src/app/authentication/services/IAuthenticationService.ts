export interface IAuthenticationService {
    setAuthenticatedUserId(id: number): void;
    getAuthenticatedUserId(): number;
}
