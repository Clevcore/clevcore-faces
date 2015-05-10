package ar.com.clevcore.faces.components;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.el.MethodExpression;
import javax.faces.component.FacesComponent;
import javax.faces.component.NamingContainer;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UIData;
import javax.faces.component.UINamingContainer;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.faces.utils.ServletUtils;
import ar.com.clevcore.utils.OfficeUtils;
import ar.com.clevcore.utils.StringUtils;
import ar.com.clevcore.utils.Utils;

@SuppressWarnings("unchecked")
@FacesComponent("dataTable")
public class DataTable extends UIComponentBase implements NamingContainer {

    private UIData data;

    @Override
    public String getFamily() {
        return UINamingContainer.COMPONENT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        // var
        data.setVar(getAttributes().get("var").toString());

        // rows
        data.setRows(Integer.parseInt(getAttributes().get("rows").toString()));

        // value
        data.setValue(getAttributes().get("value"));

        // search
        if (getSearch() != null) {
            search();
        }

        // order
        if (getOrderBy() == null) {
            setAscendingOrder(false);
        } else {
            order();
        }

        // paginator
        if (getPage() == null) {
            setPage(1);
        }
        initPages();
        paginatorRefresh();

        // file
        setFile(null);

        super.encodeBegin(context);
    }

    // INIT
    private void initPages() {
        int pages = 0;
        if (data != null && data.getValue() != null) {
            List<Object> objectList = (List<Object>) data.getValue();
            pages = objectList.size() / data.getRows();
            if (objectList.size() % data.getRows() != 0) {
                pages++;
            }
        }
        setPages(pages);
    }

    // METHOD
    public void onSearch() {
        search();

        if (getOrderBy() != null) {
            order();
        }

        onPaginatorManager(1);
    }

    public void onExcel() {
        List<Object> objectList = (List<Object>) data.getValue();

        if (objectList != null && !objectList.isEmpty()) {
            String path = FacesUtils.getRealPath() + File.separator + "resources" + File.separator + "temp"
                    + File.separator;
            String file = OfficeUtils.getExcel(objectList, getProperties((String) getAttributes().get("excelBy")),
                    path, true, FacesUtils.getClevcoreResource("pattern_date"));

            setFile(ServletUtils.getUrl() + "/resources/temp/" + file);
        }
    }

    public void onPdf() {
        List<Object> objectList = (List<Object>) data.getValue();

        if (objectList != null && !objectList.isEmpty()) {
            String path = FacesUtils.getRealPath() + File.separator + "resources" + File.separator + "temp"
                    + File.separator;

            String file = OfficeUtils.getPdf(objectList, getProperties((String) getAttributes().get("pdfBy")), path,
                    true, FacesUtils.getClevcoreResource("pattern_date"));

            setFile(ServletUtils.getUrl() + "/resources/temp/" + file);
        }
    }

    public void onOrder(String orderBy) {
        setAscendingOrder(!getAscendingOrder());
        setOrderBy(orderBy);

        order();
    }

    public void rowlistener(AjaxBehaviorEvent event) {
        MethodExpression methodExpression = (MethodExpression) getAttributes().get("rowlistener");

        if (methodExpression != null) {
            methodExpression.invoke(FacesUtils.getELContext(),
                    new Object[] { ((List<Object>) data.getValue()).get(getRowIndex()) });
        }
    }

    public void onPaginatorPrevious() {
        onPaginatorManager(getPage() - 1);
    }

    public void onPaginatorNext() {
        onPaginatorManager(getPage() + 1);
    }

    public void onPaginatorManager(int page) {
        setPage(page);
        paginatorRefresh();

        if ((Boolean) getAttributes().get("selectUniqueElement") && ((List<Object>) data.getValue()).size() == 1) {
            FacesUtils.render(getClientId() + ":selectUniqueElement");
        }
    }

