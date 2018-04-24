package application.model;

import java.util.List;

public class LegModel {
    private double AvgSpeed;
    private long sumDevice;

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
