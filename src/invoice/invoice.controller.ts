import { Controller, Get } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('/')
  getInvoices() {
    return this.invoiceService.getInvoices();
  }
}
