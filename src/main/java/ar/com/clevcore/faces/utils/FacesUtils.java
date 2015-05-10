package ar.com.clevcore.faces.utils;

import java.io.IOException;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.el.ELContext;
import javax.el.ELResolver;
import javax.el.ExpressionFactory;
import javax.el.ValueExpression;
import javax.faces.application.Application;
import javax.faces.application.FacesMessage;
import javax.faces.application.FacesMessage.Severity;
import javax.faces.component.UIViewRoot;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.Cookie;

import ar.com.clevcore.exceptions.ClevcoreException;

public final class FacesUtils {

    public static final String ID_MESSAGES = "ar-com-clevcore-faces-messages";
    public static final String ID_SCRIPT = "ar-com-clevcore-faces-script";
    public static final String SCRIPT_SESSION = "ar.com.clevcore.faces.script";

    private FacesUtils() {
        throw new AssertionError();
    }

    // GENERIX
    public static FacesContext getFacesContext() {
        return FacesContext.getCurrentInstance();
    }

    public static ExternalContext getExternalContext() {
        return getFacesContext().getExternalContext();
    }

    public static Application getApplication() {
        return getFacesContext().getApplication();
    }

    public static UIViewRoot getViewRoot() {
        return getFacesContext().getViewRoot();
    }

    public static ELContext getELContext() {
        return getFacesContext().getELContext();
    }

    public static ExpressionFactory getExpressionFactory() {
        return getApplication().getExpressionFactory();
    }

    public static String getMessageBundle() {
        return getApplication().getMessageBundle();
    }

    public static ELResolver getELResolver() {
        return getELContext().getELResolver();
    }

    public static Locale getLocale() {
        return getViewRoot().getLocale();
    }

    public static void setLocale(String locale) {
        getViewRoot().setLocale(new Locale(locale));
    }

    public static Object resolveExpression(String expression) {
        ValueExpression valueExpression = getExpressionFactory().createValueExpression(getELContext(), expression,
                Object.class);
        return valueExpression.getValue(getELContext());
    }

    public static String getRealPath() {
        return getExternalContext().getRealPath("/");
    }

    public static String getRequestPath() {
        return getExternalContext().getRequestContextPath();
    }

    public static void responseComplete() {
        getFacesContext().responseComplete();
    }

    public static void render(String idRender) {
        getFacesContext().getPartialViewContext().getRenderIds().add(idRender);
    }

    // MESSAGE
    public static FacesMessage getFacesMessage(Severity severity, String message) {
        return getFacesMessage(severity, null, message);
    }

    public static FacesMessage getFacesMessage(Severity severity, String summary, String message) {
        if (summary == null) {
            if (FacesMessage.SEVERITY_ERROR.equals(severity)) {
                summary = getClevcoreResource("error");
            } else if (FacesMessage.SEVERITY_FATAL.equals(severity)) {
                summary = getClevcoreResource("fatal");
            } else if (FacesMessage.SEVERITY_INFO.equals(severity)) {
                summary = getClevcoreResource("info");
            } else if (FacesMessage.SEVERITY_WARN.equals(severity)) {
                summary = getClevcoreResource("warn");
            }
        }
        return new FacesMessage(severity, summary + ": ", message);
    }

    public static void addMessage(ClevcoreException clevcoreException) {
        Severity severity = null;

        if (FacesMessage.SEVERITY_ERROR.toString().equals(clevcoreException.getSeverity())) {
            severity = FacesMessage.SEVERITY_ERROR;
        } else if (FacesMessage.SEVERITY_FATAL.toString().equals(clevcoreException.getSeverity())) {
            severity = FacesMessage.SEVERITY_FATAL;
        } else if (FacesMessage.SEVERITY_INFO.toString().equals(clevcoreException.getSeverity())) {
            severity = FacesMessage.SEVERITY_INFO;
        } else if (FacesMessage.SEVERITY_WARN.toString().equals(clevcoreException.getSeverity())) {
            severity = FacesMessage.SEVERITY_WARN;
        }

        getFacesContext().addMessage(null, getFacesMessage(severity, clevcoreException.getMessage()));
        render(ID_MESSAGES + ":new");
    }

    public static void addMessage(FacesMessage facesMessage) {
        getFacesContext().addMessage(null, facesMessage);
        render(ID_MESSAGES + ":new");
    }

