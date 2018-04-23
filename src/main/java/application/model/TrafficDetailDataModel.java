package application.model;

import application.data.entity.TrafficData;

import java.util.List;

public class TrafficDetailDataModel {
    private List<TrafficData> listTraficData;

    public List<TrafficData> getListTraficData() {
        return listTraficData;
    }

    public void setListTraficData(List<TrafficData> listTraficData) {
        this.listTraficData = listTraficData;
    }

}
