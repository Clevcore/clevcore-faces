package ar.com.clevcore.faces.components;

import java.io.IOException;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UINamingContainer;
import javax.faces.component.UIPanel;
import javax.faces.context.FacesContext;

import ar.com.clevcore.faces.utils.Constant;

@FacesComponent(Constant.MESSAGE)
public class Message extends UIPanel implements NamingContainer {

    private UIPanel panel;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        setUid(panel.getClientId().replace(getAttributes().get("id") + ":message", "") + getAttributes().get("name"));
        List<FacesMessage> list = context.getMessageList(getUid());
        if (list.size() > 0) {
            setSeverity((list.get(0).getSeverity().toString()).split(" ")[0].toLowerCase());
        } else {
            setSeverity(null);
        }
        super.encodeBegin(context);
    }

    // GETTER & SETTER
    public UIPanel getPanel() {
        return panel;
    }

    public void setPanel(UIPanel panel) {
        this.panel = panel;
    }

    public String getUid() {
        return (String) getStateHelper().get("uid");
    }

    public void setUid(String uid) {
        getStateHelper().put("uid", uid);
    }

    public String getSeverity() {
        return (String) getStateHelper().get("severity");
    }

    public void setSeverity(String severity) {
        getStateHelper().put("severity", severity);
    }

}
