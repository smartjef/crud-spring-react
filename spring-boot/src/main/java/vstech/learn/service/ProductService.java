package vstech.learn.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.fill.JRExpressionEvalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import vstech.learn.model.Product;
import vstech.learn.repository.CategoryRepository;
import vstech.learn.repository.ProductRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product saveProduct(Product product) {
        product.setCategory(categoryRepository.findById(product.getCategory().getId()).orElse(null));
        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public String exportProducts(String reportFormat) throws FileNotFoundException, JRException {
        List<Product> products = getAllProducts();
        String path = "/home/jeff/Desktop/crud/spring-boot/src/main/resources";
        JRBeanCollectionDataSource productDatasource = new JRBeanCollectionDataSource(products);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("fullName", "Jeff Odhiambo");
        parameters.put("userDescription","Some cool test description");
        parameters.put("productDataset", productDatasource);
        System.out.println(parameters);
        File file = ResourceUtils.getFile(path+"/templates/productreports.jrxml");
        JasperReport report  = JasperCompileManager.compileReport(file.getAbsolutePath());
        JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
        if(reportFormat.equalsIgnoreCase("html")){
            JasperExportManager.exportReportToHtmlFile(print, path+"/static/productreport.html");
        }
        if(reportFormat.equalsIgnoreCase("pdf")){
            JasperExportManager.exportReportToPdfFile(print,path+"/static/productreport.pdf");
        }
        return "Generated Successfully";
    }

}

