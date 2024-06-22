import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Alert } from 'react-native';
import { PDFDocument, Page, rgb } from 'react-native-pdf-lib';
import InputForm from '../components/InputForm';
import { performCalculations } from '../utils/calculations';

const CalculationScreen = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = (data) => {
    const calcResults = performCalculations(data);
    setResults(calcResults);
  };

  const createPDF = async () => {
    if (!results) {
      Alert.alert('خطا', 'ابتدا محاسبات را انجام دهید.');
      return;
    }

    try {
      const pdfPath = `${await PDFDocument.getDocumentsDirectory()}/calculation_report.pdf`;
    
      const pdfDoc = await PDFDocument.create(pdfPath)
        .addPages(
          Page.create()
            .setMediaBox(595, 842)
            .drawText('گزارش محاسبات', {
              x: 200,
              y: 800,
              fontSize: 18,
              color: rgb(0, 0, 0),
            })
            .drawText(`مقدار فروش مکانیکی هر نازل گاز: ${results.mechanicalSalesPerNozzleGas.join(', ')}`, {
              x: 10,
              y: 750,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`مقدار فروش مکانیکی هر نازل بنزین: ${results.mechanicalSalesPerNozzleFuel.join(', ')}`, {
              x: 10,
              y: 730,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کل فروش مکانیکی دوره نازل‌های گاز: ${results.totalMechanicalSalesGas}`, {
              x: 10,
              y: 710,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کل فروش مکانیکی دوره نازل‌های بنزین: ${results.totalMechanicalSalesFuel}`, {
              x: 10,
              y: 690,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کل فراورده بنزین خارج شده دوره از جایگاه: ${results.totalProductFuelOut}`, {
              x: 10,
              y: 670,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کل فراورده گاز خارج شده دوره از جایگاه: ${results.totalProductGasOut}`, {
              x: 10,
              y: 650,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`تفاوت فروش مکانیکی و الکترونیکی بنزین: ${results.mechanicalVsElectronicSalesDiffFuel}`, {
              x: 10,
              y: 630,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`تفاوت فروش مکانیکی و الکترونیکی گاز: ${results.mechanicalVsElectronicSalesDiffGas}`, {
              x: 10,
              y: 610,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کسری یا سرک بنزین: ${results.shortageOrSurplusFuel}`, {
              x: 10,
              y: 590,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کسری غیرمجاز بنزین: ${results.illegalShortageFuel}`, {
              x: 10,
              y: 570,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کسری یا سرک گاز: ${results.shortageOrSurplusGas}`, {
              x: 10,
              y: 550,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
            .drawText(`کسری غیرمجاز گاز: ${results.illegalShortageGas}`, {
              x: 10,
              y: 530,
              fontSize: 12,
              color: rgb(0, 0, 0),
            })
        )
        .write();
    
      Alert.alert('PDF ذخیره شد', `فایل PDF در مسیر: ${pdfPath}`);
    } catch (error) {
      Alert.alert('خطا', `خطایی در ایجاد PDF رخ داده است: ${error.message}`);
    }
    
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <InputForm onCalculate={handleCalculate} />
      {results && (
        <View>
          <Text>نتایج محاسبات:</Text>
          <Text>مقدار فروش مکانیکی هر نازل گاز: {results.mechanicalSalesPerNozzleGas.join(', ')}</Text>
          <Text>مقدار فروش مکانیکی هر نازل بنزین: {results.mechanicalSalesPerNozzleFuel.join(', ')}</Text>
          <Text>کل فروش مکانیکی دوره نازل‌های گاز: {results.totalMechanicalSalesGas}</Text>
          <Text>کل فروش مکانیکی دوره نازل‌های بنزین: {results.totalMechanicalSalesFuel}</Text>
          <Text>کل فراورده بنزین خارج شده دوره از جایگاه: {results.totalProductFuelOut}</Text>
          <Text>کل فراورده گاز خارج شده دوره از جایگاه: {results.totalProductGasOut}</Text>
          <Text>تفاوت فروش مکانیکی و الکترونیکی بنزین: {results.mechanicalVsElectronicSalesDiffFuel}</Text>
          <Text>تفاوت فروش مکانیکی و الکترونیکی گاز: {results.mechanicalVsElectronicSalesDiffGas}</Text>
          <Text>کسری یا سرک بنزین: {results.shortageOrSurplusFuel}</Text>
          <Text>کسری غیرمجاز بنزین: {results.illegalShortageFuel}</Text>
          <Text>کسری یا سرک گاز: {results.shortageOrSurplusGas}</Text>
          <Text>کسری غیرمجاز گاز: {results.illegalShortageGas}</Text>
        </View>
      )}
      {results && (
        <View style={{ marginTop: 20 }}>
          <Button title="ایجاد PDF" onPress={createPDF} />
        </View>
      )}
    </ScrollView>
  );
};

export default CalculationScreen;
