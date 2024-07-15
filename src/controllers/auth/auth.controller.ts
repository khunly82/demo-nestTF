import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginForm } from 'src/dto/login.form';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { createHash } from 'crypto'

@Controller('auth')
export class AuthController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {

    }

    @Post('login')
    async login(@Body() form: LoginForm) {
        // verifier le nom et le mot de passe
        const user = this.userRepository.findOne({
            where: { email: form.username }
        });

        if(!user) {
            throw new UnauthorizedException();
        }

        const hash = createHash('sha512');
        const hashedPassword = hash.update(form.password, 'utf-8');
        console.log(hashedPassword);

        // si c'est ok
            // generer token
        
        // si pas ok
            // envoyer un code d'erreur (400 BadRequest, 401 Unauthorized)
    }
}
