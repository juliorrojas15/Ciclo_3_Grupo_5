package co.usa.reto.reto.web;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import co.usa.reto.reto.model.Reservation;
import co.usa.reto.reto.model.reporte.ContReservation;
import co.usa.reto.reto.model.reporte.ContReservationStatus;
import co.usa.reto.reto.service.ReservationService;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, 
                                        RequestMethod.DELETE, RequestMethod.PUT })
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return reservationService.getAll();
    }

    @GetMapping("/{numId}")
    public Optional<Reservation> getByID(@PathVariable("numId") int Id){
        return reservationService.getReservation(Id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation){
        return reservationService.save(reservation);
    } 

    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation){
        return reservationService.update(reservation);
    }

    @DeleteMapping("/{numId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteReservation(@PathVariable("numId") int numId){
        return reservationService.deleteReservation(numId);
    }

    @GetMapping("/report-status")
    public ContReservationStatus getReservationStatus(){
        return reservationService.getReservationStatus();
    }

    @GetMapping("/report-clients")
    public List<ContReservation> getReservationTop(){
        return reservationService.getReservartionTop();
    }

    @GetMapping("/report-dates/{date1}/{date2}")
    public List<Reservation> getReservationDate(
            @PathVariable("date1") String date1,@PathVariable("date2") String date2){
        return reservationService.gerReservationByDate(date1,date2);
    }


}
