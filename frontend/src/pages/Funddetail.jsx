import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { getFundDetails } from "../api/mf.api";

function Funddetail() {
  const { schemeCode } = useParams();

  const [fund, setFund] = useState(null);

  const [chartData, setChartData] = useState([]);

  const [range, setRange] = useState("5Y");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFundDetails();
  }, []);

  const fetchFundDetails = async () => {
    try {
      setLoading(true);

      const res = await getFundDetails(schemeCode);

      const fundData = res?.data?.data;

      setFund(fundData);

      // default range => 5Y
      const filtered = filterDataByRange(fundData?.data || [], "5Y");

      setChartData(filtered);
    } catch (error) {
      console.log(error);

      setError("Failed to fetch fund details");
    } finally {
      setLoading(false);
    }
  };

  const filterDataByRange = (data, selectedRange) => {
    if (selectedRange === "All") {
      return formatChartData(data);
    }

    const yearsMap = {
      "1Y": 1,
      "3Y": 3,
      "5Y": 5,
    };

    const years = yearsMap[selectedRange];

    const currentDate = new Date();

    // cutoff date
    const cutoffDate = new Date();

    cutoffDate.setFullYear(currentDate.getFullYear() - years);

    // filtering valid dates
    const filtered = data.filter((item) => {
      const [day, month, year] = item.date.split("-");

      const itemDate = new Date(Number(year), Number(month) - 1, Number(day));

      return itemDate >= cutoffDate;
    });

    return formatChartData(filtered);
  };

  // reversing data to show in charts
  const formatChartData = (data) => {
    return [...data].reverse().map((item) => ({
      date: item.date,
      nav: Number(item.nav),
    }));
  };

  const handleRangeChange = (selectedRange) => {
    setRange(selectedRange);

    const filtered = filterDataByRange(fund?.data || [], selectedRange);

    setChartData(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!fund?.data?.length) {
    return (
      <div className="py-20 text-center text-slate-500">
        No NAV data available.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {fund?.meta?.scheme_name}
          </h1>

          <p className="mt-2 text-slate-500">Scheme Code: {schemeCode}</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-3">
          {["1Y", "3Y", "5Y", "All"].map((item) => (
            <Button
              key={item}
              variant={range === item ? "default" : "outline"}
              onClick={() => handleRangeChange(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="w-full min-w-0">
              {chartData.length === 0 ? (
                <div className="flex h-110items-center justify-center text-slate-500">
                  No appropriate NAV data available for this range.
                </div>
              ) : (
                <div className="h-110 w-full">
                  <h2 className="mb-4 text-lg font-semibold text-slate-800 text-center">
                    NAV Performance
                  </h2>

                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis
                        dataKey="date"
                        minTickGap={40}
                        tick={{ fontSize: 12 }}
                      >
                        <Label
                          value="Date"
                          offset={-5}
                          position="insideBottom"
                        />
                      </XAxis>

                      <YAxis domain={["auto", "auto"]}>
                        <Label
                          value="NAV(₹)"
                          angle={-90}
                          position="insideLeft"
                          style={{ textAnchor: "middle" }}
                        />
                      </YAxis>

                      <Tooltip formatter={(value) => [`₹${value}`, "NAV"]} />

                      <Line
                        type="monotone"
                        dataKey="nav"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Funddetail;