    // HELPER
    private List<String> getProperties(String properties) {
        if (properties != null) {
            List<String> propertyList = new ArrayList<String>();

            for (String property : Arrays.asList(properties.split(","))) {
                propertyList.add(StringUtils.trimAll(property));
            }

            return propertyList;
        } else {
            return null;
        }
    }

    private void search() {
        List<Object> objectList = (List<Object>) getAttributes().get("value");
        String search = getSearch();

        if (objectList != null && !objectList.isEmpty() && search != null && !search.isEmpty()) {
            objectList = Utils.searchObject(search, objectList,
                    getProperties((String) getAttributes().get("searchBy")), false,
                    FacesUtils.getResource("patternDate"));

            setValueSearch(objectList);
            data.setValue(objectList);
            initPages();
        } else {
            setValueSearch(null);
            data.setValue(getAttributes().get("value"));
            initPages();
        }
    }

    private void order() {
        data.setValue(Utils.sortList((List<Object>) data.getValue(), getOrderBy(), getAscendingOrder()));
    }

    private void paginatorRefresh() {
        data.setFirst((getPage() - 1) * data.getRows());

        List<Integer> pageList = new ArrayList<Integer>(0);
        if (getPages() < 8) {
            for (int i = 1; i <= getPages(); i++) {
                pageList.add(i);
            }
        } else if (getPage() <= 4) {
            for (int i = 1; i <= 5; i++) {
                pageList.add(i);
            }
            pageList.add(-1);
            pageList.add(getPages());
        } else if (getPage() >= getPages() - 3) {
            pageList.add(1);
            pageList.add(-1);
            for (int i = getPages() - 4; i <= getPages(); i++) {
                pageList.add(i);
            }
        } else if (getPage() > 4 && getPage() < getPages() - 3) {
            pageList.add(1);
            pageList.add(-1);
            for (int i = getPage() - 1; i <= getPage() + 1; i++) {
                pageList.add(i);
            }
            pageList.add(-1);
            pageList.add(getPages());
        }
        setPageList(pageList);
    }

    // GETTER & SETTER
    public UIData getData() {
        return data;
    }

    public void setData(UIData data) {
        this.data = data;
    }

    public List<Object> getValueSearch() {
        return (List<Object>) getStateHelper().get("valueSearch");
    }

    public void setValueSearch(List<Object> valueSearch) {
        getStateHelper().put("valueSearch", valueSearch);
    }

    public String getSearch() {
        return (String) getStateHelper().get("search");
    }

    public void setSearch(String search) {
        getStateHelper().put("search", search);
    }

    public String getFile() {
        return (String) getStateHelper().get("file");
    }

    public void setFile(String file) {
        getStateHelper().put("file", file);
    }

    public String getOrderBy() {
        return (String) getStateHelper().get("orderBy");
    }

    public void setOrderBy(String orderBy) {
        getStateHelper().put("orderBy", orderBy);
    }

    public Boolean getAscendingOrder() {
        return (Boolean) getStateHelper().get("ascendingOrder");
    }

    public void setAscendingOrder(Boolean ascendingOrder) {
        getStateHelper().put("ascendingOrder", ascendingOrder);
    }

    public Integer getRowIndex() {
        return (Integer) getStateHelper().get("rowIndex");
    }

    public void setRowIndex(Integer rowIndex) {
        getStateHelper().put("rowIndex", rowIndex);
    }

    public Integer getPage() {
        return (Integer) getStateHelper().get("page");
    }

    public void setPage(Integer page) {
        getStateHelper().put("page", page);
    }

    public Integer getPages() {
        return (Integer) getStateHelper().get("pages");
    }

    public void setPages(Integer pages) {
        getStateHelper().put("pages", pages);
    }

    public List<Integer> getPageList() {
        return (List<Integer>) getStateHelper().get("pageList");
    }

    public void setPageList(List<Integer> pageList) {
        getStateHelper().put("pageList", pageList);
    }

}
