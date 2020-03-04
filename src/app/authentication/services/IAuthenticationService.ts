/**
 * Service related to user authentication.
 */
export interface IAuthenticationService {
    /**
     * Try to sign in.
     * @param id
     * @returns boolean True if successful, false if not.
     */
    signIn(id: number): boolean;

    /**
     * Sign out.
     *
     * Do/call all the cleaning methods.
     */
    signOut(): void;

    /**
     * Is the user was authenticated or not.
     */
    isAuthenticated(): boolean;
}
