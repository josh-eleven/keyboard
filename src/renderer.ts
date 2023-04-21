import { IGlobalKeyEvent } from 'node-global-key-listener';
import './views/index.tsx';

console.log('renderer', 1234);

window.ElectronAPI.handleIpcKeyboardEvent(
  (_: Electron.IpcRendererEvent, data: IGlobalKeyEvent) => {
    console.log('123 =>', data);
  }
);

console.log('renderer', 123);
