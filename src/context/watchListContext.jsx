import { createContext, useContext, useEffect, useState } from "react";

const WatchListContext = createContext();

const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || ["GOOGL", "MSFT", "AMZN"]
    );
      

  useEffect(()=>{
      localStorage.setItem('watchList',watchList);
  },[watchList])
  const addStock = (stock) =>{
    if(watchList.indexOf(stock) === -1){
        setWatchList([...watchList,stock]);
    }
  }  
  const deletStock = (stock) =>{
    const newWatchlist = watchList.filter((el) =>{
        return el !== stock;
    })
    setWatchList(newWatchlist);
  }

  return(
    <WatchListContext.Provider value={{ watchList, setWatchList ,addStock, deletStock}}>
    {props.children}
    </WatchListContext.Provider>
  )
};

export { WatchListContext, WatchListContextProvider };
