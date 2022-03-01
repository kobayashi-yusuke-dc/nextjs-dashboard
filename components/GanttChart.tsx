import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { useLayoutEffect, useRef } from 'react'

const GanttChart: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<am4charts.XYChart | null>(null) // chart本体のnodeとなる、chartの更新は主にこのRefを通してやる

  const chartData = [
    {
      category: 'A',
      start: 1646060400000, // 2022-03-01
      end: 1646146800000, // 2022-03-02
    },
    {
      category: 'B',
      start: 1646838000000, // 2022-03-10
      end: 1647442800000, // 2022-03-17
    },
    {
      category: 'C',
      start: 1648479600000, // 2022-03-29
      end: 1648911600000, // 2022-04-03
    },
  ]

  useLayoutEffect(() => {
    if (divRef.current) {
      const chart = am4core.create(divRef.current, am4charts.XYChart) // divRefのnodeがchartのコンテナとして適用される

      chart.height = 300
      chart.paddingTop = 0
      chart.paddingBottom = 0
      chart.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm:ss'
      chart.data = chartData

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.extraMin = 0.01
      dateAxis.extraMax = 0.01
      dateAxis.renderer.labels.template.location = 0.0001

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.inversed = true

      const series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.openDateX = 'start'
      series.dataFields.dateX = 'end'
      series.dataFields.categoryY = 'category'
      series.columns.template.tooltipText =
        'category: {category} \n 開始: {openDateX} \n 終了: {dateX}'
      series.columns.template.tooltipPosition = 'pointer'

      const scrollbar = new am4charts.XYChartScrollbar()
      chart.scrollbarX = scrollbar
      scrollbar.series.push(series)

      chart.cursor = new am4charts.XYCursor()

      chart.plotContainer.events.on('doublehit', () =>
        dateAxis.zoom({ start: 0, end: 1 })
      )

      chartRef.current = chart // 最後にchartのRefを保持しておくと、別のhooks内でRefを通して色々いじることができる
      return () => chart.dispose() // unmount時にdisposeする必要がある
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full p-6 pb-6 bg-white rounded-lg">
      {/* chartのコンテナとなるRefを渡す */}
      <div ref={divRef} style={{ height: 300, width: '100%' }} />
    </div>
  )
}

export default GanttChart
