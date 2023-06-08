import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsEmail()
  @IsNotEmpty()
  billFromEmail: string;

  @IsString()
  @IsNotEmpty()
  billFromCity: string;

  @IsString()
  @IsNotEmpty()
  billFromAddress: string;

  @IsString()
  @IsNotEmpty()
  billFromCountry: string;

  @IsString()
  @IsNotEmpty()
  billToName: string;

  @IsString()
  @IsNotEmpty()
  billToCity: string;

  @IsString()
  @IsNotEmpty()
  billToAddress: string;

  @IsString()
  @IsNotEmpty()
  billToCountry: string;

  @IsEmail()
  @IsNotEmpty()
  billToEmail: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  billFromName: string;
}
