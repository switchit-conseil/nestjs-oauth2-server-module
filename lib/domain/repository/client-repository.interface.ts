import {ClientEntity} from "../client.entity";

/**
 * This is the main repository you have to implement if you want to
 * store clients in the database
 */
export interface ClientRepositoryInterface {
    /**
     * Find the client with the given ID
     *
     * @param id
     *
     * @throws ClientNotFoundException
     */
    find(id: string): Promise<ClientEntity>;

    /**
     * Finds a client using its clientId
     *
     * @param clientId
     *
     * @throws ClientNotFoundException
     */
    findByClientId(clientId: string): Promise<ClientEntity>;

    /**
     * Finds a client using its name
     *
     * @param name
     *
     * @throws ClientNotFoundException
     */
    findByName(name: string): Promise<ClientEntity>;

    /**
     * Create a new oAuth2 client
     *
     * @param client
     */
    create(client: ClientEntity): Promise<ClientEntity>;
}
