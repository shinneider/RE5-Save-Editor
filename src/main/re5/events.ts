import { ipcMain, dialog } from 'electron';
import { Re5SteamSaveEditor } from './hack';

const gameHack = new Re5SteamSaveEditor();

ipcMain.on('save', async (event, arg: string) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Select path to store your RE5 Save',
    defaultPath: 'C:\\Program Files (x86)\\Steam\\userdata\\53188471\\21690\\remote\\savedata.bin'
  });

  if(!canceled && filePath !== undefined) {
    gameHack.save(filePath)
  }
});

ipcMain.handle('open-save', async (event, arg: any) => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'Select Your RE5 Save',
      defaultPath: 'C:\\Program Files (x86)\\Steam\\userdata\\53188471\\21690\\remote\\savedata.bin',
      filters: [
        { name: 'BIN', extensions: ['bin'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      properties: ['openFile', 'showHiddenFiles'],
    });

    if (!canceled) {
      gameHack.open(filePaths[0]);
      return true;
    }
  } catch (error) {}

  return false;
});

// //////
// // Basic Data
// ////

ipcMain.handle('get-steam_id', async (event, arg) => gameHack.getSteamId());
ipcMain.on('set-steam_id', async (event, arg: string) => gameHack.setSteamId(BigInt(arg)));

ipcMain.handle('get-save_date', async (event, arg) => gameHack.getSaveDate());
ipcMain.on('set-save_date', async (event, arg: string) => gameHack.setSaveDate(new Date(arg)));

ipcMain.handle('get-save_checksum', async (event, arg) => gameHack.getSaveFileChecksum());
ipcMain.handle('get-file_checksum', async (event, arg) => gameHack.getRealChecksum());

// //////
// // Bonus Feature
// ////

ipcMain.handle('get-chris_costumes_choices', (event, arg) => gameHack.getChrisCostumesChoices());
ipcMain.handle('get-chris_costumes', (event, arg) => gameHack.getChrisCostumes());
ipcMain.on('set-chris_costumes', (event, arg) => gameHack.setChrisCostumes(arg));

ipcMain.handle('get-sheva_costumes_choices', (event, arg) => gameHack.getShevaCostumesChoices());
ipcMain.handle('get-sheva_costumes', (event, arg) => gameHack.getShevaCostumes());
ipcMain.on('set-sheva_costumes', (event, arg) => gameHack.setShevaCostumes(arg));

ipcMain.handle('get-screen_filters_choices', (event, arg) => gameHack.getScreenFiltersChoices());
ipcMain.handle('get-screen_filters', (event, arg) => gameHack.getScreenFilters());
ipcMain.on('set-screen_filters', (event, arg) => gameHack.setScreenFilters(arg));

ipcMain.handle('get-inf_ammo_weapons_choices', (event, arg) => gameHack.getInfAmmoWeaponsChoices());
ipcMain.handle('get-inf_ammo_weapons', (event, arg) => gameHack.getInfAmmoWeapons());
ipcMain.on('set-inf_ammo_weapons', (event, arg) => gameHack.setInfAmmoWeapons(arg));

// //////
// // Game Library
// ////

ipcMain.handle('get-game_files_choices', (event, arg) => gameHack.getGameFilesChoices());
ipcMain.handle('get-game_files', (event, arg) => gameHack.getGameFiles());
ipcMain.on('set-game_files', (event, arg) => gameHack.setGameFiles(arg));

ipcMain.handle('get-game_figures_choices', (event, arg) => gameHack.getGameFiguresChoices());
ipcMain.handle('get-game_figures', (event, arg) => gameHack.getGameFigures());
ipcMain.on('set-game_figures', (event, arg) => gameHack.setGameFigures(arg));


// //////
// // Game Stats
// ////

ipcMain.handle('get-play_time', (event, arg) => gameHack.getPlayTime());
ipcMain.on('set-play_time', (event, arg: number) => gameHack.setPlayTime(Number(arg)));

ipcMain.handle('get-rescue_times', (event, arg) => gameHack.getRescueTimes());
ipcMain.on('set-rescue_times', (event, arg: number) => gameHack.setRescueTimes(Number(arg)));

ipcMain.handle('get-rescued_times', (event, arg) => gameHack.getRescuedTimes());
ipcMain.on('set-rescued_times', (event, arg: number) => gameHack.setRescuedTimes(Number(arg)));

ipcMain.handle('get-save_from_dying', (event, arg) => gameHack.getSaveFromDying());
ipcMain.on('set-save_from_dying', (event, arg: number) => gameHack.setSaveFromDying(Number(arg)));

ipcMain.handle('get-saved_from_dying', (event, arg) => gameHack.getSavedFromDying());
ipcMain.on('set-saved_from_dying', (event, arg: number) => gameHack.setSavedFromDying(Number(arg)));

// //////
// // Weapon Stats
// ////

ipcMain.handle('get-weapons_stats', (event, arg) => {
  console.log(1111, gameHack.getWeaponsAvailable())
  console.log(1111, gameHack.getWeaponsStats(0))
  return 1
});

// //////
// // Game Iventory
// ////

ipcMain.handle('get-money', (event, arg) => gameHack.getMoney());
ipcMain.on('set-money', (event, arg: number) => gameHack.setMoney(Number(arg)));

ipcMain.handle('get-points', (event, arg) => gameHack.getPoints());
ipcMain.on('set-points', (event, arg: number) => gameHack.setPoints(Number(arg)));
