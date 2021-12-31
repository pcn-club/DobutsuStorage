import { DobutsuStorage } from "./DobutsuStorage.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { DobutsuCode } from "https://pcn-club.github.io/DobutsuCode/DobutsuCode.js";
import { DataStorage } from "./DataStorage.js";

const path = "dobutsu_storage";
const dstorage = new DataStorage(path);

// random map
const map = CBOR.decode(await Deno.readFile("randomlist.cbor"));
const revmap = [];
for (let i = 0; i < map.length; i++) {
  revmap[map[i]] = i;
}

class DobutsuStorageImpl extends DobutsuStorage {
  async append(bin) {
    const n = await dstorage.append(bin);
    const m = map[n];
    return DobutsuCode.encode(m, 3);
  }
  async load(code) {
    const m = DobutsuCode.decode(code);
    const n = revmap[m];
    return await dstorage.load(n);
  }
}

export { DobutsuStorageImpl };
