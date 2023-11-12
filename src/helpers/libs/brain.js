const buildData = data => ({
  input: [parseInt(data.sales_quantity, 10)],
  output: [parseInt(data.sales_quantity, 10)],
});

class StockBrain {
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(data, model) {
    this.data = data;
    this.model = model;
  }

  processData(data) {
    return data.map(entry => buildData(entry));
  }

  train() {
    const processedData = this.processData(this.data);
    const config = {
      iterations: 2000, // Aumenta el número de iteraciones
      errorThresh: 0.005, // Establece un umbral de error deseado
    };

    this.model.train(processedData, config);
  }

  calculateMAE(predictions, salesPerMonth) {
    console.log('\nmae');
    console.log(predictions, salesPerMonth);
    const size = predictions.length;
    let errorsCount = 0;

    for (let i = 0; i < size; i++) {
      let error = Math.abs(predictions[i] - salesPerMonth[i]);
      errorsCount += error;
    }

    return Math.round(errorsCount / size);
  }

  calculateMAPE(prediction, lastMonthSales) {
    return Math.abs((prediction - lastMonthSales) / lastMonthSales) * 100;
  }

  predict() {
    const lastEntry = this.data[this.data.length - 1];
    console.log(this.data);

    const nextMonthIndex = this.months.indexOf(lastEntry.month) + 1;
    const nextYear = lastEntry.year + Math.floor(nextMonthIndex / 12);
    const nextMonth = this.months[nextMonthIndex % 12];

    const startTime = performance.now();
    console.log('lastEntry.sales_quantity', lastEntry.sales_quantity);
    const prediction = this.model.run([lastEntry.sales_quantity]);
    const predictedDemand = Math.round(prediction);
    const endTime = performance.now();

    const inferenceTime = endTime - startTime;

    const nextMonthPrediction = {
      month: nextMonth,
      year: nextYear,
      stock: predictedDemand,
      inferenceTime,
    };

    const salesArr = this.data.map(entry => entry.sales_quantity);
    const mae = this.calculateMAE([prediction], salesArr);
    const mape = this.calculateMAPE(prediction, lastEntry.sales_quantity);

    return {
      nextMonthPrediction,
      mae,
      mape,
    };
  }
}

module.exports = { StockBrain };
