package ar.com.clevcore.faces.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import ar.com.clevcore.faces.utils.FacesUtils;

@FacesValidator(value = "MaxLengthValidator")
public class MaxLengthValidator implements Validator {

    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        Object maxlength = component.getAttributes().get("maxlength");

        if (maxlength != null && value.toString().length() > Integer.parseInt(maxlength.toString())) {
            throw new ValidatorException(FacesUtils.getFacesMessage(FacesMessage.SEVERITY_ERROR,
                    FacesUtils.getClevcoreResource("too_characters")));
        }
    }

}
