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

const PointsSummary = ({ data }) => {
    return (
        <div className="w-full h-96 bg-blue-50 my-4 p-2 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                Points Purchased Per Month
            </h2>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month"
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
                        dataKey="posting"
                        stroke="#6366f1"
                        strokeWidth={3}
                        name="Posting Points"
                    />
                    <Line
                        type="monotone"
                        dataKey="application"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="Application Points"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PointsSummary;
