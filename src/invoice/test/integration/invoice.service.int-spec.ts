import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { InvoiceService } from '../../invoice.service';
import { UpdateInvoiceDto } from '../../dto/UpdateInvoiceDto';
import { createInvoiceFixture } from '../fixtures/createInvoice';
import { BadRequestException } from '@nestjs/common';

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

    it('should not update invoice if id is invalid', async () => {
      try {
        await invoiceService.updateInvoice(150, createInvoiceFixture);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invoice not found');
      }
    });

    it('should mark invoice as paid', async () => {
      const invoice = await invoiceService.markAsPaid(invoiceId);

      expect(invoice.status).toBe('Paid');
    });

    it('should not mark invoice as paid when id is invalid', async () => {
      try {
        await invoiceService.markAsPaid(150);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invoice not found');
      }
    });

    it('should return invoice when requested by id', async () => {
      const invoice = await invoiceService.getInvoiceById(invoiceId);

      expect(invoice).toBeDefined();
    });

    it('should not return an invoice when the id is invalid', async () => {
      try {
        await invoiceService.getInvoiceById(150);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invoice not found');
      }
    });

    it('should not delete invoice when id is invalid', async () => {
      try {
        await invoiceService.deleteInvoice(150);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invoice not found');
      }
    });

    it('should delete invoice', async () => {
      const invoice = await invoiceService.deleteInvoice(invoiceId);

      expect(invoice.id).toBe(invoiceId);
    });

    it('should return empty array when all invoices are deleted', async () => {
      const invoices = await invoiceService.getInvoices();

      expect(invoices).toHaveLength(0);
    });
  });
});
