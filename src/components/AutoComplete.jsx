import React, { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub';
import { WatchListContext } from '../context/watchListContext';


export default function AutoComplete() {
  const {addStock} =useContext(WatchListContext); 
  const [search,setSearch] = useState("");
  const [results,setResults] = useState();

  const renderDropdown = () =>{
    const dropDownClass = search ? "show":null

    return(
      <ul className={`dropdown-menu ${dropDownClass}`} style={{height:"500px",overflowX:"hidden",overflowY:"scroll",cursor:"pointer"}}>
        {results && results.map((result)=>{
            return (
              <li className='dropdown-item' onClick={() => {
                addStock(result.symbol);
                setSearch("")
              }} key={result.symbol}>{result.description}({result.symbol})</li>
            )
        })}
        
      </ul>
    )
  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search',{
          params:{
            q:search
          }
        });
        if(isMounted){
          setResults(response.data.result);
        }
        console.log(response)
      } catch (error) {
        
      }
    }
    if(search.length >0){
      fetchData()
    }
    else{
      setResults([])
    }
    return () => (isMounted = false)
  },[search])

  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
      <input onChange={(e)=>{ setSearch(e.target.value) }} value={search} style={{backgroundColor:"rgba(145,148,171,0.04)"}} id="search" type="text" className='form-control' placeholder='Search' autoComplete="off" />
      <label htmlFor="search" >Search</label>
      {renderDropdown()}
      </div>
    </div>
  )
}
