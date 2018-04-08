package application.controller.api;

import application.data.entity.TrafficData;
import application.data.service.TrafficService;
import application.model.BaseApiResult;
import application.model.TrafficDataApiResult;
import application.model.TrafficDataModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trafficdata")
public class TrafficDataController {

    @Autowired
    private TrafficService trafficService;

    @PostMapping("/create")
    public BaseApiResult saveData(@RequestBody TrafficDataModel trafficDataModel){
        TrafficDataApiResult result = new TrafficDataApiResult();

        try {
            if(!"".equals(trafficDataModel.getDeviceid()) && !"".equals(trafficDataModel.getLongitude())
                    && !"".equals(trafficDataModel.getLatitude()) && !"".equals(trafficDataModel.getSpeed())
                    && !"".equals(trafficDataModel.getPathname())){
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
}
