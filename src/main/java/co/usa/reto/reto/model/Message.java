package co.usa.reto.reto.model;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="message")
public class Message implements Serializable {

    //############################################################# Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    //############################################################## Relaición entidades
    @ManyToOne
    @JoinColumn (name = "computer")
    @JsonIgnoreProperties({"messages","reservations"})
    private Computer computer;

    @ManyToOne
    @JoinColumn (name = "client")
    @JsonIgnoreProperties({"messages","reservations"})
    private Client client;
  
    //##############################################################    GETTERS and SETTERS
    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Computer getComputer() {
        return computer;
    }

    public void setComputer(Computer computer) {
        this.computer = computer;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


    
}