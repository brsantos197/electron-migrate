import { execFile } from "child_process";

export function installNewApp(installerPath) {
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
