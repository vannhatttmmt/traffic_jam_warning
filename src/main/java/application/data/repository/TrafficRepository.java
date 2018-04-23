package application.data.repository;

import application.data.entity.TrafficData;
import application.model.AvgSpeedModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrafficRepository extends JpaRepository<TrafficData, Integer> {
    List<TrafficData> findByDeviceId(String deviceId);
@Query("SELECT " +
        "    new application.model.AvgSpeedModel(count(distinct v.deviceId), v.pathName, avg(v.speed)) " +
        "FROM " +
        "    tbl_trafficdata v " +
        "GROUP BY " +
        "    v.pathName")
    List<AvgSpeedModel> getAvgSpeed();
}
