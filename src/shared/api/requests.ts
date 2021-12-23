import { api } from 'config/axios';
import { ControlMode } from '../types/common.types';
import { CONTROL_MODE } from '../variables/common.constants';

export interface IMutationProps {
  operation: ControlMode;
  data: unknown;
  url: string;
}

/** INFO: orderFunc 파라미터를 필수로 입력해야 하는 이유. #84537 참고 */
export async function getList<T>(url: string, orderFunc: (restData: T[]) => T[]): Promise<T[]> {
  const response = await api.get(url);
  const key = url.split('/').pop();
  const data = Object.keys(response.data).length === 0 ? [] : (response.data[key] as T[]);
  return orderFunc ? orderFunc(data) : data;
}

/** FIXME: 함수 네이밍 검토 필요 */
export async function getContainer<T>(url: string): Promise<T> {
  const response = await api.get(url);
  return response.data as T;
}

export async function mutationConfiguration({ operation, data, url }: IMutationProps): Promise<void> {
  switch (operation) {
    case CONTROL_MODE.ADD:
    case CONTROL_MODE.COPY:
    case CONTROL_MODE.CHECK:
      await api.post(url, data);
      break;
    case CONTROL_MODE.EDIT:
      await api.put(url, data);
      break;
    case CONTROL_MODE.DELETE:
      await api.delete(url, { data });
      break;
    case CONTROL_MODE.PATCH:
      await api.patch(url, data);
      break;
    default:
      break;
  }
}
