/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.DAO;

import br.passagens.Bean.AeroportoBean;
import br.passagens.Bean.VooBean;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 *
 * @author rafael.franco
 */
public class VooDAO {
     public List<VooBean> listaVoo(String data, Integer origemid, Integer destinoid)
     {
       try {
        List<VooBean> lista = null;
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps =  con.prepareStatement
        ("SELECT v.*, " +
        "o.descricao as origemdescricao, o.cidade as origemcidade, o.uf as origemuf, o.sigla as origemsigla, " +
        "d.descricao as destinodescricao, d.cidade as destinocidade, d.uf as destinouf, d.sigla as destinosigla " +
        "FROM voos v " +
        "INNER JOIN aeroportos o ON o.id = v.origem_id " +
        "INNER JOIN aeroportos d ON d.id = v.destino_id " +
        "WHERE v.datainicio = '"+formataDataIngles(data)+"' " + 
        "AND v.origem_id = "+origemid+" AND v.destino_id = "+destinoid+"");
                 
SimpleDateFormat sf =  new SimpleDateFormat("dd/MM/yyyy");
        ResultSet rs = ps.executeQuery();
        while(rs.next()){
            if(lista==null)
                lista = new ArrayList<VooBean>();
            
            lista.add(new VooBean(
                    rs.getInt("id"),
                    rs.getInt("origem_id"),
                    rs.getInt("destino_id"),
                    rs.getDouble("valoradulto"),
                    rs.getDouble("valorcrianca"),
                    sf.format(rs.getDate("datainicio")),
                    sf.format(rs.getDate("datachegada")),
                    rs.getInt("qtdpoltronas"),
                    rs.getString("horainicio"),
                    rs.getString("horachegada"),
                    rs.getString("origemdescricao"),
                    rs.getString("origemcidade"),
                    rs.getString("origemuf"),
                    rs.getString("origemsigla"),
                    rs.getString("destinodescricao"),
                    rs.getString("destinocidade"),
                    rs.getString("destinouf"),
                    rs.getString("destinosigla"),
                    rs.getDouble("valortaxa"))
            );
        }
        rs.close();
        ps.close();
        con.close();
        return lista;
       } catch (Exception ex) {
           System.out.println(ex.getMessage());
       } 
       return null;
    }
          
    public String formataDataIngles(String data) throws ParseException
    {
        
    String dateString1 = data;
    Date date = new SimpleDateFormat("dd/MM/yyyy").parse(dateString1);
    String dateString2 = new SimpleDateFormat("yyyy-MM-dd").format(date);    
        

        return dateString2;
    }
    
    public String formataDataBrasil(String data)
    {
        String aux = "", auxdia = "", auxmes = "", auxano ="";

        aux = data.substring(8,2)+"/"+data.substring(5,2)+"/"+data.substring(0,4);

        return aux;
    }
}
