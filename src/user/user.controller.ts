import {Controller, Get, Req} from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getUser(@Req() req: Request) {
        return [
            {id: '1', name: 'Joka1', age: 21, data: req},
            {id: '2', name: 'Joka2', age: 22},
            {id: '3', name: 'Joka3', age: 23},
            {id: '4', name: 'Joka4', age: 24},
            {id: '5', name: 'Joka5', age: 25},
            {id: '6', name: 'Joka6', age: 26},
        ];
    }
}
