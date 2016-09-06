'use strict';
// Here we initialize our node and edges for the graph
var request = require('request');

function GraphEdge(to, from, toWeight, fromWeight) {
  this.to = to;
  this.from = from;
  this.edgeWeight =  toWeight - fromWeight;
}

function GraphSquare(NWcorner, NEcorner, SWcorner, SEcorner, squareNum, x, y) {
  this.NWcorner = NWcorner;
  this.NEcorner = NEcorner;
  this.SWcorner = SWcorner;
  this.SEcorner = SEcorner;
  this.squareNum = squareNum;
  this.nodeWeight = 0;
  this.x = x;
  this.y = y;
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
  this.grid = this.createGrid(NWCorner, NECorner, SWCorner, SECorner, gridSize); //grid of 100x100
  // console.log(this.points, "POINTY POINTY")
  this.dimension = gridSize;
  this.dayGrid = this.grid;
  this.nightGrid = this.grid;
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
  Graph.prototype.addEdge = function(top, bottom, left, right, weight) { //would this work if I'm already on the top or bottom of the map?
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
  // Graph.prototype.findNeighbors = function(value, edges) {
  //   // TODO
  //   let finalArr = [];
  //   let totalEdges = edges;
  //   for(let i = 0 ; i < totalEdges.length; i++){
  //     let firstEdge = edges[i].first.value;
  //     let secondEdge = edges[i].second.value;
  //     if(value === firstEdge){
  //       finalArr.push(secondEdge);
  //     }else if(value === secondEdge){
  //       finalArr.push(firstEdge);
  //     }
  //   }
  //   return finalArr;
  // };

  // Graph.prototype.backtrace = function(node) {
  //   var path = [[node.x, node.y]];
  //   while (node.parent) {
  //     node = node.parent;
  //     path.push([node.x, node.y]);
  //   }
  //   return path.reverse();
  // };

  // Stretch!
  // Find the optimal route from start to finish
  // Return each edge required to traverse the route
  // Remember that edges are not directional: A -> B also implies B -> A
  // this.findPath = function(start, finish) {
  Graph.prototype.findPath = function(start, finish) { //first and second makes no sense. figure this out, look around you in the traversal.
    let visited = [];
    let queue = [{
      squareNumber: start,
      priority: 0,
      path: []
    }];
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (visited.indexOf(currentNode.squareNumber) === -1) {
        if (currentNode.squareNumber === finish) {
          return currentNode.path;
        }
        for (let i = 0; i < this.nextNode.length; i++) {
          if (currentNode.squareNumber === this.nextNode[i].squareNumber) {
            let currentPath = currentNode.path.slice(0);
            currentPath.push(this.nextNode[i]);
            let queueItem = {
              squareNumber: this.nextNode[i].squareNumber,
              priority: currentNode.priority + this.nextNode[i].weight,
              path: currentPath
            }
            queue.push(queueItem);
          }
          visited.push(currentNode.squareNumber)
        }
      }
    }
    return null;
  }

  // Return a list of any nodes that are orphans.
  // An orphan is any node with no edges.

  // Graph.prototype.print = function(edges) {
  //   for (let i = 0; i < edges.length; i++) {
  //     let edge = edges[i];
  //     console.log(edge.first.value, '->', edge.second.value, edge.weight, 'mi');
  //   }
  // };
  //
  // Graph.prototype.pathWeight = function(path) {
  //   let sum = 0;
  //   for (let i = 0; i < path.length; i++) {
  //     sum += path[i].weight;
  //   }
  //   return sum;
  // };



  Graph.prototype.findNodeToPlaceCrimeWeight = function(x, y, weight, squares){
    console.log(squares.length) //crime has lat and long & serverity in object form
    for (var i = 0; i < squares.length-2; i++){
      //console.log(squares);
      for (var j = 0; j < squares.length-2; i++) {
        // console.log(squares[i]);
        // if( (squares[i][j].NWcorner[0] < x < squares[i][j].NEcorner[0]) && (squares[i][j].SWcorner[1]< y <squares[i][j].NEcorner[1]) ){
        //   if(typeof weight === 'number'){
        //     squares[i][j].nodeWeight += weight;
        //     // console.log(squares[i][j]);
        //     // console.log(i, j);
        //   }
        // }
      }
    }
  }

  Graph.prototype.crimeWeight = function(crimeCategory){
    return edgeWeights[crimeCategory];
  }

  // Graph.prototype.createEdgeWeights = function(squares, edges){
  //   for (var i = 0; i < squares.length; i++) {
  //     if(squares[i - 1]){
  //       let edge = new GraphEdge(squares[i], squares[i - 1], squares[i].nodeWeight, squares[i - 1].nodeWeight);
  //       edges.push(edge);
  //     }
  //     if(squares[i + 1]){
  //       let edge = new GraphEdge(squares[i], squares[i + 1], squares[i].nodeWeight, squares[i + 1].nodeWeight);
  //       edges.push(edge);
  //     }
  //     if(squares[i - 100]){
  //       let edge = new GraphEdge(squares[i], squares[i - 100], squares[i].nodeWeight, squares[i - 100].nodeWeight);
  //       edges.push(edge);
  //     }
  //     if(squares[i + 100]){
  //       let edge = new GraphEdge(squares[i], squares[i + 100], squares[i].nodeWeight, squares[i + 100].nodeWeight);
  //       edges.push(edge);
  //     }
  //   }
  // }

  Graph.prototype.createGrid = function(lat1, lon1, lat2, lon2, squareSideCount){
    let finalArr = [];
    let squareHeight = (lat2-lat1)/squareSideCount; // height of one square
    let squareWidth = (lon2-lon1)/squareSideCount; // width of one square
    let squareNumber = 1; // starting from the top left
    for(let i = 0; i < squareSideCount; i++){
      var tempArr = [];
      for(let j =  0; j < squareSideCount; j++){
        let nw = [lat1 + i*squareHeight, lon1 + j*squareWidth];
        let ne = [lat1 + i*squareHeight, lon1 + (j+1)*squareWidth];
        let sw = [lat1 + (i+1)*squareHeight, lon1 + j*squareWidth];
        let se = [lat1 + (i+1)*squareHeight, lon1 + (j+1)*squareWidth];

        var node = new GraphSquare(nw,ne,sw,se,squareNumber,j,i);
        tempArr.push(node);
        squareNumber++;
      }
      finalArr.push(tempArr);
    }
    console.log(finalArr);
    return finalArr;
  };

/*
  [
    [ y-1[x-1] , y-1[x] , y-1[x+1] ],
    [ y[x-1]   , y[x]   , y[x+1]   ],
    [ y+1[x-1] , y+1[x] , y+1[x+1] ]
  ]

*/

  // Graph.prototype.finalGridSquares = function(){ //puts grid via array of 4 points (also within the array, along with square number)
  //     var squares = [];
  //     var squareNum = 1;
  //
  //     for (var i = 0; i < 100-1; i++) { // grid is *always* 100 X 100
  //       var tempArr = [];
  //       for (var j = 0; j < 99; j++) {
  //
  //         var node = new GraphSquare(this.points[i][j], this.points[i][j+1], this.points[i+1][j], this.points[i+1][j+1], squareNum, i, j);
  //         squareNum++;
  //         tempArr.push(node);
  //       }
  //       squares.push(tempArr);
  //     }
  //     // console.log(squares);
  //     return squares;
  //   }

    // Graph.prototype.traverse = function(thisNode, nextNode) {
    //   for (node in )
    // }

    Graph.prototype.pathfinder = function(start/* y[x]*/, end){
      var road = [];
      var currentSquare;
      var currentWeight;
      var minDistance = euclidian(start, end);
      for (var i = 0; i < 3; i++) {
        euclidian()

        node = createGrid[y[x]]
      }
      var weightMin = start.weight;
      while(currentSquare !== end){
        if(currentSquare.weight < next.weight){
          weightMin = currentWeight;
        }
        road.push(currentSquare);
      }
      return road;
    }

    Graph.prototype.euclidian = function(node, goal) {
      return Math.sqrt(Math.pow((goal.x - node.x), 2) + Math.pow((goal.y - node.y), 2));
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
  console.log(trapGraph.dimension);
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



module.exports = {Graph, GraphSquare, GraphEdge};
