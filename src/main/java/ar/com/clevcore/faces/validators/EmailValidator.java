package ar.com.clevcore.faces.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.utils.ValidatorUtils;

@FacesValidator("EmailValidator")
public class EmailValidator implements Validator {

    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {

        if (value.toString().length() > 254) {
            throw new ValidatorException(FacesUtils.getFacesMessage(FacesMessage.SEVERITY_ERROR,
                    FacesUtils.getClevcoreResource("too_characters_validation")));
        }

        if (!ValidatorUtils.emailValidator(value.toString())) {
            throw new ValidatorException(FacesUtils.getFacesMessage(FacesMessage.SEVERITY_ERROR,
                    FacesUtils.getClevcoreResource("email_validation")));
        }

    }

}
