import * as fs from 'fs';
import { Buffer } from 'buffer';
import { allGameGuns, allGameFiles, allGameFigures } from './constants';
import { getWeaponsFromBuffer } from './weaponsUtils'


export class RE5SaveBase {
  static  magic: Buffer = Buffer.from([0x00, 0x21, 0x11, 0x08, 0xc0, 0x4b, 0x00, 0x00]);

  static xor = (data: Buffer, key: Buffer) => data.map((e, index) => e ^ key[index]);

  static readFile = (dir: fs.PathOrFileDescriptor) => fs.readFileSync(dir);

  static writeFile = (dir: fs.PathOrFileDescriptor, buffer: Buffer) =>
    fs.writeFileSync(dir, buffer, 'binary');

  static decodeSaveData(buffer: Buffer) {
    let outputFile = Buffer.from([]);
    let key = this.magic;

    for (let i = 0; i < buffer.length / 8; i += 1) {
      const encodedData = buffer.subarray(i * 8, (i + 1) * 8);
      const decodedData = this.xor(encodedData, key);
      outputFile = Buffer.concat([outputFile, decodedData]);
      key = encodedData;
    }

    return outputFile;
  }

  static encodeSaveData(buffer: Buffer) {
    let outputFile = Buffer.from([]);
    let key = this.magic;

    for (let i = 0; i < buffer.length / 8; i += 1) {
      const decodedData = buffer.subarray(i * 8, (i + 1) * 8);
      const encodedData = this.xor(decodedData, key);
      outputFile = Buffer.concat([outputFile, encodedData]);
      key = encodedData;
    }

    return outputFile;
  }

  static checkSum = (fin: Buffer, seekpos: number, iters: number, ret: number) => {
    for (let i = 0; i < iters; i += 1) {
      const b = fin.readUIntLE(seekpos + i * 4, 4);
      ret = (ret + b) % 2 ** 32;
    }
    return ret;
  };

  static calculateChecksum(buffer: Buffer) {
    const firstCheckSum = this.checkSum(buffer, 0x10, 0xee7, 0);
    return this.checkSum(buffer, 0x3bb0, 0x5c0, firstCheckSum);
  }
}

export class Re5SteamSaveEditor {
  savePath: fs.PathOrFileDescriptor = ""
  saveBuffer: Buffer = Buffer.from([])

  open = (dir: fs.PathOrFileDescriptor) => {
    this.savePath = dir
    this.saveBuffer = RE5SaveBase.decodeSaveData(RE5SaveBase.readFile(dir))
  }
  save(dir: fs.PathOrFileDescriptor) {
      this.setSaveFileChecksum(RE5SaveBase.calculateChecksum(this.saveBuffer))
      const encodedData = RE5SaveBase.encodeSaveData(this.saveBuffer)
      RE5SaveBase.writeFile(dir, encodedData)
  }

  getUInt = (offset: number, byteLength: number) => this.saveBuffer.slice(offset, offset+byteLength)
  getUInt8 = (offset: number) => this.saveBuffer.readUInt8(offset)
  getUInt64 = (offset: number) => this.saveBuffer.readBigUInt64LE(offset)
  setUInt64 = (offset: number, value: bigint) => this.saveBuffer.writeBigInt64LE(value, offset)
  getUInt32 = (offset: number) => this.saveBuffer.readUInt32LE(offset)
  setUInt32 = (offset: number, value: number) => this.saveBuffer.writeUInt32LE(value, offset)

  getSteamId = () => this.saveBuffer.readBigInt64LE(0x0)
  setSteamId = (steamId: bigint) => this.saveBuffer.writeBigInt64LE(steamId, 0x0)

  getSaveFileChecksum = () => this.getUInt32(0x8)
  setSaveFileChecksum = (checksum: number) => this.setUInt32(0x8, checksum)
  getRealChecksum = () => RE5SaveBase.calculateChecksum(this.saveBuffer)

  getSaveDate() {
    const date = `${this.getUInt32(0x10)}-${this.getUInt32(0x14)}-${this.getUInt32(0x18)}`
    const hours = `${this.getUInt32(0x1c)}:${this.getUInt32(0x20)}:${this.getUInt32(0x24)}`
    return new Date(`${date}T${hours}`)
  }

