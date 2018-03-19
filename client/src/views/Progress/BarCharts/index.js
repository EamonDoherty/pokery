import React from "react"
import SectionTitle from "../../../shared/SectionTitle"
import PageSection from "../../../shared/PageSection"
import PageContainer from '../../../App/PageContainer'
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Legend
} from 'recharts'

const BarCharts = props => {
  return (
    <div>
        <PageSection>
          <SectionTitle title={props.title}/>
          <BarChart width={props.width} height={props.height} data={props.data}>
            <CartesianGrid strokeDasharray={props.strokeDasharray} />
            <XAxis dataKey={props.xDataKey} />
            <YAxis label={props.label} />
            <Tooltip />
            <Legend />
            <Bar dataKey={props.dataKey1} fill={props.fill1} />
            <Bar dataKey={props.dataKey2} fill={props.fill2} />
          </BarChart>
        </PageSection>
    </div>
  )

}



export default BarCharts
