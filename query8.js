// Query 8
// Find the city average friend count per user using MapReduce.

let city_average_friendcount_mapper = function () {
    // TODO: Implement the map function
    var valueTuple = {count: 1, numFriends: this.friends.length}
    emit(this.hometown.city, valueTuple);
};

let city_average_friendcount_reducer = function (hometownCity, valueTuple) {
    // TODO: Implement the reduce function
    var reducedVal = {totalUsers: 0, totalFriends: 0};

    for (var i = 0; i < valueTuple.length; i++) {
        reducedVal.totalUsers += valueTuple[i].count;
        reducedVal.totalFriends += valueTuple[i].numFriends;
    }

    return reducedVal;
};

let city_average_friendcount_finalizer = function (hometownCity, reducedVal) {
    // We've implemented a simple forwarding finalize function. This implementation
    // is naive: it just forwards the reduceVal to the output collection.
    // TODO: Feel free to change it if needed.
    
    var avg = reducedVal.totalFriends / reducedVal.totalUsers;

    return avg;
};

db.users.mapReduce( city_average_friendcount_mapper,
    city_average_friendcount_reducer,
    {
      out: { merge: "friend_city_population" },
      finalize: city_average_friendcount_finalizer
    }
  )