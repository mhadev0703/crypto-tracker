import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


export interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    
    const { isLoading, data } = useQuery<number[][]>({   
        queryKey: ["ohlcv", coinId], 
        queryFn: () => fetchCoinHistory(coinId),
        refetchInterval: 30 * 60 * 1000,
    });

    console.log(data);

    // Data processing for chart
    const processedData = data?.map((entry) => ({
        x: new Date(entry[0]),
        y: entry[4],
    })) ?? [];
    
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart 
                    type="line" 
                    series={[
                        {   
                            name: "Price",
                            data: processedData,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: true },
                            axisTicks: { show: true },
                            labels: { show: true },
                            type: "datetime",
                            categories: data?.map((price) => price[0])
                        },
                        fill: { 
                            type: "gradient", 
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;