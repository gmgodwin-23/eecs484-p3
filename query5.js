// Query 5
// Find the oldest friend for each user who has a friend. For simplicity,
// use only year of birth to determine age, if there is a tie, use the
// one with smallest user_id. You may find query 2 and query 3 helpful.
// You can create selections if you want. Do not modify users collection.
// Return a javascript object : key is the user_id and the value is the oldest_friend id.
// You should return something like this (order does not matter):
// {user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname) {
    db = db.getSiblingDB(dbname);

    let results = {};
    // TODO: implement oldest friends

    // query 2
    // db.users.aggregate([ 
    //     {
    //         $unwind : "$friends"
    //     },
    //     {
    //         $group : {
    //             _id: "$user_id"
    //         }
    //     },
    //     // { 
    //     //     $project : {
    //     //         _id : 0,
    //     //         user_id : 1,  
    //     //         friends : 1
    //     //     }
    //     // },
    //     {
    //         $out : "sorted_friends"
    //     }
    // ]);
    
    // db.sorted_friends.find({ }).sort( 
    //     {
    //         YOB : 1,
    //         user_id : 1 
    //     } 
    // );


    // db.sorted_friends.find().forEach(function() {
    //     results.push([user_id, friends]);
    // });


    // //
    // db.users.find().forEach(function(userA) {
    //     // search for other friends (cases where friend user_id is )
    //     db.users.find().forEach(function(userB) {
    //         let all_friends = [];
    //         db.users.find([
    //             {
    //                 friends : {
    //                     $in : [userA]
    //                 }
    //             },
    //             {
    //                 _id : 0,
    //                 user_id : 1
    //             }
    //         ])
    //     })
    // });

    // // ***************
    // db.users.find().forEach(function(userA) {
    //     db.users.find([
    //         {
    //             friends : {
    //                 $size : { $gt : 0 }, 
    //                 $in : [ 597 ]
    //             }
    //         },
    //         {
    //             _id : 0,
    //             user_id : 1,
    //             friends : 1
    //         }
    //     ])
    // });

    return results;
}
