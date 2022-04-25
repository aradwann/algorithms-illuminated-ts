/*
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
*/

/*
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
*/

class Graph {
  // assume vertices are sorted ascendingly
  constructor(vertices = [], edges = []) {
    this.vertices = vertices;
    this.edges = edges;
  }

  // method to return index of randomly choosen edge
  chooseRandomEdge() {
    const eIndex = Math.floor(Math.random() * this.edges.length);
    return eIndex;
  }

  // method to contract the choosen edge
  conractEdge(choosenEdgeIndex) {
    // let v1 and v2 are the vertices of the contracted edge
    const [v1, v2] = this.edges[choosenEdgeIndex];
    const v3 = this.vertices[this.vertices.length - 1] + 1;

    // delete v1 , v2 from vertices
    let index = this.vertices.indexOf(v1);
    if (index !== -1) {
      this.vertices.splice(index, 1);
    }
    index = this.vertices.indexOf(v2);
    if (index !== -1) {
      this.vertices.splice(index, 1);
    }

    // push v3 into vertices
    this.vertices.push(v3);

    // replace v1 and v2 by v3 in edges of the graph
    for (const edge of this.edges) {
      if (edge[0] === v1 || edge[0] === v2) {
        edge[0] = v3;
      }
      if (edge[1] === v1 || edge[1] === v2) {
        edge[1] = v3;
      }
    }
  }

  // delete self loops
  // (a self loop is an edge with the same vertex on both source and destination vertices)
  deleteSelfLoops() {
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i];
      if (edge[0] === edge[1]) {
        this.edges.splice(i, 1);
      }
    }
  }

  karger() {
    while (this.vertices.length > 2) {
      const randomEdgeI = this.chooseRandomEdge();
      this.conractEdge(randomEdgeI);
      this.deleteSelfLoops();
    }
    this.deleteSelfLoops();

    return this.edges.length;
  }
}

const fs = require("fs");

fs.readFile(`${__dirname}/graph.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const arrs = data.split("\n").map((arr) => arr.split("\t").map(Number));
  const graph = new Graph();
  // console.log(` arrs before pushing vertices ${arrs}`);

  // push vertices to graph
  for (const arr of arrs) {
    const v = arr.splice(0, 1);
    graph.vertices.push(v[0]);
  }
  // console.log("arrs after pushing vertices ", arrs);

  // push edges to graph
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i];

    for (const element of arr) {
      // console.log("element is ", element);
      // because I don't want repeated edges...
      // assuming there is no parallel edges at the original graph
      if (element > i + 1) {
        const edge = [i + 1, element];
        graph.edges.push(edge);
      }
    }
  }
  // karger algorithm has a very low probability of finding the min cut
  // but it has a good change of finding the min cut after repeating the algorithm serveral times
  // and saving the results in a memory (array) to get the minimum result in it
  // here i am using just an estimate for number of repeats
  const minCutMemory = [];
  const num = graph.edges.length;
  for (let i = 0; i < num; i++) {
    // start karger
    const minCut = graph.karger();
    minCutMemory.push(minCut);
  }
  console.log(Math.min(...minCutMemory));
});
