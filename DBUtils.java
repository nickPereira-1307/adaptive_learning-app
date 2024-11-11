
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DBUtils {
    
    private static final String URL = "jdbc:mysql://localhost:3306/java_project"; // Update with your database URL
    private static final String USER = "root"; // Update with your database username
    private static final String PASSWORD = ""; // Update with your database password

    // Method to establish a connection
    private static Connection getConnection() throws SQLException, ClassNotFoundException {
        //Class.forName("com.mysql.cj.jdbc.Driver");
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
    //Method to create a new user
    public static void createUser (String name, String email, String password, int score) throws ClassNotFoundException {
        String query = "INSERT INTO users (name,email , password, score) VALUES (?, ?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, email);
            preparedStatement.setString(3, password);
            preparedStatement.setInt(4, score);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to get all users
    public static List<User> getAllUsers() throws ClassNotFoundException {
        List<User> users = new ArrayList<>();
        String query = "SELECT name, password, score FROM users";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");
                int score = resultSet.getInt("score");
                users.add(new User(username, password, score));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }

    // Method to get a user by username
    public static User getUser_ByUsername(String name) throws ClassNotFoundException {
        User user = null;
        String query = "SELECT password, score FROM users WHERE name = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, name);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String password = resultSet.getString("password");
                int score = resultSet.getInt("score");
                user = new User(name, password, score);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    // Method to update a user's score
    public static void updateUser_Score(String name, int score) throws ClassNotFoundException {
        String query = "UPDATE users SET score = ? WHERE name = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, score);
            preparedStatement.setString(2, name);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to delete a user
    public static void deleteUser (String name) throws ClassNotFoundException {
        String query = "DELETE FROM users WHERE name = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, name);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    

   
}