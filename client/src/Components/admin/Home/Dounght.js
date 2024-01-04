import { useEffect } from "react"
import { Chart } from "chart.js";
function Dounght() {
    useEffect(() => {
        var ctx = document.getElementById('myChart1').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Accepted", "Pending", "Rejected"],
                datasets: [{
                    data: [70, 10, 6],
                    borderColor: [
                        "rgb(75, 192, 192)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    backgroundColor: [
                        "rgb(75, 192, 192 )",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
    }, [])


    return (
        <>
            {/* Doughnut chart */}
            <div className="w-full h-96 flex mx-auto my-auto ">
                <div className=' w-full  '>
                    <canvas id='myChart1'></canvas>
                </div>
            </div>
        </>
    )
}

export default Dounght;