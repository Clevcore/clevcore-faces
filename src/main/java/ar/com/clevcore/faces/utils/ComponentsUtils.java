package ar.com.clevcore.faces.utils;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.component.UISelectItem;
import javax.faces.component.UISelectItems;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;

public final class ComponentsUtils {

    private ComponentsUtils() {
        throw new AssertionError();
    }

    @SuppressWarnings("rawtypes")
    public static List<SelectItem> getSelectItems(FacesContext context, UIInput component) {
        List<SelectItem> selectItems = new ArrayList<SelectItem>();

        for (UIComponent child : component.getChildren()) {
            if (child instanceof UISelectItem) {
                UISelectItem uiSelectItem = (UISelectItem) child;
                Object selectItemValue = uiSelectItem.getValue();

                if (selectItemValue == null) {
                    selectItems.add(new SelectItem(uiSelectItem.getItemValue(), uiSelectItem.getItemLabel(),
                            uiSelectItem.getItemDescription(), uiSelectItem.isItemDisabled(), uiSelectItem
                                    .isItemEscaped(), uiSelectItem.isNoSelectionOption()));
                } else {
                    selectItems.add((SelectItem) selectItemValue);
                }
            } else if (child instanceof UISelectItems) {
                UISelectItems uiSelectItems = ((UISelectItems) child);
                Object value = uiSelectItems.getValue();

                if (value != null) {
                    if (value instanceof SelectItem) {
                        selectItems.add((SelectItem) value);
                    } else if (value.getClass().isArray()) {
                        for (int i = 0; i < Array.getLength(value); i++) {
                            Object item = Array.get(value, i);

                            if (item instanceof SelectItem)
                                selectItems.add((SelectItem) item);
                            else
                                selectItems.add(createSelectItem(context, uiSelectItems, item, null));
                        }
                    } else if (value instanceof Map) {
                        Map map = (Map) value;

                        for (Iterator it = map.keySet().iterator(); it.hasNext();) {
                            Object key = it.next();

                            selectItems
                                    .add(createSelectItem(context, uiSelectItems, map.get(key), String.valueOf(key)));
                        }
                    } else if (value instanceof Collection) {
                        Collection collection = (Collection) value;

                        for (Iterator it = collection.iterator(); it.hasNext();) {
                            Object item = it.next();
                            if (item instanceof SelectItem)
                                selectItems.add((SelectItem) item);
                            else
                                selectItems.add(createSelectItem(context, uiSelectItems, item, null));
                        }
                    }
                }
            }
        }

        return selectItems;
    }

    public static SelectItem createSelectItem(FacesContext context, UISelectItems uiSelectItems, Object value,
            Object label) {
        String var = (String) uiSelectItems.getAttributes().get("var");
        Map<String, Object> attrs = uiSelectItems.getAttributes();
        Map<String, Object> requestMap = context.getExternalContext().getRequestMap();

        if (var != null) {
            requestMap.put(var, value);
        }

        Object itemLabelValue = attrs.get("itemLabel");
        Object itemValue = attrs.get("itemValue");
        String description = (String) attrs.get("itemDescription");
        Object itemDisabled = attrs.get("itemDisabled");
        Object itemEscaped = attrs.get("itemLabelEscaped");
        Object noSelection = attrs.get("noSelectionOption");

        if (itemValue == null) {
            itemValue = value;
        }

        if (itemLabelValue == null) {
            itemLabelValue = label;
        }

        String itemLabel = itemLabelValue == null ? String.valueOf(value) : String.valueOf(itemLabelValue);
        boolean disabled = itemDisabled == null ? false : Boolean.valueOf(itemDisabled.toString());
        boolean escaped = itemEscaped == null ? true : Boolean.valueOf(itemEscaped.toString());
        boolean noSelectionOption = noSelection == null ? false : Boolean.valueOf(noSelection.toString());

        if (var != null) {
            requestMap.remove(var);
        }

        return new SelectItem(itemValue, itemLabel, description, disabled, escaped, noSelectionOption);
    }

}
