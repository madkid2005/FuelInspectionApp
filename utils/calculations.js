export const performCalculations = (data) => {
  const {
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



  // فروش مکانیکی هر نازلTRUE
  const mechanicalSalesPerNozzleFuel = nozzlesFuel.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);
  const mechanicalSalesPerNozzleGas = nozzlesGas.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);

  // کل فروش مکانیکی دوره نازل‌ها TRUE
  const totalMechanicalSalesFuel = mechanicalSalesPerNozzleFuel.reduce((a, b) => a + b, 0);
  const totalMechanicalSalesGas = mechanicalSalesPerNozzleGas.reduce((a, b) => a + b, 0);

  // کل فراورده بنزین خارج شده دوره از جایگاه TRUE
  const totalProductFuelOut = firstfuelcount + receivedFuel - finalFuelQuantity;
  // کل فراورده گاز خارج شده دوره از جایگاه TRUE
  const totalProductGasOut = firstgazcount + receivedGas - finalGasQuantity;





  // تفاوت فروش مکانیکی و الکترونیکی TRUE
  const mechanicalVsElectronicSalesDiffFuel = totalMechanicalSalesFuel - electronicSalesFuel;
  const mechanicalVsElectronicSalesDiffGas = totalMechanicalSalesGas - electronicSalesGas;


  
  // محاسبه کسری یا سرک و کسری غیرمجاز
  let shortageOrSurplusFuel = totalProductFuelOut - totalMechanicalSalesFuel;
  let illegalShortageFuel = 0;
  

  let shortageOrSurplusGas = totalProductGasOut - totalMechanicalSalesGas;
  let illegalShortageGas = 0;
 

  return {
    mechanicalSalesPerNozzleFuel, //مقدار فروش مکانیکی هر نازل بنزین:
    mechanicalSalesPerNozzleGas,
    totalMechanicalSalesFuel, //کل فروش مکانیکی دوره نازل‌های بنزین:
    totalMechanicalSalesGas,
    totalProductFuelOut,//کل فراورده بنزین خارج شده دوره از جایگاه:
    totalProductGasOut,
    mechanicalVsElectronicSalesDiffFuel, //>تفاوت فروش مکانیکی و الکترونیکی بنزین:
    mechanicalVsElectronicSalesDiffGas,
    shortageOrSurplusFuel,//کسری یا سرک بنزین:
    illegalShortageFuel,//>کسری غیرمجاز بنزین:
    shortageOrSurplusGas,
    illegalShortageGas
  };
};