import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit: number = 5;
}
