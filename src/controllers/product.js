const brain = require('brain.js');
const { productService, movementService } = require('../services');
const { buildProduct, buildList } = require('../helpers/builders');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const {
  filterMovementsByType,
  calculateTotalFromMovements,
  getTotalQuantity,
  getCurrentAndPreviousMonthSales,
} = require('../helpers/utils/products');
const { plainConverter } = require('../helpers/core/plainConverter');
const { StockBrain } = require('../helpers/libs/brain');

exports.createProduct = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { name } = req.body;
  const product = buildProduct({ name, userId });

  const isValidName = await productService.isValidName(name, userId);

  if (!isValidName)
    throw new AppError('Product name must be unique', 400, 'ALREADY_EXISTS');

  const productRecord = await productService.create(product);

  appResponse({
    res,
    code: 201,
    message: 'Product created successfully',
    body: { product: productRecord },
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  await productService.delete(id);

  appResponse({
    res,
    message: 'Product deleted successfully',
  });
});

exports.getProducts = catchAsync(async (req, res) => {
  const products = await productService.getAll();
  const response = buildList(products);

  appResponse({
    res,
    message: 'Products retrieved successfully',
    body: response,
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const query = req.query || {};
  const movementsRecords = await movementService.getAll(
    {
      productId: req.product.id,
    },
    query,
  );

  const monthsOfData = await movementService.hasMoreThanTwoMonthsOfMovements(
    req.product.id,
  );

  let predictions = null;

  const movements = plainConverter(movementsRecords);

  const { sales, purchases } = filterMovementsByType(movements);

  const stockSales = getTotalQuantity(sales);
  const stockPurchases = getTotalQuantity(purchases);

  const totalSales = calculateTotalFromMovements(sales);
  const totalPurchases = calculateTotalFromMovements(purchases);

  if (monthsOfData.length > 1) {
    const netModel = new brain.recurrent.LSTMTimeStep({
      hiddenLayers: [10, 10], // Ajusta la estructura de las capas ocultas
      learningRate: 0.01, // Ajusta la tasa de aprendizaje
    });
    const statsPerMonth = await movementService.getSalesAndRemainStocksByMonth(
      req.product.id,
    );
    const currentAndPreviousMonthsStats =
      getCurrentAndPreviousMonthSales(statsPerMonth);

    console.log(currentAndPreviousMonthsStats);

    const stockBrain = new StockBrain(currentAndPreviousMonthsStats, netModel);
    stockBrain.train();
    predictions = stockBrain.predict();
    const averagePrice = await movementService.getAveragePrice(req.product.id);
    predictions.eoq =
      Math.sqrt(2) *
      stockSales *
      parseFloat(averagePrice[0].average_price) *
      0.35;

    console.log(
      `${Math.sqrt(2)} * ${totalSales} * ${
        averagePrice[0].average_price
      } * 0.35`,
    );
    console.log('\n \n Average price: \n', averagePrice[0].average_price);

    console.log('\n \n Predictions with brain.js: \n', predictions);
  }

  const yearHistory = await movementService.getSalesHistoryByYear(
    new Date().getFullYear(),
    req.product.id,
  );

  appResponse({
    res,
    message: 'Product retrieved successfully',
    body: {
      product: req.product,
      analytics: {
        totalSales: stockSales,
        totalPurchases: stockPurchases,
        totalEarnings: totalSales,
        totalInvested: totalPurchases,
      },
      predictions,
      yearHistory,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const adaptedProduct = buildProduct(req.body);
  const product = await productService.update(id, adaptedProduct);

  appResponse({
    res,
    message: 'Product updated successfully',
    body: product,
  });
});
