package co.usa.reto.reto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto.reto.model.Score;
import co.usa.reto.reto.repository.ScoreRepositorio;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepositorio scoreRepositorio;

    public List<Score> getAll(){
        return scoreRepositorio.getAll();
    }

    public Optional<Score> getScore(int Id){
        return scoreRepositorio.getScore(Id);
    }

    public Score save (Score score){
        //Verificar si el objeto es nuevo, de ser así guardar

        if(score.getIdScore() == null){    //Si no viene con ID, entonces guardar como nuevo
            return scoreRepositorio.save(score);
        }
        else{   //Si viene con ID, hay dos opciones, que exista o no
            Optional<Score> consulta = scoreRepositorio.getScore(score.getIdScore());
            if(consulta.isEmpty()){     //Si la consulta de codigos no existe pues guardar como nuevo
                return scoreRepositorio.save(score);

            }else{      //Pero si si existia en la consulta, entoces sobreescribirlo
                return score;
            }

        }
    }
}
