
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Components
import { MetricCards } from "@/components/reports/MetricCards";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { ReportCharts } from "@/components/reports/ReportCharts";
import { ReportTables } from "@/components/reports/ReportTables";
import { DownloadButton } from "@/components/reports/DownloadButton";
import { getReportData } from "@/components/reports/reportData";

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState("mes");
  const [reportType, setReportType] = useState("prospectos");
  const [activeTab, setActiveTab] = useState("graficos");
  
  const handleReportTypeChange = (value: string) => {
    setReportType(value);
  };
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const getDataForDownload = () => {
    return getReportData(reportType);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <DownloadButton 
          reportType={reportType}
          timeframe={timeframe}
          getData={getDataForDownload}
          onReportTypeChange={handleReportTypeChange}
        />
      </div>
      
      <MetricCards />
      
      <ReportFilters
        reportType={reportType}
        timeframe={timeframe}
        onReportTypeChange={handleReportTypeChange}
        onTimeframeChange={handleTimeframeChange}
      />
      
      <Tabs defaultValue="graficos" value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
          <TabsTrigger value="tablas">Tablas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="graficos">
          <ReportCharts activeTab={activeTab} reportType={reportType} />
        </TabsContent>
        
        <TabsContent value="tablas">
          <ReportTables activeTab={activeTab} reportType={reportType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
