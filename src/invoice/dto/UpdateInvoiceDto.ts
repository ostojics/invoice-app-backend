import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateInvoiceDto {
  @IsEmail()
  @IsOptional()
  billFromEmail: string;

  @IsString()
  @IsOptional()
  billFromCity: string;

  @IsString()
  @IsOptional()
  billFromAddress: string;

  @IsString()
  @IsOptional()
  billFromCountry: string;

  @IsString()
  @IsOptional()
  billToName: string;

  @IsString()
  @IsOptional()
  billToCity: string;

  @IsString()
  @IsOptional()
  billToAddress: string;

  @IsString()
  @IsOptional()
  billToCountry: string;

  @IsEmail()
  @IsOptional()
  billToEmail: string;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  billFromName: string;
}
