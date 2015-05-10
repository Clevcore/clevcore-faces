package ar.com.clevcore.faces.components;

import javax.el.MethodExpression;
import javax.faces.component.FacesComponent;
import javax.faces.component.UINamingContainer;
import javax.faces.event.AjaxBehaviorEvent;

import ar.com.clevcore.faces.utils.FacesUtils;

@FacesComponent("selectOneMenu")
public class selectOneMenu extends UINamingContainer {

    public void listener(AjaxBehaviorEvent event) {
        MethodExpression methodExpression = (MethodExpression) getAttributes().get("listener");
        if (methodExpression != null) {
            methodExpression.invoke(FacesUtils.getELContext(), new Object[] { event });
        }
    }

}
