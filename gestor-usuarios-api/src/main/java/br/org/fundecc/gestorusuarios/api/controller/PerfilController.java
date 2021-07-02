package br.org.fundecc.gestorusuarios.api.controller;

import br.org.fundecc.gestorusuarios.api.model.CargoModel;
import br.org.fundecc.gestorusuarios.api.model.PerfilModel;
import br.org.fundecc.gestorusuarios.api.repository.CargoRepository;
import br.org.fundecc.gestorusuarios.api.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/perfil")
public class PerfilController {

    @Autowired
    private PerfilRepository repository;

    @GetMapping(path = "")
    public ResponseEntity getAll(){
        try{
            List<PerfilModel> perfis = repository.findAllByOrderByNomeAsc();
            return ResponseEntity.ok().body(perfis);
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
    public ResponseEntity save(@RequestBody PerfilModel perfil){
        try{
            PerfilModel novoPerfil = repository.save(perfil);
            return ResponseEntity.ok().body(novoPerfil);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PutMapping(path = "")
    public ResponseEntity update(@RequestBody PerfilModel perfil){
        try {
            if(repository.existsById(perfil.getId())){
                PerfilModel novoPerfil = repository.save(perfil);
                return ResponseEntity.ok().body(novoPerfil);
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
            int count = repository.countUsuariosByPerfil(id);
            if(count == 0){
                Optional<PerfilModel> perfil = repository.findById(id);

                return ResponseEntity.ok().body(perfil);
            }else{
                return ResponseEntity.badRequest().body("Não foi possível excluir este perfil pois existem usuários atrelados.");
            }
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }
}
