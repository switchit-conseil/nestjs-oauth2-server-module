import * as uuid from 'uuid/v4';
import {Test, TestingModule} from '@nestjs/testing';
import {CqrsModule, EventBus} from '@nestjs/cqrs';
import {
    CreateClientCommand,
    CreateClientHandler
} from "../../../../lib/app/command";
import {
    ClientEntity
} from "../../../../lib/domain";
import {ClientCreatedEvent} from "../../../../lib/app/event";

describe('Create Client Command Handler', () => {
    let app: TestingModule;
    let handler: CreateClientHandler;
    let eventBus: EventBus;

    const clientRepositoryMock = {
        create(client: ClientEntity) {
            client.id = uuid();
            return client;
        }
    };

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                CqrsModule
            ],
            providers: [
                CreateClientHandler,
                {provide: 'ClientRepositoryInterface', useValue: clientRepositoryMock}
            ],
        }).compile();

        eventBus = app.get<EventBus>(EventBus);
        handler = app.get<CreateClientHandler>(CreateClientHandler);
    });

    it('"CreateClientHandler::execute": should create the Client from name and scope', async () => {
        const serviceSpy = jest.spyOn(clientRepositoryMock, 'create');

        await handler.execute(new CreateClientCommand(
            'client-1',
            '["app-1", "app-2"]'
        ));

        expect(serviceSpy).toBeCalledWith(expect.objectContaining({
            name: 'client-1',
            scope: '["app-1", "app-2"]',
            clientId: expect.any(String),
            clientSecret: expect.any(String),
            accessTokenLifetime: 3600,
            refreshTokenLifetime: 7200,
            privateKey: expect.any(String),
            publicKey: expect.any(String),
            cert: expect.any(String)
        }));

        serviceSpy.mockRestore();
    });

    it('"CreateClientHandler::execute": should emit an ClientCreatedEvent', async () => {
        const publishSpy = jest.spyOn(eventBus, 'publish');

        await handler.execute(new CreateClientCommand(
            'client-1',
            '["app-1", "app-2"]'
        ));

        expect(publishSpy).toBeCalledWith(expect.any(ClientCreatedEvent));

        publishSpy.mockRestore();
    });

    it('"CreateClientHandler::execute": should create the Client using optional parameters', async () => {
        const serviceSpy = jest.spyOn(clientRepositoryMock, 'create');

        await handler.execute(new CreateClientCommand(
            'client-1',
            '["app-1", "app-2"]',
            'client-id',
            ['client_credentials', 'refresh_token'],
            false,
            1000,
            3600
        ));

        expect(serviceSpy).toBeCalledWith(expect.objectContaining({
            name: 'client-1',
            scope: '["app-1", "app-2"]',
            clientId: 'client-id',
            clientSecret: expect.any(String),
            grants: ['client_credentials', 'refresh_token'],
            accessTokenLifetime: 1000,
            refreshTokenLifetime: 3600,
        }));

        serviceSpy.mockRestore();
    });

    it('"CreateClientHandler::execute": should create the Client with no secret when asked', async () => {
        const serviceSpy = jest.spyOn(clientRepositoryMock, 'create');

        await handler.execute(new CreateClientCommand(
            'client-1',
            '["app-1", "app-2"]',
            'client-id',
            ['password_grant', 'refresh_token'],
            true,
            1000,
            3600
        ));

        expect(serviceSpy).toBeCalledWith(expect.objectContaining({
            name: 'client-1',
            scope: '["app-1", "app-2"]',
            clientId: 'client-id',
            grants: ['password_grant', 'refresh_token'],
            accessTokenLifetime: 1000,
            refreshTokenLifetime: 3600,
        }));

        serviceSpy.mockRestore();
    });
});
