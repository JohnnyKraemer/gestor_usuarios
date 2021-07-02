package br.org.fundecc.gestorusuarios.api.repository;

import br.org.fundecc.gestorusuarios.api.model.PerfilModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PerfilRepository extends CrudRepository<PerfilModel, Integer> {

    PerfilModel findByNome(String name);

    List<PerfilModel> findAllByOrderByIdAsc();

    List<PerfilModel> findAllByOrderByIdDesc();

    List<PerfilModel> findAllByOrderByNomeAsc();

    List<PerfilModel> findAllByOrderByNomeDesc();

    List<PerfilModel> findTop10ByOrderByIdDesc();

    @Query(value = "SELECT COUNT(perfis_id) as count FROM usuarios_perfis WHERE usuarios_perfis.perfis_id = :perfis_id", nativeQuery = true)
    int countUsuariosByPerfil(@Param("perfis_id") Integer perfis_id);
}
