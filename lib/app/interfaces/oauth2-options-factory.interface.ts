import {OAuth2Options} from "./oauth2-options.type";

export interface Oauth2OptionsFactoryInterface {
    createOauth2Options(): Promise<OAuth2Options> | OAuth2Options;
}
