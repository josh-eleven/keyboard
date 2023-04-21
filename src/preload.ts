/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import Electron, { contextBridge, ipcRenderer } from 'electron';
import { IpcKeyboardEvent } from './constant';

type ElectronCallback = (
  event: Electron.IpcRendererEvent,
  ...args: any[]
) => void;

export const ElectronAPI = {
  handleIpcKeyboardEvent: (callback: ElectronCallback) =>
    ipcRenderer.on(IpcKeyboardEvent, callback),
};

contextBridge.exposeInMainWorld('ElectronAPI', ElectronAPI);
