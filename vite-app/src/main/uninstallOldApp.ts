import { dialog } from 'electron'
import { execFile } from 'node:child_process'
import path from 'node:path'

export const uninstallOldApp = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const updateExe = path.join(process.env.LOCALAPPDATA!, 'forge_app', 'Update.exe')

    execFile(updateExe, ['--uninstall'], (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao desinstalar:', stderr)
        return reject(error)
      }
      dialog.showMessageBox({
        type: 'info',
        title: 'Desinstalação concluída',
        message: 'A versão antiga do aplicativo foi desinstalada com sucesso.'
      })

      console.log('Desinstalado com sucesso:', stdout)
      resolve()
    })
  })
}
