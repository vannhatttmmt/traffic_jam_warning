package application.data.repository;

import application.data.entity.TrafficData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TrafficRepository extends JpaRepository<TrafficData, Integer> {
    @Query("select count(t.id) from tbl_trafficdata t") long getTotalTrafficData();
}
