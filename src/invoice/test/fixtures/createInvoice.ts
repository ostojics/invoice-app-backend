import { CreateInvoiceDto } from '../../dto/CreateInvoiceDto';

export const createInvoiceFixture: CreateInvoiceDto = {
  billFromEmail: 'billfrom@example.com',
  billFromCity: 'Belgrade',
  billFromAddress: '123 BillFrom Street',
  billFromCountry: 'Serbia',
  billToName: 'John Doe',
  billToCity: 'New York',
  billToAddress: '456 BillTo Street',
  billToCountry: 'United States',
  billToEmail: 'billto@example.com',
  dueDate: new Date('2023-06-30T00:00:00.000Z'),
  description: 'Sample invoice description',
  amount: 3000,
  billFromName: 'John Smith',
};
