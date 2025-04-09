// types/react-native-toast-message.d.ts
declare module 'react-native-toast-message' {
  import React from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export type ToastType = 'success' | 'error' | 'info';

  export interface ToastConfigParams {
    text1?: string;
    text2?: string;
    props?: any;
  }

  export interface ToastConfig {
    success?: (params: ToastConfigParams) => React.ReactNode;
    error?: (params: ToastConfigParams) => React.ReactNode;
    info?: (params: ToastConfigParams) => React.ReactNode;
    [key: string]: any;
  }

  export interface ToastProps {
    config?: ToastConfig;
    ref?: React.Ref<any>;
    style?: ViewStyle;
    text1Style?: TextStyle;
    text2Style?: TextStyle;
  }

  export const show: (options: {
    type: ToastType | string;
    text1?: string;
    text2?: string;
    position?: 'top' | 'bottom';
    visibilityTime?: number;
    autoHide?: boolean;
    topOffset?: number;
    bottomOffset?: number;
    props?: any;
  }) => void;

  export const hide: () => void;

  declare const Toast: React.FC<ToastProps>;
  export default Toast;
}