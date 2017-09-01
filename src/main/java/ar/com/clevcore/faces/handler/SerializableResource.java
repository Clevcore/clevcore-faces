package ar.com.clevcore.faces.handler;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.io.Serializable;

import javax.faces.application.Resource;
import javax.faces.application.ResourceWrapper;

public class SerializableResource extends ResourceWrapper implements Externalizable {

    private transient Resource resource;
    private String requestPath;

    public SerializableResource(Resource resource, String requestPath) {
        this.resource = resource;
        this.requestPath = requestPath;
    }

    @Override
    public Resource getWrapped() {
        return resource;
    }

    @Override
    public String getRequestPath() {
        return requestPath;
    }

    @Override
    public void readExternal(ObjectInput input) throws IOException, ClassNotFoundException {
        resource = (Resource) input.readObject();
        setResourceName((String) input.readObject());
        setLibraryName((String) input.readObject());
        requestPath = (String) input.readObject();
    }

    @Override
    public void writeExternal(ObjectOutput output) throws IOException {
        output.writeObject((Serializable) resource);
        output.writeObject(getResourceName());
        output.writeObject(getLibraryName());
        output.writeObject(requestPath);
    }

}
