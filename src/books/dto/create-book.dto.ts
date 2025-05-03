import { IsBoolean, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(3)
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1900)
  @Max(2025)
  year: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
