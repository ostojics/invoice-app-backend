import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/CreateInvoiceDto';
import { UpdateInvoiceDto } from './dto/UpdateInvoiceDto';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Post()
  createInvoice(@Body() data: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(data);
  }

  @Put(':id')
  async updateInvoice(@Param('id') id: string, @Body() data: UpdateInvoiceDto) {
    return this.invoiceService.updateInvoice(parseInt(id), data);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    return this.invoiceService.deleteInvoice(parseInt(id));
  }

  @Put(':id/paid')
  async markAsPaid(@Param('id') id: string) {
    return this.invoiceService.markAsPaid(parseInt(id));
  }
}
