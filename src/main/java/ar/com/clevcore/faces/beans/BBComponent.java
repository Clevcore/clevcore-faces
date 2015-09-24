package ar.com.clevcore.faces.beans;

import java.io.Serializable;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name = "bbComponent")
@ApplicationScoped
public class BBComponent implements Serializable {
    private static final long serialVersionUID = 1L;

    public Boolean isPopup(Object object) {
        if (object != null) {
            return object.getClass().getSimpleName().equals("Popup");
        } else {
            return false;
        }
    }

}
