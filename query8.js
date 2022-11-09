// Query 8
// Find the city average friend count per user using MapReduce.

let city_average_friendcount_mapper = function () {
    // TODO: Implement the map function
    var valueTuple = {count: 1, numFriends: this.friends.length};
    emit(this.hometown.city, valueTuple);
};

let city_average_friendcount_reducer = function (hometownCity, valueTuple) {
    // TODO: Implement the reduce function
    var reducedVal = {count: 0, numFriends: 0};

    for (var i = 0; i < valueTuple.length; i++) {
        reducedVal.count += valueTuple[i].count;
        reducedVal.numFriends += valueTuple[i].numFriends;
    }

    return reducedVal;
};

let city_average_friendcount_finalizer = function (hometownCity, reducedVal) {
    // We've implemented a simple forwarding finalize function. This implementation
    // is naive: it just forwards the reduceVal to the output collection.
    // TODO: Feel free to change it if needed.

    return reducedVal.numFriends / reducedVal.count;
};