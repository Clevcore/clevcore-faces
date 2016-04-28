package ar.com.clevcore.faces.components;

import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UINamingContainer;

import ar.com.clevcore.faces.utils.Constant;

@FacesComponent(Constant.INPUT_CHECKBOX)
public class InputCheckbox extends UIComponentBase implements NamingContainer {

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

}
