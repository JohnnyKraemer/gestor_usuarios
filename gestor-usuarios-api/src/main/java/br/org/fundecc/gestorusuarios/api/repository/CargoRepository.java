package br.org.fundecc.gestorusuarios.api.repository;

import br.org.fundecc.gestorusuarios.api.model.CargoModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CargoRepository extends CrudRepository<CargoModel, Integer> {

    CargoModel findByNome(String name);

    List<CargoModel> findAllByOrderByIdAsc();

    List<CargoModel> findAllByOrderByIdDesc();

    List<CargoModel> findAllByOrderByNomeAsc();

    List<CargoModel> findAllByOrderByNomeDesc();

    List<CargoModel> findTop10ByOrderByIdDesc();
}
