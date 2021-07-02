package br.org.fundecc.gestorusuarios.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "cargos")
public class CargoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false, unique = true)
    public String nome;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