    public static void addMessage(String id, FacesMessage facesMessage) {
        getFacesContext().addMessage(id, facesMessage);
        render(ID_MESSAGES + ":new");
    }

    public static void addMessage(String id, Severity severity, String summary, String message) {
        getFacesContext().addMessage(id, getFacesMessage(severity, summary, message));
        render(ID_MESSAGES + ":new");
    }

    public static void addMessage(Severity severity, String message) {
        addMessage(null, severity, null, message);
    }

    public static void addMessage(Severity severity, String summary, String message) {
        addMessage(null, severity, summary, message);
    }

    public static void addMessage(String id, Severity severity, String message) {
        addMessage(id, severity, null, message);
    }

    public static void keepMessages(boolean keep) {
        getFacesContext().getExternalContext().getFlash().setKeepMessages(keep);
    }

    // REQUEST
    public static Map<String, Object> getRequest() {
        return getExternalContext().getRequestMap();
    }

    public static Object getRequestValue(String key) {
        return getRequest().get(key);
    }

    public static void setRequestValue(String key, Object valor) {
        getRequest().put(key, valor);
    }

    public static Object removeRequestValue(String value) {
        return getRequest().remove(value);
    }

    public static void clearRequestValues() {
        getRequest().clear();
    }

    public static Map<String, String> getRequestParameter() {
        return getExternalContext().getRequestParameterMap();
    }

    // SCRIPT
    public static String getScript() {
        Object script = FacesUtils.removeSessionValue(SCRIPT_SESSION);
        return script != null ? script.toString() : null;
    }

    public static void executeScript(String script) {
        setSessionValue(SCRIPT_SESSION, script);
        render(ID_SCRIPT);
    }

    // SESSION
    public static Map<String, Object> getSession() {
        return FacesContext.getCurrentInstance().getExternalContext().getSessionMap();
    }

    public static Object getSessionValue(String key) {
        return getSession().get(key);
    }

    public static void setSessionValue(String key, Object valor) {
        getSession().put(key, valor);
    }

    public static Object removeSessionValue(String key) {
        return getSession().remove(key);
    }

    public static void clearSessionValues() {
        getSession().clear();
    }

    // OTHER
    public static Object getBean(String bean) {
        return getELResolver().getValue(getELContext(), null, bean);
    }

    public static Cookie[] getCookie() {
        return ServletUtils.getHttpServletRequest().getCookies();
    }

    public static void setCookie(String name, String value) {
        setCookie(name, value, 2592000);
    }

    public static void setCookie(String name, String value, int expiry) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(expiry);
        cookie.setPath(getRequestPath());
        ServletUtils.getHttpServletResponse().addCookie(cookie);
    }

    public static void removeCookie(String name) {
        Cookie cookie = new Cookie(name, "");
        cookie.setMaxAge(0);
        cookie.setPath(getRequestPath());
        ServletUtils.getHttpServletResponse().addCookie(cookie);
    }

    public static void navigation(String action) {
        if (!(ServletUtils.getPath()).equals(action)) {
            getApplication().getNavigationHandler().handleNavigation(getFacesContext(), null, action);
        }
    }

    public static void redirect(String action) throws IOException {
        if (!(ServletUtils.getPath()).equals(action)) {
            getExternalContext().redirect(action);
        }
    }

    // MESSAGES
    public static ResourceBundle getResourceBundle() {
        return ResourceBundle.getBundle("ar.com.clevcore.resources.messages", FacesUtils.getLocale());
    }

    public static ResourceBundle getClevcoreResourceBundle() {
        return ResourceBundle.getBundle("ar.com.clevcore.resources.clevcore", FacesUtils.getLocale());
    }

    public static String getResource(String... keys) {
        String resource = "";
        for (String key : keys) {
            try {
                resource += getResourceBundle().getString(key);
            } catch (Exception e) {
                resource += key;
            }
        }
        return resource;
    }

    public static String getClevcoreResource(String... keys) {
        String resource = "";
        for (String key : keys) {
            try {
                resource += getClevcoreResourceBundle().getString(key);
            } catch (Exception e) {
                resource += key;
            }
        }
        return resource;
    }

    // COMPONENTS
    public static void showPopup(String id) {
        FacesUtils.executeScript("showPopup('" + id + "')");
    }

    public static void hidePopup(String id) {
        FacesUtils.executeScript("hidePopup('" + id + "')");
    }

}
