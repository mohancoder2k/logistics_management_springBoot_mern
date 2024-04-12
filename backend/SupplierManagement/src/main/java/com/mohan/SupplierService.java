package com.mohan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Optional<Supplier> getSupplierById(Long id) {
        return supplierRepository.findById(id);
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier newSupplier) {
        if (supplierRepository.existsById(id)) {
            newSupplier.setId(id);
            return supplierRepository.save(newSupplier);
        } else {
            return null; // Or throw an exception
        }
    }

    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }
}
