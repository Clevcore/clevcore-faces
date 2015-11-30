package ar.com.clevcore.faces.utils;

import java.io.IOException;
import java.text.MessageFormat;
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
import javax.faces.context.Flash;
import javax.faces.context.PartialViewContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ar.com.clevcore.exceptions.ClevcoreException;

public final class FacesUtils {

    public static final String ID_MESSAGES = "ar-com-clevcore-faces-messages";
    public static final String ID_SCRIPT = "ar-com-clevcore-faces-script";
    public static final String SCRIPT_SESSION = "ar.com.clevcore.faces.script";

    public static String resourceBundleVar = "msg";

    private static final Logger log = LoggerFactory.getLogger(FacesUtils.class);

    private FacesUtils() {
        throw new AssertionError();
    }

    // GENERIX
    public static FacesContext getFacesContext() {
        return FacesContext.getCurrentInstance();
    }

    public static ExternalContext getExternalContext() {
        FacesContext facesContext = getFacesContext();
        return facesContext != null ? facesContext.getExternalContext() : null;
    }

    public static Application getApplication() {
        FacesContext facesContext = getFacesContext();
        return facesContext != null ? facesContext.getApplication() : null;
    }

    public static UIViewRoot getViewRoot() {
        FacesContext facesContext = getFacesContext();
        return facesContext != null ? facesContext.getViewRoot() : null;
    }

    public static PartialViewContext getPartialViewContext() {
        FacesContext facesContext = getFacesContext();
        return facesContext != null ? facesContext.getPartialViewContext() : null;
    }

    public static ELContext getELContext() {
        FacesContext facesContext = getFacesContext();
        return facesContext != null ? facesContext.getELContext() : null;
    }

    public static void responseComplete() {
        FacesContext facesContext = getFacesContext();
        if (facesContext != null) {
            facesContext.responseComplete();
        }
    }

    public static ExpressionFactory getExpressionFactory() {
        Application application = getApplication();
        return application != null ? application.getExpressionFactory() : null;
    }

    public static String getMessageBundle() {
        Application application = getApplication();
        return application != null ? application.getMessageBundle() : null;
    }

    public static ELResolver getELResolver() {
        ELContext elContext = getELContext();
        return elContext != null ? elContext.getELResolver() : null;
    }

    public static Object elResolverValue(String property) {
        ELResolver elResolver = getELResolver();
        return elResolver != null ? elResolver.getValue(getELContext(), null, property) : null;
    }

    public static Object valueExpression(String expression, Class<?> clazz) {
        ELContext elContext = getELContext();
        ExpressionFactory expressionFactory = getExpressionFactory();
        if (elContext != null && expressionFactory != null) {
            ValueExpression valueExpression = expressionFactory.createValueExpression(elContext, expression, clazz);
            if (valueExpression != null) {
                return valueExpression.getValue(elContext);
            }
        }
        return null;
    }

    public static Object evaluateExpressionGet(String expression, Class<?> clazz) {
        Application application = getApplication();
        return application != null ? getApplication().evaluateExpressionGet(getFacesContext(), expression, clazz)
                : null;
    }

    public static String getRealPath() {
        ExternalContext externalContext = getExternalContext();
        return externalContext != null ? externalContext.getRealPath("/") : null;
    }

    public static String getRequestPath() {
        ExternalContext externalContext = getExternalContext();
        return externalContext != null ? externalContext.getRequestContextPath() : null;
    }

    public static Flash getFlash() {
        ExternalContext externalContext = getExternalContext();
        if (externalContext != null) {
            return externalContext.getFlash();
        }
        return null;
    }

    public static Locale getLocale() {
        UIViewRoot uiViewRoot = getViewRoot();
        return uiViewRoot != null ? uiViewRoot.getLocale() : null;
    }

    public static void setLocale(String locale) {
        UIViewRoot uiViewRoot = getViewRoot();
        if (uiViewRoot != null) {
            uiViewRoot.setLocale(new Locale(locale));
        }
    }

    public static void render(String idRender) {
        PartialViewContext partialViewContext = getPartialViewContext();
        if (partialViewContext != null) {
            partialViewContext.getRenderIds().add(idRender);
        }
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

        FacesContext facesContext = getFacesContext();
        if (facesContext != null) {
            facesContext.addMessage(null, getFacesMessage(severity, clevcoreException.getMessage()));
            render(ID_MESSAGES + ":new");
        }
    }

    public static void addMessage(FacesMessage facesMessage) {
        FacesContext facesContext = getFacesContext();
        if (facesContext != null) {
            getFacesContext().addMessage(null, facesMessage);
            render(ID_MESSAGES + ":new");
        }
    }

    public static void addMessage(String id, FacesMessage facesMessage) {
        FacesContext facesContext = getFacesContext();
        if (facesContext != null) {
            getFacesContext().addMessage(id, facesMessage);
            render(ID_MESSAGES + ":new");
        }
    }

