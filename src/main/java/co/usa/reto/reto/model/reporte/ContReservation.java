package co.usa.reto.reto.model.reporte;

import co.usa.reto.reto.model.Client;

public class ContReservation {
    private Long total;
    private Client client;
    
    public ContReservation(Long total, Client client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    
}
