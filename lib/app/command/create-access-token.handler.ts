import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from "@nestjs/common";
import {CreateAccessTokenCommand} from "./create-access-token.command";
import {
    ClientEntity,
    AccessTokenEntity,
    AccessTokenRepositoryInterface,
    ClientRepositoryInterface
} from "../../domain";
import * as crypto from "crypto";
import {AccessTokenCreatedEvent} from "../event";

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenHandler implements ICommandHandler<CreateAccessTokenCommand> {
    constructor(
        @Inject('AccessTokenRepositoryInterface')
        private readonly accessTokenRepository: AccessTokenRepositoryInterface,
        @Inject('ClientRepositoryInterface')
        private readonly clientRepository: ClientRepositoryInterface,
        private readonly eventBus: EventBus
    ) {
    }

    /**
     * Execute the create AccessToken Command
     *
     * @param command
     */
    async execute(command: CreateAccessTokenCommand) {
        const client: ClientEntity = await this.clientRepository.find(command.clientId);
        // @fixme: Shall we remove old tokens ?

        const accessToken = new AccessTokenEntity();
        accessToken.client = client;
        accessToken.createdAt = new Date();
        accessToken.createdFrom = command.request;
        accessToken.scope = command.scope;

        // generate access & refresh tokens
        const now = Date.now();
        // Ensure we have an expiration
        const requestedExp = command.exp || (new Date(now + client.accessTokenLifetime*1000)).getTime()/1000;
        const exp = (now + client.accessTokenLifetime*1000 < requestedExp * 1000) ?
            (now + client.accessTokenLifetime*1000) : (requestedExp * 1000);

        accessToken.refreshTokenExpiresAt = new Date(now + client.refreshTokenLifetime*1000);
        accessToken.accessTokenExpiresAt = new Date(exp);
        accessToken.refreshToken = crypto.randomBytes(32).toString('hex');
        accessToken.accessToken = crypto.randomBytes(32).toString('hex');
        if (command.userId) {
            accessToken.userId = command.userId;
        }

        const token = await this.accessTokenRepository.create(accessToken);

        // emit an access token created event
        this.eventBus.publish(new AccessTokenCreatedEvent(
            token.id,
            command.clientId,
            token.accessToken,
            token.accessTokenExpiresAt,
            token.refreshToken,
            token.refreshTokenExpiresAt,
            token.scope,
            command.userId
        ));

        return token;
    }
}
