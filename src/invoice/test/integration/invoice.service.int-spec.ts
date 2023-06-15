import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { InvoiceService } from '../../invoice.service';
import { UpdateInvoiceDto } from '../../dto/UpdateInvoiceDto';
import { createInvoiceFixture } from '../fixtures/createInvoice';

describe('InvoiceService integration tests', () => {
  let prisma: PrismaService;
  let invoiceService: InvoiceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    invoiceService = moduleRef.get<InvoiceService>(InvoiceService);
    await prisma.cleanDatabase();
  });

  describe('Create Invoice', () => {
    let invoiceId: number;

    it('should create invoice', async () => {
      const invoice = await invoiceService.createInvoice(createInvoiceFixture);

      expect(invoice).toMatchObject(createInvoiceFixture);
      expect(invoice.status).toEqual('Pending');
      invoiceId = invoice.id;
    });

    it('should update invoice', async () => {
      const dto: UpdateInvoiceDto = {
        ...createInvoiceFixture,
        amount: 3500,
      };

      const invoice = await invoiceService.updateInvoice(invoiceId, dto);

      expect(invoice.amount).toBe(3500);
    });

    it('should mark invoice as paid', async () => {
      const invoice = await invoiceService.markAsPaid(invoiceId);

      expect(invoice.status).toBe('Paid');
    });

    it('should delete invoice', async () => {
      const invoice = await invoiceService.deleteInvoice(invoiceId);

      expect(invoice.id).toBe(invoiceId);
    });

    it('should return empty array when all invoices are requested', async () => {
      const invoices = await invoiceService.getInvoices();

      expect(invoices).toHaveLength(0);
    });
  });
});
