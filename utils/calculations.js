export const performCalculations = (data) => {
  const {
    tanksFuel,
    tanksGas,
    firstfuelcount,
    receivedFuel,
    firstgazcount,
    receivedGas,
    nozzlesFuel,
    nozzlesGas,
  } = data;

  // فروش مکانیکی هر نازل
  const mechanicalSalesPerNozzleFuel = nozzlesFuel.map((nozzle) => nozzle.endPeriod - nozzle.startPeriod);
  const mechanicalSalesPerNozzleGas = nozzlesGas.map((nozzle) => nozzle.endPeriod - nozzle.startPeriod);

  // فروش مکانیکی نازل‌ها
  const totalMechanicalSalesFuel = mechanicalSalesPerNozzleFuel.reduce((total, sale) => total + sale, 0);
  const totalMechanicalSalesGas = mechanicalSalesPerNozzleGas.reduce((total, sale) => total + sale, 0);

  // موجودی انتهای دوره
  const finalFuelQuantity = tanksFuel.reduce((total, tank) => total + tank.endQuantity, 0);
  const finalGasQuantity = tanksGas.reduce((total, tank) => total + tank.endQuantity, 0);

  // کل موجودی
  const totalFuel = firstfuelcount + receivedFuel;
  const totalGas = firstgazcount + receivedGas;

  // کل فراورده خارج شده دوره از جایگاه
  const totalProductFuelOut = totalFuel - finalFuelQuantity;
  const totalProductGasOut = totalGas - finalGasQuantity;

  // بعد از فروش باید موجود باشد
  const afterSalesFuel = totalFuel - totalMechanicalSalesFuel;
  const afterSalesGas = totalGas - totalMechanicalSalesGas;

  // تفاوت موجودی و فروش
  const shortageOrSurplusFuel =  afterSalesFuel - finalFuelQuantity    ;
  const shortageOrSurplusGas =   afterSalesGas - finalGasQuantity  ;

  
  // کسری غیرمجاز
  const allowableShortageFuel = totalMechanicalSalesFuel * 0.0045;
  const illegalShortageFuel = Math.abs(allowableShortageFuel - shortageOrSurplusFuel  );

  const allowableShortageGas = totalMechanicalSalesGas * 0.0045;
  const illegalShortageGas = Math.abs( allowableShortageGas - shortageOrSurplusGas  );


  return {
    mechanicalSalesPerNozzleFuel,
    mechanicalSalesPerNozzleGas,
    totalMechanicalSalesFuel,
    totalMechanicalSalesGas,
    finalFuelQuantity,
    finalGasQuantity,
    totalFuel,
    totalGas,
    totalProductFuelOut,
    totalProductGasOut,
    afterSalesFuel,
    afterSalesGas,
    shortageOrSurplusFuel,
    illegalShortageFuel,
    shortageOrSurplusGas,
    illegalShortageGas,
  };
};
