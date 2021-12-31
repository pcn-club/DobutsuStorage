import * as t from "https://deno.land/std/testing/asserts.ts";
import { DobutsuStorageImpl } from "./DobutsuStorageImpl.js";
import { DobutsuStorageClient } from "./DobutsuStorageClient.js";

const endpoint = "http://localhost:6109/api/";
const dstorage = new DobutsuStorageClient(endpoint);
//const dstorage = new DobutsuStorageImpl();

const test1 = new Uint8Array(1024);
for (let i = 0; i < test1.length; i++) {
  test1[i] = i;
}

Deno.test("append", async () => {
  const code = await dstorage.append(test1);
  console.log(code);
  t.assertEquals(typeof code, "string");
});
Deno.test("load", async () => {
  const code = await dstorage.append(test1);
  //t.assertEquals(typeof code, "string");
  const x = await dstorage.load(code);
  t.assertEquals(x, test1);
});
Deno.test("can't load", async () => {
  const x = await dstorage.load("ゾウ ゾウ ゾウ");
  t.assertEquals(x, null);
});