  setSaveDate(date: Date) {
    this.setUInt32(0x10, date.getFullYear()) &&  this.setUInt32(0x14, date.getMonth()) &&  this.setUInt32(0x18, date.getDate())
    this.setUInt32(0x1c, date.getHours()) &&  this.setUInt32(0x20, date.getMinutes()) &&  this.setUInt32(0x24, date.getSeconds())
  }

  getMoney = () => this.getUInt32(0x194)
  setMoney = (value: number) => this.setUInt32(0x194, value)

  getPoints = () => this.getUInt32(0x198)
  setPoints = (value: number) => this.setUInt32(0x198, value)

  getChoicesHelper = (choices: Array<string>, value: number | bigint) => {
    const binary = value.toString(2);
    return choices.filter((_, index) => binary[index] == '1')
  }

  setChoicesHelper = (choices: Array<string>, value: Array<string>) => {
    const reducFunc = (prev: string, curr: string) => {
      const indexPos = choices.indexOf(curr)
      return indexPos !== -1 ? prev.substring(0, indexPos) + '1' + prev.substring(indexPos + 1) : prev
    };

    return value.reduce(reducFunc, '0'.padStart(choices.length, '0'))
  };

  getChrisCostumesChoices = () => ['warrior', 'stars', 'safari', 'bsaa']
  getChrisCostumes = () => this.getChoicesHelper(this.getChrisCostumesChoices(), this.getUInt32(0x124))
  setChrisCostumes = (value: Array<string>) => this.setUInt32(0x124, parseInt(this.setChoicesHelper(this.getChrisCostumesChoices(), value), 2))

  getShevaCostumesChoices = () => ['business', 'tribal', 'clubbin', 'bsaa']
  getShevaCostumes = () => this.getChoicesHelper(this.getShevaCostumesChoices(), this.getUInt32(0x128))
  setShevaCostumes = (value: Array<string>) => this.setUInt32(0x128, parseInt(this.setChoicesHelper(this.getShevaCostumesChoices(), value), 2))

  getScreenFiltersChoices = () => ['noise', 'retro', 'classic', 'default']
  getScreenFilters = () => this.getChoicesHelper(this.getScreenFiltersChoices(), this.getUInt32(0x12c))
  setScreenFilters = (value: Array<string>) => this.setUInt32(0x12c, parseInt(this.setChoicesHelper(this.getScreenFiltersChoices(), value), 2))

  getInfAmmoWeaponsChoices = () => allGameGuns
  getInfAmmoWeapons = () => this.getChoicesHelper(allGameGuns, this.getUInt32(0x130))
  setInfAmmoWeapons = (value: Array<string>) => this.setUInt32(0x130, parseInt(this.setChoicesHelper(allGameGuns, value), 2))

  getGameFilesChoices = () => allGameFiles
  getGameFiles = () => this.getChoicesHelper(this.getGameFilesChoices(), this.getUInt32(0x134))
  setGameFiles = (value: Array<string>) => this.setUInt32(0x134, parseInt(this.setChoicesHelper(allGameFiles, value), 2))

  getGameFiguresChoices = () => allGameFigures
  getGameFigures = () => this.getChoicesHelper(allGameFigures, this.getUInt64(0x138))
  setGameFigures = (value: Array<string>) => this.setUInt64(0x138, BigInt('0b' + this.setChoicesHelper(allGameFigures, value)))

  // //////
  // // Game Stats
  // ////

  getPlayTime = () => this.getUInt32(0x18c)
  setPlayTime = (value: number) => this.setUInt32(0x18c, value)

  getRescueTimes = () => this.getUInt32(0x1d4)
  setRescueTimes = (value: number) => this.setUInt32(0x1d4, value)

  getRescuedTimes = () => this.getUInt32(0x1d8)
  setRescuedTimes = (value: number) => this.setUInt32(0x1d8, value)

  getSaveFromDying = () => this.getUInt32(0x1e4)
  setSaveFromDying = (value: number) => this.setUInt32(0x1e4, value)

  getSavedFromDying = () => this.getUInt32(0x1e8)
  setSavedFromDying = (value: number) => this.setUInt32(0x1e8, value)

  // //////
  // // Weapon Stats
  // ////

  getWeaponsAvailable = () => this.getUInt8(0x148)
  getWeaponsStats = (weaponNumber: number) => getWeaponsFromBuffer(this.getUInt(0x1f8 + (weaponNumber*40), 40))

}
