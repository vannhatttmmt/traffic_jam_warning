package application.data.repository;

import application.data.entity.TrafficData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrafficRepository extends JpaRepository<TrafficData, Integer>{
//    @Query("select p from TrafficData p where p.deviceId like ?1 order by deviceId")
//    List<TrafficData> findByDeviceId(String deviceId);
    List<TrafficData> findByDeviceId(String deviceId);

}
