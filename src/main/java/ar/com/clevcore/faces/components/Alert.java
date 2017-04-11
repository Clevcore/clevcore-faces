package ar.com.clevcore.faces.components;

import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UINamingContainer;
import javax.faces.component.UIPanel;

import ar.com.clevcore.faces.utils.Constant;

@FacesComponent(Constant.ALERT)
public class Alert extends UIPanel implements NamingContainer {

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

}
