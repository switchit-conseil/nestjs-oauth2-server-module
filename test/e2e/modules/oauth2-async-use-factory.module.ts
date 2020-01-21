import {Oauth2Module} from "../../../lib/app";
import {Module} from "@nestjs/common";
import {UserValidator} from "../mock-user/user.validator";
import {UserLoader} from "../mock-user/user.loader";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FixturesLoaderService} from "../fixtures-loader.service";
import {TestSecuredController} from "../controller/test-secure.controller";
import {UserModule} from "../mock-user/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'oauth2-server',
            entities: [process.cwd() + '/lib/**/*.entity{.ts,.js}'],
            dropSchema: true,
            synchronize: true
        }),
        Oauth2Module.forRootAsync({
            imports: [UserModule],
            useFactory: (userValidator, userLoader) => ({
                userValidator,
                userLoader,
            }),
            inject: [UserValidator, UserLoader],
        }),
    ],
    providers: [
        FixturesLoaderService,
    ],
    controllers: [
        TestSecuredController,
    ]
})
export class Oauth2AsyncUseFactoryModule {}
