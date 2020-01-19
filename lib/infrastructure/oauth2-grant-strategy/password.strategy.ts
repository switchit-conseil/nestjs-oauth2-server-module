import {Oauth2GrantStrategy, Oauth2GrantStrategyInterface} from "../../domain/strategy";
import {OAuth2Request, OAuth2Response} from "../../ui/dto";
import {Inject} from "@nestjs/common";
import {AccessTokenEntity, ClientEntity, ClientRepositoryInterface, UserValidatorInterface} from "../../domain";
import {CreateAccessTokenCommand} from "../../app/command";
import {CommandBus} from "@nestjs/cqrs";

@Oauth2GrantStrategy('password')
export class PasswordStrategy implements Oauth2GrantStrategyInterface {

    /**
     * Constructor
     *
     * @param clientRepository
     * @param userValidator
     * @param commandBus
     */
    constructor(
        @Inject('ClientRepositoryInterface')
        private readonly clientRepository: ClientRepositoryInterface,
        @Inject('UserValidatorInterface')
        private readonly userValidator: UserValidatorInterface,
        private readonly commandBus: CommandBus
    ) {
    }

    async validate(request: OAuth2Request, client: ClientEntity): Promise<boolean> {
        if (
            (client.clientSecret && client.clientSecret !== request.clientSecret) ||
            client.deletedAt !== null ||
            !client.grants.includes(request.grantType)
        ) {
            return false;
        }

        return true;
    }

    async getOauth2Response(request: OAuth2Request, client: ClientEntity): Promise<OAuth2Response> {
        const user = await this.userValidator.validate(request.username, request.password);
        const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
        const accessToken: AccessTokenEntity = await this.commandBus.execute(new CreateAccessTokenCommand(
            client.id,
            JSON.stringify(requestScopes),
            request.exp,
            request.iat,
            request,
            user.id
        ));

        return new OAuth2Response(
            accessToken.accessToken,
            accessToken.refreshToken,
            ~~((accessToken.accessTokenExpiresAt.getTime() - Date.now()) / 1000),
            ~~((accessToken.refreshTokenExpiresAt.getTime() - Date.now()) / 1000),
        );
    }
}