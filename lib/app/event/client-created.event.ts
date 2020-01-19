/**
 * Event published when a client is created
 */
export class ClientCreatedEvent {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly clientId: string,
        public readonly certExpiresAt: Date
    ) {}
}