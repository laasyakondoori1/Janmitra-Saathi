package com.janmitra.repo;

import com.janmitra.model.Complaint;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByUserIdOrderByCreatedAtDesc(String userId);
    List<Complaint> findByStatusOrderByCreatedAtDesc(String status);
    List<Complaint> findAllByOrderByCreatedAtDesc();
}
