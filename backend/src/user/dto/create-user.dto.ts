import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3)
  name: string; // validar nome como string com no minimo 3 caracteres

  @IsEmail()
  @IsNotEmpty()
  email: string; // validar email como email

  @Length(8)
  @IsAlphanumeric()
  password: string; // validar senha com no minimo 8 caracteres alfanumericos
}

// validar aqui pois sao os dados que vem do cliente
