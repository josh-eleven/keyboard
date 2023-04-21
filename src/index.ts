import { app, BrowserWindow } from 'electron';
import { GlobalKeyboardListener } from 'node-global-key-listener';
import { IpcKeyboardEvent } from './constant';
const path = require('path');

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow;
let globalKeyBoardListener: GlobalKeyboardListener;
let preloadUrl = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;

// clear store data in development mode
if (!app.isPackaged) {
  preloadUrl = 'http://localhost:3000/main_window/preload.js';

  console.log('---> ', path.join(__dirname, './src/preload.js'));
}

console.log('✔ MAIN_WINDOW_WEBPACK_ENTRY : ', MAIN_WINDOW_WEBPACK_ENTRY);
console.log(
  '✖ MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY : ',
  MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
);

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 916,
    webPreferences: {
      // 禁用 eval 和 inline-script，在 CSP 中不包含 'unsafe-eval' 和 'unsafe-inline' 选项
      nodeIntegration: true,
      contextIsolation: true,

      // 添加 Content Security Policy
      // 更多关于 CSP 的信息，请参考官方文档：https://electronjs.org/docs/tutorial/security#csp-meta-tag
      webSecurity: true,
      sandbox: true,

      // preload: path.join(__dirname, 'preload.js'),
      preload: preloadUrl,
    },
  });

  // if keyboard listener is not exist, should instance it
  if (!globalKeyBoardListener) {
    globalKeyBoardListener = new GlobalKeyboardListener();
    globalKeyBoardListener.addListener((e) => {
      if (e.state === 'UP') {
        const data = { name: e.name };

        console.log('onKey down ===>  ', JSON.stringify(data));
      }
      // if have mainWindow, tell renderer draw
      if (mainWindow) {
        mainWindow.webContents.send(IpcKeyboardEvent, e);
      }
    });
  }

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!app.isPackaged) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  console.log('window-all-closed');
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
