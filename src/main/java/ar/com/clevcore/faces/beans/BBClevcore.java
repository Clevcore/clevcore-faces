package ar.com.clevcore.faces.beans;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ar.com.clevcore.faces.utils.Constant;
import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.utils.DateUtils;

@ManagedBean(name = "bbClevcore")
@ApplicationScoped
public class BBClevcore implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Logger log = LoggerFactory.getLogger(BBClevcore.class);

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
            log.error("[E] ParseException ocurred in [getDateFormat]", e);
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

    public Boolean isComponent(String component, Object object) {
        if (object != null) {
            return object.getClass().getName().equals(component);
        } else {
            return false;
        }
    }

    // CONSTANT
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

    public String getSELECT_MANY_CHECKBOX() {
        return Constant.SELECT_MANY_CHECKBOX;
    }

    public String getSELECT_ONE_MENU() {
        return Constant.SELECT_ONE_MENU;
    }

    public String getSEPARATOR() {
        return Constant.SEPARATOR;
    }

    public String getTITLE() {
        return Constant.TITLE;
    }

    public String getWAIT() {
        return Constant.WAIT;
    }

}
