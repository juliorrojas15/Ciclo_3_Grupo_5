package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Category;
import co.usa.reto.reto.repository.CategoryRepositorio;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepositorio categoryRepositorio;

    public List<Category> getAll(){
        return categoryRepositorio.getAll();
    }

    public Optional<Category> getCategory(int Id){
        return categoryRepositorio.getCategory(Id);
    }

    public Category	save (Category ctgy){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(ctgy.getId() == null){    //Si no viene con ID, entonces guardar como nuevo
            return categoryRepositorio.save(ctgy);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Category> consulta = categoryRepositorio.getCategory(ctgy.getId());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return categoryRepositorio.save(ctgy);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return ctgy;
            }

        }
    }
}
