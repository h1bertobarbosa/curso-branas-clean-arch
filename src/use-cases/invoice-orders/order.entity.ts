import { validate } from './cpf-validation.validate';
import { v4 as uuidv4 } from 'uuid';
interface Items {
  description: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  cpf: string;
  items: Items[];
  total: number;
}

export interface InvoiceOrder {
  cpf: string;
  items: Items[];
  save?: number;
}

let orders: Order[] = [];

export function cleanOrders(): void {
  orders = [];
}

export function createOrder({ cpf, items, save }: InvoiceOrder): Order[] {
  if (!validate(cpf)) {
    throw new Error('Invalid CPF');
  }
  const totalItems = items
    .map((item) => item.price * item.quantity)
    .reduce((acumulador, numero, indice, original) => {
      return (acumulador += numero);
    }, 0);

  let total = totalItems;

  if (save) {
    const discount = totalItems * (save / 100);
    total = totalItems - discount;
  }

  orders.push({ id: uuidv4(), cpf, items, total });
  return orders;
}
