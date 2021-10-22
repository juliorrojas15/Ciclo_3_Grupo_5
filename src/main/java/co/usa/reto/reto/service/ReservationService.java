package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Reservation;
import co.usa.reto.reto.repository.ReservationRepositorio;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepositorio reservationRepositorio;

    public List<Reservation> getAll(){
        return reservationRepositorio.getAll();
    }

    public Optional<Reservation> getReservation(int Id){
        return reservationRepositorio.getReservation(Id);
    }

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
}

