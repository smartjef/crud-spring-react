package vstech.learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vstech.learn.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
