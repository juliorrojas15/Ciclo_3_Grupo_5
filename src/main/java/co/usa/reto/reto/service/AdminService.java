package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Admin;
import co.usa.reto.reto.repository.AdminRepositorio;

@Service
public class AdminService {
    @Autowired
    private AdminRepositorio adminRepositorio;

    public List<Admin> getAll(){
        return adminRepositorio.getAll();
    }

    public Optional<Admin> getAdmin(int Id){
        return adminRepositorio.getAdmin(Id);
    }

    public Admin save (Admin admin){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(admin.getIdAdmin() == null){    //Si no viene con ID, entonces guardar como nuevo
            return adminRepositorio.save(admin);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Admin> consulta = adminRepositorio.getAdmin(admin.getIdAdmin());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return adminRepositorio.save(admin);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return admin;
            }

        }
    }

    public Admin update (Admin admin){
        
        //Verificar si se ingresó un número de ID
        if (admin.getIdAdmin() != null){
            Optional<Admin> consulta = adminRepositorio.getAdmin(admin.getIdAdmin());
            if (!consulta.isEmpty()){
                if (admin.getName() != null){
                    consulta.get().setName(admin.getName());
                }
                if (admin.getEmail() != null){
                    consulta.get().setEmail(admin.getEmail());
                }
                if (admin.getPassword() != null){
                    consulta.get().setPassword (admin.getPassword());
                }
                return adminRepositorio.save(consulta.get());
            } 
        }
        return admin;
    }

    public boolean deleteAdmin (int numId){
        Optional<Admin> consulta = adminRepositorio.getAdmin(numId);
        if (!consulta.isEmpty()){
            adminRepositorio.delete(consulta.get());
            return true;
        }
        return false;
    }
}
