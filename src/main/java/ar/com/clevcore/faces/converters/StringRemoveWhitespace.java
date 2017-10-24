package ar.com.clevcore.faces.converters;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;

import ar.com.clevcore.utils.StringUtils;

@ManagedBean(name = "StringRemoveWhitespace")
@RequestScoped
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
