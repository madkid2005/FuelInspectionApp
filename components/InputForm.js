import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';

const InputForm = ({ onCalculate }) => {
  const [fuelStationName, setFuelStationName] = useState('');
  const [numGasTanks, setNumGasTanks] = useState('');
  const [numFuelTanks, setNumFuelTanks] = useState('');
  const [initialGasQuantities, setInitialGasQuantities] = useState([]);
  const [initialFuelQuantities, setInitialFuelQuantities] = useState([]);
  const [firstfuelcount, setFirstFuelCount] = useState('');
  const [firstgazcount, setFirstGazCount] = useState('');

  const [receivedGas, setReceivedGas] = useState('');
  const [receivedFuel, setReceivedFuel] = useState('');
  const [electronicSalesFuel, setElectronicSalesFuel] = useState('');
  const [electronicSalesGas, setElectronicSalesGas] = useState('');
  const [nozzlesFuel, setNozzlesFuel] = useState([]);
  const [nozzlesGas, setNozzlesGas] = useState([]);
  const [controlPeriodStart, setControlPeriodStart] = useState('');
  const [controlPeriodEnd, setControlPeriodEnd] = useState('');
  const [finalFuelQuantity, setFinalFuelQuantity] = useState('');
  const [finalGasQuantity, setFinalGasQuantity] = useState('');

  const handleCalculate = () => {
    const data = {
      fuelStationName,
      numGasTanks: parseInt(numGasTanks, 10),
      numFuelTanks: parseInt(numFuelTanks, 10),
      initialGasQuantities: initialGasQuantities.map(Number),
      initialFuelQuantities: initialFuelQuantities.map(Number),
      firstfuelcount: parseFloat(firstfuelcount),
      firstgazcount: parseFloat(firstgazcount),
      receivedGas: parseFloat(receivedGas),
      receivedFuel: parseFloat(receivedFuel),
      electronicSalesFuel: parseFloat(electronicSalesFuel),
      electronicSalesGas: parseFloat(electronicSalesGas),
      nozzlesFuel: nozzlesFuel.map(nozzle => ({
        startPeriod: parseFloat(nozzle.startPeriod),
        endPeriod: parseFloat(nozzle.endPeriod)
      })),
      nozzlesGas: nozzlesGas.map(nozzle => ({
        startPeriod: parseFloat(nozzle.startPeriod),
        endPeriod: parseFloat(nozzle.endPeriod)
      })),
      controlPeriodStart,
      controlPeriodEnd,
      finalFuelQuantity: parseFloat(finalFuelQuantity),
      finalGasQuantity: parseFloat(finalGasQuantity)
    };
    onCalculate(data);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>اسم جایگاه سوخت:</Text>
      <TextInput value={fuelStationName} onChangeText={setFuelStationName} />

      <Text>تعداد مخازن بنزین:</Text>
      <TextInput
        value={numFuelTanks}
        onChangeText={(value) => {
          setNumFuelTanks(value);
          setInitialFuelQuantities(new Array(Number(value)).fill(''));
        }}
        keyboardType="numeric"
      />

      {initialFuelQuantities.map((_, index) => (
        <View key={index}>
          <Text>مقدار بنزین مخزن {index + 1}:</Text>
          <TextInput
            value={initialFuelQuantities[index]}
            onChangeText={(value) => {
              const newQuantities = [...initialFuelQuantities];
              newQuantities[index] = value;
              setInitialFuelQuantities(newQuantities);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Text>تعداد مخازن گاز:</Text>
      <TextInput
        value={numGasTanks}
        onChangeText={(value) => {
          setNumGasTanks(value);
          setInitialGasQuantities(new Array(Number(value)).fill(''));
        }}
        keyboardType="numeric"
      />

      {initialGasQuantities.map((_, index) => (
        <View key={index}>
          <Text>مقدار گاز مخزن {index + 1}:</Text>
          <TextInput
            value={initialGasQuantities[index]}
            onChangeText={(value) => {
              const newQuantities = [...initialGasQuantities];
              newQuantities[index] = value;
              setInitialGasQuantities(newQuantities);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}

      
      <Text> موجوی اول دوره بنزین</Text>
      <TextInput value={firstfuelcount} onChangeText={setFirstFuelCount} keyboardType="numeric" />

      <Text> موجوی اول دوره گاز</Text>
      <TextInput value={firstgazcount} onChangeText={setFirstGazCount} keyboardType="numeric" />

      <Text>مقدار بنزین رسیده دوره:</Text>
      <TextInput value={receivedFuel} onChangeText={setReceivedFuel} keyboardType="numeric" />

      <Text>مقدار گاز رسیده دوره:</Text>
      <TextInput value={receivedGas} onChangeText={setReceivedGas} keyboardType="numeric" />

      <Text>فروش الکترونیکی بنزین:</Text>
      <TextInput value={electronicSalesFuel} onChangeText={setElectronicSalesFuel} keyboardType="numeric" />

      <Text>فروش الکترونیکی گاز:</Text>
      <TextInput value={electronicSalesGas} onChangeText={setElectronicSalesGas} keyboardType="numeric" />

      <Text>دوره کنترل (از تاریخ):</Text>
      <TextInput value={controlPeriodStart} onChangeText={setControlPeriodStart} keyboardType="numeric" />

      <Text>دوره کنترل (تا تاریخ):</Text>
      <TextInput value={controlPeriodEnd} onChangeText={setControlPeriodEnd} keyboardType="numeric" />

      <Text>مقدار موجودی انتهای دوره بنزین:</Text>
      <TextInput value={finalFuelQuantity} onChangeText={setFinalFuelQuantity} keyboardType="numeric" />

      <Text>مقدار موجودی انتهای دوره گاز:</Text>
      <TextInput value={finalGasQuantity} onChangeText={setFinalGasQuantity} keyboardType="numeric" />

      {/* ورود مقادیر نازل‌های بنزین */}
      {nozzlesFuel.map((nozzle, index) => (
        <View key={index}>
          <Text>ابتدای دوره نازل بنزین {index + 1}:</Text>
          <TextInput
            value={nozzle.startPeriod}
            onChangeText={(value) => {
              const newNozzles = [...nozzlesFuel];
              newNozzles[index] = { ...nozzlesFuel[index], startPeriod: value };
              setNozzlesFuel(newNozzles);
            }}
            keyboardType="numeric"
          />
          <Text>انتهای دوره نازل بنزین {index + 1}:</Text>
          <TextInput
            value={nozzle.endPeriod}
            onChangeText={(value) => {
              const newNozzles = [...nozzlesFuel];
              newNozzles[index] = { ...nozzlesFuel[index], endPeriod: value };
              setNozzlesFuel(newNozzles);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Button
        title="افزودن نازل بنزین"
        onPress={() =>
          setNozzlesFuel([...nozzlesFuel, { startPeriod: '', endPeriod: '' }])
        }
      />

      {/* ورود مقادیر نازل‌های گاز */}
      {nozzlesGas.map((nozzle, index) => (
        <View key={index}>
          <Text>ابتدای دوره نازل گاز {index + 1}:</Text>
          <TextInput
            value={nozzle.startPeriod}
            onChangeText={(value) => {
              const newNozzles = [...nozzlesGas];
              newNozzles[index] = { ...nozzlesGas[index], startPeriod: value };
              setNozzlesGas(newNozzles);
            }}
            keyboardType="numeric"
          />
          <Text>انتهای دوره نازل گاز {index + 1}:</Text>
          <TextInput
            value={nozzle.endPeriod}
            onChangeText={(value) => {
              const newNozzles = [...nozzlesGas];
              newNozzles[index] = { ...nozzlesGas[index], endPeriod: value };
              setNozzlesGas(newNozzles);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Button
        title="افزودن نازل گاز"
        onPress={() =>
          setNozzlesGas([...nozzlesGas, { startPeriod: '', endPeriod: '' }])
        }
      />

      <Button title="محاسبه" onPress={handleCalculate} />
    </ScrollView>
  );
};

export default InputForm;
