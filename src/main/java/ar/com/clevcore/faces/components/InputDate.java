package ar.com.clevcore.faces.components;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import javax.faces.application.FacesMessage;
import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIInput;
import javax.faces.component.UINamingContainer;
import javax.faces.component.UIPanel;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.utils.DateUtils;
import ar.com.clevcore.utils.IntegerUtils;
import ar.com.clevcore.utils.ValidatorUtils;

@FacesComponent("inputDate")
public class InputDate extends UIInput implements NamingContainer {

    private static final Logger log = LoggerFactory.getLogger(InputDate.class);
    
    private final int DEFAULT_MINYEAR = 100;

    private UIPanel panel;

    private UIInput year;
    private UIInput month;
    private UIInput day;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        Calendar calendar = DateUtils.getCalendar();

        Integer maxYear = (Integer) getAttributes().get("maxyear");
        Integer minYear = (Integer) getAttributes().get("minyear");
        if (maxYear == null) {
            maxYear = DateUtils.getYear(calendar);
        }
        if (minYear == null) {
            minYear = maxYear - DEFAULT_MINYEAR;
        }

        if (getYears() == null) {
            setYears(IntegerUtils.createInteger(maxYear, minYear));
        }
        if (getMonths() == null) {
            setMonths(IntegerUtils.createInteger(1, 12));
        }
        if (getDays() == null) {
            setDays(IntegerUtils.createInteger(1, 31));
        }

        Date date = (Date) getValue();
        if (date != null) {
            calendar.setTime(date);
            int yearAux = DateUtils.getYear(calendar);

            if (!ValidatorUtils.yearValidator(yearAux, maxYear, minYear)) {
                FacesUtils.addMessage(getId(context), FacesMessage.SEVERITY_ERROR,
                        (String) getAttributes().get("validatorMessage"));
                return;
            }

            year.setValue(DateUtils.getYear(calendar));
            month.setValue(DateUtils.getMonth(calendar));
            day.setValue(DateUtils.getDay(calendar));

            int maxDay = DateUtils.getActualMaximumDay(calendar);
            if (getDays().length != maxDay) {
                setDays(IntegerUtils.createInteger(1, maxDay));
            }
        } else {
            if (year.getValue() == null) {
                year.setValue(0);
            }
            if (month.getValue() == null) {
                month.setValue(0);
            }
            if (day.getValue() == null) {
                day.setValue(0);
            }

            updateDaysIfNecessary(null);
        }

        super.encodeBegin(context);
    }

    @Override
    public Object getSubmittedValue() {
        return year.getSubmittedValue() + "-" + month.getSubmittedValue() + "-" + day.getSubmittedValue();
    }

    @Override
    protected Object getConvertedValue(FacesContext context, Object submittedValue) {
        try {
            return DateUtils.getDateNotTolerant((String) submittedValue, "yyyy-MM-dd");
        } catch (ParseException e) {
            String[] array = ((String) submittedValue).split("-");
            if ("0".equals(array[0]) || "0".equals(array[1]) || "0".equals(array[2])) {
                if ((boolean) getAttributes().get("required")) {
                    log.error("[E] ParseException in [getConvertedValue] - {}", getAttributes().get("requiredMessage"));
                    FacesUtils.addMessage(getId(context), FacesMessage.SEVERITY_ERROR,
                            (String) getAttributes().get("requiredMessage"));
                    return null;
                }
            }
            log.error("[E] ParseException in [getConvertedValue] - {}", getAttributes().get("validatorMessage"));
            FacesUtils.addMessage(getId(context), FacesMessage.SEVERITY_ERROR,
                    (String) getAttributes().get("validatorMessage"));
            return null;
        }
    }

    // EVENT
    public void updateDaysIfNecessary(AjaxBehaviorEvent event) {
        try {
            if ((int) year.getValue() != 0 && (int) month.getValue() != 0) {
                Calendar calendar = DateUtils.getCalendar((int) year.getValue(), (int) month.getValue(), 1);

                int maxDay = DateUtils.getActualMaximumDay(calendar);
                if (getDays().length != maxDay) {
                    setDays(IntegerUtils.createInteger(1, maxDay));

                    if ((Integer) day.getValue() > maxDay) {
                        day.setValue(0);
                    }

                    if (event != null) {
                        FacesContext context = FacesUtils.getFacesContext();
                        context.getPartialViewContext().getRenderIds().add(day.getClientId(context));
                    }
                }
            }
        } catch (Exception e) {
            log.error("[E] Exception with getCalendar in [updateDaysIfNecessary] - {}", getAttributes().get("validatorMessage"));
            FacesUtils.addMessage(getId(FacesUtils.getFacesContext()), FacesMessage.SEVERITY_ERROR,
                    (String) getAttributes().get("validatorMessage"));
        }
    }

    // HELPER
    private String getId(FacesContext context) {
        return panel.getClientId(context);
    }

    // GETTER & SETTER
    public UIPanel getPanel() {
        return panel;
    }

    public void setPanel(UIPanel panel) {
        this.panel = panel;
    }

    public UIInput getYear() {
        return year;
    }

    public void setYear(UIInput year) {
        this.year = year;
    }

    public UIInput getMonth() {
        return month;
    }

    public void setMonth(UIInput month) {
        this.month = month;
    }

    public UIInput getDay() {
        return day;
    }

    public void setDay(UIInput day) {
        this.day = day;
    }

    public Integer[] getYears() {
        return (Integer[]) getStateHelper().get("years");
    }

    public void setYears(Integer[] years) {
        getStateHelper().put("years", years);
    }

    public Integer[] getMonths() {
        return (Integer[]) getStateHelper().get("months");
    }

    public void setMonths(Integer[] months) {
        getStateHelper().put("months", months);
    }

    public Integer[] getDays() {
        return (Integer[]) getStateHelper().get("days");
    }

    public void setDays(Integer[] days) {
        getStateHelper().put("days", days);
    }

}
