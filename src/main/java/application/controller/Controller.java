package application.controller;

import application.data.entity.TrafficData;
import application.data.service.TrafficService;
import application.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private TrafficService trafficService;

    @PostMapping("/save")
    public ApiResult saveData(@RequestBody TrafficDataModel trafficDataModel) {
        ApiResult result = new ApiResult();

        try {
            if (!"".equals(trafficDataModel.getDeviceId()) && !"".equals(trafficDataModel.getLongitude())
                    && !"".equals(trafficDataModel.getLatitude()) && !"".equals(trafficDataModel.getSpeed())
                    && !"".equals(trafficDataModel.getStepName())) {
                ModelMapper modelMapper = new ModelMapper();
                TrafficData trafficDataEntity = modelMapper.map(trafficDataModel, TrafficData.class);
                trafficService.addNewTrafficData(trafficDataEntity);
                result.setData(trafficDataEntity);

            } else {
            }
        } catch (Exception e) {
        }
        return result;
    }

    @GetMapping("/find/{deviceId}")
    public ApiResult findData(@PathVariable String deviceId) {
        ApiResult result = new ApiResult();

        try {
            List<TrafficData> listexistTrafficData = trafficService.findByDeviceId(deviceId);
            if (listexistTrafficData == null) {

            } else {
                ModelMapper modelMapper = new ModelMapper();
                TrafficDetailDataModel trafficDetailDataModel = modelMapper.map(listexistTrafficData, TrafficDetailDataModel.class);
                result.setData(listexistTrafficData);
            }
        } catch (Exception e) {
        }

        return result;
    }

    @PostMapping("/demo")
    public ApiResult demoData() {
        ApiResult result = new ApiResult();
        ArrayList<TrafficData> listDemoTrafficData = new ArrayList<>();
        try {
            for (int i = 0; i < 20; i++) {
                TrafficData demoTrafficData1 = new TrafficData();
                demoTrafficData1.setDeviceId("ID " + i);
                demoTrafficData1.setLongitude("Longitude " + i);
                demoTrafficData1.setLatitude("Latitude " + i);
                demoTrafficData1.setStepName("Le Duc Tho");
                demoTrafficData1.setSpeed(i);
                listDemoTrafficData.add(demoTrafficData1);
            }
            for (int j = 20; j < 40; j++) {
                TrafficData demoTrafficData2 = new TrafficData();
                demoTrafficData2.setDeviceId("ID " + j);
                demoTrafficData2.setLongitude("Longitude " + j);
                demoTrafficData2.setLatitude("Latitude " + j);
                demoTrafficData2.setStepName("Xuan Thuy");
                demoTrafficData2.setSpeed(j);
                listDemoTrafficData.add(demoTrafficData2);
            }
            trafficService.addNewListTrafficData(listDemoTrafficData);
            result.setData(listDemoTrafficData);

        } catch (Exception e) {

        }

        return result;
    }

    @GetMapping("/avgspeed")
    public ApiResult avgSpeed(){
        ApiResult result = new ApiResult();
        result.setData(trafficService.getAvgSpeed());
        return result;
    }

    @PostMapping("/result")
    public ApiResult Result(@RequestBody JsonModel jsonModel){
        int localHour = LocalDateTime.now().getHour();
        Random random = new Random();
        ApiResult result = new ApiResult();
        int length = jsonModel.getRoutes().toArray().length;

        ArrayList<RouteModel> listRouteModel = new ArrayList<>();
        RouteModel routeModel = new RouteModel();

        ArrayList<LegModel> listLegModel = new ArrayList<>();
        for(int i=0; i<length; i++){
            LegModel legModel = new LegModel();
            if ((localHour>=6 && localHour<=8) || (localHour>=16 && localHour<=20)){
                legModel.setAvgSpeed(10 + 25*random.nextDouble());
                legModel.setSumDevice(random.nextInt(500) + 300);
            }
            else {
                legModel.setAvgSpeed(30 + 30*random.nextDouble());
                legModel.setSumDevice(random.nextInt(300) + 100);
            }
            legModel.setDistance(jsonModel.getRoutes().get(i).getLegs().get(0).getDistance());
            listLegModel.add(legModel);
        }
        routeModel.setLegs(listLegModel);
        listRouteModel.add(routeModel);

        jsonModel.setRoutes(listRouteModel);
        result.setData(jsonModel);
        return result;
    }
}
