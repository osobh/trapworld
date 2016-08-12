'use strict';
// Here we initialize our node and edges for the graph
let request = require('request');

function GraphEdge(to, from, toWeight, fromWeight) {
  this.to = to;
  this.from = from;
  this.edgeWeight = fromWeight + toWeight;
}

function GraphNode(NWcorner, NEcorner, SWcorner, SEcorner, squareNum) {
  this.NWcorner = NWcorner;
  this.NEcorner = NEcorner;
  this.SWcorner = SWcorner;
  this.SEcorner = SEcorner;
  this.squareNum = squareNum;
  this.nodeWeight = 0;
}

let edgeWeights = {
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

}
//This represents an undirected Graph
function Graph() {

  this.nodes = [];
  this.edges = [];

// Helper function to find a node in nodes
  this.findNode = function (value) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].value == value) {
        return this.nodes[i];
      }
    }
    return null;
  }

// Add a node to the list of nodes
//   this.addNode = function(NWcorner, NEcorner, SWcorner, SEcorner, squareNum, nodeWeight) {
//     if (this.findNode(squareNum) != null) {
//       return null;
//     }
//     this.nodes.push(new GraphNode(NWcorner, NEcorner, SWcorner, SEcorner, squareNum, nodeWeight));
//   }//why am i doing this?
//
// // Add an edge between 2 nodes and give it a weight
//   this.addEdge = function(top, bottom, left, right, edgeWeight) {
//     var north = this.findNode(top);
//     var south = this.findNode(bottom);
//     var west = this.findNode(left);
//     var east = this.findNode(right);
//     this.edges.push(new GraphEdge(north, south, west, east, edgeWeight));
//   }



// Get the size of the graph by returning how many nodes are in the graph
  this.size = function() {
    return this.nodes.length;
  }

  // Find the total number of edges in the graph
  this.numEdges = function() {
    return this.edges.length;
  }

  // Find the total weight of the graph by adding up the weights of each edge
  this.weight = function() {
   let totalEdges = this.edges;
   //console.log(totalEdges);
   let sum = 0;

    for (let i = 0; i < totalEdges.length; i++) {
      //console.log(totalEdges[i]);
      sum += totalEdges[i].weight;
    }
    return sum;
  }
  // Find all node values a node is connected to.
  // Return all node values at the other side of an edge of the target node
  // Remember that edges are not directional: A -> B also implies B -> A
  this.findNeighbors = function(value) {
    // TODO
    let finalArr = [];
    let totalEdges = this.edges;
    //console.log(totalEdges);
    for(let i = 0 ; i < totalEdges.length; i++){
      let firstEdge = this.edges[i].first.value;
      let secondEdge = this.edges[i].second.value
      if(value === firstEdge){
        finalArr.push(secondEdge);
      }else if(value === secondEdge){
        finalArr.push(firstEdge);
      }
    }
    return finalArr;
  }

  function backtrace(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
  }

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
    this.findPath = function(start, finish) {
   // TODO
   var checked = [];
   let queue = [{
       val: start,
       weight: 0,
       path: []
     }];
   while (queue.length > 0) {
     queue.sort((a,b) => {return a.weight - b.weight;});
     console.log(queue);
     let currentQueue = queue.shift();
     if (checked.indexOf(currentQueue.val) === -1) {
       if (currentQueue.val === finish) {
         return currentQueue.path;
       }
       for (let i = 0; i < this.edges.length; i++) {
         if (this.edges[i].first.value === currentQueue.val) {
           let currentPath = currentQueue.path.slice(0);
           currentPath.push(this.edges[i]);
           queue.push({
             val: this.edges[i].second.value,
             weight: currentQueue.weight + this.edges[i].weight,
             path: currentPath
           });
         } else if (this.edges[i].second.value === currentQueue.val) {
           let currentPath = currentQueue.path.slice(0);
           currentPath.push(this.edges[i]);
           queue.push({
             val: this.edges[i].first.value,
             weight: currentQueue.weight + this.edges[i].weight,
             path: currentPath
           });
         }
       }
       checked.push(currentQueue.val);
     }
   }
 }

  // Return a list of any nodes that are orphans.
  // An orphan is any node with no edges.

  this.print = function() {
    for (let i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      console.log(edge.first.value, '->', edge.second.value, edge.weight, 'mi');
    }
  }

  this.pathWeight = function(path) {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
      sum += path[i].weight;
    }
    return sum;
  }

}
//---------------------------------------------------------------------------------
// ----------------- This is where we create ou

let trapGraph;
trapGraph = new Graph();


