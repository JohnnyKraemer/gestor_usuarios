package br.org.fundecc.gestorusuarios.api.controller;

import br.org.fundecc.gestorusuarios.api.model.UsuarioModel;
import br.org.fundecc.gestorusuarios.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@CrossOrigin
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping(path = "")
    public ResponseEntity getAll(){
        try{
            List<UsuarioModel> usuarios = repository.findAllByOrderByNomeAsc();
            return ResponseEntity.ok().body(usuarios);
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
    public ResponseEntity save(@RequestBody UsuarioModel usuario){
        try{
            UsuarioModel novoUsuario = repository.save(usuario);
            return ResponseEntity.ok().body(novoUsuario);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PutMapping(path = "")
    public ResponseEntity update(@RequestBody UsuarioModel usuario){
        try {
            if(repository.existsById(usuario.getId())){
                UsuarioModel novoUsuario = repository.save(usuario);
                return ResponseEntity.ok().body(novoUsuario);
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
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }
}
