package application.model;

public class TrafficDataApiResult extends BaseApiResult {
    private Object data;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
