import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlayerDTO {
  // @IsNotEmpty()
  // readonly phone: string;

  // @IsNotEmpty()
  // readonly name: string;

  @IsOptional()
  category?: string;
  @IsOptional()
  urlPlayerPhoto?: string;
}
