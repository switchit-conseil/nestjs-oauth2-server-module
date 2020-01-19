import {Oauth2PayloadInterface, Oauth2PayloadType} from "./oauth2-payload.interface";
import {AccessTokenEntity} from "../access-token.entity";

/**
 * Represents a client's payload
 */
export class ClientPayload implements Oauth2PayloadInterface {
    // Store the current type of payload user or client
    // When the client is connected he should only be able to access his own resources
    readonly type: Oauth2PayloadType = Oauth2PayloadType.CLIENT;

    constructor(
        public readonly accessToken: AccessTokenEntity,
        public readonly id: string,
        public readonly clientId: string,
        public readonly name: string,
    ) {}
}