import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const JobsAndApplicationsChart = ({ data }) => {
    return (
        <div className="w-full h-96 bg-blue-50 p-2 my-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                Jobs vs Applications Per Month
            </h2>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickFormatter={(value) => {
                            const date = new Date(value + "-01");
                            return date.toLocaleString("default", {
                                month: "short",
                            });
                        }}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="jobs"
                        stroke="#6366f1"
                        strokeWidth={3}
                        name="Jobs"
                    />
                    <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#22c55e"
                        strokeWidth={3}
                        name="Applications"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default JobsAndApplicationsChart;
