package ar.com.clevcore.faces.converters;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import ar.com.clevcore.utils.StringUtils;

@FacesConverter("StringRemoveWhitespace")
public class StringRemoveWhitespace implements Converter {

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        String result = null;

        if (value != null) {
            result = StringUtils.removeWhitespace(value);
        }

        return result;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String result = null;

        if (value != null) {
            result = value.toString();
        }

        return result;
    }

}
