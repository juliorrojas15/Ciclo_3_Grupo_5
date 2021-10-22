package co.usa.reto.reto.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Client;
import co.usa.reto.reto.repository.ClientRepositorio;

@Service
public class ClientService {
    @Autowired
    private ClientRepositorio clientRepositorio;

    public List<Client> getAll(){
        return clientRepositorio.getAll();
    }

    public Optional<Client> getClient(int Id){
        return clientRepositorio.getClient(Id);
    }

    public Client save (Client client){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(client.getIdClient() == null){    //Si no viene con ID, entonces guardar como nuevo
            return clientRepositorio.save(client);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Client> consulta = clientRepositorio.getClient(client.getIdClient());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return clientRepositorio.save(client);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return client;
            }

        }
    }
}
