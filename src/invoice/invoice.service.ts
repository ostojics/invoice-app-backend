import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/CreateInvoiceDto';
import { UpdateInvoiceDto } from './dto/UpdateInvoiceDto';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  async getInvoices() {
    return this.prisma.invoice.findMany({
      orderBy: [{ id: 'asc' }],
    });
  }

  async createInvoice(data: CreateInvoiceDto) {
    const invoice = await this.prisma.invoice.create({
      data: data,
    });

    return invoice;
  }

  async updateInvoice(id: number, data: UpdateInvoiceDto) {
    const foundInvoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!foundInvoice) throw new BadRequestException('Invoice not found');

    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data,
    });

    return updatedInvoice;
  }

  async deleteInvoice(id: number) {
    const foundInvoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!foundInvoice) throw new BadRequestException('Invoice not found');

    const deletedInvoice = await this.prisma.invoice.delete({
      where: { id },
    });

    return deletedInvoice;
  }

  async markAsPaid(id: number) {
    const foundInvoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!foundInvoice) throw new BadRequestException('Invoice not found');

    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: { status: 'Paid' },
    });

    return updatedInvoice;
  }

  async getInvoiceById(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) throw new BadRequestException('Invoice not found');

    return invoice;
  }
}
