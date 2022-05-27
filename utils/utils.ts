import fs, { PathLike } from 'fs'
import Graph, { Edge } from '../Karger-algorithm/karger-algorithm'

function convertTxtToArrSync (path:PathLike): Array<number> {
  // /////// read the assignment txt file and convert it to array ////////////

  const data = fs.readFileSync(path, { encoding: 'utf8' })

  const arr = data.split('\n').map(Number)
  return arr
}

function convertTxtToGraphSync (path: PathLike): Graph {
  const data = fs.readFileSync(path, { encoding: 'utf8' })
  const arrs = data.split('\n').map((arr) => arr.split('\t').map(Number))
  const graph = new Graph([], [])
  // console.log(` arrs before pushing vertices ${arrs}`);

  // push vertices to graph
  for (const arr of arrs) {
    const v = arr.splice(0, 1)
    graph.vertices.push(v[0])
  }
  // console.log("arrs after pushing vertices ", arrs);

  // push edges to graph
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i]

    for (const element of arr) {
      // console.log("element is ", element);
      // because I don't want repeated edges...
      // assuming there is no parallel edges at the original graph
      if (element > i + 1) {
        const edge:Edge = [i + 1, element]
        graph.edges.push(edge)
      }
    }
  }
  return graph
}
export { convertTxtToArrSync, convertTxtToGraphSync }
