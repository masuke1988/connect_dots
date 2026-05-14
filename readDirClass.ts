import fs from 'fs'
// import path from 'path'

class readDirClass {
  /**
   * 特定のフォルダ以下のパスを再起的に取得する。getDirRecursivelyの中で使用する
   * @param {String} dir
   * @returns {Array} readdir
   */
  getChildrenRecursively(dir) {
    const readdir = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .filter((d) => d.name !== 'ts' && d.name !== 'scss' && d.name !== 'components' && d.name !== 'public')

    let paths = [dir];

    if (readdir.length !== 0) {
      const subDirs = readdir
        .map((p) => this.getChildrenRecursively(`${dir}/${p.name}`))
        .flat();
      paths = paths = [...paths, ...subDirs];
    }

    return paths;
  }

  /**
   * getChildrenRecursivelyで取得したディレクトリをまとめる
   * @param {*} dir
   * @returns
   */
  getDirRecursively(dir) {
    return this.getChildrenRecursively(dir);
  }
}

export default readDirClass