package application.model;

import java.util.List;

public class LegModel {
    private DistanceModel distance;
    private double AvgSpeed;
    private long sumDevice;

    public DistanceModel getDistance() {
        return distance;
    }

    public void setDistance(DistanceModel distance) {
        this.distance = distance;
    }

    public double getAvgSpeed() {
        return AvgSpeed;
    }

    public void setAvgSpeed(double avgSpeed) {
        AvgSpeed = avgSpeed;
    }

    public long getSumDevice() {
        return sumDevice;
    }

    public void setSumDevice(long sumDevice) {
        this.sumDevice = sumDevice;
    }
}
