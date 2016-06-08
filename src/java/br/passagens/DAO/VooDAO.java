/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.DAO;

import br.passagens.Bean.AeroportoBean;
import br.passagens.Bean.VendaBean;
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
    
    public int selecionar(int codigo) {
        int aux = 0;
        try {
            Connection con = ConnectionFactory.getConnection();
            PreparedStatement ps = con.prepareStatement
            ("select qtdpoltronas from voos where id =  "+codigo);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                 aux = rs.getInt("qtdpoltronas");
            }
            rs.close();
            ps.close();
            con.close();

        }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
        return aux;
    }
    
    public int verificarPoltrona(int codigovoo, int numeropoltrona) {
        int aux = 0;
        try {
            Connection con = ConnectionFactory.getConnection();
            PreparedStatement ps = con.prepareStatement
            ("select id from poltrona_voos where voo_id =  "+codigovoo+" and numero="+numeropoltrona);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                 aux = rs.getInt("id");
            }
            rs.close();
            ps.close();
            con.close();
            return aux;

        }catch(Exception ex) {
            System.out.println(ex.getMessage());
            return 0;
        }
        
    }
    
    //inserir
    public void inserirPoltrona(int numero, int idvoo, int idcliente) {
     try {

        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps = con.prepareStatement
            ("insert into poltrona_voos "
         + "(numero, voo_id, cliente_id)" 
         + "values(? ,?, ?)");
        ps.setInt(1, numero);
        ps.setInt(2, idvoo);        
        ps.setInt(3, idcliente);        
        ps.execute();
        ps.close();
        con.close();
        }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    //retorna valor do voo
    public double retornaValor(int codigo) {
        double aux = 0;
        try {
            Connection con = ConnectionFactory.getConnection();
            PreparedStatement ps = con.prepareStatement
            ("select voos from voos where id =  "+codigo);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                 aux = rs.getDouble("valorvoo");
            }
            rs.close();
            ps.close();
            con.close();

        }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
        return aux;
    }
    
    //inserir venda
    public void inserirVenda(double valorvoo, int idcliente, int idvooida, int idvoovolta, int poltronaida, int poltronavolta) {
     try {

        Connection con = ConnectionFactory.getConnection();
        PreparedStatement ps = con.prepareStatement
            ("insert into vendas "
         + "(valorvoo, cliente_id, vooida_id, voovolta_id, poltronaida, poltronavolta, datahora)" 
         + "values(? ,?, ?, ?, ?, ?, NOW())");
        ps.setDouble(1, valorvoo);
        ps.setInt(2, idcliente);        
        ps.setInt(3, idvooida);         
        ps.setInt(4, idvoovolta);        
        ps.setInt(5, poltronaida);          
        ps.setInt(6, poltronavolta);        
        ps.execute();
        ps.close();
        con.close();
        }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public VendaBean selecionarVenda(int codigo) {
       
        try {       
            Connection con = ConnectionFactory.getConnection();
            PreparedStatement ps = con.prepareStatement
            ("select * from vendas v INNER JOIN clientes c ON"
            + " v.cliente_id = c.id WHERE v.cliente_id = "+codigo+" ORDER BY datahora DESC LIMIT 1");
            ps.setInt(1, codigo);
            ResultSet rs = ps.executeQuery();
             VendaBean ven = null;
            if(rs.next()){
                ven = new VendaBean(
                    rs.getInt("id"),
                    rs.getDouble("valorvoo"),
                    rs.getInt("cliente_id"),
                    rs.getString("nome"),
                    rs.getInt("vooida_id"),                
                    rs.getInt("voovolta_id"),
                    rs.getInt("poltronaida"),
                    rs.getInt("poltronavolta"),
                    rs.getDate("datahora"));
            }
            rs.close();
            ps.close();
            con.close();
            return ven;
             }catch(Exception ex) {
                System.out.println(ex.getMessage());
                return null;
            }
        
    }
    
    public VooBean selecionarVoo(int codigo) {

        try {       
            Connection con = ConnectionFactory.getConnection();
            PreparedStatement ps = con.prepareStatement
        ("SELECT v.*, " +
        "o.descricao as origemdescricao, o.cidade as origemcidade, o.uf as origemuf, o.sigla as origemsigla, " +
        "d.descricao as destinodescricao, d.cidade as destinocidade, d.uf as destinouf, d.sigla as destinosigla " +
        "FROM voos v " +
        "INNER JOIN aeroportos o ON o.id = v.origem_id " +
        "INNER JOIN aeroportos d ON d.id = v.destino_id " +
        "WHERE v.id = "+codigo);
            VooBean voo = null;
            ResultSet rs = ps.executeQuery();
            SimpleDateFormat sf =  new SimpleDateFormat("dd/MM/yyyy");
            if(rs.next()){
                voo = new VooBean(
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
                        rs.getDouble("valortaxa"));
            }
            rs.close();
            ps.close();
            con.close();
            return voo;

             }catch(Exception ex) {
                System.out.println(ex.getMessage());
                return null;
            }
        
    }

}
