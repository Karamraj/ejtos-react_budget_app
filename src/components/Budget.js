import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Budget = () => {
  const { budget, spending, currency, dispatch } = useContext(AppContext);
  const [inputBudget, setInputBudget] = useState(budget);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBudgetChange = (e) => {
    setInputBudget(e.target.value);
    setErrorMessage('');
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    dispatch({ type: 'SET_CURRENCY', payload: selectedCurrency });
  };

  const updateBudget = () => {
    const newBudget = parseFloat(inputBudget);
    if (newBudget < spending) {
      setErrorMessage('Budget cannot be lower than spending');
    } else {
      dispatch({ type: 'SET_BUDGET', payload: newBudget });
    }
  };

  return (
    <div className='alert alert-secondary'>
      <div className='budget-label'>
        <span>Budget:</span>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value='$'>$ Dollar</option>
          <option value='£'>£ Pound</option>
          <option value='€'>€ Euro</option>
          <option value='₹'>₹ Rupee</option>
        </select>
      </div>
      <div className='budget-input'>
        <input type='number' value={inputBudget} onChange={handleBudgetChange} />
        <button onClick={updateBudget}>Update</button>
      </div>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </div>
  );
};

export default Budget;
