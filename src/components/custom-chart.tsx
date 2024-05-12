import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

interface Props {
  dataArray: { columnName: string; value: number }[];
  domain?: AxisDomain;
}

export default function CustomLineChart({ dataArray, domain }: Props) {
  return (
    <div className=" overflow-auto">
      <LineChart
        width={1000}
        height={300}
        data={dataArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis allowDecimals domain={domain} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
