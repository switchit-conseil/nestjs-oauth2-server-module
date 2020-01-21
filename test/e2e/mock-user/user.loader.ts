import {Injectable} from "@nestjs/common";
import {UserInterface, UserLoaderInterface} from "../../../lib/domain/interface";
import {InvalidUserException} from "../../../lib/domain/exception";
import {users} from "./users";


@Injectable()
export class UserLoader implements UserLoaderInterface {
    async load(userId: string): Promise<UserInterface> {
        if (users[userId] !== undefined) {
            return {
                id: users[userId],
                username: users[userId],
                email: users[userId],
            }
        }

        throw InvalidUserException.withId(userId);
    }
}
