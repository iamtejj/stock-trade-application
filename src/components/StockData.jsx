import React, { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

export default function StockData({ symbol }) {
  const [stockData, setStockData] = useState();
  let isMounted = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol: symbol,
          },
        });
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted == false);
  }, [symbol]);
  return <div>
    {stockData &&(
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
            <div className="col-4">
                <div>
                    <span className="fw-bold">Name: </span>
                    {stockData.name}
                </div>
                <div>
                    <span className="fw-bold">Country: </span>
                    {stockData.country}
                </div>
                <div>
                    <span className="fw-bold">ticker: </span>
                    {stockData.ticker}
                </div>
            </div>
            <div className="col-4">
                <div>
                    <span className="fw-bold">Exchange: </span>
                    {stockData.exchange}
                </div>
                <div>
                    <span className="fw-bold">Industry: </span>
                    {stockData.finnHubIndustry}
                </div>
                <div>
                    <span className="fw-bold">IPO:</span>
                    {stockData.ipo}
                </div>
            </div>
            <div className="col-4">
                <div>
                    <span className="fw-bold">MarketCap: </span>
                    {stockData.marketCapitalization}
                </div>
                <div>
                    <span className="fw-bold">Share Outstanding: </span>
                    {stockData.shareOutstanding}
                </div>
                <div>
                    <span className="fw-bold">url:</span>
                    <a href={stockData.weburl}>{stockData.weburl}</a>
                </div>
            </div>
        </div>
    )}
  </div>;
}
