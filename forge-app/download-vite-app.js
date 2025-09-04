import fs from "fs";
import { Readable } from "stream";

export const downloadViteApp = async () => {
  const url = 'https://github.com/brsantos197/electron-migrate/releases/download/v1.0.0/vite-app-1.0.0-setup.exe';
  const path = "./vite-app-setup.exe";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro no download: ${response.status}`);
  }

  // converte o Web Stream para Node Stream
  const nodeStream = Readable.fromWeb(response.body);

  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    nodeStream.pipe(fileStream);
    nodeStream.on("error", reject);
    fileStream.on("finish", resolve);
  });

  console.log("Download concluído!");
}
