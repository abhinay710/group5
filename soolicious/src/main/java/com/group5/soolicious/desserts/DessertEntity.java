package com.group5.soolicious.desserts;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.group5.soolicious.employees.EmployeeEntity;
import com.group5.soolicious.utils.converter.StatusYN;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter@Entity
@Table(name = "Dessert")
public class DessertEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "glutenFreeYN")
    private StatusYN glutenFreeYN;

    @Column(name = "sugarFreeYN")
    private StatusYN sugarFreeYN;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "price")
    private Double price;

    @Column(name = "timeToPrepare")
    private String timeToPrepare;

    @ManyToOne
    @JoinColumn(name = "employeeID")
    private EmployeeEntity employee;

    @OneToMany(mappedBy = "dessert", cascade = CascadeType.ALL)
    private List<DessertPrepEntity> dessertPreps;
}
