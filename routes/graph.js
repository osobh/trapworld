'use strict';

let GraphEdge = require('./graph-edge');
let GraphNode = require('./graph-node');

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
  this.addNode = function(value) {
    if (this.findNode(value) != null) {
      return null;
    }
    this.nodes.push(new GraphNode(value));
  }

  // Add an edge between 2 nodes and give it a weight
  this.addEdge = function(source, destination, weight) {
    let first = this.findNode(source);
    let second = this.findNode(destination);
    if (first == null || second == null) {
      return;
    }
    this.edges.push(new GraphEdge(first, second, weight));
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
   var totalEdges = this.edges;
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
    var finalArr = []; 
    var totalEdges = this.edges;
    //console.log(totalEdges);
    for(var i = 0 ; i < totalEdges.length; i++){
      var firstEdge = this.edges[i].first.value;
      var secondEdge = this.edges[i].second.value
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
    var neighbors = this.findNeighbors(start);
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

let cityGraph;
cityGraph = new Graph();

    cityGraph.addNode("Denver");
    cityGraph.addNode("Chicago");
    cityGraph.addEdge("Denver", "Chicago", 1004);

    cityGraph.addNode("Seattle");
    cityGraph.addEdge("Denver", "Seattle", 1316);

    cityGraph.addNode("San Francisco");
    cityGraph.addEdge("San Francisco", "Seattle", 807);
    cityGraph.addEdge("San Francisco", "Denver", 1254);

    cityGraph.addNode("Chicago");
    cityGraph.addNode("Atlanta");
    cityGraph.addEdge("Chicago", "Atlanta", 716);

    cityGraph.addNode("Nashville");
    cityGraph.addEdge("Nashville", "Atlanta", 248);
    cityGraph.addEdge("Nashville", "Denver", 1158);
    cityGraph.addEdge("Nashville", "Chicago", 470);

    cityGraph.addNode("Austin");
    cityGraph.addEdge("Nashville", "Austin", 859);
    cityGraph.addEdge("Austin", "Denver", 918);

console.log(cityGraph.numEdges());
// Now that we have a working graph we can start to build out the grid for the nodes to reside in
//We will use the Haversine formula to calculate the distance between 2 point using latitude and longitude
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

//----------------------------------------
// var lat1 = [37.811];
// var long1= [-122.477];
// var lat2 = [37.712];
// var long2 = [-122.381]
console.log("Before execution");

function CalcDistanceBetween(lat1, lon1, lat2, lon2) {
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    var R = 3958.7558657440545; // Radius of earth in Miles 
    var dLat = Math.radians(lat2-lat1);
    var dLon = Math.radians(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = R * c;
    console.log(distance);
    return distance;
}

var topLeft = [37.811335, -122.519703]
var bottomRight = [37.706835, -122.358685]

function createGrid(lat1, lon1, lat2, lon2, squareSide){
  var finalArr = [];
  var latSquareSpace = (lat2-lat1)/squareSide
  var lonSquareSpace = (lon2-lon1)/squareSide
  var squareNum = 0;
  for(var i = 0; i < squareSide; i++){
    for(var j =  0; j < squareSide; j++){
      var squareCoordinates = [lat1 + i*(latSquareSpace), lon1 + j*(lonSquareSpace),  squareNum];
      finalArr.push(squareCoordinates)
      squareNum++;
    }
  }
  console.log(finalArr);
  return finalArr;
}

CalcDistanceBetween(37.808179, -122.531204, 37.700398, -122.350273);
createGrid(37.808179, -122.531204, 37.700398, -122.350273, 7);


module.exports = Graph;