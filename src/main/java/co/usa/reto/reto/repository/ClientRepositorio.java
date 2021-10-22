package co.usa.reto.reto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto.reto.model.Client;
import co.usa.reto.reto.repository.CRUD.ClientCrudRepositorio;

@Repository
public class ClientRepositorio {
    @Autowired
    private ClientCrudRepositorio clientCrudRepositorio;

    public List<Client> getAll(){
        return (List<Client>)clientCrudRepositorio.findAll();
    }

    public Optional<Client> getClient(int id){  //Opcional es un tipo de dato que empaqueta la entidad con un valor correcto y también con un valor null
        return clientCrudRepositorio.findById(id);
    }

    public Client save (Client client){
        return clientCrudRepositorio.save(client);
    }

    public void delete (Client client){
        clientCrudRepositorio.delete(client);
    }   
}
