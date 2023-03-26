
import { useState } from "react";
import Chart from "react-apexcharts";
export const StockChart = ({chartData,symbol}) => {
    const [dateFormate,setDateFormate] = useState('24h')
    const {day,week,year} = chartData;
    const determineTimeFormate = () =>{
        switch(dateFormate){
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    }

    const color = determineTimeFormate()[determineTimeFormate().length - 1].y - determineTimeFormate()[0].y > 0 ? "#26C281":"#ed3419";
    
    const options = {
        colors:[color],
        title:{
            text:symbol,
            align:"center",
            style:{
                fontSize:"24px",
            }
        },
        chart:{
            id:"stock data",
            animations:{
                speed:1300,
            }
        },
        xaxis:{
            type:"datetime"
        },
        tooltip:{
            x:{
                format:"MMM dd HH:MM"
            }
        }
    }

   

    const renderButtonSelect = (button) => {
        const classess = "btn mx-1"
        if(button === dateFormate){
            return classess + " btn-primary"
        }
        else{
            return classess + " btn-outline-primary"
        }
    }

    const series = [{
        type: 'area',
        name:symbol,
        data:determineTimeFormate()
    }]
    return <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
             />
             <div>
                <button className={renderButtonSelect("24h")} onClick={() => { setDateFormate("24h")}}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() => { setDateFormate("7d")}}>7d</button>
                <button className={renderButtonSelect("1y")} onClick={() => { setDateFormate("1y")}}>1y</button>
             </div>
    </div>
}