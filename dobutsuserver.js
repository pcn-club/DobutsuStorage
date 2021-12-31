import { Server } from "https://js.sabae.cc/Server.js";
import { DobutsuStorageImpl } from "./DobutsuStorageImpl.js";
import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

const dstorage = new DobutsuStorageImpl();

class DobutsuServer extends Server {
  constructor(port) {
    super(port);
  }
  async api(path, req) {
    if (path == "/api/append") {
      const p = Base64.decode(req.program);
      return await dstorage.append(p);
    } else if (path == "/api/load") {
      const code = req.code;
      const bin = await dstorage.load(code);
      return bin ? Base64.encode(bin) : null;
    }
  }
}

new DobutsuServer(parseInt(Deno.args[0]));
