package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Message;
import co.usa.reto.reto.repository.MessageRepositorio;

@Service
public class MessageService {
    @Autowired
    private MessageRepositorio messageRepositorio;

    public List<Message> getAll(){
        return messageRepositorio.getAll();
    }

    public Optional<Message> getMessage(int Id){
        return messageRepositorio.getMessage(Id);
    }

    public Message save (Message message){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(message.getIdMessage() == null){    //Si no viene con ID, entonces guardar como nuevo
            return messageRepositorio.save(message);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Message> consulta = messageRepositorio.getMessage(message.getIdMessage());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return messageRepositorio.save(message);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return message;
            }

        }
    }

    public Message update (Message message){
        
        //Verificar si se ingresó un número de ID
        if (message.getIdMessage() != null){
            Optional<Message> consulta = messageRepositorio.getMessage(message.getIdMessage());
            if (!consulta.isEmpty()){
                if (message.getMessageText() != null){
                    consulta.get().setMessageText(message.getMessageText());
                }
                if (message.getClient() != null){
                    consulta.get().setClient(message.getClient());
                }    
                if (message.getComputer() != null){
                    consulta.get().setComputer(message.getComputer());
                }              
                return messageRepositorio.save(consulta.get());
            } 
        }
        return message;
    }

    public boolean deleteMessage (int numId){
        Optional<Message> consulta = messageRepositorio.getMessage(numId);
        if (!consulta.isEmpty()){
            messageRepositorio.delete(consulta.get());
            return true;
        }
        return false;
    }
}

