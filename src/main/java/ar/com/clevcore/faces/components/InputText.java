package ar.com.clevcore.faces.components;

import java.io.IOException;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UIInput;
import javax.faces.component.UINamingContainer;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;

import ar.com.clevcore.faces.utils.Constant;
import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.faces.validators.MaxLengthValidator;

@FacesComponent(Constant.INPUT_TEXT)
public class InputText extends UIComponentBase implements NamingContainer {

    private UIInput inputText;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        if (getAttributes().get("maxlength") != null) {
            inputText.addValidator(new MaxLengthValidator());
        }

        if (getAttributes().get("immediate") != null) {
            inputText.setImmediate((Boolean) getAttributes().get("immediate"));
        }

        if (getAttributes().get("converter") != null) {
            inputText.setConverter((Converter) FacesUtils.elResolverValue(getAttributes().get("converter")));
        }
        if (getAttributes().get("converterMessage") != null) {
            inputText.setConverterMessage((String) getAttributes().get("converterMessage"));
        }

        if (getAttributes().get("required") != null) {
            inputText.setRequired((Boolean) getAttributes().get("required"));

            Object requiredMessage = getAttributes().get("requiredMessage");
            inputText.setRequiredMessage(requiredMessage != null ? (String) requiredMessage
                    : FacesUtils.getClevcoreResource("complete_field"));
        }

        List<FacesMessage> list = context.getMessageList(inputText.getClientId());
        if (!list.isEmpty()) {
            setSeverity((list.get(0).getSeverity().toString()).split(" ")[0].toLowerCase());
        } else {
            setSeverity(null);
        }

        super.encodeBegin(context);
    }

    // GETTER & SETTER
    public UIInput getInputText() {
        return inputText;
    }

    public void setInputText(UIInput inputText) {
        this.inputText = inputText;
    }

    public String getSeverity() {
        return (String) getStateHelper().get("severity");
    }

    public void setSeverity(String severity) {
        getStateHelper().put("severity", severity);
    }

}
