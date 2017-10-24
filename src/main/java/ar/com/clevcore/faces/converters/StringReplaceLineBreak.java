package ar.com.clevcore.faces.converters;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;

@ManagedBean(name = "StringReplaceLineBreak")
@RequestScoped
public class StringReplaceLineBreak implements Converter {

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        String result = null;
        if (value != null) {
            result = value.replaceAll("\n", "<br />").trim();
        }
        return result;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String result = null;
        if (value != null) {
            result = value.toString().replaceAll("<br />", "\n");
        }
        return result;
    }
}