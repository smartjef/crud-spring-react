package vstech.learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vstech.learn.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
