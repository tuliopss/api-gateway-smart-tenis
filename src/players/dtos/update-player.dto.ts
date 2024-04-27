import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly category: string;
}
