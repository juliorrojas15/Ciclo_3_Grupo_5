package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Computer;
import co.usa.reto.reto.repository.ComputerRepositorio;

@Service
public class ComputerService {
    
    @Autowired
    private ComputerRepositorio computerRepositorio;

    public List<Computer> getAll(){
        return computerRepositorio.getAll();
    }

    public Optional<Computer> getComputer(int Id){
        return computerRepositorio.getComputer(Id);
    }

    public Computer	save (Computer computer){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(computer.getId() == null){    //Si no viene con ID, entonces guardar como nuevo
            return computerRepositorio.save(computer);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Computer> consulta = computerRepositorio.getComputer(computer.getId());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return computerRepositorio.save(computer);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return computer;
            }

        }
    }
}
