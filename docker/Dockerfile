FROM alpine:3.7

# Enables customized options using environment variables

# Backends
ENV OSRM_BACKEND='http://localhost:5000'
ENV OSRM_BACKEND_LIGHTING='http://localhost:5002'
ENV OSRM_BACKEND_SIDEWALKS='http://localhost:5003'
ENV OSRM_BACKEND_CUSTOM='http://localhost:5001'

ENV OSRM_CENTER='43.466667, -80.516667'
ENV OSRM_ZOOM='13'
ENV OSRM_LANGUAGE='en'
ENV OSRM_LABEL='Safety'
ENV OSRM_MAPBOX_TOKEN='pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg'

# Copy package.json
RUN mkdir -p /src
COPY package.json /src

# Install app dependencies
RUN apk add --no-cache sed nodejs && \
    cd /src && \
    npm install

# Create app directory
COPY . /src
WORKDIR /src

# Run App
EXPOSE 9966
CMD ["npm", "start"]