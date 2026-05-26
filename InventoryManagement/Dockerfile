FROM alpine/git:v2.52.0
WORKDIR /app


RUN apk update && apk add --no-cache \
  openjdk17-jdk \
  maven \
  ca-certificates \
  curl \
  wget \
  tzdata \
  bash

COPY pom.xml /app/


COPY src /app/src

CMD ["mvn","spring-boot:run"]