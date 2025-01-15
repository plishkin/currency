import { IAlert } from '../Alert/Alert';
import IFailResponse from '../../@types/responces/IFailResponse';

export const failAlert = (resp: IFailResponse) => {
  return {
    text: resp.message,
    list: Object.values(resp.errors || {}),
    type: 'danger',
    dismissible: true
  } as IAlert;
};

export const successfullyUpdatedAlert = (date: Date) =>
  ({
    text: `Successfully updated at ${date.toLocaleString()}`,
    dismissible: true,
    type: 'success'
  } as IAlert);

export const errorWhileUpdatingAlert = (date: Date) =>
  ({
    text: `Errors happens while updating at ${date.toLocaleString()}`,
    dismissible: true,
    type: 'danger'
  } as IAlert);

export const errorAlert = (error: string) =>
  ({
    text: error,
    dismissible: true,
    type: 'danger'
  } as IAlert);

export const infoAlert = (info: string) =>
  ({
    text: info,
    dismissible: true,
    type: 'info'
  } as IAlert);
