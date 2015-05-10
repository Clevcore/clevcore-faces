package ar.com.clevcore.faces.components;

import java.io.IOException;

import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UICommand;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UINamingContainer;
import javax.faces.context.FacesContext;

@FacesComponent("commandButton")
public class CommandButton extends UIComponentBase implements NamingContainer {

    private UICommand commandButton;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        super.encodeBegin(context);
    }

    // GETTER & SETTER
    public UICommand getCommandButton() {
        return commandButton;
    }

    public void setCommandButton(UICommand commandButton) {
        this.commandButton = commandButton;
    }

    public String getType() {
        return (commandButton.getActionListeners() != null && commandButton.getActionListeners().length > 0)
                || commandButton.getActionExpression() != null ? "submit" : "button";
    }

}
