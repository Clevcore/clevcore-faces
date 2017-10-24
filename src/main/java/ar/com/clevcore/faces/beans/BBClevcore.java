package ar.com.clevcore.faces.beans;

import java.io.Serializable;
import java.util.Locale;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;

import ar.com.clevcore.faces.utils.Constant;
import ar.com.clevcore.faces.utils.FacesUtils;

@ManagedBean(name = "bbClevcore")
@ApplicationScoped
public class BBClevcore implements Serializable {
    private static final long serialVersionUID = 1L;

    public String getIdScript() {
        return Constant.ID_SCRIPT;
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

    public Boolean isComponent(String component, Object object) {
        if (object != null) {
            return object.getClass().getName().equals(component);
        } else {
            return false;
        }
    }

    public void updateFacesContext() {
        FacesContext facesContext = FacesUtils.getFacesContext();

        // @formatter:off
        FacesUtils.executeScript(
            "var facesContext = {" +
            "  maximumSeverity : '" + facesContext.getMaximumSeverity() + "'," +
            "  validationFailed : " + facesContext.isValidationFailed() +
            "};");
        // @formatter:on
    }

    // CONSTANT
    public String getALERT() {
        return Constant.ALERT;
    }

    public String getCOLUMN() {
        return Constant.COLUMN;
    }

    public String getCOMMAND_BUTTON() {
        return Constant.COMMAND_BUTTON;
    }

    public String getCOMPONENT_PATH() {
        return Constant.COMPONENT_PATH;
    }

    public String getDATA_TABLE() {
        return Constant.DATA_TABLE;
    }

    public String getFAB() {
        return Constant.FAB;
    }

    public String getFAB_ITEM() {
        return Constant.FAB_ITEM;
    }

    public String getFLOAT_IF_NOT_VISIBLE() {
        return Constant.FLOAT_IF_NOT_VISIBLE;
    }

    public String getGRAPHIC_IMAGE() {
        return Constant.GRAPHIC_IMAGE;
    }

    public String getICON() {
        return Constant.ICON;
    }

    public String getINPUT_CHECKBOX() {
        return Constant.INPUT_CHECKBOX;
    }

    public String getINPUT_DATE() {
        return Constant.INPUT_DATE;
    }

    public String getINPUT_TEXT() {
        return Constant.INPUT_TEXT;
    }

    public String getITEM() {
        return Constant.ITEM;
    }

    public String getITEMS() {
        return Constant.ITEMS;
    }

    public String getLOADING_PAGE() {
        return Constant.LOADING_PAGE;
    }

    public String getMESSAGE() {
        return Constant.MESSAGE;
    }

    public String getMESSAGES() {
        return Constant.MESSAGES;
    }

    public String getMENU() {
        return Constant.MENU;
    }

    public String getNAVBAR() {
        return Constant.NAVBAR;
    }

    public String getNAVBAR_MAIN() {
        return Constant.NAVBAR_MAIN;
    }

    public String getNAVBAR_MENU() {
        return Constant.NAVBAR_MENU;
    }

    public String getNAVBAR_SIDE() {
        return Constant.NAVBAR_SIDE;
    }

    public String getOBSOLETE_BROWSER() {
        return Constant.OBSOLETE_BROWSER;
    }

    public String getPANEL() {
        return Constant.PANEL;
    }

    public String getPANEL_BODY() {
        return Constant.PANEL_BODY;
    }

    public String getPANEL_FOOT() {
        return Constant.PANEL_FOOT;
    }

    public String getPANEL_HEAD() {
        return Constant.PANEL_HEAD;
    }

    public String getPOPUP() {
        return Constant.POPUP;
    }

    public String getSECTION() {
        return Constant.SECTION;
    }

    public String getSELECT_BOOLEAN_CHECKBOX() {
        return Constant.SELECT_BOOLEAN_CHECKBOX;
    }

    public String getSELECT_MANY_CHECKBOX() {
        return Constant.SELECT_MANY_CHECKBOX;
    }

    public String getSELECT_ONE_MENU() {
        return Constant.SELECT_ONE_MENU;
    }

    public String getSEPARATOR() {
        return Constant.SEPARATOR;
    }

    public String getSESSION_TIMEOUT() {
        return Constant.SESSION_TIMEOUT;
    }

    public String getTITLE() {
        return Constant.TITLE;
    }

    public String getWAIT() {
        return Constant.WAIT;
    }

}
