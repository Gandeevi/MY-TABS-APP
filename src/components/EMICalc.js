// EMI Calculator Component
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRates, setInterestRates] = useState('');
  const [tenorMonths, setTenorMonths] = useState('');
  const [results, setResults] = useState([]);

  const calculateEMIs = () => {
    const loan = parseFloat(loanAmount);
    const tenor = parseInt(tenorMonths);
    const rates = interestRates.split(',').map(r => parseFloat(r.trim())).filter(r => !isNaN(r));

    const output = rates.map(rate => {
      const monthlyRate = rate / 12 / 100;
      const emi = loan * monthlyRate * Math.pow(1 + monthlyRate, tenor) / (Math.pow(1 + monthlyRate, tenor) - 1);
      const totalPayment = emi * tenor;
      const totalInterest = totalPayment - loan;

      return {
        rate,
        emi: emi.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2)
      };
    });

    setResults(output);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-center">📊 EMI Calculator</h4>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <label className="form-label">Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 500000"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Interest Rates (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. 8.5,9.2,10.0"
            value={interestRates}
            onChange={e => setInterestRates(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label">Tenor (in months)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 60"
            value={tenorMonths}
            onChange={e => setTenorMonths(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-1 d-grid align-content-end">
          <button className="btn btn-success" onClick={calculateEMIs}>Calc</button>
        </div>
      </div>

      {results.length > 0 && (
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
              {results.map((res, idx) => (
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
    </div>
  );
}

export default EMICalculator;
