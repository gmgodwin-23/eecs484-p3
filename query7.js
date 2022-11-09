// Query 7
// Find the number of users born in each month using MapReduce

let num_month_mapper = function () {
    // TODO: Implement the map function
    var count = 1;
    emit(this.MOB, count);
};

let num_month_reducer = function (keyMOB, userIds) {
    return Array.sum(userIds);
};

let num_month_finalizer = function (keyMOB, numUserIds) {
    // We've implemented a simple forwarding finalize function. This implementation
    // is naive: it just forwards the reduceVal to the output collection.
    // TODO: Feel free to change it if needed.
    return numUserIds;
};

db.users.mapReduce( num_month_mapper,
    num_month_reducer,
    {
      out: "born_each_month",
      finalize: num_month_finalizer
    }
  );