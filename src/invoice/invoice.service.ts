import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceService {
  getInvoices() {
    return { data: ['invoice1', 'invoice2'] };
  }
}
