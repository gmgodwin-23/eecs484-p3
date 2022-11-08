-- Get info from users table including MOB, YOB, DOB, gender, user id, first name, last name
SELECT * FROM USERS;

-- Get friends
-- all of the user_ids of users who are friends with the current user
-- and has a larger user_id than the current user
SELECT USER2_ID
FROM project3.public_FRIENDS
WHERE USER1_ID = <userid>;

-- Get hometown info
SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME
FROM project3.public_USER_HOMETOWN_CITIES HC
LEFT JOIN project3.public_CITIES C
ON HC.HOMETOWN_CITY_ID = C.CITY_ID
WHERE HC.USER_ID = <userid>;

-- Get current info
SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME
FROM project3.public_USER_CURRENT_CITIES UC
LEFT JOIN project3.public_CITIES C
ON UC.CURRENT_CITY_ID = C.CITY_ID
WHERE UC.USER_ID = <userid>;