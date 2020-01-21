import {Module} from "@nestjs/common";
import {UserValidator} from "./user.validator";
import {UserLoader} from "./user.loader";

@Module({
    providers: [
        UserValidator,
        UserLoader,
    ],
    exports: [
        UserValidator,
        UserLoader,
    ]
})
export class UserModule {
}