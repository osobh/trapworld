'use strict';

let expect = require('chai').expect;
let {Graph, GraphEdge, GraphNode} = require('../routes/graph.js');

console.log(GraphNode)

describe('GraphNode', function() {
  var testGraphNode = new GraphNode(
    [37.808179, -122.531204],
    [37.700398, -122.350273],
    [37.807101190000004, -122.531204],
    [37.807101190000004, -122.52939469],
    100);
  it('should return a new node with correct properties', function() {
    expect(testGraphNode.NWcorner).to.deep.equal([37.808179, -122.531204]);
    expect(testGraphNode.NEcorner).to.deep.equal([37.700398, -122.350273]);
    expect(testGraphNode.SWcorner).to.deep.equal([37.807101190000004, -122.531204]);
    expect(testGraphNode.SEcorner).to.deep.equal([37.807101190000004, -122.52939469]);
    expect(testGraphNode.squareNum).to.deep.equal(100);
  });

});

describe('Graph.createGrid', function(){
  var testGraph = new Graph(3, 0, 0, 3, 3);
  it('should create the grid based off properties passed in', function(){
    console.log(testGraph.__createGrid(3, 0, 0, 3, 3), 'TESTY GRAPHY')
    expect(testGraph.__createGrid(3, 0, 0, 3, 3)).to.deep.equal([
      [ 3, 0, 1 ],
      [ 3, 1, 2 ],
      [ 3, 2, 3 ],
      [ 2, 0, 4 ],
      [ 2, 1, 5 ],
      [ 2, 2, 6 ],
      [ 1, 0, 7 ],
      [ 1, 1, 8 ],
      [ 1, 2, 9 ]
    ])
  })
})
