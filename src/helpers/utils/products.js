const { MOVEMENT_TYPE } = require('../constants');

const calculateTotalFromMovements = movements => {
  return movements.reduce((total, movement) => {
    return (
      total + parseInt(movement.quantity, 10) * parseFloat(movement.unitPrice)
    );
  }, 0);
};

const filterMovementsByType = movements => {
  const sales = [];
  const purchases = [];

  movements.forEach(movement => {
    if (movement.type.id === MOVEMENT_TYPE.LOAD) {
      purchases.push(movement);
    } else if (movement.type.id === MOVEMENT_TYPE.WITHDRAW) {
      movement.quantity = movement.quantity * -1;
      sales.push(movement);
    }
  });

  return { sales, purchases };
};

const getTotalQuantity = movements => {
  return movements.reduce((total, movement) => {
    return total + parseInt(movement.quantity, 10);
  }, 0);
};

const getCurrentAndPreviousMonthName = () => {
  const months = [
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

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Handle wrapping around to the previous year
  const currentMonthName = months[currentMonthIndex];
  const previousMonthName = months[previousMonthIndex];

  return {
    currentMonth: currentMonthName,
    previousMonth: previousMonthName,
  };
};

const getCurrentAndPreviousMonthSales = statsPerMonth => {
  const { currentMonth, previousMonth } = getCurrentAndPreviousMonthName();
  return statsPerMonth.filter(stat => {
    return stat.month === currentMonth || stat.month === previousMonth;
  });
};

module.exports = {
  calculateTotalFromMovements,
  filterMovementsByType,
  getTotalQuantity,
  getCurrentAndPreviousMonthName,
  getCurrentAndPreviousMonthSales,
};
