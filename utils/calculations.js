export const performCalculations = (data) => {
  const {
    initialFuelQuantities,
    initialGasQuantities,
    firstfuelcount,
    firstgazcount,
    receivedFuel,
    receivedGas,
    electronicSalesFuel,
    electronicSalesGas,
    finalFuelQuantity,
    finalGasQuantity,
    nozzlesFuel,
    nozzlesGas
  } = data;



  // فروش مکانیکی هر نازل
  const mechanicalSalesPerNozzleFuel = nozzlesFuel.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);
  const mechanicalSalesPerNozzleGas = nozzlesGas.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);

  // کل فروش مکانیکی دوره نازل‌ها
  const totalMechanicalSalesFuel = mechanicalSalesPerNozzleFuel.reduce((a, b) => a + b, 0);
  const totalMechanicalSalesGas = mechanicalSalesPerNozzleGas.reduce((a, b) => a + b, 0);

  // کل فراورده بنزین خارج شده دوره از جایگاه
  const totalProductFuelOut = firstfuelcount + receivedFuel - finalFuelQuantity;
  // کل فراورده گاز خارج شده دوره از جایگاه
  const totalProductGasOut = firstgazcount + receivedGas - finalGasQuantity;





  // تفاوت فروش مکانیکی و الکترونیکی
  const mechanicalVsElectronicSalesDiffFuel = totalMechanicalSalesFuel - electronicSalesFuel;
  const mechanicalVsElectronicSalesDiffGas = totalMechanicalSalesGas - electronicSalesGas;


  
  // محاسبه کسری یا سرک و کسری غیرمجاز
  let shortageOrSurplusFuel = totalMechanicalSalesFuel - totalProductFuelOut;
  let illegalShortageFuel = 0;
  if (shortageOrSurplusFuel > 0) {
    
    illegalShortageFuel = shortageOrSurplusFuel - (totalProductFuelOut * 0.0045);
  }

  let shortageOrSurplusGas = finalGasQuantity - totalProductGasOut;
  let illegalShortageGas = 0;
  if (shortageOrSurplusGas > 0) {
    illegalShortageGas = shortageOrSurplusGas - (totalProductGasOut * 0.0045);
  }

  return {
    mechanicalSalesPerNozzleFuel,
    mechanicalSalesPerNozzleGas,
    totalMechanicalSalesFuel,
    totalMechanicalSalesGas,
    totalProductFuelOut,
    totalProductGasOut,

    mechanicalVsElectronicSalesDiffFuel,
    mechanicalVsElectronicSalesDiffGas,
    shortageOrSurplusFuel,
    illegalShortageFuel,
    shortageOrSurplusGas,
    illegalShortageGas
  };
};
