import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly idCategory: string;
}
