import React, { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub';
import { AiOutlineCaretDown ,AiOutlineCaretUp } from 'react-icons/ai';
import { WatchListContext } from '../context/watchListContext';
import { useNavigate } from 'react-router-dom';


export default function StockList() {
  const {watchList,deletStock} =useContext(WatchListContext); 
  const [stock,setStock] = useState();
  const navigate = useNavigate()
  const changeColor = (change) =>{
    return change > 0 ? "success" :"danger"
  }

  const renderIcon = (change) =>{
    return change > 0 ? <AiOutlineCaretUp />:<AiOutlineCaretDown />
  }
  useEffect(()=>{
    let isMounted = true; 
    const fetchData = async () =>{
      try{
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get("quote",{
            params:{
              symbol:stock
            }
          })
        })); 

        const data = responses.map((response)=>{
          return {
            data:response.data,
            symbol:response.config.params.symbol
          }
        })
        console.log(data)
        
        if(isMounted){
          setStock(data);
        }
      }
      catch(error){

      }
    }
    fetchData();
    return () =>(isMounted = false);
  },[watchList])
  const handleStockselect = (symbol) =>{
    navigate(`/detail/${symbol}`);   
  }
  return (
    <div>
      <table className='table hover mt-4'>
        <thead style={{color:"rgb(79,89,102)"}}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock && stock.map((stockData)=>{
            return(
              <tr style={{cursor:"pointer"}} onClick={() =>{handleStockselect(stockData.symbol)}} className='table-row' key={stockData.symbol}>
                <th scope='row'>{stockData.symbol}</th>
                <td >{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.d)}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}<button className='btn btn-danger btn-sm ml-3 d-inline-block delete-button' onClick={(e) => {
                  e.stopPropagation()
                  deletStock(stockData.symbol);
                }} >Remove</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
