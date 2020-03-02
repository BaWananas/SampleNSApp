export interface IAuthenticationService {
    signIn(id: number): void;
    signOut(): void;
}
