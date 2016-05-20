/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.DAO;

import br.passagens.Bean.AeroportoBean;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rafael.franco
 */
public class AeroportoDAO {
     public List<AeroportoBean> listaAeroportos()
           throws Exception{
        List<AeroportoBean> lista = null;
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps =  con.prepareStatement
        ("SELECT * FROM aeroportos ORDER BY cidade");
        ResultSet rs = ps.executeQuery();
        while(rs.next()){
            if(lista==null)
                lista = new ArrayList<AeroportoBean>();
            
            lista.add(new AeroportoBean(
                    rs.getInt("id"),
                    rs.getString("descricao"),
                    rs.getString("cidade"),
                    rs.getString("uf"),
                    rs.getString("sigla"))
            );
        }
        rs.close();
        ps.close();
        con.close();
        return lista;
    }
}
