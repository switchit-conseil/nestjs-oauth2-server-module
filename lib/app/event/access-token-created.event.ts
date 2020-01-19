/**
 * Event generated when an access token is generated
 */
export class AccessTokenCreatedEvent {
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly accessToken: string,
        public readonly accessTokenExpiresAt: Date,
        public readonly refreshToken: string,
        public readonly refreshTokenExpiresAt: Date,
        public readonly scope: string,
        public readonly userId?: string,
    ) {}
}