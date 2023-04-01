import React from 'react'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'

ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
function Chart({arr=[],currency,days}) {
    const prices = [1,2,34,5]
    const date = []

    for (let i = 0; i < arr.length; i++) {
        if(days === '24h') {
            date.push(new Date(arr[i][0]).toLocaleTimeString())
        }else {

            date.push(new Date(arr[i][0]).toLocaleDateString())
        }
        prices.push(arr[i][1])
    }
    console.log(date)
    const data = {
        
            labels:date,
            datasets:[{
                label:`price in ${currency}`,
                data:prices,borderColor:"rgb(255,99,132)",
                backgroundColor:"rgba(255,99,132,0.5)"
            }]
        
    }
  return (
    <Line options={{
        responsive:true,
    }}
    data={data}
    />


  )
}

export default Chart