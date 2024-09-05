import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

const App = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {

    const fetchRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD'); // Replace with your chosen API endpoint
        setRates(response.data.rates);
        console.log(Object.keys(rates));
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  const handleConvert = () => {
    if (rates[toCurrency] && rates[fromCurrency]) {
      const conversionRate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * conversionRate).toFixed(2));
    }
  };

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)
        }>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span> to </span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <h3>
        {amount} {fromCurrency} is {convertedAmount} {toCurrency}
      </h3>
    </div>
  );
};

export default App;