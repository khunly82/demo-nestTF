import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginForm } from 'src/dto/login.form';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { createHash } from 'crypto'
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {

    }

    @Post('login')
    async login(@Body() form: LoginForm) {
        // verifier le nom et le mot de passe
        const user = await this.userRepository.findOne({
            where: { email: form.username }
        });

        // si pas ok
            // envoyer un code d'erreur (400 BadRequest, 401 Unauthorized)
        if(!user) {
            throw new UnauthorizedException();
        }

        const hash = createHash('sha512');
        const data = hash.update(form.password);
        const hashedPassword = data.digest('hex');
        
        // si pas ok
            // envoyer un code d'erreur (400 BadRequest, 401 Unauthorized)
        if(hashedPassword !== user.password) {
            throw new UnauthorizedException();
        }

        const token = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
        });

        return { token };
    }
}
