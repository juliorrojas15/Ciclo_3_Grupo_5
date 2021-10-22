package co.usa.reto.reto.repository.CRUD;
import org.springframework.data.repository.CrudRepository;
import co.usa.reto.reto.model.Client;

public interface ClientCrudRepositorio  extends CrudRepository <Client,Integer> {
    
}
