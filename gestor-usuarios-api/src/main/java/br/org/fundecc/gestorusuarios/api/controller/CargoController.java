package br.org.fundecc.gestorusuarios.api.controller;

import br.org.fundecc.gestorusuarios.api.model.CargoModel;
import br.org.fundecc.gestorusuarios.api.model.UsuarioModel;
import br.org.fundecc.gestorusuarios.api.repository.CargoRepository;
import br.org.fundecc.gestorusuarios.api.repository.UsuarioRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/cargo")
public class CargoController {

    @Autowired
    private CargoRepository repository;

    @GetMapping(path = "")
    public ResponseEntity getAll(){
        try{
            List<CargoModel> cargos = repository.findAllByOrderByNomeAsc();
            return ResponseEntity.ok().body(cargos);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity get(@PathVariable("id") Integer id){
        try{
            return repository.findById(id).
                    map(record -> ResponseEntity.ok().body(record))
                    .orElse(ResponseEntity.notFound().build());
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping(path = "")
    public ResponseEntity save(@RequestBody CargoModel cargo){
        try{
            CargoModel novoCargo = repository.save(cargo);
            return ResponseEntity.ok().body(novoCargo);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PutMapping(path = "")
    public ResponseEntity update(@RequestBody CargoModel cargo){
        try {
            if(repository.existsById(cargo.getId())){
                CargoModel novoCargo = repository.save(cargo);
                return ResponseEntity.ok().body(novoCargo);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        try{
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex);
        }
    }
}
