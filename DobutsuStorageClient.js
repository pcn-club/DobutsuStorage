import { DobutsuStorage } from "./DobutsuStorage.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

class DobutsuStorageClient extends DobutsuStorage {
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }
  async append(bin) {
    return await fetchJSON(this.endpoint + "append", { program: Base64.encode(bin) });
  }
  async load(code) {
    const bin = await fetchJSON(this.endpoint + "load", { code });
    return bin ? Base64.decode(bin) : null;
  }
}

export { DobutsuStorageClient };
