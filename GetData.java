import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;

import org.json.JSONObject;
import org.json.JSONArray;

public class GetData {

    static String prefix = "project3.";

    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;

    // You must refer to the following variables for the corresponding 
    // tables in your database
    String userTableName = null;
    String friendsTableName = null;
    String cityTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;

    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
        super();
        String dataType = u;
        oracleConnection = c;
        userTableName = prefix + dataType + "_USERS";
        friendsTableName = prefix + dataType + "_FRIENDS";
        cityTableName = prefix + dataType + "_CITIES";
        currentCityTableName = prefix + dataType + "_USER_CURRENT_CITIES";
        hometownCityTableName = prefix + dataType + "_USER_HOMETOWN_CITIES";
    }

    // TODO: Implement this function
    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException {

        // This is the data structure to store all users' information
        JSONArray users_info = new JSONArray();
        
        try (Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY)) {
            // Your implementation goes here....

            // Get info from users table
            // MOB, YOB, DOB, gender, user id, first name, last name
            ResultSet rst = stmt.executeQuery(
                "SELECT * FROM " + userTableName
            );

            // Convert to JSON
            while (rst.next()) {
                long userid = rst.getLong(0);
                String firstName = rst.getString(1);
                String lastName = rst.getString(2);
                int yob = rst.getInt(3);
                int mob = rst.getInt(4);
                int dob = rst.getInt(5);
                String gender = rst.getString(6);

                JSONObject user = new JSONObject();

                user.put("MOB", mob);
                user.put("hometown", new JSONObject({}));
                user.put("current", new JSONObject({}));
                user.put("gender", gender);
                user.put("user_id", userid);
                user.put("DOB", dob);
                user.put("last_name", lastName);
                user.put("first_name", firstName);
                user.put("YOB", yob);
                user.put("friends", new JSONArray([]));

                users_info.put(user);
            }

            for (int i = 0; i < users_info.length; i++) {
                int userid = users_info.getJSONObject(i).getInt("user_id");

                // Get hometown info
                rst = stmt.executeQuery(
                    "SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME " +
                    "FROM " + hometownCityTableName + " HC " +
                    "LEFT JOIN " + cityTableName + " C " +
                    "ON HC.HOMETOWN_CITY_ID = C.CITY_ID " +
                    "WHERE HC.USER_ID = " + userid
                );

                while (rst.next()) {
                    String cityName = rst.getString(0);
                    String stateName = rst.getString(1);
                    String countryName = rst.getString(2);

                    JSONObject hometownInfo = new JSONObject();
                    hometownInfo.put("country", countryName);
                    hometownInfo.put("city", cityName);
                    hometownInfo.put("state", stateName);

                    // Set hometown to hometownInfo
                    rst = stmt.executeQuery(
                        "SELECT USER2_ID " +
                        "FROM " + friendsTableName + " " +
                        "WHERE USER1_ID = " + userid
                    );

                    JSONArray friends = new JSONArray();
                    while (rst.next()) {
                        Long user2id = rst.getLong(0);
                        friends.add(user2id);
                    }
                }

                // Get current city info
                rst = stmt.executeQuery(
                    "SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME " +
                    "FROM " + currentCityTableName + " CC " +
                    "LEFT JOIN " + cityTableName + " C " +
                    "ON CC.HOMETOWN_CITY_ID = C.CITY_ID " +
                    "WHERE CC.USER_ID = " + userid
                );

                while (rst.next()) {
                    String cityName = rst.getString(0);
                    String stateName = rst.getString(1);
                    String countryName = rst.getString(2);

                    JSONObject currentInfo = new JSONObject();
                    currentInfo.put("country", countryName);
                    currentInfo.put("city", cityName);
                    currentInfo.put("state", stateName);
                }

                // Get friends
            }
            
            stmt.close();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return users_info;
    }

    // This outputs to a file "output.json"
    // DO NOT MODIFY this function
    public void writeJSON(JSONArray users_info) {
        try {
            FileWriter file = new FileWriter(System.getProperty("user.dir") + "/output.json");
            file.write(users_info.toString());
            file.flush();
            file.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
