/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.Servlet;

import br.passagens.Bean.ClienteBean;
import br.passagens.DAO.ClienteDAO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author rafael.franco
 */
public class SrvCliente extends HttpServlet {

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
            String msg = "";
            if(request.getParameter("btnCadastrar") !=null){
                try{
                    request.getSession().setAttribute("mensagem", null);  
                    if(request.getParameter("nome").equals(""))
                        msg = "Informe o nome<br/>";
                    if(request.getParameter("email").equals(""))
                        msg += "Informe o e-mail<br/>";
                    if(request.getParameter("senha").equals(""))
                        msg += "Informe o sexo<br/>";
                    if(request.getParameter("cpf").equals(""))
                        msg += "Informe o uf<br/>";
                 
                    if(msg.equals("")){
                            ClienteBean cli = 
                            new ClienteBean(
                            0,
                            request.getParameter("nome"),
                            request.getParameter("email"),    
                            request.getParameter("senha"),
                            request.getParameter("cpf")
                            );
                            ClienteDAO dao = new ClienteDAO();
                            dao.inserir(cli);
                            
                            msg = "Dados salvos com sucesso!";
                            
                            request.getSession().setAttribute("mensagem", msg);
                            if(dao.logar(cli.getEmail(), cli.getSenha()) != null)
                            {
                               request.getSession().setAttribute("usuario", cli.getNome());
                            } else {
                                request.getSession().setAttribute("usuario", null);
                            }
                            response.sendRedirect("index.jsp");
                            cli = null;
                            dao = null;
                    }
                }
                catch(Exception ex){
                    msg = "Erro ao salvar." +
                             ex.getMessage();
                    request.getSession().setAttribute("mensagem", msg);
                    response.sendRedirect("cadastre-se.jsp");
                }
                
                
            }
            
            if(request.getParameter("btnLogar") !=null){
            try{
                 ClienteDAO dao = new ClienteDAO();
                if(dao.logar(request.getParameter("email"), request.getParameter("senha")) != null)
                {
                   ClienteBean cli = new ClienteBean();
                   cli = dao.logar(request.getParameter("email"), request.getParameter("senha"));
                   request.getSession().setAttribute("usuario", cli.getNome());
                   response.sendRedirect("index.jsp");
                } else {
                    
                    request.getSession().setAttribute("mensagemlogin", "Usuário ou senha ínvalidos");
                    request.getSession().setAttribute("usuario", null);
                    response.sendRedirect("index.jsp");
                }
            }catch(Exception ex){
                    msg = "Erro ao logar." +
                             ex.getMessage();
                    request.getSession().setAttribute("msgerror", msg);
                    response.sendRedirect("index.jsp");
                }
            }
            
            if(request.getParameter("btnSair") !=null){
            try{
                request.getSession().setAttribute("usuario", null);
                response.sendRedirect("index.jsp");
            }catch(Exception ex){
                    msg = "Erro ao logar." +
                             ex.getMessage();
                    request.getSession().setAttribute("msgerror", msg);
                    response.sendRedirect("index.jsp");
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
