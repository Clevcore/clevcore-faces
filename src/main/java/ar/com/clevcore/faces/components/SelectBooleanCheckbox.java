package ar.com.clevcore.faces.components;

import javax.faces.component.FacesComponent;
import javax.faces.component.UINamingContainer;

import ar.com.clevcore.faces.utils.Constant;

@FacesComponent(Constant.SELECT_BOOLEAN_CHECKBOX)
public class SelectBooleanCheckbox extends UINamingContainer {

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

}
