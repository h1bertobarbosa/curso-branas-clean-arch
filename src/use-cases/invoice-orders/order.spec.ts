import { createOrder, cleanOrders } from './order.entity';

describe('Order tests', () => {
  beforeEach(() => {
    cleanOrders();
  });

  it('should not be allowed to create an order with invalid cpf', async () => {
    expect(async () => {
      createOrder({ cpf: '00000000000', items: [] });
    }).rejects.toThrow(new Error('Invalid CPF'));
  });

  it('should be place an order with 3 items (with description, price and quantity)', async () => {
    const items = [
      {
        description: 'MONITOR LG 29" PRO GAMER ULTRAWIDE FULL HD - 29UM69G-B',
        price: 1750,
        quantity: 1,
      },
      {
        description:
          'Smart TV LED 32" HD AOC ROKU TV FHD 32S5195/78G, Wi-Fi, 3 HDMI, 1 USB, Wifi, Conversor Digital',
        price: 1250,
        quantity: 1,
      },
      {
        description:
          'Teclado Mecânico Gamer LED Vermelho Redragon Mitra com Switch Outemu Blue ABNT2 Preto',
        price: 285,
        quantity: 2,
      },
    ];

    const orders = createOrder({ cpf: '86446422784', items });
    const totalOrder = 3570;
    expect(orders[0].items.length).toBe(3);
    expect(orders[0]).toHaveProperty('id');
    expect(orders[0].total).toBe(totalOrder);
  });

  it('should be place an order with a discount coupon (percentage of the total order)', async () => {
    const items = [
      {
        description: 'MONITOR LG 29" PRO GAMER ULTRAWIDE FULL HD - 29UM69G-B',
        price: 1750,
        quantity: 1,
      },
      {
        description:
          'Smart TV LED 32" HD AOC ROKU TV FHD 32S5195/78G, Wi-Fi, 3 HDMI, 1 USB, Wifi, Conversor Digital',
        price: 1250,
        quantity: 1,
      },
      {
        description:
          'Teclado Mecânico Gamer LED Vermelho Redragon Mitra com Switch Outemu Blue ABNT2 Preto',
        price: 285,
        quantity: 1,
      },
    ];

    const save = 10;
    const orders = createOrder({
      cpf: '86446422784',
      items,
      save,
    });

    const totalItems = 3285;
    const save10 = totalItems * (save / 100);
    const totalOrder = totalItems - save10;
    expect(orders[0].items.length).toBe(3);
    expect(orders[0]).toHaveProperty('id');
    expect(orders[0].total).toBe(totalOrder);
  });
});
