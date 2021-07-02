package br.org.fundecc.gestorusuarios.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "usuarios")
public class UsuarioModel extends Pessoa implements Serializable {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cargo_id", nullable = false, referencedColumnName = "id")
    private CargoModel cargo;

    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Set<PerfilModel> perfis;

    public Set<PerfilModel> getPerfis() {
        return perfis;
    }

    public void setPerfis(Set<PerfilModel> perfis) {
        this.perfis = perfis;
    }

    public CargoModel getCargo() {
        return cargo;
    }

    public void setCargo(CargoModel cargo) {
        this.cargo = cargo;
    }



}
