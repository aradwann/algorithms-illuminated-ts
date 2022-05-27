import fs, { PathLike } from 'fs'

function convertTxtToArrSync (path:PathLike): Array<number> {
  // /////// read the assignment txt file and convert it to array ////////////

  const data = fs.readFileSync(path, { encoding: 'utf8' })

  const arr = data.split('\n').map(Number)
  return arr
}

export { convertTxtToArrSync }
