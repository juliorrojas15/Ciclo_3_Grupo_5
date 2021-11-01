/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.reto.reto.model;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * @author Julio Rojas
 */
@Entity
@Table(name = "computer")
public class Computer  implements Serializable {
    
    //############################################################# Atributos
     /**
     * Identificador
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    /**
     * Nombre
     */
    private String name;

    /**
     * brand
     */
    private String brand;

    /**
     * year
     */
    private Integer year;

    /**
     * description
     */
    private String description;


    //############################################################## Relaición entidades

    /**
     * Relación de tabla Category Muchos a uno
     */
    @ManyToOne
    @JoinColumn (name = "category") //Nombre de la columna en esta tabla
    @JsonIgnoreProperties("computers") //Siempre ignorarse a si mismo
    private Category category;

    /**
     * Relación de tabla comuputer Muchos a uno y filtro de client
     */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
    @JsonIgnoreProperties({"computer","client"})
    private List<Message> messages;

    /**
     * Relación de tabla comuputer Muchos a uno
     */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
    @JsonIgnoreProperties("computer")
    private List<Reservation> reservations;

    //##############################################################    GETTERS and SETTERS
    
    /**
     * get
     */
    public Integer getId() {
        return id;
    }

    /**
     * set
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * get
     */
    public String getName() {
        return name;
    }

    /**
     * set
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * get
     */
    public String getBrand() {
        return brand;
    }

    /**
     * set
     * @param brand
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }

    /**
     * get
     */
    public Integer getYear() {
        return year;
    }

    /**
     * set
     * @param year
     */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
     * get
     */
    public String getDescription() {
        return description;
    }

    /**
     * set
     * @param description
     */
    public void setDescripcion(String description) {
        this.description = description;
    }

    /**
     * get
     */
    public Category getCategory() {
        return category;
    }

    /**
     * set
     * @param category
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * get
     */
    public List<Message> getMessages() {
        return messages;
    }

    /**
     * set
     * @param messages 
     */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    /**
     * get 
     */
    public List<Reservation> getReservations() {
        return reservations;
    }

    /**
     * set
     * @param reservations
     */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
