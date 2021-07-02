package br.org.fundecc.gestorusuarios.api.repository;

import br.org.fundecc.gestorusuarios.api.model.UsuarioModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UsuarioRepository extends CrudRepository<UsuarioModel, Integer> {

    UsuarioModel findByNome(String name);

    List<UsuarioModel> findAllByOrderByIdAsc();

    List<UsuarioModel> findAllByOrderByIdDesc();

    List<UsuarioModel> findAllByOrderByNomeAsc();

    List<UsuarioModel> findAllByOrderByNomeDesc();

    List<UsuarioModel> findTop10ByOrderByIdDesc();
}
