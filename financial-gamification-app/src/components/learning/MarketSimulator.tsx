import React, { useState, useEffect } from 'react';
import { financialInstruments } from '../../data/instruments';
import './MarketSimulator.css';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface Portfolio {
  cash: number;
  holdings: {
    symbol: string;
    shares: number;
    avgPrice: number;
  }[];
}

const MarketSimulator = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000, // Starting with $10,000
    holdings: []
  });
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');

  useEffect(() => {
    // Simulate real-time market data updates
    const interval = setInterval(() => {
      updateMarketPrices();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateMarketPrices = () => {
    const updatedData = financialInstruments.map(instrument => ({
      symbol: instrument.id,
      price: generateRandomPrice(),
      change: generateRandomChange(),
      volume: generateRandomVolume()
    }));
    setMarketData(updatedData);
  };

  const generateRandomPrice = () => {
    return Math.random() * 1000 + 10;
  };

  const generateRandomChange = () => {
    return (Math.random() - 0.5) * 10;
  };

  const generateRandomVolume = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const executeTrade = (isBuy: boolean) => {
    if (!selectedSymbol || !tradeAmount) return;

    const shares = parseInt(tradeAmount);
    const stock = marketData.find(d => d.symbol === selectedSymbol);
    if (!stock) return;

    const totalCost = shares * stock.price;

    if (isBuy) {
      if (totalCost > portfolio.cash) {
        alert('Insufficient funds!');
        return;
      }

      setPortfolio(prev => {
        const existingHolding = prev.holdings.find(h => h.symbol === selectedSymbol);
        const updatedHoldings = existingHolding
          ? prev.holdings.map(h =>
              h.symbol === selectedSymbol
                ? {
                    ...h,
                    shares: h.shares + shares,
                    avgPrice: (h.avgPrice * h.shares + totalCost) / (h.shares + shares)
                  }
                : h
            )
          : [...prev.holdings, { symbol: selectedSymbol, shares, avgPrice: stock.price }];

        return {
          cash: prev.cash - totalCost,
          holdings: updatedHoldings
        };
      });
    } else {
      const holding = portfolio.holdings.find(h => h.symbol === selectedSymbol);
      if (!holding || holding.shares < shares) {
        alert('Insufficient shares!');
        return;
      }

      setPortfolio(prev => ({
        cash: prev.cash + totalCost,
        holdings: prev.holdings
          .map(h =>
            h.symbol === selectedSymbol
              ? { ...h, shares: h.shares - shares }
              : h
          )
          .filter(h => h.shares > 0)
      }));
    }

    setTradeAmount('');
  };

  return (
    <div className="market-simulator">
      <div className="market-header">
        <h2>Market Simulator</h2>
        <div className="portfolio-value">
          Portfolio Value: $
          {(portfolio.cash +
            portfolio.holdings.reduce((total, holding) => {
              const stock = marketData.find(d => d.symbol === holding.symbol);
              return total + (stock?.price || 0) * holding.shares;
            }, 0)).toFixed(2)}
        </div>
      </div>

      <div className="simulator-grid">
        <div className="market-data">
          <h3>Market Prices</h3>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map(data => (
                <tr
                  key={data.symbol}
                  className={data.change >= 0 ? 'positive' : 'negative'}
                  onClick={() => setSelectedSymbol(data.symbol)}
                >
                  <td>{data.symbol}</td>
                  <td>${data.price.toFixed(2)}</td>
                  <td>{data.change.toFixed(2)}%</td>
                  <td>{data.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="trading-panel">
          <h3>Trading Panel</h3>
          <div className="trade-controls">
            <select
              value={selectedSymbol}
              onChange={e => setSelectedSymbol(e.target.value)}
            >
              <option value="">Select Symbol</option>
              {marketData.map(data => (
                <option key={data.symbol} value={data.symbol}>
                  {data.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={tradeAmount}
              onChange={e => setTradeAmount(e.target.value)}
              placeholder="Number of shares"
            />
            <div className="trade-buttons">
              <button
                onClick={() => executeTrade(true)}
                className="buy-button"
              >
                Buy
              </button>
              <button
                onClick={() => executeTrade(false)}
                className="sell-button"
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        <div className="portfolio-panel">
          <h3>Your Portfolio</h3>
          <div className="cash-balance">Cash: ${portfolio.cash.toFixed(2)}</div>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Avg Price</th>
                <th>Current Value</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map(holding => {
                const stock = marketData.find(d => d.symbol === holding.symbol);
                const currentValue = (stock?.price || 0) * holding.shares;
                const profitLoss = currentValue - holding.avgPrice * holding.shares;
                
                return (
                  <tr key={holding.symbol}>
                    <td>{holding.symbol}</td>
                    <td>{holding.shares}</td>
                    <td>${holding.avgPrice.toFixed(2)}</td>
                    <td>${currentValue.toFixed(2)}</td>
                    <td className={profitLoss >= 0 ? 'positive' : 'negative'}>
                      ${profitLoss.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketSimulator;
