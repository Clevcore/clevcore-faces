package ar.com.clevcore.faces.components;

import java.io.IOException;
import java.util.List;

import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIInput;
import javax.faces.component.UINamingContainer;
import javax.faces.component.UISelectMany;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;

import ar.com.clevcore.faces.utils.ComponentsUtils;

@SuppressWarnings("unchecked")
@FacesComponent("selectManyCheckbox")
public class SelectManyCheckbox extends UISelectMany implements NamingContainer {

    private UISelectMany component;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        setItemList(ComponentsUtils.getSelectItems(context, component));
        super.encodeBegin(context);
    }

    // GETTER & SETTER
    public UIInput getComponent() {
        return component;
    }

    public void setComponent(UISelectMany component) {
        this.component = component;
    }

    public List<SelectItem> getItemList() {
        return (List<SelectItem>) getStateHelper().get("itemList");
    }

    public void setItemList(List<SelectItem> itemList) {
        getStateHelper().put("itemList", itemList);
    }

}