    public static void addMessage(String id, Severity severity, String summary, String message) {
        FacesContext facesContext = getFacesContext();
        if (facesContext != null) {
            getFacesContext().addMessage(id, getFacesMessage(severity, summary, message));
            render(ID_MESSAGES + ":new");
        }
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

    public static void keepMessages() {
        Flash flash = getFlash();
        if (flash != null) {
            flash.setKeepMessages(true);
        }
    }

    // REQUEST
    public static Map<String, Object> getRequest() {
        ExternalContext externalContext = getExternalContext();
        return externalContext != null ? externalContext.getRequestMap() : null;
    }

    public static Object getRequestValue(String key) {
        Map<String, Object> request = getRequest();
        return request != null ? request.get(key) : null;
    }

    public static void setRequestValue(String key, Object value) {
        Map<String, Object> request = getRequest();
        if (request != null) {
            request.put(key, value);
        }
    }

    public static Object removeRequestValue(String key) {
        Map<String, Object> request = getRequest();
        return request != null ? request.remove(key) : null;
    }

    public static void clearRequestValues() {
        Map<String, Object> request = getRequest();
        if (request != null) {
            request.clear();
        }
    }

    // REQUEST PARAMETER
    public static Map<String, String> getRequestParameter() {
        ExternalContext externalContext = getExternalContext();
        return externalContext != null ? externalContext.getRequestParameterMap() : null;
    }

    public static String getRequestParameterValue(String key) {
        Map<String, String> requestParameter = getRequestParameter();
        return requestParameter != null ? requestParameter.get(key) : null;
    }

    public String setRequestParameterValue(String key, String value) {
        Map<String, String> requestParameter = getRequestParameter();
        return requestParameter != null ? requestParameter.put(key, value) : null;
    }

    public static String removeRequestParameterValue(String key) {
        Map<String, String> requestParameter = getRequestParameter();
        return requestParameter != null ? requestParameter.remove(key) : null;
    }

    public static void clearRequestParameterValues() {
        Map<String, String> requestParameter = getRequestParameter();
        if (requestParameter != null) {
            requestParameter.clear();
        }
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
        FacesContext currentInstance = FacesContext.getCurrentInstance();
        if (currentInstance != null) {
            ExternalContext externalContext = currentInstance.getExternalContext();
            return externalContext != null ? externalContext.getSessionMap() : null;
        }
        return null;
    }

    public static Object getSessionValue(String key) {
        Map<String, Object> session = getSession();
        return session != null ? session.get(key) : null;
    }

    public static Object setSessionValue(String key, Object value) {
        Map<String, Object> session = getSession();
        return session != null ? session.put(key, value) : null;
    }

    public static Object removeSessionValue(String key) {
        Map<String, Object> session = getSession();
        return session != null ? session.remove(key) : null;
    }

    public static void clearSessionValues() {
        Map<String, Object> session = getSession();
        if (session != null) {
            session.clear();
        }
    }

    // COOKIE
    public static Cookie[] getCookie() {
        HttpServletRequest httpServletRequest = ServletUtils.getHttpServletRequest();
        return httpServletRequest != null ? httpServletRequest.getCookies() : null;
    }

    public static void setCookie(String name, String value) {
        setCookie(name, value, 2592000);
    }

    public static void setCookie(String name, String value, int expiry) {
        String requestPath = getRequestPath();
        HttpServletResponse httpServletResponse = ServletUtils.getHttpServletResponse();

        if (requestPath != null && httpServletResponse != null) {
            Cookie cookie = new Cookie(name, value);
            cookie.setMaxAge(expiry);
            cookie.setPath(requestPath);
            httpServletResponse.addCookie(cookie);
        }
    }

    public static void removeCookie(String name) {
        setCookie(name, "", 0);
    }

    // OTHER
    public static Object getBean(String bean) {
        return elResolverValue(bean);
    }

    public static void navigation(String action) {
        if (!action.equals(ServletUtils.getPath())) {
            getApplication().getNavigationHandler().handleNavigation(getFacesContext(), null, action);
        }
    }

    public static void redirect(String action) throws IOException {
        if (!action.equals(ServletUtils.getPath())) {
            getExternalContext().redirect(action);
        }
    }

    // MESSAGES
    @SuppressWarnings("el-syntax")
    public static ResourceBundle getResourceBundle() {
        return (ResourceBundle) evaluateExpressionGet("#{" + resourceBundleVar + "}", ResourceBundle.class);
    }

    public static ResourceBundle getClevcoreResourceBundle() {
        return (ResourceBundle) evaluateExpressionGet("#{clevcoreMsg}", ResourceBundle.class);
    }

    public static String getResource(String key) {
        String resource = "";
        ResourceBundle resourceBundle = getResourceBundle();
        if (resourceBundle != null) {
            try {
                resource = resourceBundle.getString(key);
            } catch (Exception e) {
                log.error("[E] Exception in [getResource]", e);
                resource = key;
            }
        }
        return resource;
    }

    public static String getResource(String key, Object... params) {
        String resource = "";
        ResourceBundle resourceBundle = getResourceBundle();
        if (resourceBundle != null) {
            try {
                resource = resourceBundle.getString(key);
                if (params.length != 0) {
                    resource = MessageFormat.format(resource, (Object[]) params);
                }
            } catch (Exception e) {
                log.error("[E] Exception in [getResource]", e);
                resource = key;
            }
        }
        return resource;
    }

    public static String getClevcoreResource(String key) {
        String resource = "";
        ResourceBundle clevcoreResourceBundle = getClevcoreResourceBundle();
        if (clevcoreResourceBundle != null) {
            try {
                resource += clevcoreResourceBundle.getString(key);
            } catch (Exception e) {
                log.error("[E] Exception in [getClevcoreResource]", e);
                resource += key;
            }
        }
        return resource;
    }

    public static String getClevcoreResource(String key, Object... params) {
        String resource = "";
        ResourceBundle clevcoreResourceBundle = getClevcoreResourceBundle();
        if (clevcoreResourceBundle != null) {
            try {
                resource = clevcoreResourceBundle.getString(key);
                if (params.length != 0) {
                    resource = MessageFormat.format(resource, (Object[]) params);
                }
            } catch (Exception e) {
                log.error("[E] Exception in [getClevcoreResource]", e);
                resource = key;
            }
        }
        return resource;
    }

    // COMPONENTS
    public static void showPopup(String id) {
        executeScript("showPopup('" + id + "')");
    }

    public static void hidePopup(String id) {
        executeScript("hidePopup('" + id + "')");
    }

}
