
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class initDb {

    /**
     * Connect to a sample database
     *
     * @param fileName the database file name
     */
    public static void createNewDatabase(String fileName) {
 
        String url = "jdbc:sqlite:/tmp/" + fileName;
 
        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");
            }
 
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
 

    public static void createNewTable() {
        // SQLite connection string
        String url = "jdbc:sqlite:/tmp/test.db";
        
        // SQL statement for creating a new table
 
        String sql = "create table users  (\n"
                + "     id integer primary key,\n"
                + "     username varchar(100) not null unique,\n"
                + "     pwd varchar(20) not null\n"
                + ");"
                + "create table roles  (\n"
                + "     id integer primary key,\n"
                + "     role varchar(100) not null unique key\n"
                + " );"
                + "create table user_roles  (\n"
                + "     user_id integer not null,\n"
                + "     role_id integer not null,\n"
                + "     unique key (user_id, role_id),\n"
                + "    index(user_id)\n"
                + ");";
        
        try (Connection conn = DriverManager.getConnection(url);
                Statement stmt = conn.createStatement()) {
            // create a new table
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        //createNewDatabase("test.db");
        createNewTable();
    }
}