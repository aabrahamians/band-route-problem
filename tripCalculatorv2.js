class tripCalculator2{
    // @param {nodes[]} nonvisited places
    // @param {attempts Num} how many times to run the shuffle
    constructor(nodes,attempts){
        this.places = [...nodes]
        this.attempts = attempts
        this.bestDistance= Infinity; //array of visited x,y cooirdinates
        this.bestRoute=[],
        this.currentRoute=[];
    }

    // compares current and best and sets new bestRoute And bestDistance
    compareCurrentRoute(){
        // get total distance of currentRoute which is also the last shuffled route
        let totalDistance = this.getTotalDistance(this.currentRoute);
        // if our best is bigger than our current total then replace
        if(this.bestDistance > totalDistance){
            this.bestDistance = totalDistance  
            this.bestRoute = this.currentRoute
        }
    }

    //while this.places still has nodes we map the distance between everynode and the last visited node
    shuffleAndTest(){
        while(this.attempts  !== 0 ){
        // decrement this.attempts 
         this.attempts -= 1
         // get new current by shuffling a copy of original
         this.currentRoute = this.shuffleArray(this.places.slice());
         //run comparison
         this.compareCurrentRoute()

        }
    }

    //Shuffles a given array and returns it  *Fisher–Yates shuffle
    //slightly modified to leave our first node (home) in place
    shuffleArray(array){
        // because we will be removing the first node and adding it again we need to -1 here
        var index = array.length-1; 
        var tempIndex, randIndex;
        // remove first node and save for later use
        var home = array.shift();
        // While there remain elements to shuffle...
        while (0 !== index) {
            // Pick a remaining element...
            randIndex = Math.floor(Math.random() * index);
            index -= 1;

            // And swap it with the current element.
            tempIndex = array[index];
            array[index] = array[randIndex];
            array[randIndex] = tempIndex;
        }
        // add removed node at index 0 to shuffled array
        return [home, ...array];
    
    };

    //find the distance bewteen two vertecies no need to get sqare root since it can be relative
    // @param {vrtx{x,y}} 
    distance(vrtx1, vrtx2){
        if(!vrtx2){return}
        let dist =  Math.pow((vrtx1.x-vrtx2.x), 2) + Math.pow((vrtx1.y-vrtx2.y), 2);
        return dist
    }

    //find the distance bewteen all the given points
    // @param {route[]} 
    getTotalDistance(route) {
        let sum = 0;
        for (var i = 0; i < route.length - 1; i++) {
          let d = this.distance(route[i],  route[i + 1]);
          sum += d;
        }
        return sum;
    }
    
}    
