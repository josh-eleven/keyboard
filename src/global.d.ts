/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
  ElectronAPI: { handleIpcKeyboardEvent: (callback: ElectronCallback) => void };
}

declare module '*.module.css' {
  const content: { [key: string]: string };
  export default content;
}
