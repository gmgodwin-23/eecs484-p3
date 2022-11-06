// Query 6
// Find the average friend count per user.
// Return a decimal value as the average user friend count of all users in the users collection.

function find_average_friendcount(dbname) {
    db = db.getSiblingDB(dbname);

    // TODO: calculate the average friend count
    let totalFriendCount = 0;
    let numUsers = 0;

    db.users.find().forEach(function(user) 
        {
            numUsers++;
            totalFriendCount += user.friends.length;
        }
    )

    return totalFriendCount/numUsers;
}
