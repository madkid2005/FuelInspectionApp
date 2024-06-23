import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import InputForm from '../components/InputForm';
import { performCalculations } from '../utils/calculations';

const CalculationScreen = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = (data) => {
    const calcResults = performCalculations(data);
    setResults(calcResults);
  };

  const createPDF = async () => {
    // ایجاد فایل PDF با نتایج محاسبات
  };

  return (
    <ScrollView style={styles.container}>
      <InputForm onCalculate={handleCalculate} />
      {results && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultTitle}>نتایج محاسبات:</Text>
          <Text style={styles.resultText}>مقدار فروش مکانیکی هر نازل بنزین: {results.mechanicalSalesPerNozzleFuel.join(', ')}</Text>
          <Text style={styles.resultText}>مقدار فروش مکانیکی هر نازل گاز: {results.mechanicalSalesPerNozzleGas.join(', ')}</Text>
          <Text style={styles.resultText}>کل فروش مکانیکی دوره نازل‌های بنزین: {results.totalMechanicalSalesFuel}</Text>
          <Text style={styles.resultText}>کل فروش مکانیکی دوره نازل‌های گاز: {results.totalMechanicalSalesGas}</Text>
          <Text style={styles.resultText}>موجودی انتهای دوره بنزین: {results.finalFuelQuantity}</Text>
          <Text style={styles.resultText}>موجودی انتهای دوره گاز: {results.finalGasQuantity}</Text>
          <Text style={styles.resultText}>کل موجودی بنزین: {results.totalFuel}</Text>
          <Text style={styles.resultText}>کل موجودی گاز: {results.totalGas}</Text>
          <Text style={styles.resultText}>کل فراورده بنزین خارج شده دوره از جایگاه: {results.totalProductFuelOut}</Text>
          <Text style={styles.resultText}>کل فراورده گاز خارج شده دوره از جایگاه: {results.totalProductGasOut}</Text>
          <Text style={styles.resultText}>بعد از فروش باید موجود باشد - بنزین: {results.afterSalesFuel}</Text>
          <Text style={styles.resultText}>بعد از فروش باید موجود باشد - گاز: {results.afterSalesGas}</Text>
          <Text style={styles.resultText}>
            تفاوت موجودی و فروش بنزین: {results.shortageOrSurplusFuel > 0 ? `-${results.shortageOrSurplusFuel}` : results.shortageOrSurplusFuel}
          </Text>
          <Text style={styles.resultText}>کسری مجاز بنزین: {results.allowableShortageFuel}</Text>
          <Text style={styles.resultText}>کسری غیرمجاز بنزین: {results.illegalShortageFuel}</Text>
          <Text style={styles.resultText}>
            تفاوت موجودی و فروش گاز: {results.shortageOrSurplusGas > 0 ? `-${results.shortageOrSurplusGas}` : results.shortageOrSurplusGas}
          </Text>
          <Text style={styles.resultText}>کسری مجاز گاز: {results.allowableShortageGas}</Text>
          <Text style={styles.resultText}>کسری غیرمجاز گاز: {results.illegalShortageGas}</Text>
          <Button title="ایجاد PDF" onPress={createPDF} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  resultsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default CalculationScreen;
