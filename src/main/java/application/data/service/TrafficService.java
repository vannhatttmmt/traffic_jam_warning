package application.data.service;

import application.data.entity.TrafficData;
import application.data.repository.TrafficRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class TrafficService {

    @Autowired
    private TrafficRepository trafficRepository;

    public void addNewTrafficData(TrafficData trafficData){
        trafficRepository.save(trafficData);
    }

    @Transactional
    public void addNewListTrafficData(List<TrafficData> listTrafficData){
        trafficRepository.saveAll(listTrafficData);
    }
    public List<TrafficData> findByDeviceId(String deviceId){
        return trafficRepository.findByDeviceId(deviceId);
    }

}
