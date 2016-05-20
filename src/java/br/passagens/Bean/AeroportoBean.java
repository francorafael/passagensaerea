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
public class AeroportoBean {
    
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

    private String descricao;

    /**
     * Get the value of descricao
     *
     * @return the value of descricao
     */
    public String getDescricao() {
        return descricao;
    }

    /**
     * Set the value of descricao
     *
     * @param descricao new value of descricao
     */
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    private String cidade;

    /**
     * Get the value of cidade
     *
     * @return the value of cidade
     */
    public String getCidade() {
        return cidade;
    }

    /**
     * Set the value of cidade
     *
     * @param cidade new value of cidade
     */
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    private String uf;

    /**
     * Get the value of uf
     *
     * @return the value of uf
     */
    public String getUf() {
        return uf;
    }

    /**
     * Set the value of uf
     *
     * @param uf new value of uf
     */
    public void setUf(String uf) {
        this.uf = uf;
    }

    private String sigla;

    /**
     * Get the value of sigla
     *
     * @return the value of sigla
     */
    public String getSigla() {
        return sigla;
    }

    /**
     * Set the value of sigla
     *
     * @param sigla new value of sigla
     */
    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public AeroportoBean() {
    }

    public AeroportoBean(int id, String descricao, String cidade, String uf, String sigla) {
        this.id = id;
        this.descricao = descricao;
        this.cidade = cidade;
        this.uf = uf;
        this.sigla = sigla;
    }

}
