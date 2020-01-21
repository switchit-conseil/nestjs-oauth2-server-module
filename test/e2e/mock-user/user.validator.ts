import {Injectable} from "@nestjs/common";
import {UserInterface, UserValidatorInterface} from "../../../lib/domain/interface";
import {InvalidUserException} from "../../../lib/domain/exception";
import {users} from "./users";

@Injectable()
export class UserValidator implements UserValidatorInterface {
    async validate(username, password): Promise<UserInterface> {
        if (users[username] !== undefined && users[username] === password) {
            return {
                id: users[username],
                username: users[username],
                email: users[username],
            }
        }

        throw InvalidUserException.withUsernameAndPassword(username, password);
    }
}
