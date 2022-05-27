/**
 * Graph class with vertices and edges
 */
import path from 'path'
import { convertTxtToGraphSync } from '../utils/utils'

type Edge = [number, number]
type Edges = Array<Edge>
type Vertices = Array<number>

class Graph {
  vertices: Vertices
  edges: Edges
  // assume vertices are sorted ascendingly

  constructor (vertices :Vertices, edges :Edges) {
    this.vertices = vertices
    this.edges = edges
  }

  /**
   * method to return index of randomly choosen edge
   * @return index of random chosen edge
   */
  chooseRandomEdge () {
    const eIndex = Math.floor(Math.random() * this.edges.length)
    return eIndex
  }

  /**
   * method to contract the choosen edge

                            psoudocode of contract algorithm
Input: a graph G = (V, E) of V vertices and E edges and choosen edge e
Postcondition: edge is contracted with deleted self loops
Output: new graph with contracted edge
-----------------------------------------------------------------------
contract(G=(V,E)):

while |V| > 2 then:
    choose e ∈ E uniformly at random
    G <= G/e

return modified G
   *
   * @param {Number} choosenEdgeIndex
   */
  conractEdge (choosenEdgeIndex:number) {
    // let v1 and v2 are the vertices of the contracted edge
    const [v1, v2] = this.edges[choosenEdgeIndex]
    const v3 = this.vertices[this.vertices.length - 1] + 1

    // delete v1 , v2 from vertices
    let index = this.vertices.indexOf(v1)
    if (index !== -1) {
      this.vertices.splice(index, 1)
    }
    index = this.vertices.indexOf(v2)
    if (index !== -1) {
      this.vertices.splice(index, 1)
    }

    // push v3 into vertices
    this.vertices.push(v3)

    // replace v1 and v2 by v3 in edges of the graph
    for (const edge of this.edges) {
      if (edge[0] === v1 || edge[0] === v2) {
        edge[0] = v3
      }
      if (edge[1] === v1 || edge[1] === v2) {
        edge[1] = v3
      }
    }
  }

  /**
   * delete self loops
   * (a self loop is an edge with the same vertex on both source and destination vertices)
   */
  deleteSelfLoops () {
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i]
      if (edge[0] === edge[1]) {
        this.edges.splice(i, 1)
      }
    }
  }

  /**

                                  psoudocode of kargers algorithm
      Input: a graph G = (V, E) of V vertices and E edges
      Postcondition: Two vertices left
      Output: only Cut left in G
      ----------------------------------------------------------------------
      contract(G=(V,E)):

      while |V| > 2 then:
          choose e ∈ E uniformly at random
          G <= G/e

      return the only cut in G

   *
   * @return edges length
   */
  karger () {
    while (this.vertices.length > 2) {
      const randomEdgeI = this.chooseRandomEdge()
      this.conractEdge(randomEdgeI)
      this.deleteSelfLoops()
    }
    this.deleteSelfLoops()

    return this.edges.length
  }
}

export default Graph
export { Edge }

const p = path.join(__dirname, '/graph.txt')

const graph = convertTxtToGraphSync(p)
// karger algorithm has a very low probability of finding the min cut
// but it has a good change of finding the min cut after repeating the algorithm serveral times
// and saving the results in a memory (array) to get the minimum result in it
// here i am using just an estimate for number of repeats
const minCutMemory = []
const num = graph.edges.length ** 2
for (let i = 0; i < num; i++) {
  // start karger
  const minCut = graph.karger()
  minCutMemory.push(minCut)
}
const min = minCutMemory.reduce((acc: number, val: number) => Math.min(acc, val), Infinity)

// console.log(Math.min(...minCutMemory))
console.log(min)
