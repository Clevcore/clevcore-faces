package ar.com.clevcore.faces.converters;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import ar.com.clevcore.utils.StringUtils;

@FacesConverter("StringTrimAll")
public class StringTrimAll implements Converter {

    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        String result = null;

        if (value != null) {
            result = StringUtils.trimAll(value);
        }

        return result;
    }

    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String result = null;

        if (value != null) {
            result = value.toString();
        }

        return result;
    }

}
