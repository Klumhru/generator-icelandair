package utils

import (
  "github.com/Sirupsen/logrus"
  "net/http"
)

func GetLogMessage(name string, info1 string, info2 string, methodName string, runtimeEnvironment string, r *http.Request)(logrus.Fields) {
  return logrus.Fields{
    "serviceName": name,
    "someInfo1": info1,
    "someInfo2": info2,
    "runtimeEnvironment": runtimeEnvironment,
    "methodName": methodName,
    "correlationId": r.Header.Get("X-Correlation-Id"),
  }
}

func GetServerMessage(nodeName string, serviceName string, methodName string, runtimeEnvironment string)(logrus.Fields) {
  return logrus.Fields{
    "nodeName": nodeName,
    "serviceName": serviceName,
    "runtimeEnvironment": runtimeEnvironment,
    "methodName": methodName,
  }
}
