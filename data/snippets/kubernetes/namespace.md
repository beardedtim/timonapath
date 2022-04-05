---
title: Create a Namesapce in K8s using YAML
summary: |
  The needed yaml files in order to create a namespace
  inside of an empty k8s cluster. Useful if you want to
  associate everything in one place.

  Also shows how to add all values to the custom namespace
  without having to set namespace: <value>

tags:
  - k8s
---

_**./k8s/namespace.yaml**_

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: namespace-name
```

_**./k8s/kustomization.yaml**_

```yaml
namespace: namespace-name
resources:
  - ./namespace.yaml
```

And to apply this to your specific context

```sh
kubectl apply -k ./k8s
```
