package vstech.learn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "product")
public class Product {
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Setter
    @Column(nullable = false)
    private double price;

    @Setter
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Setter
    @Column(name = "image_url")
    private String imageUrl;

    public Product() {

    }
    public Product(Category category) {
        this.category = category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
