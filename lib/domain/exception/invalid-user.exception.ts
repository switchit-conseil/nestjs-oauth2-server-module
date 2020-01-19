import {UnauthorizedException} from "@nestjs/common";

/**
 * Exception thrown when a user is invalid
 */
export class InvalidUserException extends UnauthorizedException {

    /**
     * Kind message with username and password
     *
     * @param username
     * @param password
     */
    static withUsernameAndPassword(username: string, password: string): InvalidUserException {
        return new InvalidUserException(`The user with username "${username}" and password "${password}" was not found`);
    }

    /**
     * Kind message with id
     *
     * @param userId
     */
    static withId(userId: string): InvalidUserException {
        return new InvalidUserException(`The user with id "${userId}" was not found`);
    }
}
