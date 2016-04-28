package ar.com.clevcore.faces.components;

import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UINamingContainer;

import ar.com.clevcore.faces.utils.Constant;

@FacesComponent(Constant.FLOAT_IF_NOT_VISIBLE)
public class FloatIfNotVisible extends UIComponentBase implements NamingContainer {

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

}
