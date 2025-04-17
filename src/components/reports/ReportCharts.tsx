
import { ReportChartsProps } from "@/types/reports";
import { ProspectCharts } from "./charts/ProspectCharts";
import { ConversionCharts } from "./charts/ConversionCharts";
import { AgentCharts } from "./charts/AgentCharts";

export const ReportCharts = ({ activeTab, reportType = "prospectos" }: ReportChartsProps) => {
  if (activeTab !== "graficos") return null;

  const renderReportContent = () => {
    switch (reportType) {
      case 'conversion':
        return <ConversionCharts />;
      case 'agentes':
        return <AgentCharts />;
      case 'prospectos':
      default:
        return <ProspectCharts />;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {renderReportContent()}
    </div>
  );
};
