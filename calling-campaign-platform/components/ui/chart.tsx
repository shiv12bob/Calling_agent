import React from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import { Line } from "react-chartjs-2"
import { Bar, Pie, Doughnut } from "react-chartjs-2"

ChartJS.register(...registerables)

const Chart = React.forwardRef(({ type = "line", data, options }, ref) => {
  if (type === "line") {
    return <Line ref={ref} data={data} options={options} />
  } else if (type === "bar") {
    return <Bar ref={ref} data={data} options={options} />
  } else if (type === "pie") {
    return <Pie ref={ref} data={data} options={options} />
  } else if (type === "doughnut") {
    return <Doughnut ref={ref} data={data} options={options} />
  }
  return null
})
Chart.displayName = "Chart"

const ChartContainer = ({ data, xAxisKey, yAxisKey, padding, children }) => {
  return <div>{children}</div>
}

const ChartGrid = () => {
  return null
}

const ChartLine = () => {
  return null
}

const ChartTooltip = ({ children }) => {
  return null
}

const ChartTooltipContent = ({ children }) => {
  return <div>{children}</div>
}

const ChartXAxis = () => {
  return null
}

const ChartYAxis = () => {
  return null
}

export { Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent, ChartXAxis, ChartYAxis }

