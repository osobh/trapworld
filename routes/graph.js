'use strict';
// Here we initialize our node and edges for the graph
var request = require('request');

function GraphEdge(to, from, toWeight, fromWeight) {
  this.to = to;
  this.from = from;
  this.edgeWeight =  toWeight - fromWeight;
}

function GraphNode(NWcorner, NEcorner, SWcorner, SEcorner, squareNum) {
  this.NWcorner = NWcorner;
  this.NEcorner = NEcorner;
  this.SWcorner = SWcorner;
  this.SEcorner = SEcorner;
  this.squareNum = squareNum;
  this.nodeWeight = 0;
}

var edgeWeights = {
  MURDER: 10,
  ASSAULT: 9,
  KIDNAPPING: 9,
  ROBBERY: 7,
  FRAUD: 6,
  DRUNKENNESS: 5,
  NARCOTICS : 3,
  'LARCENY/THEFT': 6,
  'NON CRIMINAL': 1,
  'DISORDERLY CONDUCT': 3,
  BURGLARY: 5,
  VANDALISM: 3,
  'SUSPICIOUS OCC': 3,
  'WEAPON LAWS': 4,
  TRESPASS: 3,
  WARRANTS: 2,
  ARSON: 6,
  'FORGERY/COUNTERFEITING': 1,
  'DRIVING UNDER THE INFLUENCE': 5,
  'SEX OFFENSES, FORCIBLE': 9

};
//This represents an undirected Graph
function Graph(NWCorner, NECorner, SWCorner, SECorner, gridSize) {
  var request = require('request');

  this.nodes = [];
  this.dayEdges = [];
  this.nightEdges = [];
  this.points = this.__createGrid(NWCorner, NECorner, SWCorner, SECorner, gridSize); //grid of 100x100
  // console.log(this.points, "POINTY POINTY")

  this.dayGrid = this.finalGridSquares();
  this.nightGrid = this.finalGridSquares();
  this.createEdgeWeights(this.dayGrid, this.dayEdges);
  this.createEdgeWeights(this.nightGrid, this.nightEdges);
}

  // Helper function to find a node in nodes
  Graph.prototype.findNode = function (value) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].value == value) {
        return this.nodes[i];
      }
    }
    return null;
  };


  // Add an edge between 2 nodes and give it a weight
  Graph.prototype.addEdge = function(top, bottom, left, right, weight) {
    var north = this.findNode(top);
    var south = this.findNode(bottom);
    var west = this.findNode(left);
    var east = this.findNode(right);
  };

  // Get the size of the graph by returning how many nodes are in the graph
  Graph.prototype.size = function() {
    return this.nodes.length;
  };

  // Find the total number of edges in the graph
  Graph.prototype.numEdges = function(edges) {
    return edges.length;
  };

  // Find the total weight of the graph by adding up the weights of each edge
  Graph.prototype.weight = function(edges) {
    let totalEdges = edges;
    let sum = 0;

    for (let i = 0; i < totalEdges.length; i++) {
      sum += totalEdges[i].weight;
    }
    return sum;
  };
  // Find all node values a node is connected to.
  // Return all node values at the other side of an edge of the target node
  // Remember that edges are not directional: A -> B also implies B -> A
  Graph.prototype.findNeighbors = function(value, edges) {
    // TODO
    let finalArr = [];
    let totalEdges = edges;
    for(let i = 0 ; i < totalEdges.length; i++){
      let firstEdge = edges[i].first.value;
      let secondEdge = edges[i].second.value;
      if(value === firstEdge){
        finalArr.push(secondEdge);
      }else if(value === secondEdge){
        finalArr.push(firstEdge);
      }
    }
    return finalArr;
  };

  Graph.prototype.backtrace = function(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
      node = node.parent;
      path.push([node.x, node.y]);
    }
    return path.reverse();
  };

  // Stretch!
  // Find the optimal route from start to finish
  // Return each edge required to traverse the route
  // Remember that edges are not directional: A -> B also implies B -> A
  // this.findPath = function(start, finish) {
  //   // TODO;
  // console.log(start);
  // let neighbors = this.findNeighbors(start);
  // console.log(neighbors);
  // return [];
  Graph.prototype.findPath = function(start, finish, edges) {
    // TODO
    var checked = [];
    let roadAhead = [{
      val: start,
      weight: 0,
      path: []
    }];
    while (roadAhead.length > 0) {
      roadAhead.sort((a,b) => {return a.weight - b.weight;});
      console.log(roadAhead);
      let currentQueue = roadAhead.shift();
      if (checked.indexOf(greedyFirst.val) === -1) {
        if (greedyFirst.val === finish) {
          return greedyFirst.path;
        }
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].first.value === greedyFirst.val) {
            let currentPath = greedyFirst.path.slice(0);
            currentPath.push(edges[i]);
            roadAhead.push({
              val: edges[i].second.value,
              weight: greedyFirst.weight + edges[i].weight,
              path: currentPath
            });
          } else if (edges[i].second.value === greedyFirst.val) {
            let currentPath = greedyFirst.path.slice(0);
            currentPath.push(edges[i]);
            roadAhead.push({
              val: edges[i].first.value,
              weight: greedyFirst.weight + edges[i].weight,
              path: currentPath
            });
          }
        }
        checked.push(greedyFirst.val);
      }
    }
  };

  // Return a list of any nodes that are orphans.
  // An orphan is any node with no edges.

  Graph.prototype.print = function(edges) {
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      console.log(edge.first.value, '->', edge.second.value, edge.weight, 'mi');
    }
  };

  Graph.prototype.pathWeight = function(path) {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
      sum += path[i].weight;
    }
    return sum;
  };



  Graph.prototype.findNodeToPlaceCrimeWeight = function(x, y, weight, squares){ //crime has lat and long & serverity in object form
    for (var i = 0; i < squares.length; i++){
      if((x > squares[i].NWcorner[1])&&(x < squares[i].NEcorner[1])&&(y>squares[i].SWcorner[0])&&(y<squares[i].NEcorner[0])){
        if(typeof weight === 'number'){
          squares[i].nodeWeight += weight;
          console.log(squares[i]);
          console.log(i);
        }
      }
    }
  }

  Graph.prototype.crimeWeight = function(crimeCategory){
    return edgeWeights[crimeCategory];
  }

  Graph.prototype.createEdgeWeights = function(squares, edges){
    for (var i = 0; i < squares.length; i++) {
      if(squares[i - 1]){
        let edge = new GraphEdge(squares[i], squares[i - 1], squares[i].nodeWeight, squares[i - 1].nodeWeight);
        edges.push(edge);
      }
      if(squares[i + 1]){
        let edge = new GraphEdge(squares[i], squares[i + 1], squares[i].nodeWeight, squares[i + 1].nodeWeight);
        edges.push(edge);
      }
      if(squares[i - 100]){
        let edge = new GraphEdge(squares[i], squares[i - 100], squares[i].nodeWeight, squares[i - 100].nodeWeight);
        edges.push(edge);
      }
      if(squares[i + 100]){
        let edge = new GraphEdge(squares[i], squares[i + 100], squares[i].nodeWeight, squares[i + 100].nodeWeight);
        edges.push(edge);
      }
    }
  }

  Graph.prototype.__createGrid = function(lat1, lon1, lat2, lon2, squareSide){
    let finalArr = [];
    let distanceBetweenLats = (lat2-lat1)/squareSide; // how many splices per row
    let distanceBetweenLongs = (lon2-lon1)/squareSide; // how many splices per column
    let pointNumber = 1; // starting from the top left
    for(let i = 0; i < squareSide; i++){
      var tempArr = []
      for(let j =  0; j < squareSide; j++){
        let distanceToNewLatPoint = lat1 + i*(distanceBetweenLats)
        let distanceToNewLongPoint = lon1 + j*(distanceBetweenLongs)
        let pointCoordinates = [distanceToNewLatPoint, distanceToNewLongPoint,  pointNumber];
        tempArr.push(pointCoordinates);
        pointNumber++;
      }
      finalArr.push(tempArr);
    }
    // console.log(finalArr, "SEE DEAD PEOPLE")
    return finalArr;
  };

  Graph.prototype.finalGridSquares = function(){ //puts grid via array of 4 points (also within the array, along with square number)
      var squares = [];
      var squareNum = 1;

      for (var i = 0; i < 100*100 - 100; i++) { // grid is *always* 100 X 100
        if(i % 100 !== 99){
          var node = new GraphNode(this.points[i], this.points[i + 1], this.points[i + 100], this.points[i + 101], squareNum);
          squareNum++;
          squares.push(node);
        }
      }
      return squares;
    }

    Graph.prototype.traverse = function(thisNode, nextNode) {
      for (node in )
    }

    Graph.prototype.pathfinder = function(start, end){
      var road = [];
      var currentSquare;
      var currentWeight;
      var minDistance = manhattanDistance(start, end);
      var weightMin = start.weight;
      while(currentSquare !== end){
        if(currentSquare.weight < next.weight){
          weightMin = currentWeight;
        }
        road.push(currentSquare);
      }
      return road;
    }

    Graph.prototype.manhattanDistance = function(node, goal){
        var dx = abs(node.x - goal.x);
        var dy = abs(node.y - goal.y);
        return (dx + dy);
      };

    Graph.prototype.getData = function(dataUrl, done){
      var info = [];
      var self = this
      //console.log(dataUrl)
      //Here we request the data from the URL we want to hit
      var final = request(dataUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          info.push(JSON.parse(body));
        }
        //Here we loop through the returned JSON file and provide an interface to extracting values from the entire dataset
        var nightCrime = [];
        var dayCrime = [];
        // console.log(info)
        for(let i = 0 ; i < info.length ; i++){
          var newData = (info[i]);
          // console.log(newData);
          for(let key in newData) {
            let obj = newData[key];
            // console.log(obj)
            let crimeTime = obj.time.split(":");
            let crimeCategory = obj.category;



            let exactCrimeTime =  parseInt(crimeTime[0]);
            if(exactCrimeTime <= 20 && exactCrimeTime >= 6 ){
              dayCrime.push(obj);
            }else{
              nightCrime.push(obj);
              // console.log("It's a night trap out there", exactCrimeTime)
            }
          }
        }
        for (let i = 0; i < dayCrime.length; i++) {
          let weight = self.crimeWeight(dayCrime[i].category);
          self.findNodeToPlaceCrimeWeight(dayCrime[i].x, dayCrime[i].y, weight, self.dayGrid);
          // console.log()
        }

        for (let i = 0; i < nightCrime.length; i++) {
          let weight = self.crimeWeight(nightCrime[i].category);
          self.findNodeToPlaceCrimeWeight(nightCrime[i].x, nightCrime[i].y, weight, self.nightGrid)
        }
        done();
      });
    };
  //---------------------------------------------------------------------------------
  // ----------------- This is where we create ou

  var trapGraph = new Graph(37.808179, -122.531204, 37.700398, -122.350273, 100);
  // console.log(trapGraph.nightGrid.slice(6800,6900))
//
//
//
//
//
//
//
var noScope = trapGraph.getData('https://data.sfgov.org/resource/9v2m-8wqu.json', function(){
    console.log(trapGraph.nightGrid.slice(2300,2400))
});
//write tests for
  // console.log(noScope)

  // console.log(trapGraph)



module.exports = {Graph, GraphNode, GraphEdge};
