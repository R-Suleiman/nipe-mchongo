import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axiosClient from "../assets/js/axios-client";

const ApplicationsPerMonthChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosClient.get("/jobposter/applications-per-month").then((res) => {
            setData(
                res.data.applicationsGraph.map((item) => ({
                    ...item,
                    month: new Date(item.month + "-01").toLocaleString(
                        "default",
                        { month: "short", year: "numeric" }
                    ),
                }))
            );
        });
    }, []);

    return (
        <div className="w-full lg:w-1/2 h-96 bg-blue-50 my-4 p-2 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                Jobs Applications Per Month
            </h2>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#6366f1"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicationsPerMonthChart;

