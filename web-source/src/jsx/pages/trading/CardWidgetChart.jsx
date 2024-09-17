import React from "react";
import { Line } from "react-chartjs-2";

const DefaultChart = (props) => {  
    const data = {    
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April"],
        datasets: [
            {            
                label: "Sales Stats",
                borderColor: props.color,                        
                borderWidth:2,            
                pointHoverBackgroundColor: props.color,            
                data: props.chartdata,
            },
        ],
      };
  
      const options = {
       
          responsive: !0,
          maintainAspectRatio: !1,
          hover: {
              mode: 'nearest',
              intersect: false
          },
          plugins: {
            legend: false,
            tooltip: {
              mode: 'index',
              intersect: false
              }
          },
          scales: {
              x: {
                  display: !1,
                  gridLines: !1,
                  scaleLabel: {
                      display: !0,
                      labelString: "Month"
                  }
              },
              y: {
                  display: !1,
                  gridLines: !1,
                  scaleLabel: {
                      display: !0,
                      labelString: "Value"
                  },
                  ticks: {
                      beginAtZero: !0
                  }
              }
          },
          elements: {
              line: {
                  tension: .15
              },
              point: {
                  radius: 0,
                  borderWidth: 0
              }
          },
          layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 5,
                  bottom: 0
              }
          }
      };
    return (
        <div id="widgetChart1" style={{ height: 80 }}>
            <Line data={data} options={options} height={80} />
        </div>
    );
 
}
export  { DefaultChart};
