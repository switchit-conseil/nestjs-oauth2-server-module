import {UserLoaderInterface, UserValidatorInterface} from "../../domain/interface";

export type OAuth2Options = {
    userLoader: UserLoaderInterface,
    userValidator: UserValidatorInterface,
};
