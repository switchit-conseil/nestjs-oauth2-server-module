import {ApiModelProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {Expose} from "class-transformer";

/**
 * Main object used to transport data
 */
export class OAuth2Request {
    @ApiModelProperty({
        type:String,
        description: 'The type of grant you are requesting, must be "client_credentials"',
        required: true
    })
    @IsNotEmpty()
    @Expose({ name: "grant_type" })
    grantType: string;

    @ApiModelProperty({
        type:String,
        description: 'The API Key given by the application',
        required: true
    })
    @IsNotEmpty()
    @Expose({ name: "client_id" })
    clientId: string;

    @ApiModelProperty({
        type:String,
        description: 'The API Token given by the application',
        required: true
    })
    @Expose({ name: "client_secret" })
    clientSecret: string;

    @ApiModelProperty({
        type: Number,
        description: 'The expiration time of the assertion, specified as seconds since 00:00:00 UTC, January 1, 1970. This value has a maximum of 1 hour after the issued time.',
    })
    @Expose({ name: "exp" })
    exp?: number;

    @ApiModelProperty({
        type: Number,
        description: 'The time the assertion was issued, specified as seconds since 00:00:00 UTC, January 1, 1970.',
    })
    @Expose({ name: "iat" })
    iat?: number;

    @ApiModelProperty({
        type: String,
        description: 'The list of the permissions (tpApps) that the application requests.',
        isArray: true
    })
    @Expose({ name: "scopes"})
    scopes?: string | string[];

    @ApiModelProperty({
        type: String,
        description: 'The refresh token only when grant_type is set to "refresh_token"',
    })
    @Expose({ name: "refresh_token"})
    refreshToken?: string;

    @ApiModelProperty({
        type: String,
        description: 'The username only when grant_type is set to "refresh_token"',
    })
    @Expose({ name: "username"})
    username?: string;

    @ApiModelProperty({
        type: String,
        description: 'The password when grant_type is set to "password_grant"',
    })
    @Expose({ name: "password"})
    password?: string;
}
