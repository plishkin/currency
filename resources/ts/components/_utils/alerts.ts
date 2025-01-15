import IFailResponse from '../../@types/responces/IFailResponse';
import { IAlert } from '../Alert/Alert';

export const failAlert = (resp: IFailResponse) => {
  return {
    text: resp.message,
    list: Object.values(resp.errors || {}),
    type: 'danger',
    dismissible: true
  } as IAlert;
};
