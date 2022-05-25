import fs from 'fs'
import path from 'path'

function convertTxtToArrSync (relativePath:string): Array<number> {
  // /////// read the assignment txt file and convert it to array ////////////

  const p = path.resolve(__dirname, relativePath)
  console.log(p)

  const data = fs.readFileSync(p, { encoding: 'utf8' })

  const arr = data.split('\n').map(Number)
  return arr
}

export { convertTxtToArrSync }
