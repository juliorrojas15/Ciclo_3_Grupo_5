package co.usa.reto.reto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto.reto.model.Category;
import co.usa.reto.reto.repository.CRUD.CategoryCrudRepositorio;

@Repository
public class CategoryRepositorio {

    @Autowired
    private CategoryCrudRepositorio categoryCrudRepositorio;

    public List<Category> getAll(){
        return (List<Category>)categoryCrudRepositorio.findAll();
    }

    public Optional<Category> getCategory(int id){  //Opcional es un tipo de dato que empaqueta la entidad con un valor correcto y también con un valor null
        return categoryCrudRepositorio.findById(id);
    }

    public Category save (Category ctgy){
        return categoryCrudRepositorio.save(ctgy);
    }

    public void delete (Category ctgy){
        categoryCrudRepositorio.delete(ctgy);
    }
}
