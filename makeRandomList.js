import { shuffle } from "https://js.sabae.cc/shuffle.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const n = [];
const len = 100 * 100 * 100;
for (let i = 0; i < len; i++) {
  n[i] = i;
}
shuffle(n);

console.log(n);
await Deno.writeFile("randomlist.cbor", CBOR.encode(n));
