const readJSON = async (fn) => JSON.parse(await Deno.readTextFile(fn));
const writeJSON = async (fn, json) => await Deno.writeTextFile(fn, JSON.stringify(json));

class IndexFile {
  constructor(idxfn) {
    this.idxfn = idxfn;
  }
  async inc() {
    let n = 0;
    try {
      n = await readJSON(this.idxfn) + 1;
    } catch (e) {
    }
    await writeJSON(this.idxfn, n);
    return n;
  }
}

export { IndexFile };
