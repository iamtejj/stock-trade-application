import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockdetailPage";
import { WatchListContextProvider } from "./context/watchListContext";
function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" exact element={<StockDetailPage  />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
