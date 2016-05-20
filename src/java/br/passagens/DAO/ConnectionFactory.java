/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author rafael.franco
 */
public class ConnectionFactory {
    public static Connection getConnection() throws SQLException{
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection
            ("jdbc:mysql://localhost:3306/ltpvoo", "root", "");
            return conn;
        }
        catch(ClassNotFoundException ex){
            throw new SQLException(ex.getMessage());
        }
        
    }
}
