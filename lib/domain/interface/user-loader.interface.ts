import {UserInterface} from "./user.interface";

/**
 * This is the main interface you have to implement in order to have the appropriate
 */
export interface UserLoaderInterface {
    /**
     * Implement this interface to load your user into the payload from its id
     *
     * @param userId
     */
    load(userId: string): Promise<UserInterface>;
}
