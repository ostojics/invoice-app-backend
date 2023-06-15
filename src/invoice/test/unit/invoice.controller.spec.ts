import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from '../../invoice.controller';
import { InvoiceService } from '../../invoice.service';
import { getInvoicesFixture } from '../fixtures/getInvoices';
import { CreateInvoiceDto } from '../../dto/CreateInvoiceDto';
import { createInvoiceFixture } from '../fixtures/createInvoice';
import { UpdateInvoiceDto } from '../../dto/UpdateInvoiceDto';

describe('InvoiceController', () => {
  let controller: InvoiceController;

  const mockInvoiceService = {
    getInvoices: jest.fn(() => {
      return getInvoicesFixture;
    }),
    createInvoice: jest.fn((dto: CreateInvoiceDto) => {
      return getInvoicesFixture[0];
    }),
    updateInvoice: jest.fn((dto: UpdateInvoiceDto) => {
      return { ...getInvoicesFixture[0], amount: 3500 };
    }),
    deleteInvoice: jest.fn((id: string) => {
      return getInvoicesFixture[0];
    }),
    markAsPaid: jest.fn((id: string) => {
      return { ...getInvoicesFixture[0], status: 'Paid' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [InvoiceService],
    })
      .overrideProvider(InvoiceService)
      .useValue(mockInvoiceService)
      .compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all invoices', () => {
    expect(controller.getInvoices()).toHaveLength(1);
    expect(mockInvoiceService.getInvoices).toHaveBeenCalled();
  });

  it('should create a invoice', () => {
    expect(controller.createInvoice(createInvoiceFixture)).toMatchObject(
      getInvoicesFixture[0],
    );
    expect(mockInvoiceService.createInvoice).toHaveBeenCalled();
  });

  it('should mark invoice as paid', async () => {
    const invoice = await controller.markAsPaid('1');

    expect(invoice).toMatchObject({ status: 'Paid' });
    expect(mockInvoiceService.markAsPaid).toHaveBeenCalled();
  });

  it('should delete invoice', async () => {
    const invoice = await controller.deleteInvoice('1');

    expect(invoice).toMatchObject(getInvoicesFixture[0]);
    expect(mockInvoiceService.deleteInvoice).toHaveBeenCalled();
  });

  it('should update invoice', async () => {
    const invoice = await controller.updateInvoice('1', {
      ...createInvoiceFixture[0],
      amount: 3500,
    });

    expect(invoice).toMatchObject({ amount: 3500 });
    expect(mockInvoiceService.updateInvoice).toHaveBeenCalled();
  });
});
