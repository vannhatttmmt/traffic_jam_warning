package application.model;

import java.util.ArrayList;

public class JsonModel {
    private ArrayList<RouteModel> routes;
    private String status;

    public ArrayList<RouteModel> getRoutes() {
        return routes;
    }

    public void setRoutes(ArrayList<RouteModel> routes) {
        this.routes = routes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
