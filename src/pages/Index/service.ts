import { request } from 'umi';
import type { IndexData } from './data';

export async function fakeChartData(): Promise<{ data: IndexData }> {
  return request('/api/fake_analysis_chart_data');
}