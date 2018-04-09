package application.controller;

import application.data.entity.TrafficData;
import application.data.service.TrafficService;
import application.model.ApiResult;
import application.model.TrafficDataModel;
import application.model.TrafficDetailDataModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private TrafficService trafficService;

    @PostMapping("/save")
    public ApiResult saveData(@RequestBody TrafficDataModel trafficDataModel){
        ApiResult result = new ApiResult();

        try {
            if(!"".equals(trafficDataModel.getDeviceId()) && !"".equals(trafficDataModel.getLongitude())
                    && !"".equals(trafficDataModel.getLatitude()) && !"".equals(trafficDataModel.getSpeed())
                    && !"".equals(trafficDataModel.getPathName())){
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
        } catch (Exception e){
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }
        return result;
    }

    @GetMapping("/find/{deviceId}")
    public ApiResult findData(@PathVariable String deviceId){
        ApiResult result = new ApiResult();

        try{
            List<TrafficData> listexistTrafficData = trafficService.findByDeviceId(deviceId);
            if (listexistTrafficData == null) {
                result.setSuccess(false);
                result.setMessage("Not Found");
            } else {
                result.setSuccess(true);
                result.setMessage("Found");
                ModelMapper modelMapper = new ModelMapper();
                TrafficDetailDataModel trafficDetailDataModel= modelMapper.map(listexistTrafficData, TrafficDetailDataModel.class);
                result.setData(listexistTrafficData);
                result.setSuccess(true);
                result.setMessage("Success");
            }
        } catch (Exception e){
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }

        return result;
    }
}
