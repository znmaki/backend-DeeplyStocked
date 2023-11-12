'use strict';

const bcrypt = require('../../helpers/libs/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate user for migration
    const password = await bcrypt.hash('password');

    await queryInterface.bulkInsert('user', [
      {
        email: 'johndoe@gmail.com',
        password,
        first_name: 'John',
        last_name: 'Doe',
        active: true,
      },
    ]);

    const buildProducts = (names, userId) => {
      let products = [];
      for (let i = 0; i < names.length; i++) {
        products.push({
          name: names[i],
          user_id: userId,
        });
      }
      return products;
    };

    const productNames = [
      'SAMSUNG A21S ORIGINAL',
      'SAMSUNG A02S ORIGINAL',
      'REDMI 9C ORIGINAL',
      'REDMI 9 INCELL',
      'A21S INCELL',
    ];
    // Generate products for migration
    const products = buildProducts(productNames, 1);
    await queryInterface.bulkInsert('product', products);

    // Generate stock for migration
    const dates = [
      '2022-01-01',
      '2022-02-01',
      '2022-03-01',
      '2022-04-01',
      '2022-05-01',
      '2022-06-01',
      '2022-07-01',
      '2022-08-01',
      '2022-09-01',
      '2022-10-01',
      '2022-11-01',
      '2022-12-01',
      '2023-01-01',
      '2023-02-01',
      '2023-03-01',
      '2023-04-01',
      '2023-05-01',
      '2023-06-01',
      '2023-07-01',
    ];

    const buildStock = (dates, products, userId) => {
      let stock = [];
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < dates.length; j++) {
          stock.push({
            date: dates[j],
            product_id: i + 1,
            user_id: userId,
            quantity: 300,
            unit_price: 100,
            type_id: 1,
          });
        }
      }
      return stock;
    };

    await queryInterface.bulkInsert('movement', buildStock(dates, products, 1));

    // Generate sales for migration
    const sales = [
      {
        date: '2022-01-01',
        quantity: 10,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-02-01',
        quantity: 10,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-03-01',
        quantity: 15,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-04-01',
        quantity: 15,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-05-01',
        quantity: 20,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-06-01',
        quantity: 20,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-07-01',
        quantity: 20,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-08-01',
        quantity: 50,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-09-01',
        quantity: 50,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-10-01',
        quantity: 50,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-11-01',
        quantity: 100,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-12-01',
        quantity: 100,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-01-01',
        quantity: 150,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-02-01',
        quantity: 150,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-03-01',
        quantity: 300,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-04-01',
        quantity: 150,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-05-01',
        quantity: 200,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-06-01',
        quantity: 100,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2023-07-01',
        quantity: 150,
        unit_price: 550,
        product_id: 1,
      },
      {
        date: '2022-01-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-02-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-03-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-04-01',
        quantity: 30,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-05-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-06-01',
        quantity: 30,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-07-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-08-01',
        quantity: 50,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-09-01',
        quantity: 50,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-10-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-11-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-12-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-01-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-02-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-03-01',
        quantity: 300,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-04-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-05-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-06-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-07-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      }, // product 1 ends
      {
        date: '2022-01-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-02-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-03-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-04-01',
        quantity: 30,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-05-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-06-01',
        quantity: 30,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-07-01',
        quantity: 20,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-08-01',
        quantity: 50,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-09-01',
        quantity: 50,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-10-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-11-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2022-12-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-01-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-02-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-03-01',
        quantity: 300,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-04-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-05-01',
        quantity: 150,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-06-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      },
      {
        date: '2023-07-01',
        quantity: 100,
        unit_price: 550,
        product_id: 2,
      }, // product 2 ends
      {
        date: '2022-01-01',
        quantity: 15,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-02-01',
        quantity: 15,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-03-01',
        quantity: 10,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-04-01',
        quantity: 10,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-05-01',
        quantity: 20,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-06-01',
        quantity: 20,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-07-01',
        quantity: 30,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-08-01',
        quantity: 50,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-09-01',
        quantity: 50,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-10-01',
        quantity: 80,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-11-01',
        quantity: 80,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2022-12-01',
        quantity: 100,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-01-01',
        quantity: 100,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-02-01',
        quantity: 150,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-03-01',
        quantity: 300,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-04-01',
        quantity: 150,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-05-01',
        quantity: 150,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-06-01',
        quantity: 120,
        unit_price: 550,
        product_id: 3,
      },
      {
        date: '2023-07-01',
        quantity: 120,
        unit_price: 550,
        product_id: 3,
      }, // product 3 ends
      {
        date: '2022-02-01',
        quantity: 50,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-03-01',
        quantity: 50,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-04-01',
        quantity: 50,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-05-01',
        quantity: 100,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-06-01',
        quantity: 100,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-07-01',
        quantity: 100,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-08-01',
        quantity: 200,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-09-01',
        quantity: 250,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-10-01',
        quantity: 250,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-11-01',
        quantity: 300,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2022-12-01',
        quantity: 250,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-01-01',
        quantity: 300,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-02-01',
        quantity: 300,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-03-01',
        quantity: 500,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-04-01',
        quantity: 400,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-05-01',
        quantity: 400,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-06-01',
        quantity: 100,
        unit_price: 550,
        product_id: 4,
      },
      {
        date: '2023-07-01',
        quantity: 100,
        unit_price: 550,
        product_id: 4,
      }, // product 4 ends
      {
        date: '2022-01-01',
        quantity: 10,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-02-01',
        quantity: 10,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-03-01',
        quantity: 15,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-04-01',
        quantity: 15,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-05-01',
        quantity: 10,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-06-01',
        quantity: 15,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-07-01',
        quantity: 20,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-08-01',
        quantity: 30,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-09-01',
        quantity: 30,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-10-01',
        quantity: 50,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-11-01',
        quantity: 50,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2022-12-01',
        quantity: 50,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-01-01',
        quantity: 100,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-02-01',
        quantity: 100,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-03-01',
        quantity: 300,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-04-01',
        quantity: 100,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-05-01',
        quantity: 150,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-06-01',
        quantity: 120,
        unit_price: 550,
        product_id: 5,
      },
      {
        date: '2023-07-01',
        quantity: 100,
        unit_price: 550,
        product_id: 5,
      }, // product 5 ends
    ];

    const updatedSales = sales.map(sale => ({
      ...sale,
      quantity: sale.quantity * -1,
      type_id: 2,
      user_id: 1,
    }));

    await queryInterface.bulkInsert('movement', updatedSales);
  },

  async down(queryInterface, Sequelize) {},
};
