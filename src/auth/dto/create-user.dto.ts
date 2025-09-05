import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  user_code: string;

  @IsBoolean()
  isActive: boolean;
}
