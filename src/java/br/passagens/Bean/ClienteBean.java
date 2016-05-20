/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.Bean;

/**
 *
 * @author rafael.franco
 */
public class ClienteBean {
    
    private int id;

    /**
     * Get the value of id
     *
     * @return the value of id
     */
    public int getId() {
        return id;
    }

    /**
     * Set the value of id
     *
     * @param id new value of id
     */
    public void setId(int id) {
        this.id = id;
    }

    private String nome;

    /**
     * Get the value of nome
     *
     * @return the value of nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * Set the value of nome
     *
     * @param nome new value of nome
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    private String email;

    /**
     * Get the value of email
     *
     * @return the value of email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Set the value of email
     *
     * @param email new value of email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    private String senha;

    /**
     * Get the value of senha
     *
     * @return the value of senha
     */
    public String getSenha() {
        return senha;
    }

    /**
     * Set the value of senha
     *
     * @param senha new value of senha
     */
    public void setSenha(String senha) {
        this.senha = senha;
    }

    private String cpf;

    /**
     * Get the value of cpf
     *
     * @return the value of cpf
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * Set the value of cpf
     *
     * @param cpf new value of cpf
     */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public ClienteBean() {
    }

    public ClienteBean(int id, String nome, String email, String senha, String cpf) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }
    
    

}
