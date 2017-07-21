/* Based on UnmappedResourceHandler of OmniFaces 1.8.1 */
package ar.com.clevcore.faces;

import java.io.IOException;
import java.util.Map.Entry;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.application.ResourceWrapper;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletResponse;

import ar.com.clevcore.faces.utils.FacesUtils;
import ar.com.clevcore.utils.IOUtils;

public class UnmappedResourceHandler extends ResourceHandlerWrapper {

    private ResourceHandler wrapped;

    public UnmappedResourceHandler(ResourceHandler wrapped) {
        this.wrapped = wrapped;
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
        Resource resource = super.createResource(resourceName, libraryName, contentType);

        if (resource == null) {
            return null;
        }

        return new ResourceWrapper() {
            @Override
            public String getRequestPath() {
                String path = getWrapped().getRequestPath();
                String mapping = FacesUtils.getMapping();

                if (FacesUtils.isPrefixMapping(mapping)) {
                    return path.replaceFirst(mapping, "");
                } else if (path.contains("?")) {
                    return path.replace(mapping + "?", "?");
                } else {
                    return path.substring(0, path.length() - mapping.length());
                }
            }

            @Override
            public String getResourceName() {
                return resource.getResourceName();
            }

            @Override
            public String getLibraryName() {
                return resource.getLibraryName();
            }

            @Override
            public String getContentType() {
                return resource.getContentType();
            }

            @Override
            public Resource getWrapped() {
                return resource;
            }
        };
    }

    @Override
    public boolean isResourceRequest(FacesContext context) {
        return ResourceHandler.RESOURCE_IDENTIFIER.equals(context.getExternalContext().getRequestServletPath());
    }

    @Override
    public void handleResourceRequest(FacesContext context) throws IOException {
        ExternalContext externalContext = context.getExternalContext();

        String resourceName = externalContext.getRequestPathInfo();
        String libraryName = externalContext.getRequestParameterMap().get("ln");
        Resource resource = context.getApplication().getResourceHandler().createResource(resourceName, libraryName);

        if (resource == null) {
            getWrapped().handleResourceRequest(context);
            return;
        }

        if (!resource.userAgentNeedsUpdate(context)) {
            externalContext.setResponseStatus(HttpServletResponse.SC_NOT_MODIFIED);
            return;
        }

        externalContext.setResponseContentType(resource.getContentType());

        for (Entry<String, String> header : resource.getResponseHeaders().entrySet()) {
            externalContext.setResponseHeader(header.getKey(), header.getValue());
        }

        IOUtils.stream(resource.getInputStream(), externalContext.getResponseOutputStream());
    }

    @Override
    public ResourceHandler getWrapped() {
        return wrapped;
    }

}
