package application.model;

public class HelloMessage {

    private String name;
    private String deviceid;
    private float longitude;
    private float latitude;
    private float speed;

    public HelloMessage() {
    }

    public HelloMessage(String name, String deviceid, float longitude, float latitude, float speed) {
        this.name = name;
        this.deviceid = deviceid;
        this.longitude = longitude;
        this.latitude = latitude;
        this.speed = speed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(String deviceid) {
        this.deviceid = deviceid;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getSpeed() {
        return speed;
    }

    public void setSpeed(float speed) {
        this.speed = speed;
    }
}
