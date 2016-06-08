/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.Servlet;

import br.passagens.Bean.VooBean;
import br.passagens.DAO.VooDAO;
import com.mysql.fabric.Response;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.jms.Session;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.PageContext;



/**
 *
 * @author rafael.franco
 */
public class SrvPassagem extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
            //COMPRAR PASSAGEM
            if(request.getParameter("btnComprar") != null) 
            {
                if(request.getSession().getAttribute("usuario") != null)
                {
                    //passagem ida
                    if(request.getParameter("ida") != null) 
                    {
                        request.getSession().setAttribute("seleciona", null);                        
                        request.getSession().setAttribute("selecionavolta", null);

                         //passar parametros por sessao
                        request.getSession().setAttribute("voo_ida", request.getParameter("ida"));
                        //passagem volta
                        if(request.getParameter("volta") != null) 
                        {
                            request.getSession().setAttribute("voo_volta", request.getParameter("volta"));
                        }  else {
                            request.getSession().setAttribute("voo_volta", null);
                        }
                        
                       
                        // e redireciona para a tela de seleção de passagens
                        response.sendRedirect("selecionar.jsp");
                        
                        
                    } else {
                            //MENSAGEM NENHUMA PASSAGEM SELECIONADA
                          String mensagem = ""
                            + "   <div class=\"row-fluid top-bar clearfix\">\n" +
"        <div class=\"container\">"
                            + "<div class='alert alert-danger'>"
                            + "Selecione pelo menos a passagem de ida!!!!"
                            + "</div>"
                            + "</div>"
                            + "</div>";
                    response.sendRedirect("index.jsp?msgcomprar="+mensagem);
                    }
                   
                } else {
                    String mensagem = ""
                            + "   <div class=\"row-fluid top-bar clearfix\">\n" +
"        <div class=\"container\">"
                            + "<div class='alert alert-danger'>"
                            + "Por favor efetue o cadastre e logue em sua conta para comprar!"
                            + "</div>"
                            + "</div>"
                            + "</div>";
                    response.sendRedirect("index.jsp?msgcomprar="+mensagem);
                }
                
            }
            
            //PESQUISAR VOOS
            if (request.getParameter("btnpesquisar") != null) {

                
                String msg = "";
                request.getSession().setAttribute("erros", null);
                
                //IDA E VOLTA
                String origemidaevolta = "";
                String destinoidaevolta = "";
                String start = "";
                String end = "";
                String adulto = "";
                String crianca = "";

                //SOMENTE IDA
                String origemida = "";
                String destinoida = "";
                String startida = "";
                String adultoida = "";
                String criancaida = "";

                try {
                    request.getSession().setAttribute("conteudoida", null);                    
                    request.getSession().setAttribute("conteudovolta", null);

                    
                    if (request.getParameter("valorselecao").equals("I")) {
                        //BUSCA SOMENTE IDA
                        origemida = request.getParameter("origem-ida");
                        destinoida = request.getParameter("destino-ida");
                        startida = request.getParameter("startida");

                        if (origemida.equals("")) {
                            msg += "Selecione a origem <br />";
                        }
                        if (destinoida.equals("")) {
                            msg += "Selecione o destino <br />";
                        }
                        if (startida.equals("")) {
                            msg += "Selecione a data de ida <br />";
                        }
                        if (origemida.equals(destinoida)) {
                            msg += "Os aeroportos são iguais, selecione o destino diferente de origem<br />";
                        }

                        if (msg.equals("")) {
                            //LISTA VOOS SOMENTE IDA
                            
                            VooDAO dao = new VooDAO();
                            String conteudo = "";
                            List<VooBean> listavooida = dao.listaVoo(startida, Integer.parseInt(origemida), Integer.parseInt(destinoida));
                            if (listavooida != null) {

                                for (VooBean viv : listavooida) {
                                    conteudo += "<tr>"
                                            + "                                <td width=\"20%\"><input required type=\"radio\" name=\"ida\" value=" + viv.getId() + " /></td>\n"
                                            + "                                <td width=\"20%\">DE: <h4>" + viv.getOrigemsigla() + "</h4><br /><span>" + viv.getOrigemcidade() + "</span></td>\n"
                                            + "                                <td width=\"20%\"><h4>SAÍDA</h4><br /><span>" + viv.getDatainicio() + "</span><br />" + viv.getHorainicio() + "</td>\n"
                                            + "                                <td width=\"20%\">PARA: <h4>" + viv.getDestinosigla() + "</h4><br /><span>" + viv.getDestinocidade() + "</span></td>\n"
                                            + "                                <td width=\"20%\"><h4>CHEGADA</h4><br /><span>" + viv.getDatachegada() + "</span><br />" + viv.getHorachegada() + "</td>\n"
                                            + "                                <td width=\"20%\"><h4>R$ " + viv.getValoradulto()+ "</h4></td>\n"
                                            + "                            </tr>  ";
                                } 

                                request.getSession().setAttribute("conteudoida", conteudo);
                                request.getSession().setAttribute("pesq_origem", origemida);
                                request.getSession().setAttribute("pesq_destino", destinoida);
                                request.getSession().setAttribute("pesq_start", startida);
                                request.getSession().setAttribute("pesq_end", null);
                                   
                            } else {
                                request.getSession().setAttribute("conteudoida", "<tr><td colspan='6'>Não há voos nessa data</td></tr>");
                            }
                                response.sendRedirect("index.jsp");
                            } else {
                                request.getSession().setAttribute("erros", ""
                                    + "<div class=\"alert alert-danger\">\n" +
                                        "  <strong>ATENÇÃO!</strong><br /> "+msg+"\n" +
                                        "</div>"
                                    + "");
                            
                            response.sendRedirect("index.jsp");
                            }

                    } else if (request.getParameter("valorselecao").equals("IV")) {
                        // BUSCA IDA E VOLTA

                        origemidaevolta = request.getParameter("origem-ida-volta");
                        destinoidaevolta = request.getParameter("destino-ida-volta");
                        start = request.getParameter("start");
                        end = request.getParameter("end");

                        if (origemidaevolta.equals("")) {
                            msg += "Selecione a origem <br />";
                        }
                        if (destinoidaevolta.equals("")) {
                            msg += "Selecione o destino <br />";
                        }
                        if (start.equals("")) {
                            msg += "Selecione a data de ida <br />";
                        }
                        if (end.equals("")) {
                            msg += "Selecione a data de volta <br />";
                        }

                        if (origemidaevolta.equals(destinoidaevolta)) {
                            msg += "Os aeroportos são iguais, selecione o destino diferente de origem<br />";
                        }

                        if (msg.equals("")) {
                            
                           //VALIDAR DATA 
                        VooDAO dao = new VooDAO();
                        String conteudo = "";
                        List<VooBean> listavooida = dao.listaVoo(start, Integer.parseInt(origemidaevolta), Integer.parseInt(destinoidaevolta));
                        if (listavooida != null) {
                            
                            for (VooBean viv : listavooida) {
                                conteudo += "<tr>"
                                        + "                                <td width=\"20%\"><input required type=\"radio\" name=\"ida\" value=" + viv.getId() + " /></td>\n"
                                        + "                                <td width=\"20%\">DE: <h4>" + viv.getOrigemsigla() + "</h4><br /><span>" + viv.getOrigemcidade() + "</span></td>\n"
                                        + "                                <td width=\"20%\"><h4>SAÍDA</h4><br /><span>" + viv.getDatainicio() + "</span><br />" + viv.getHorainicio() + "</td>\n"
                                        + "                                <td width=\"20%\">PARA: <h4>" + viv.getDestinosigla() + "</h4><br /><span>" + viv.getDestinocidade() + "</span></td>\n"
                                        + "                                <td width=\"20%\"><h4>CHEGADA</h4><br /><span>" + viv.getDatachegada() + "</span><br />" + viv.getHorachegada() + "</td>\n"
                                        + "                                <td width=\"20%\"><h4>R$ " + viv.getValoradulto()+ "</h4></td>\n"
                                        + "                            </tr>  ";
                            } 
                            
                            request.getSession().setAttribute("pesq_origem", origemidaevolta);
                            request.getSession().setAttribute("pesq_destino", destinoidaevolta);
                            request.getSession().setAttribute("pesq_start", start);
                            request.getSession().setAttribute("pesq_end", end);
                            
                            request.getSession().setAttribute("conteudoida", conteudo);
                        } else {
                            request.getSession().setAttribute("conteudoida", "<tr><td colspan='6'>Não há voos nessa data</td></tr>");
                        }
                        
                        
                        
                        //VALIDAR DATA 
                        VooDAO daoVolta = new VooDAO();
                        String conteudoVolta = "";
                        List<VooBean> listavoovolta = daoVolta.listaVoo(end, Integer.parseInt(destinoidaevolta), Integer.parseInt(origemidaevolta));
                        if (listavoovolta != null) {
                            
                            for (VooBean vivVolta : listavoovolta) {
                                conteudoVolta += "<tr>"
                                        + "                                <td width=\"20%\"><input required type=\"radio\" name=\"volta\" value=" + vivVolta.getId() + " /></td>\n"
                                        + "                                <td width=\"20%\">DE: <h4>" + vivVolta.getOrigemsigla() + "</h4><br /><span>" + vivVolta.getOrigemcidade() + "</span></td>\n"
                                        + "                                <td width=\"20%\"><h4>SAÍDA</h4><br /><span>" + vivVolta.getDatainicio() + "</span><br />" + vivVolta.getHorainicio() + "</td>\n"
                                        + "                                <td width=\"20%\">PARA: <h4>" + vivVolta.getDestinosigla() + "</h4><br /><span>" + vivVolta.getDestinocidade() + "</span></td>\n"
                                        + "                                <td width=\"20%\"><h4>CHEGADA</h4><br /><span>" + vivVolta.getDatachegada() + "</span><br />" + vivVolta.getHorachegada() + "</td>\n"
                                        + "                                <td width=\"20%\"><h4>R$ " + vivVolta.getValoradulto()+ "</h4></td>\n"
                                        + "                            </tr>  ";
                            } 
                            
                            
                            request.getSession().setAttribute("conteudovolta", conteudoVolta);
                        } else {
                            request.getSession().setAttribute("conteudovolta", "<tr><td colspan='6'>Não há voos nessa data</td></tr>");
                        }
                        
                        
                          response.sendRedirect("index.jsp");  
                            

                        } else {
                            request.getSession().setAttribute("erros", ""
                                    + "<div class=\"alert alert-danger\">\n" +
                                        "  <strong>ATENÇÃO!</strong><br /> "+msg+"\n" +
                                        "</div>"
                                    + "");
                            
                            response.sendRedirect("index.jsp");
                        }

                    }
                } catch (Exception ex) {

                }
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
