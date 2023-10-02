import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js/auto";

Chart.register(CategoryScale);

function ChartJS(props) {
    return (
        <div className="chart-container" style={{width:450, height:500}}>
            <h2 style={{ textAlign: "center" }}>Yaswanth Varma Jampana</h2>
            <Pie
                data={props.chartData}
            />
        </div>
    );

}
export default ChartJS;