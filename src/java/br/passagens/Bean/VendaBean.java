/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.passagens.Bean;

import java.util.Date;

/**
 *
 * @author rafael.franco
 */
public class VendaBean {
       
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

       private double valorvoo;

    /**
     * Get the value of valorvoo
     *
     * @return the value of valorvoo
     */
    public double getValorvoo() {
        return valorvoo;
    }

    /**
     * Set the value of valorvoo
     *
     * @param valorvoo new value of valorvoo
     */
    public void setValorvoo(double valorvoo) {
        this.valorvoo = valorvoo;
    }

    private int cliente_id;

    /**
     * Get the value of cliente_id
     *
     * @return the value of cliente_id
     */
    public int getCliente_id() {
        return cliente_id;
    }

    /**
     * Set the value of cliente_id
     *
     * @param cliente_id new value of cliente_id
     */
    public void setCliente_id(int cliente_id) {
        this.cliente_id = cliente_id;
    }

    private String cliente_nome;

    /**
     * Get the value of cliente_nome
     *
     * @return the value of cliente_nome
     */
    public String getCliente_nome() {
        return cliente_nome;
    }

    /**
     * Set the value of cliente_nome
     *
     * @param cliente_nome new value of cliente_nome
     */
    public void setCliente_nome(String cliente_nome) {
        this.cliente_nome = cliente_nome;
    }

    private int vooida_id;

    /**
     * Get the value of vooida_id
     *
     * @return the value of vooida_id
     */
    public int getVooida_id() {
        return vooida_id;
    }

    /**
     * Set the value of vooida_id
     *
     * @param vooida_id new value of vooida_id
     */
    public void setVooida_id(int vooida_id) {
        this.vooida_id = vooida_id;
    }

    private int voovolta_id;

    /**
     * Get the value of voovolta_id
     *
     * @return the value of voovolta_id
     */
    public int getVoovolta_id() {
        return voovolta_id;
    }

    /**
     * Set the value of voovolta_id
     *
     * @param voovolta_id new value of voovolta_id
     */
    public void setVoovolta_id(int voovolta_id) {
        this.voovolta_id = voovolta_id;
    }

    private int poltronaida;

    /**
     * Get the value of poltronaida
     *
     * @return the value of poltronaida
     */
    public int getPoltronaida() {
        return poltronaida;
    }

    /**
     * Set the value of poltronaida
     *
     * @param poltronaida new value of poltronaida
     */
    public void setPoltronaida(int poltronaida) {
        this.poltronaida = poltronaida;
    }

    private int poltronavolta;

    /**
     * Get the value of poltronavolta
     *
     * @return the value of poltronavolta
     */
    public int getPoltronavolta() {
        return poltronavolta;
    }

    /**
     * Set the value of poltronavolta
     *
     * @param poltronavolta new value of poltronavolta
     */
    public void setPoltronavolta(int poltronavolta) {
        this.poltronavolta = poltronavolta;
    }

    private Date datahora;

    /**
     * Get the value of datahora
     *
     * @return the value of datahora
     */
    public Date getDatahora() {
        return datahora;
    }

    /**
     * Set the value of datahora
     *
     * @param datahora new value of datahora
     */
    public void setDatahora(Date datahora) {
        this.datahora = datahora;
    }

    public VendaBean() {
    }

    public VendaBean(int id, double valorvoo, int cliente_id, String cliente_nome, int vooida_id, int voovolta_id, int poltronaida, int poltronavolta, Date datahora) {
        this.id = id;
        this.valorvoo = valorvoo;
        this.cliente_id = cliente_id;
        this.cliente_nome = cliente_nome;
        this.vooida_id = vooida_id;
        this.voovolta_id = voovolta_id;
        this.poltronaida = poltronaida;
        this.poltronavolta = poltronavolta;
        this.datahora = datahora;
    }

    
    
    
    
    
    
    
    
}
