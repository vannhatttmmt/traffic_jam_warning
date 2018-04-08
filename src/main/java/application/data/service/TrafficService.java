package application.data.service;

import application.data.entity.TrafficData;
import application.data.repository.TrafficRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class TrafficService {

    @Autowired
    private TrafficRepository trafficRepository;

    public void addNewTrafficData(TrafficData trafficData){
        trafficRepository.save(trafficData);
    }

    public long getTotalTrafficData(){
        return trafficRepository.getTotalTrafficData();
    }

    @Transactional
   public void addNewListTrafficData(List<TrafficData> listTrafficData){
        trafficRepository.saveAll(listTrafficData);
   }
}
