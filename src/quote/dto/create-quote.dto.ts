import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuoteDTO {  
  @IsString()
  @IsNotEmpty({message : "Quote Number is required !"})
  quote_number: string;

  @IsNumber()
  sales_executive_id: number;

  @IsNumber()
  organisation_id: number;

  @IsNumber()
  service_type_id: number;

  @IsNumber()
  origin_id: number;

  @IsNumber()
  destination_id: number;

  @IsString()
  status: string;

  @IsString()
  lost_reason: string;

  @IsString()
  remark: string;

  @IsString()
  notes: string;
}
