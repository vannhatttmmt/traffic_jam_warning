package application.model;

import java.util.ArrayList;
import java.util.List;

public class RouteModel {
    private ArrayList<LegModel> legs;


    public ArrayList<LegModel> getLegs() {
        return legs;
    }

    public void setLegs(ArrayList<LegModel> legs) {
        this.legs = legs;
    }

}
