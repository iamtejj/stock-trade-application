import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import StockData from "../components/StockData";

const formateData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

export default function StockDetailPage() {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = new Date();
        const currenTime = Math.floor(data.getTime() / 1000);
        let oneDay;
        if (data.getDay() === 6) {
          oneDay = currenTime - 2 * 24 * 60 * 60;
        } else if (data.getDay() === 0) {
          oneDay = currenTime - 3 * 24 * 60 * 60;
        } else {
          oneDay = currenTime - 1 * 24 * 60 * 60;
        }
        const oneWeek = currenTime - 7 * 24 * 60 * 60;
        const oneYear = currenTime - 365 * 24 * 60 * 60;

        const OneDayData = await finnHub.get("/stock/candle", {
          params: {
            symbol: symbol,
            resolution: 30,
            from: oneDay,
            to: currenTime,
          },
        });
        const OneWeekData = await finnHub.get("/stock/candle", {
          params: {
            symbol: symbol,
            resolution: 60,
            from: oneWeek,
            to: currenTime,
          },
        });

        const OneYearData = await finnHub.get("/stock/candle", {
          params: {
            symbol: symbol,
            resolution: "W",
            from: oneYear,
            to: currenTime,
          },
        });
        const responses = [OneDayData, OneWeekData, OneYearData];

        setChartData({
          day: formateData(responses[0].data),
          week: formateData(responses[1].data),
          year: formateData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div>
      Stock Detail {symbol}
      {chartData && (
        <>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </>
      )}
    </div>
  );
}
