package co.usa.reto.reto.repository.CRUD;

import org.springframework.data.repository.CrudRepository;

import co.usa.reto.reto.model.Message;

public interface MessageCrudRepositorio extends CrudRepository <Message,Integer>{
    
}
