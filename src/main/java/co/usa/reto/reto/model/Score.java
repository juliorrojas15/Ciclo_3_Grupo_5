package co.usa.reto.reto.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table (name = "score")
public class Score implements Serializable{
    //############################################################# Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idScore;
    private Integer calificacion;
    private String mensaje;

    //############################################################## Relaciones entidades
    

    //##############################################################    GETTERS and SETTERS
    

    public Integer getIdScore() {
        return idScore;
    }
    public void setIdScore(Integer idScore) {
        this.idScore = idScore;
    }
    public Integer getCalificacion() {
        return calificacion;
    }
    public void setCalificacion(Integer calificacion) {
        this.calificacion = calificacion;
    }
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }


    
}
