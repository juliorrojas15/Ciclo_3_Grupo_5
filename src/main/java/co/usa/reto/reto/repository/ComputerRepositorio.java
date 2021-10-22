package co.usa.reto.reto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto.reto.model.Computer;
import co.usa.reto.reto.repository.CRUD.ComputerCrudRepositorio;

@Repository
public class ComputerRepositorio {
  
    @Autowired
    private ComputerCrudRepositorio computerCrudRepositorio;

    public List<Computer> getAll(){
        return (List<Computer>)computerCrudRepositorio.findAll();
    }

    public Optional<Computer> getComputer(int id){  //Opcional es un tipo de dato que empaqueta la entidad con un valor correcto y también con un valor null
        return computerCrudRepositorio.findById(id);
    }

    public Computer save (Computer computer){
        return computerCrudRepositorio.save(computer);
    }

    public void delete (Computer computer){
        computerCrudRepositorio.delete(computer);
    }  
}
