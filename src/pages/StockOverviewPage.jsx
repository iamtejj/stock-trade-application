import React from "react";
import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

export default function StockOverviewPage() {
  return (
    <>
      <div>
        <AutoComplete />
        <StockList />
      </div>
    </>
  );
}
