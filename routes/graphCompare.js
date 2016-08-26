function getData(dataUrl){
  var info = [];
  //console.log(dataUrl)
  //Here we request the data from the URL we want to hit
   var finalResult = request(dataUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      info.push(JSON.parse(body));
    }
    //Here we loop through the returned JSON file and provide an interface to extracting values from the entire dataset
    var nightCrime = [];
    var dayCrime = [];
    var dayGraph;
    var nightGraph;
    // console.log(info)
    for(let i = 0 ; i < info.length ; i++){
      var newData = (info[i]);
      // console.log(newData);
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
      var dayWeights = crimeWeight(dayCrime[i].category);
      // console.log(dayCrime[i])
      // console.log(findNodeToPlaceCrimeWeight(dayCrime[i].x, dayCrime[i].y, weight, theDayGrid).slice(7600,7800))
      var dayGraph =  findNodeToPlaceCrimeWeight(dayCrime[i].x, dayCrime[i].y, dayWeights, this.dayGrid);
    }

    for (let i = 0; i < nightCrime.length; i++) {
      var nightWeights = crimeWeight(nightCrime[i].category);
      var nightGraph = findNodeToPlaceCrimeWeight(nightCrime[i].x, nightCrime[i].y, nightWeights, this.nightGrid)
    }
    // console.log(theNightGrid.slice(7200, 7400))
    // console.log(theDayGrid[3936])
    // console.log(theDayGrid[1858])
    // console.log(nightCrime)
  });

  return finalResult;
}
