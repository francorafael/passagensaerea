package classes;


import br.passagens.DAO.ConnectionFactory;
import br.passagens.DAO.VooDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author home
 */
public class Passagens {
    
    
    public void seleciona(int numero){
        
    }
    
    public List<Poltronas> buscaPoltronas(int codigovoo){
        VooDAO voo = new VooDAO();
        int qtdpoltronas = 0;
        boolean verifica = false;
        
        qtdpoltronas = voo.selecionar(codigovoo);
                
        List<Poltronas> lista = new ArrayList<Poltronas>();
        
        for(int i = 1; i<= qtdpoltronas; i++) {
            if(voo.verificarPoltrona(codigovoo, i) != 0) {
                verifica = true;
            } else {
                verifica = false;
            }
            lista.add(new Poltronas(i,verifica));
        }
        return lista;
    }
    

}
