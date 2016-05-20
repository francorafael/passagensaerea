/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.DAO;

import br.passagens.Bean.ClienteBean;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


/**
 *
 * @author rafael.franco
 */
public class ClienteDAO {

    public ClienteDAO() {
    }
    
    //inserir
    public void inserir(ClienteBean cli)
    throws Exception{

        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps = con.prepareStatement
            ("insert into clientes "
         + "(nome, email, senha, cpf)" 
         + "values(? ,?, ?, ?)");
        ps.setString(1, cli.getNome());
        ps.setString(2, cli.getEmail());        
        ps.setString(3, cli.getSenha());        
        ps.setString(4, cli.getCpf());

        ps.execute();
        ps.close();
        con.close();
    }
    

    
    
    public ClienteBean logar(String email, String senha)
    throws Exception{
        ClienteBean cli = null;
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps = con.prepareStatement
        ("select * from clientes p where email = ? and senha = ?");
        ps.setString(1, email);        
        ps.setString(2, senha);

        ResultSet rs = ps.executeQuery();
        if(rs.next()){
            cli = new ClienteBean(
                rs.getInt("id"),
                rs.getString("nome"),
                rs.getString("email"),
                rs.getString("senha"),
                rs.getString("cpf"));
        }
        rs.close();
        ps.close();
        con.close();
        return cli;
    }
    
}
