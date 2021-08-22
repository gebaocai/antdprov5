import { DataItem } from '@antv/g2plot/esm/interface/config';
export { DataItem };

export interface IndexData {
    visitData: DataItem[];
    visitData2: DataItem[];
    salesData: DataItem[];
    searchData: DataItem[];
    offlineData: OfflineDataType[];
    offlineChartData: DataItem[];
    salesTypeData: DataItem[];
    salesTypeDataOnline: DataItem[];
    salesTypeDataOffline: DataItem[];
    radarData: RadarData[];
}