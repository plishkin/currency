import React from 'react';
import './Alert.scss';

export interface IShortAlert {
  text: string;
  list?: string[];
}

export type TAlertType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export interface IAlert extends IShortAlert {
  type: TAlertType;
  dismissible?: boolean;
  dismiss?: () => void;
}

const Alert: React.FunctionComponent<IAlert> = (props: IAlert) => {
  if (!props.text) return null;
  return (
    <div
      className={
        'alert alert-' +
        props.type +
        (props.dismissible ? ' alert-dismissible' : '') +
        ' fade show'
      }
      role="alert"
    >
      <div className="alert-text">{props.text}</div>

      {props.dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={e => {
            if (props.dismiss) {
              e.preventDefault();
              e.stopPropagation();
              props.dismiss();
            }
          }}
        ></button>
      )}

      {props.list?.length > 0 && (
        <ul className="m-0">
          {props.list.map(string => (
            <li key={string}>{string}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alert;
