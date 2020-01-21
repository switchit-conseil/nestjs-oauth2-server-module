import {Controller, Get, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Controller('oauth2-secured')
export class TestSecuredController {
    @Get('me')
    @UseGuards(AuthGuard('access-token'))
    async auth(): Promise<any> {
        return {message: 'hello'};
    }
}
