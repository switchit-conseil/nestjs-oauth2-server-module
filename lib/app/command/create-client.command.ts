/**
 * Command used to create clients
 */
export class CreateClientCommand {
    constructor(
        public readonly name: string,
        public readonly scope: string,
        public readonly clientId ?: string,
        public readonly accessTokenLifetime?: number,
        public readonly refreshTokenLifetime?: number,
    ) {}
}
