package co.usa.reto.reto.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto.reto.model.Client;
import co.usa.reto.reto.model.Reservation;
import co.usa.reto.reto.model.reporte.ContReservation;
import co.usa.reto.reto.repository.CRUD.ReservationCrudRepositorio;

@Repository
public class ReservationRepositorio {
    @Autowired
    private ReservationCrudRepositorio reservationCrudRepositorio;

    public List<Reservation> getAll(){
        return (List<Reservation>)reservationCrudRepositorio.findAll();
    }

    public Optional<Reservation> getReservation(int id){ 
        return reservationCrudRepositorio.findById(id);
    }

    public Reservation save (Reservation reservation){
        return reservationCrudRepositorio.save(reservation);
    }

    public void delete (Reservation reservation){
        reservationCrudRepositorio.delete(reservation);
    }   

    public List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepositorio.findAllByStatus(status);
    }

    public List<Reservation> getReservationByDate(Date startDate, Date devolutionDate){
        return reservationCrudRepositorio.findAllByStartDateAfterAndStartDateBefore(startDate, devolutionDate);
    }

    public List<ContReservation> getReservartionTop(){
        List<ContReservation> res = new ArrayList<>();

        List<Object[]> reporte = reservationCrudRepositorio.ContTotalReservationByClient(); 
        for (int i = 0; i < reporte.size(); i++) {
            res.add(new ContReservation((Long) reporte.get(i)[1],(Client) reporte.get(i)[0]));
        }
        return res;
    }
}
