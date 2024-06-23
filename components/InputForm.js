import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const InputForm = ({ onCalculate }) => {
  const [firstfuelcount, setFirstFuelCount] = useState('');
  const [receivedFuel, setReceivedFuel] = useState('');
  const [firstgazcount, setFirstGazCount] = useState('');
  const [receivedGas, setReceivedGas] = useState('');
  const [nozzlesFuel, setNozzlesFuel] = useState([{ startPeriod: '', endPeriod: '' }]);
  const [nozzlesGas, setNozzlesGas] = useState([{ startPeriod: '', endPeriod: '' }]);
  const [tanksFuel, setTanksFuel] = useState([{ endQuantity: '' }]);
  const [tanksGas, setTanksGas] = useState([{ endQuantity: '' }]);

  const handleAddNozzleFuel = () => setNozzlesFuel([...nozzlesFuel, { startPeriod: '', endPeriod: '' }]);
  const handleAddNozzleGas = () => setNozzlesGas([...nozzlesGas, { startPeriod: '', endPeriod: '' }]);
  const handleAddTankFuel = () => setTanksFuel([...tanksFuel, { endQuantity: '' }]);
  const handleAddTankGas = () => setTanksGas([...tanksGas, { endQuantity: '' }]);

  const handleCalculate = () => {
    const data = {
      firstfuelcount: parseFloat(firstfuelcount),
      receivedFuel: parseFloat(receivedFuel),
      firstgazcount: parseFloat(firstgazcount),
      receivedGas: parseFloat(receivedGas),
      nozzlesFuel: nozzlesFuel.map(nozzle => ({ startPeriod: parseFloat(nozzle.startPeriod), endPeriod: parseFloat(nozzle.endPeriod) })),
      nozzlesGas: nozzlesGas.map(nozzle => ({ startPeriod: parseFloat(nozzle.startPeriod), endPeriod: parseFloat(nozzle.endPeriod) })),
      tanksFuel: tanksFuel.map(tank => ({ endQuantity: parseFloat(tank.endQuantity) })),
      tanksGas: tanksGas.map(tank => ({ endQuantity: parseFloat(tank.endQuantity) })),
    };
    onCalculate(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>مقدار ابتدای دوره بنزین:</Text>
      <TextInput style={styles.input} value={firstfuelcount} onChangeText={setFirstFuelCount} keyboardType="numeric" />

      <Text style={styles.label}>مقدار رسیده دوره بنزین:</Text>
      <TextInput style={styles.input} value={receivedFuel} onChangeText={setReceivedFuel} keyboardType="numeric" />

      <Text style={styles.label}>مقدار ابتدای دوره گاز:</Text>
      <TextInput style={styles.input} value={firstgazcount} onChangeText={setFirstGazCount} keyboardType="numeric" />

      <Text style={styles.label}>مقدار رسیده دوره گاز:</Text>
      <TextInput style={styles.input} value={receivedGas} onChangeText={setReceivedGas} keyboardType="numeric" />

      <Text style={styles.label}>نازل‌های بنزین:</Text>
      {nozzlesFuel.map((nozzle, index) => (
        <View key={index} style={styles.nozzleContainer}>
          <Text>نازل {index + 1} - ابتدای دوره:</Text>
          <TextInput style={styles.input} value={nozzle.startPeriod} onChangeText={text => {
            const newNozzlesFuel = [...nozzlesFuel];
            newNozzlesFuel[index].startPeriod = text;
            setNozzlesFuel(newNozzlesFuel);
          }} keyboardType="numeric" />
          <Text>نازل {index + 1} - انتهای دوره:</Text>
          <TextInput style={styles.input} value={nozzle.endPeriod} onChangeText={text => {
            const newNozzlesFuel = [...nozzlesFuel];
            newNozzlesFuel[index].endPeriod = text;
            setNozzlesFuel(newNozzlesFuel);
          }} keyboardType="numeric" />
        </View>
      ))}
      <Button title="اضافه کردن نازل بنزین" onPress={handleAddNozzleFuel} />

      <Text style={styles.label}>نازل‌های گاز:</Text>
      {nozzlesGas.map((nozzle, index) => (
        <View key={index} style={styles.nozzleContainer}>
          <Text>نازل {index + 1} - ابتدای دوره:</Text>
          <TextInput style={styles.input} value={nozzle.startPeriod} onChangeText={text => {
            const newNozzlesGas = [...nozzlesGas];
            newNozzlesGas[index].startPeriod = text;
            setNozzlesGas(newNozzlesGas);
          }} keyboardType="numeric" />
          <Text>نازل {index + 1} - انتهای دوره:</Text>
          <TextInput style={styles.input} value={nozzle.endPeriod} onChangeText={text => {
            const newNozzlesGas = [...nozzlesGas];
            newNozzlesGas[index].endPeriod = text;
            setNozzlesGas(newNozzlesGas);
          }} keyboardType="numeric" />
        </View>
      ))}
      <Button title="اضافه کردن نازل گاز" onPress={handleAddNozzleGas} />

      <Text style={styles.label}>مخازن بنزین:</Text>
      {tanksFuel.map((tank, index) => (
        <View key={index} style={styles.tankContainer}>
          <Text>مخزن {index + 1} - انتهای دوره:</Text>
          <TextInput style={styles.input} value={tank.endQuantity} onChangeText={text => {
            const newTanksFuel = [...tanksFuel];
            newTanksFuel[index].endQuantity = text;
            setTanksFuel(newTanksFuel);
          }} keyboardType="numeric" />
        </View>
      ))}
      <Button title="اضافه کردن مخزن بنزین" onPress={handleAddTankFuel} />

      <Text style={styles.label}>مخازن گاز:</Text>
      {tanksGas.map((tank, index) => (
        <View key={index} style={styles.tankContainer}>
          <Text>مخزن {index + 1} - انتهای دوره:</Text>
          <TextInput style={styles.input} value={tank.endQuantity} onChangeText={text => {
            const newTanksGas = [...tanksGas];
            newTanksGas[index].endQuantity = text;
            setTanksGas(newTanksGas);
          }} keyboardType="numeric" />
        </View>
      ))}
      <Button title="اضافه کردن مخزن گاز" onPress={handleAddTankGas} />

      <Button title="محاسبه" onPress={handleCalculate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  nozzleContainer: {
    marginBottom: 10,
  },
  tankContainer: {
    marginBottom: 10,
  },
});

export default InputForm;
