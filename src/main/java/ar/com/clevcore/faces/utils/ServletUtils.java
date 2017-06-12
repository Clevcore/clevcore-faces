package ar.com.clevcore.faces.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import ar.com.clevcore.utils.StringUtils;

public final class ServletUtils {

    private ServletUtils() {
        throw new AssertionError();
    }

    public static HttpServletRequest getHttpServletRequest() {
        return (HttpServletRequest) FacesUtils.getExternalContext().getRequest();
    }

    public static HttpServletResponse getHttpServletResponse() {
        return (HttpServletResponse) FacesUtils.getExternalContext().getResponse();
    }

    public static String getIp() {
        String ip = getHttpServletRequest().getHeader("X-FORWARDED-FOR");

        if (ip == null) {
            ip = getHttpServletRequest().getRemoteAddr();
        }

        return ip;
    }

    public static String getDirectory() {
        int beginIndex = StringUtils.ordinalIndexOf(getUrlFull(), "/", 4);
        int endIndex = getUrlFull().lastIndexOf("/");

        if (beginIndex != endIndex) {
            return getUrlFull().substring(beginIndex, endIndex + 1);
        } else {
            return "";
        }
    }

    public static String getPage() {
        String page = getPageFull();

        if (page.indexOf(";") != -1) {
            return page.substring(0, page.indexOf(";"));
        } else if (page.indexOf("?") != -1) {
            return page.substring(0, page.indexOf("?"));
        } else if (page.indexOf("#") != -1) {
            return page.substring(0, page.indexOf("#"));
        } else {
            return page;
        }
    }

    public static String getPageFull() {
        int index = getUrlFull().lastIndexOf("/");

        if (index != -1) {
            return getUrlFull().substring(index + 1);
        } else {
            return "";
        }
    }

    public static String getPath() {
        String path = getPathFull();

        if (path.indexOf(";") != -1) {
            return path.substring(0, path.indexOf(";"));
        } else if (path.indexOf("?") != -1) {
            return path.substring(0, path.indexOf("?"));
        } else if (path.indexOf("#") != -1) {
            return path.substring(0, path.indexOf("#"));
        } else {
            return path;
        }
    }

    public static String getPathFull() {
        return ServletUtils.getHttpServletRequest().getServletPath();
    }

    public static String getRealPath() {
        return ServletUtils.getHttpServletRequest().getServletContext().getRealPath("/");
    }

    public static String getUrl() {
        int index = StringUtils.ordinalIndexOf(getUrlFull(), "/", 4);

        if (index != -1) {
            return getUrlFull().substring(0, index);
        } else {
            return "";
        }
    }

    public static String getUrlFull() {
        return getHttpServletRequest().getRequestURL().toString();
    }

    public static void invalidateSession() {
        HttpSession session = (HttpSession) FacesUtils.getExternalContext().getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

}
