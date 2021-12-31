import { IndexFile } from "./IndexFile.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const limit = 100 * 100 * 100;

class DataStorage {
  constructor(path) {
    this.path = path;
    const idxfn = path + "/idx.json";
    this.idx = new IndexFile(idxfn);
  }
  makePath(idx) {
    const fn = fix0(idx, 6);
    const dir = this.path + "/" + fn.substring(0, 3);
    return dir + "/" + fn;
  };
  async writeData(idx, bin) {
    const fn = this.makePath(idx);
    await Deno.mkdir(fn.substring(0, fn.lastIndexOf("/")), { recursive: true });
    await Deno.writeFile(fn, bin);
    return idx;
  };
  async readData(idx) {
    const fn = await this.makePath(idx);
    try {
      return await Deno.readFile(fn)
    } catch (e) {
    }
    return null;
  }
  async append(bin) {
    const n = await this.idx.inc();
    if (n >= limit) {
      return -1; // full
    }
    return await this.writeData(n, bin);
  }
  async load(idx) {
    return await this.readData(idx);
  }
}

export { DataStorage };
