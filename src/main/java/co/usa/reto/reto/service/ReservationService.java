/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.reto.reto.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.usa.reto.reto.model.Reservation;
import co.usa.reto.reto.repository.ReservationRepositorio;

/**
 *  Reservation Service
 */
@Service
public class ReservationService {
    
    /**
     * Repositorio principal
     */
    @Autowired
    private ReservationRepositorio reservationRepositorio;

    /**
     * Get All
     * @return
     */
    public List<Reservation> getAll(){
        return reservationRepositorio.getAll();
    }

    /**
     * getReservation
     * @param Id
     * @return
     */
    public Optional<Reservation> getReservation(int Id){
        return reservationRepositorio.getReservation(Id);
    }

    /**
     * save
     * @param reservation
     * @return
     */
    public Reservation save (Reservation reservation){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(reservation.getIdReservation() == null){    //Si no viene con ID, entonces guardar como nuevo
            reservation.setStatus("created");
            return reservationRepositorio.save(reservation);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Reservation> consulta = reservationRepositorio.getReservation(reservation.getIdReservation());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return reservationRepositorio.save(reservation);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return reservation;
            }

        }
    }

    /**
     * update
     * @param reservation
     * @return
     */
    public Reservation update (Reservation reservation){
        
        //Verificar si se ingresó un número de ID
        if (reservation.getIdReservation() != null){
            Optional<Reservation> consulta = reservationRepositorio.getReservation(reservation.getIdReservation());
            if (!consulta.isEmpty()){
                if (reservation.getStartDate() != null){
                    consulta.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null){
                    consulta.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null){
                    consulta.get().setStatus(reservation.getStatus());
                }
                
                return reservationRepositorio.save(consulta.get());
            } 
        }
        return reservation;
    }

    /**
     * deleteReservation
     * @param numId
     * @return
     */
    public boolean deleteReservation (int numId){
        Optional<Reservation> consulta = reservationRepositorio.getReservation(numId);
        if (!consulta.isEmpty()){
            reservationRepositorio.delete(consulta.get());
            return true;
        }
        return false;
    }
}

