import {ApiModelProperty} from "@nestjs/swagger";
import {Exclude, Expose} from "class-transformer";

/**
 * Main object used to transport data
 */
export class OAuth2Response {
    @ApiModelProperty({
        type:String,
        description: 'The generated access token',
        required: true
    })
    @Expose({name: 'access_token'})
    accessToken: string;

    @ApiModelProperty({
        type:String,
        description: 'The type of token, in our case should always be "bearer"',
        required: true
    })
    @Expose({name: 'token_type'})
    tokenType: string = 'bearer';

    @ApiModelProperty({
        type: String,
        description: 'The generated refresh token',
        required: true
    })
    @Expose({name: 'refresh_token'})
    refreshToken: string;

    @ApiModelProperty({
        type: Number,
        description: 'Number of seconds until the acess token expires',
        required: true
    })
    @Expose({name: 'expires_in'})
    accessTokenExp: number;

    @ApiModelProperty({
        type: Number,
        description: 'The list of the permissions (tpApps) that the application requests.',
        required: true
    })
    @Exclude()
    refreshTokenExp: number;

    @ApiModelProperty({
        type: String,
        description: 'Scopes you are allowed to use if any requested',
        required: true
    })
    @Expose({name: 'scope'})
    scope?: string;

    /**
     * Main method used to build this object
     *
     * @param accessToken
     * @param refreshToken
     * @param accessTokenExp
     * @param refreshTokenExp
     * @param scope
     */
    constructor(accessToken: string, refreshToken: string, accessTokenExp: number, refreshTokenExp: number, scope?: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExp = accessTokenExp;
        this.refreshTokenExp = refreshTokenExp;
        this.scope = scope;
    }
}
