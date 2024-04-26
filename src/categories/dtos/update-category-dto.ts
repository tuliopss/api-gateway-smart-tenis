import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Evento>;
  // players: Array<Player>;
}

interface Evento {
  name: string;
  operation: string;
  value: number;
}
