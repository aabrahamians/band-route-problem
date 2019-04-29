class tripCalculator{
    constructor(nodes){
        this.places= [...nodes]; //array of unvisited x,y cooirdinates
        this.visited=[]; //array of visited x,y cooirdinates
        this.visited.push(this.places.splice(0,1)[0])
    }

    //We update the places array everytime we add a location to visited.
    // @param {nodes[]} nonvisited places
    setPlaces(nodes){
        this.places = nodes
    }
 
    // find distance between current(last visited) node and all nodes, sort by distance, push nearest neighbor to this.visited and remove from this.places array
    connectNearestCities(){
        // while this.places is not empty
        while(this.places.length){
            //map array to add distance to 
            var remaining = this.places.map( (each) => {
                    // calculcate distance of two nodes
                    var dist = this.distance(each, this.visited[ this.visited.length - 1 ]);
                    //return original node and distance
                    return { dist, ...each}
                }).
                //sort by distance first node will be teh closest 
                sort(function(a, b) {
                    return a.dist - b.dist;
                })
            // push the first index of the sorted array into visited array
            this.visited.push(remaining.splice(0,1)[0]);
            //replace array of remaining nodes with our this .places arrray
            this.setPlaces(remaining) 
            //run function reccursively untill this.places.length is 0 and we exit this function
            this.connectNearestCities(remaining) //runs function recurssively 

        }
    }

    //find the distance bewteen two vertecies no need to get sqare root since it can be relative
    // @param {vrtx{x,y}} 
    distance(vrtx1, vrtx2){
        if(!vrtx2){return}
        let dist =  Math.pow((vrtx1.x-vrtx2.x), 2) + Math.pow((vrtx1.y-vrtx2.y), 2);
        return dist
    }
}    