// Location where we create the grid then create nodes, then add values to these nodes.
function createGrid(lat1, lon1, lat2, lon2, squareSide){
  let finalArr = [];
  let latSquareSpace = (lat2-lat1)/squareSide
  let lonSquareSpace = (lon2-lon1)/squareSide
  let squareNum = 1;
  // let node = trapGraph.addNode();
  // let edge = trapGraph.addEdge();
  for(let i = 0; i < squareSide; i++){
      for(let j =  0; j < squareSide; j++){
        let squareCoordinates = [lat1 + i*(latSquareSpace), lon1 + j*(lonSquareSpace),  squareNum];
        finalArr.push(squareCoordinates)
        squareNum++;
      }
  }
  return finalArr;
}
var points = createGrid(37.808179, -122.531204, 37.700398, -122.350273, 100); //grid of 100x100

function finalGridSquares(array){ //puts grid via array of 4 points (also within the array, along with square number)
  var squares = [];
  var squareNum = 1;

  for (var i = 0; i < 100*100 - 100; i++) {
    if(i % 100 !== 99){
      var node = new GraphNode(array[i], array[i + 1], array[i + 100], array[i + 101], squareNum);
      squareNum++;
      squares.push(node)
    }
  }
    return squares;
}

function createEdgeWeights(squares){
  var edges = [];
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
  return edges;
}

function findNodeToPlaceCrimeWeight(y, x, weight, squares){ //crime has lat and long & serverity in object form
  for (var i = 0; i < squares.length; i++){
    // console.log(x, y)
 // console.log(x, y) &&(x > squares[i].NEcorner[0])&&(y < squares[i].SWcorner[1])&&(y > squares[i].NWcorner[1])(x < squares[i].SWcorner[0])&&(x > squares[i].NWcorner[0])
    if((y > squares[i].NWcorner[1])&&(y < squares[i].NEcorner[1])&&(x>squares[i].SWcorner[0])&&(x<squares[i].NEcorner[0])){
      if(typeof weight === 'number'){
        squares[i].nodeWeight += weight;
        // console.log(squares[i])
      }
    }
  }
}

function crimeWeight(crimeCategory){
   for(var key in edgeWeights){
    //  console.log(edgeWeights[key]);
     if((key === crimeCategory) && (key !== undefined)){
       return edgeWeights[key];
     }
   }
 }

 function manhattanDistance(node, goal){
    var dx = abs(node.x - goal.x)
    var dy = abs(node.y - goal.y);
    return (dx + dy);
 }
var theDayGrid = finalGridSquares(points);
var theNightGrid = finalGridSquares(points);
var newDayGrid = createEdgeWeights(theDayGrid);
var newNightGrid = createEdgeWeights(theNightGrid);

// console.log(theGrid.NWcorner)
// console.log(theGrid[0].NWcorner[0])
//Grabbing the needed data from the CrimeData API
function getData(dataUrl){
  var info = [];
  //console.log(dataUrl)
  //Here we request the data from the URL we want to hit
  request(dataUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          info.push(JSON.parse(body));
        }
  //Here we loop through the returned JSON file and provide an interface to extracting values from the entire dataset
      var nightCrime = [];
      var dayCrime = [];
      // console.log(info)
      for(let i = 0 ; i < info.length ; i++){
        var newData = (info[i]);
        // console.log(newData)
        for(let key in newData) {
          let obj = newData[key];
          // console.log(obj)
          let crimeTime = obj.time.split(":");
          let crimeCategory = obj.category;
          // let x = obj.x;
          // let y = obj.y;
          // let weight = crimeWeight(crimeCategory);


          //console.log( crimeTime[0]);
          let exactCrimeTime =  parseInt(crimeTime[0]);
          if(exactCrimeTime <= 20 && exactCrimeTime >= 6 ){
            dayCrime.push(obj);
          // console.log( crimeWeight())
          }else{
            nightCrime.push(obj);
            // console.log("It's a night trap out there", exactCrimeTime)
          }
        }
      }
      for (let i = 0; i < dayCrime.length; i++) {
        let weight = crimeWeight(dayCrime[i].category);
        // console.log(dayCrime[i])
        // console.log(findNodeToPlaceCrimeWeight(dayCrime[i].x, dayCrime[i].y, weight, theDayGrid).slice(7600,7800))
        findNodeToPlaceCrimeWeight(dayCrime[i].x, dayCrime[i].y, weight, theDayGrid)
      }

      for (let i = 0; i < nightCrime.length; i++) {
        let weight = crimeWeight(nightCrime[i].category);
        findNodeToPlaceCrimeWeight(nightCrime[i].x, nightCrime[i].y, weight, theNightGrid)
      }
      // console.log(theDayGrid.slice(6600, 6700))

  });
}
getData('https://data.sfgov.org/resource/9v2m-8wqu.json');

console.log(theDayGrid[3935])
// console.log(newNightGrid.slice(2600,2700));

module.exports = Graph;
