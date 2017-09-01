/* Based on UnmappedResourceHandler of OmniFaces 2.6.4 */
package ar.com.clevcore.faces.handler;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map.Entry;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletResponse;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.faces.utils.ServletUtils;
import ar.com.clevcore.utils.IOUtils;

public class UnmappedResourceHandler extends ResourceHandlerWrapper {

    private ResourceHandler wrapped;

    public UnmappedResourceHandler(ResourceHandler wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public ResourceHandler getWrapped() {
        return wrapped;
    }

    @Override
    public Resource createResource(String resourceName) {
        return createResource(resourceName, null, null);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName) {
        return createResource(resourceName, libraryName, null);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName, String contentType) {
        Resource resource = getWrapped().createResource(resourceName, libraryName, contentType);

        if (resource == null) {
            return null;
        }

        String path = resource.getRequestPath();

        if (isResourceRequest(path)) {
            String mapping = FacesUtils.getMapping();

            if (mapping.charAt(0) == '/') {
                path = path.replaceFirst(mapping, "");
            } else if (path.contains("?")) {
                path = path.replace(mapping + "?", "?");
            } else if (path.endsWith(mapping)) {
                path = path.substring(0, path.length() - mapping.length());
            }

            return new SerializableResource(resource, path);
        }

        return resource;
    }

    @Override
    public boolean isResourceRequest(FacesContext context) {
        return isResourceRequest(ServletUtils.getHttpServletRequestURI()) || super.isResourceRequest(context);
    }

    private static boolean isResourceRequest(String path) {
        return path.startsWith(FacesUtils.getRequestPath() + RESOURCE_IDENTIFIER);
    }

    @Override
    public void handleResourceRequest(FacesContext context) throws IOException {
        ExternalContext externalContext = context.getExternalContext();

        String resourceName = externalContext.getRequestPathInfo();
        resourceName = (resourceName != null) ? resourceName.substring(1) : "";
        if (resourceName.isEmpty()) {
            super.handleResourceRequest(context);
            return;
        }
        String libraryName = externalContext.getRequestParameterMap().get("ln");
        Resource resource = context.getApplication().getResourceHandler().createResource(resourceName, libraryName);

        if (!resource.userAgentNeedsUpdate(context)) {
            externalContext.setResponseStatus(HttpServletResponse.SC_NOT_MODIFIED);
            return;
        }

        InputStream inputStream = resource.getInputStream();

        if (inputStream == null) {
            externalContext.setResponseStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        externalContext.setResponseContentType(resource.getContentType());

        for (Entry<String, String> header : resource.getResponseHeaders().entrySet()) {
            externalContext.setResponseHeader(header.getKey(), header.getValue());
        }

        IOUtils.stream(inputStream, externalContext.getResponseOutputStream());
    }

}
