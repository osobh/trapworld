'use strict';
// Here we initialize our node and edges for the graph
let request = require('request');

function GraphEdge(first, second, weight) {
  this.first = first;
  this.second = second;
  this.weight = weight;
}

<<<<<<< HEAD
function GraphNode(NWcorner, NEcorner, SWcorner, SEcorner, squareNum, weight) { //gonna need to refactor this
  this.NWcorner = NWcorner;
  this.NEcorner = NEcorner;
  this.SWcorner = SWcorner;
  this.SEcorner = SEcorner;
  this.squareNum = squareNum;
  this.weight = weight;
=======
function GraphNode(value, category, latlong, weight) {
  this.value = value;
  this.category = category;
  this.latlong = latlong;
  this.weight = weight
>>>>>>> master
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
  this.addNode = function(NWcorner, NEcorner, SWcorner, SEcorner, squareNum) {
    if (this.findNode(squareNum) != null) {
      return null;
    }
    this.nodes.push(new GraphNode(NWcorner, NEcorner, SWcorner, SEcorner, squareNum));
  }

// Add an edge between 2 nodes and give it a weight
  this.addEdge = function(top, bottom, left, right, weight) {
    var north = this.findNode(top);
    var south = this.findNode(bottom);
    var west = this.findNode(left);
    var east = this.findNode(right);
    }
    this.edges.push(new GraphEdge(north, south, west, east, weight));
  }

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
      }

      else if(value === secondEdge){
        finalArr.push(firstEdge);
      }

    }
    return finalArr;
  }

  // Stretch!
  // Find the optimal route from start to finish
  // Return each edge required to traverse the route
  // Remember that edges are not directional: A -> B also implies B -> A
  this.findPath = function(start, finish) {
    // TODO;
    console.log(start);
    let neighbors = this.findNeighbors(start);
    console.log(neighbors);
    return [];
  }

  // Return a list of any nodes that are orphans.
  // An orphan is any node with no edges.
  this.findOrphans = function() {
    // TODO
    return [];
  }

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

function findNodeToPlaceCrimeWeight(x, y, weight){ //crime has lat and long & serverity in object form
  for (var i = 0; i < squares.length; i++){
    if((x > squares.NWcorner[0])&&(x < squares.NEcorner[0])&&(y > squares.SWcorner[1])&&(y < squares.NWcorner[1])){
      this.node.weight += weight;
    }
  }
};

function crimeWeight(crimeCategory){
   for(var key in edgeWeights){
     console.log(edgeWeights[key]);
     if(key === crimeCategory){
       //console.log(crimeCategory[key], "BOOOYAAAA");
       return edgeWeights[key];
     }
   }
 }

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
        console.log(newData)
        for(let key in newData) {
          let obj = newData[key];
          console.log(obj)
          let crimeTime = obj.time.split(":");
          let crimeCategory = obj.category;
<<<<<<< HEAD
          let x = obj.x;
          let y = obj.y;
          let weight = crimeWeight(crimeCategory)

=======
         
      function crimeWeight(crimeCategory){
            for(var key in edgeWeights){
              //console.log(edgeWeights[key]);
              if(key === crimeCategory){
                //console.log(crimeCategory[key], "BOOOYAAAA");
                return edgeWeights[key];
              }
            }
          }
          
>>>>>>> master
          //console.log( crimeTime[0]);
          let exactCrimeTime =  parseInt(crimeTime[0]);
          if(exactCrimeTime <= 20 && exactCrimeTime >= 6 ){
            dayCrime.push(exactCrimeTime);
          // console.log( crimeWeight())
          }else{
            nightCrime.push(exactCrimeTime);
<<<<<<< HEAD
=======
            console.log("It's a night trap out there", exactCrimeTime)
>>>>>>> master
          }
        }
      }
  });
}
getData('https://data.sfgov.org/resource/9v2m-8wqu.json');

module.exports = Graph;
