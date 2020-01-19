/**
 * Create an access token
 */
import {OAuth2Request} from "../../ui/dto";

export class CreateAccessTokenCommand {
    constructor(
        public readonly clientId: string,
        public readonly scope: string,
        public readonly exp: number,
        public readonly iat: number,
        public readonly request: OAuth2Request,
        public readonly userId?: string,
    ) {}
}
