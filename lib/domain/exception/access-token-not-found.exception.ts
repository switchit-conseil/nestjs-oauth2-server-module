import {NotFoundException, UnauthorizedException} from "@nestjs/common";

/**
 * Exception thrown when an access token was not found
 */
export class AccessTokenNotFoundException extends NotFoundException {

    /**
     * Kind message with id
     *
     * @param id
     */
    static withId(id: string): AccessTokenNotFoundException {
        return new AccessTokenNotFoundException(`The access toekn with id "${id}" was not found`);
    }

    /**
     * Kind message with accessToken
     *
     * @param accessToken
     */
    static withAccessToken(accessToken: string): UnauthorizedException {
        return new UnauthorizedException(`The access token with accessToken "${accessToken}" was not found`);
    }

    /**
     * Kind message with refreshToken
     *
     * @param refreshToken
     */
    static withRefreshToken(refreshToken: string): UnauthorizedException {
        return new UnauthorizedException(`The refresh token with refreshToken "${refreshToken}" was not found`);
    }
}