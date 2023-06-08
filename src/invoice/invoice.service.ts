import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/CreateInvoiceDto';
import { UpdateInvoiceDto } from './dto/UpdateInvoiceDto';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  async getInvoices() {
    return this.prisma.invoice.findMany();
  }

  async createInvoice(data: CreateInvoiceDto) {
    const invoice = await this.prisma.invoice.create({
      data: data,
    });

    return invoice;
  }

  async updateInvoice(id: number, data: UpdateInvoiceDto) {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data,
    });

    return updatedInvoice;
  }

  async deleteInvoice(id: number) {
    const deletedInvoice = await this.prisma.invoice.delete({
      where: { id },
    });

    return deletedInvoice;
  }

  async markAsPaid(id: number) {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: { status: 'Paid' },
    });

    return updatedInvoice;
  }
}
