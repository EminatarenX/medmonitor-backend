import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @IsPositive()
    limit?: number
}