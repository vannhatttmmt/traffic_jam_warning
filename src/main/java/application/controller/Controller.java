package application.controller;

import application.data.entity.TrafficData;
import application.data.service.TrafficService;
import application.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
                    && !"".equals(trafficDataModel.getPathName())) {
                ModelMapper modelMapper = new ModelMapper();
                TrafficData trafficDataEntity = modelMapper.map(trafficDataModel, TrafficData.class);
                trafficService.addNewTrafficData(trafficDataEntity);
                result.setSuccess(true);
                result.setMessage("Success");
                result.setData(trafficDataEntity);

            } else {
                result.setSuccess(false);
                result.setMessage("Fail");
            }
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }
        return result;
    }

    @GetMapping("/find/{deviceId}")
    public ApiResult findData(@PathVariable String deviceId) {
        ApiResult result = new ApiResult();

        try {
            List<TrafficData> listexistTrafficData = trafficService.findByDeviceId(deviceId);
            if (listexistTrafficData == null) {
                result.setSuccess(false);
                result.setMessage("Not Found");
            } else {
                result.setSuccess(true);
                result.setMessage("Found");
                ModelMapper modelMapper = new ModelMapper();
                TrafficDetailDataModel trafficDetailDataModel = modelMapper.map(listexistTrafficData, TrafficDetailDataModel.class);
                result.setData(listexistTrafficData);
                result.setSuccess(true);
                result.setMessage("Success");
            }
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage(e.getMessage());
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
                demoTrafficData1.setPathName("Le Duc Tho");
                demoTrafficData1.setSpeed(i);
                listDemoTrafficData.add(demoTrafficData1);
            }
            for (int j = 20; j < 40; j++) {
                TrafficData demoTrafficData2 = new TrafficData();
                demoTrafficData2.setDeviceId("ID " + j);
                demoTrafficData2.setLongitude("Longitude " + j);
                demoTrafficData2.setLatitude("Latitude " + j);
                demoTrafficData2.setPathName("Xuan Thuy");
                demoTrafficData2.setSpeed(j);
                listDemoTrafficData.add(demoTrafficData2);
            }
            trafficService.addNewListTrafficData(listDemoTrafficData);
            result.setSuccess(true);
            result.setMessage("Success");
            result.setData(listDemoTrafficData);

        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }

        return result;
    }

    @GetMapping("/avg")
    public ApiResult avgSpeed(){
        ApiResult result = new ApiResult();
        result.setSuccess(true);
        result.setData(trafficService.getAvgSpeed());
        return result;
    }
}
