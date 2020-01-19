import {InternalServerErrorException, NotFoundException, UnauthorizedException} from "@nestjs/common";

/**
 * Exception thrown when a client was not found
 */
export class ClientNotFoundException extends NotFoundException {

    /**
     * Kind message with id
     *
     * @param id
     */
    static withId(id: string): ClientNotFoundException {
        return new ClientNotFoundException(`The client with id "${id}" was not found`);
    }

    /**
     * Kind message with client ID
     *
     * @param clientId
     */
    static withClientId(clientId: string): UnauthorizedException {
        return new UnauthorizedException(`The client with clientId "${clientId}" was not found`);
    }

    /**
     * Kind message with client ID
     *
     * @param name
     */
    static withName(name: string): InternalServerErrorException {
        return new UnauthorizedException(`The client with name "${name}" was not found`);
    }
}