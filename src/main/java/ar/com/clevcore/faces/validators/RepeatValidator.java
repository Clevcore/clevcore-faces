package ar.com.clevcore.faces.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import ar.com.clevcore.faces.utils.FacesUtils;

@FacesValidator("RepeatValidator")
public class RepeatValidator implements Validator {

    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {

        if (!value.toString().equals(component.getAttributes().get("repeat").toString())) {
            if (component.getAttributes().get("validatorMessage") != null) {
                throw new ValidatorException(FacesUtils.getFacesMessage(FacesMessage.SEVERITY_ERROR, component
                        .getAttributes().get("validatorMessage").toString()));
            } else {
                throw new ValidatorException(FacesUtils.getFacesMessage(FacesMessage.SEVERITY_ERROR,
                        FacesUtils.getClevcoreResource("repeat_validation")));
            }
        }

    }
}
