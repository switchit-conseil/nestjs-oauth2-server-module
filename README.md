<p align="center">
  <a href="http://switchit-conseil.com/" target="blank">
    <img src="https://switchit-conseil.com/wp-content/uploads/2019/08/switch-it-logo-1.png" width="320" alt="SwitchIt - Conseil Logo" />
  </a>
</p>

<p align="center"><strong>We build your next generation software !</strong></p>

# OAuth2 Server Module [![CircleCI](https://circleci.com/gh/switchit-conseil/nestjs-oauth2-server-module.svg?style=svg)](https://circleci.com/gh/switchit-conseil/nestjs-oauth2-server-module)

This module turns your [NestJS Application](https://nestjs.com) into an OAuth2 Server. It is based on

* [TypeORM](https://typeorm.io): For entities and database model
* [NestJS CQRS Module](https://github.com/nestjs/cqrs): For commands and queries
* [Passport](http://www.passportjs.org/): For securing routes

## Installation

```bash
npm install --save @switchit/nestjs-oauth2-server # or yarn install @switchit/nestjs-oauth2-server
```

## Usage

### Implement the `UserValidatorInterface`

The `UserValidatorInterface` lets you validate a user using the `PasswordGrantStrategy`. It is queried in your application
to validate that the given `username` and `password` matches with a user in your application's DB.

**IMPORTANT**: When the user is not found your have to throw an `InvalidUserException`. 

```typescript
import {Injectable} from "@nestjs/common";
import {UserValidatorInterface, UserInterface, InvalidUserException} from "@switchit/nestjs-oauth2-server";

@Injectable()
export class UserValidator implements UserValidatorInterface {
    async validate(username, password): Promise<UserInterface> {
        // check if the user exists with the given username and password
        // ...
        // or
        throw InvalidUserException.withUsernameAndPassword(username, password);
    }
}
```

The validate method should return an instance of the `UserInterface`:

```typescript
export interface UserInterface {
    id: string;
    username: string;
    email: string;
}
```

The user interface is then accessible in the payload once connected ot the `AccessToken` is used.

### Implement the `UserLoaderInterface`

The `UserLoaderInterface` lets you load a user from the database when the `AccessToken` is user specific. 
The user is then accessible in the request context of your application.

**IMPORTANT**: When the user is not found your have to throw an `InvalidUserException`. 

```typescript
import {Injectable} from "@nestjs/common";
import {UserLoaderInterface, UserInterface, InvalidUserException} from "@switchit/nestjs-oauth2-server";

@Injectable()
export class UserLoader implements UserLoaderInterface {
    async load(userId: string): Promise<UserInterface> {
        // Load the user from the database
        // ...
        // or throw and 
        throw InvalidUserException.withId(userId);
    }
}
```

### Implement the module in your application

Import the OAuth2Module into the root AppModule.

```typescript
//app.module.ts
import { Module } from '@nestjs/common';
import { OAuth2Module } from '@switchit/nestjs-oauth2-server';

@Module({
    imports: [
        OAuth2Module.forRoot({
            userLoader: new UserLoader(),
            userValidator: new UserValidator(),
        }),
    ],
})
export class AppModule {}
```

Of course you can use an async configuration:

```typescript
//app.module.ts
import { Module } from '@nestjs/common';
import { OAuth2Module } from '@switchit/nestjs-oauth2-server';

@Module({
    imports: [
        OAuth2Module.forRootAsync({
            useFactory: () => ({
                userLoader: new UserLoader(),
                userValidator: new UserValidator(),
            })
        }),
    ],
})
export class AppModule {}
```

## The OAuth2 `Controller`

The modules is shipped with a specific controller that lets you expose the `oauth2/token` endpoint in your application
and use the different implemented strategies accordingly to the request sent.

### Client Credentials

Used for server-to-server communications. 

```bash
curl -X POST http://localhost:3000/oauth2/token -d '{"grant_type":"client_credentials", "client_id":"6ab1cfab-0b3d-418b-8ca2-94d98663fb6f", "client_secret": "6nV9GGm1pu8OY0HDZ3Y7QsVnxtkb60wu", "scopes": ["app-1"]}'
```

### Refresh Token

Used to refresh an existing token

```bash
curl -X POST http://localhost:3000/oauth2/token -d '{"grant_type":"refresh_token", "client_id":"6ab1cfab-0b3d-418b-8ca2-94d98663fb6f", "client_secret": "6nV9GGm1pu8OY0HDZ3Y7QsVnxtkb60wu", "refresh_token": "6nV9GGm1pu8OY0HDZ3Y7QsVnxtkb6fgqstyudhjqskdqsd"}'
```

### Password

Used to refresh an existing token

```bash
curl -X POST http://localhost:3000/oauth2/token -d '{"grant_type":"password", "client_id":"6ab1cfab-0b3d-418b-8ca2-94d98663fb6f", "username": "j.doe@change.me", "password": "changeme", "scopes": ["app-1"]}'
```

## Securing your routes using the `AccessTokenStrategy`

The module comes with a `PassportJS` strategy of type `http-bearer`. You can secure your routes using the passport
`AuthGuard` with the `access-token` strategy name:

```typescript
@Controller('oauth2-secured')
export class TestSecuredController {
    @Get('me')
    @UseGuards(AuthGuard('access-token'))
    async auth(): Promise<any> {
        return {message: 'hello'};
    }
}
```

## Adding the entities to your TypeORM configuration

**IMPORTANT**: The module comes with entities you have to add the configuration `node_modules/@switchit/**/*.entity.js`
to let typeorm scan your entities or add them to the `entitie` configuration variable in TypeORM.

## Using the global validation pipes

**IMPORTANT**: In addition, you should enable the global validation pipe in your NestJS application. In your `main.ts`
you should use the `useGlobaPipes` with the `ValidationPipe` and the `transform` options set to `true`:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(3000);
}
bootstrap();
```