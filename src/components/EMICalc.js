import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FinancialCalculator() {
  const [mode, setMode] = useState('EMI');

  // EMI States
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRates, setInterestRates] = useState('');
  const [tenorYears, setTenorYears] = useState('');
  const [emiResults, setEmiResults] = useState([]);

  // FD States
  const [fdAmount, setFdAmount] = useState('');
  const [fdRate, setFdRate] = useState('');
  const [fdTime, setFdTime] = useState('');
  const [fdResult, setFdResult] = useState(null);

  // EMI Logic
  const calculateEMIs = () => {
    const loan = parseFloat(loanAmount);
    const tenorMonths = parseInt(tenorYears) * 12;
    const rates = interestRates
      .split(',')
      .map(r => parseFloat(r.trim()))
      .filter(r => !isNaN(r));

    if (!loan || !tenorMonths || rates.length === 0) {
      alert('Please enter valid EMI details.');
      return;
    }

    const output = rates.map(rate => {
      const monthlyRate = rate / 12 / 100;
      const emi =
        loan *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenorMonths) /
        (Math.pow(1 + monthlyRate, tenorMonths) - 1);
      const totalPayment = emi * tenorMonths;
      const totalInterest = totalPayment - loan;

      return {
        rate,
        emi: emi.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2)
      };
    });

    setEmiResults(output);
  };

  // FD Logic
  const calculateFD = () => {
    const principal = parseFloat(fdAmount);
    const rate = parseFloat(fdRate);
    const time = parseFloat(fdTime);

    if (!principal || !rate || !time) {
      alert('Please enter valid FD details.');
      return;
    }

    const maturity = principal * Math.pow(1 + rate / 100, time);
    const interest = maturity - principal;

    setFdResult({
      principal: principal.toFixed(2),
      maturity: maturity.toFixed(2),
      interest: interest.toFixed(2),
      rate,
      time
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-center">💹 Financial Calculator</h4>

      {/* Toggle */}
      <div className="d-flex justify-content-center mb-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="toggleMode"
            checked={mode === 'FD'}
            onChange={() => setMode(prev => (prev === 'EMI' ? 'FD' : 'EMI'))}
          />
          <label className="form-check-label" htmlFor="toggleMode">
            {mode === 'EMI' ? 'Switch to FD Calculator' : 'Switch to EMI Calculator'}
          </label>
        </div>
      </div>

      {/* EMI Section */}
      {mode === 'EMI' && (
        <>
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 500000"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Interest Rate(s) (%)</label>
              <input
                type="text"
                className="form-control"
                placeholder="comma separated, e.g. 8.5,9,10"
                value={interestRates}
                onChange={e => setInterestRates(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Tenor (years)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 5"
                value={tenorYears}
                onChange={e => setTenorYears(e.target.value)}
              />
            </div>
            <div className="col-md-1 d-grid align-content-end">
              <button className="btn btn-success" onClick={calculateEMIs}>Calc</button>
            </div>
          </div>

          {emiResults.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-light">
                  <tr>
                    <th>Interest Rate (%)</th>
                    <th>EMI (₹)</th>
                    <th>Total Interest (₹)</th>
                    <th>Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {emiResults.map((res, idx) => (
                    <tr key={idx}>
                      <td>{res.rate}%</td>
                      <td>{res.emi}</td>
                      <td>{res.totalInterest}</td>
                      <td>{res.totalPayment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* FD Section */}
      {mode === 'FD' && (
        <>
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 500000"
                value={fdAmount}
                onChange={e => setFdAmount(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Interest Rate(s) (%)</label>
              <input
                type="text"
                className="form-control"
                placeholder="comma separated, e.g. 6.5"
                value={fdRate}
                onChange={e => setFdRate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Tenor (years)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 5"
                value={fdTime}
                onChange={e => setFdTime(e.target.value)}
              />
            </div>
            <div className="col-md-1 d-grid align-content-end">
              <button className="btn btn-primary" onClick={calculateFD}>Calc</button>
            </div>
          </div>

          {fdResult && (
            <div className="alert alert-info">
              <p><strong>Principal:</strong> ₹{fdResult.principal}</p>
              <p><strong>Rate:</strong> {fdResult.rate}% p.a.</p>
              <p><strong>Time:</strong> {fdResult.time} years</p>
              <p><strong>Maturity Amount:</strong> ₹{fdResult.maturity}</p>
              <p><strong>Total Interest:</strong> ₹{fdResult.interest}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FinancialCalculator;
