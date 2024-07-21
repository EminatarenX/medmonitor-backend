import { IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

class DeclarationDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class ClinicalRegistryDto {
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  background: ContentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  diagnoses: ContentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  treatments: ContentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  medications: ContentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  allergies: ContentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  observations: ContentDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => DeclarationDto)
  declaration: DeclarationDto;
}
