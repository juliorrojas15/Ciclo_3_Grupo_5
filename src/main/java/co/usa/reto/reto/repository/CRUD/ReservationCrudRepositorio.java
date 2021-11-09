package co.usa.reto.reto.repository.CRUD;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.usa.reto.reto.model.Reservation;

public interface ReservationCrudRepositorio extends CrudRepository <Reservation,Integer>{
    
    //Informe de cantidad de reservas en un rango de fechas
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore
        (Date startDate,Date devolutionDate);
    
    //Informe de cantidad de reservas por Estado de Reserva
    public List<Reservation> findAllByStatus(String status);

    //Informe de Top de clientes
    @Query("SELECT r.client, COUNT(r.client) FROM Reservation as r GROUP BY r.client ORDER BY COUNT(r.client) DESC")  
    public List<Object[]> ContTotalReservationByClient();
    
}
