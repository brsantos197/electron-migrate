import { downloadViteApp } from "./download-vite-app";
import { app, dialog } from "electron";
import { execFile } from "node:child_process";
import path from "path";

function uninstallOldApp(appName) {
  return new Promise((resolve, reject) => {
    const updateExe = path.join(
      process.env.LOCALAPPDATA,
      appName.replace('-', '_'),
      "Update.exe"
    );

    execFile(updateExe, ["--uninstall"], (error, stdout, stderr) => {
      if (error) {
        console.error("Erro ao desinstalar:", stderr);
        return reject(error);
      }
      console.log("Desinstalado com sucesso:", stdout);
      resolve();
    });
  });
}

function installNewApp(installerPath) {
  return new Promise((resolve, reject) => {
    execFile(installerPath, [], (error, stdout, stderr) => {
      if (error) {
        console.error("Erro ao instalar:", stderr);
        return reject(error);
      }
      console.log("Instalado com sucesso:", stdout);
      resolve();
    });
  });
}
export async function migrateApp() {
  try {
    await downloadViteApp();

    console.log("Instalando versão nova...");

    await dialog.showMessageBox({
      type: 'info',
      title: 'Nova versão disponível',
      message: 'Seu aplicativo está desatualizado, uma nova versão será instalada.',
    });

    await installNewApp("./vite-app-setup.exe");

    console.log("Desinstalando versão antiga...");
    await uninstallOldApp(app.name);



    console.log("Migração concluída!");
  } catch (err) {
    console.error("Erro durante migração:", err);
  }
}

