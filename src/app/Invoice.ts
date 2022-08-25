export class Invoice {
    id: number;
    invoice_number: string;
    total: number;
    invoice_date: string;
    status: string;

    constructor(id: number, invoice_number: string, total: number, invoice_date: string, status: string) {
        this.id = id;
        this.invoice_number = invoice_number;
        this.total = total;
        this.invoice_date = invoice_date;
        this.status = status;
    }
}