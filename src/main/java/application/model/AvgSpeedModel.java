package application.model;

public class AvgSpeedModel {
    private long sumDevice;
    private String pathName;
    private double avgSpeed;

    public AvgSpeedModel(long sumDevice, String pathName, double avgSpeed) {
        this.sumDevice = sumDevice;
        this.pathName = pathName;
        this.avgSpeed = avgSpeed;
    }

    public long getSumDevice() {
        return sumDevice;
    }

    public void setSumDevice(long sumDevice) {
        this.sumDevice = sumDevice;
    }

    public double getAvgSpeed() {
        return avgSpeed;
    }

    public void setAvgSpeed(double avgSpeed) {
        this.avgSpeed = avgSpeed;
    }

    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
    }


}
