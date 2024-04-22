import React from "react";

import { BarChart } from '@mui/x-charts/BarChart'

function IOChart(iOData){

    // Cpu graph component
    let updateData = iOData;
    return(
        <BarChart
          series={[
            { data: [updateData.iOData['read_count']] },
            { data: [updateData.iOData['write_count']] },
            { data: [updateData.iOData['read_time']] },
            { data: [updateData.iOData['write_time']] },
              ]}
          height={400}
          xAxis={[{ data: ['CPU DATA'], scaleType: 'band' }]}
          margin={{ top: 5, bottom: 20, left: 40, right: 40 }}
        />
    );
};

export default IOChart;