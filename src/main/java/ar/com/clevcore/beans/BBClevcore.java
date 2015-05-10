package ar.com.clevcore.beans;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.utils.DateUtils;

@ManagedBean(name = "bbClevcore")
@ApplicationScoped
public class BBClevcore implements Serializable {
    private static final long serialVersionUID = 1L;

    public Long getAge(Date date) {
        if (date != null) {
            return DateUtils.getAge(date);
        }
        return null;
    }

    public Date getDate() {
        return new Date();
    }

    public String getDateFormat() {
        try {
            return DateUtils.getDateFormat(new Date(), FacesUtils.getClevcoreResource("pattern_date"));
        } catch (ParseException e) {
            return null;
        }
    }

    public String getIdMessages() {
        return FacesUtils.ID_MESSAGES;
    }

    public String getIdScript() {
        return FacesUtils.ID_SCRIPT;
    }

    public Locale getLocale() {
        return FacesUtils.getLocale();
    }

    public String getPath() {
        return FacesUtils.getRequestPath();
    }

    public String getResource(String key) {
        return FacesUtils.getResource(key);
    }

    public String getScript() {
        return FacesUtils.getScript();
    }

}
