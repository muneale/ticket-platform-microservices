## Useful commands

### Skaffold
- `skaffold fix` to update the Skaffold configuration.
- `skaffold dev` to run into the development mode.

### K8S
- `kubectl get pods | services | deployments` to get respectively all the running pods, services or deployments.
- `kubectl describe <pod_id|service_id|deployment_id>` to get useful informations.
- `kubectl apply | delete -f path/to/k8s-files/*.yml` to apply or delete pods, services or deployments.
- `kubectl rollout restart | history | undo deployment <deployment_id_1> <deployment_id_2> ...` start, checks the history and undo the deployment of a new version (downloading the new docker image ecc.).
- `kubectl logs <pod_id>` to get the logs.

### Helm
- `helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace` to run ingress-nginx service.
- `helm uninstall ingress-nginx --namespace ingress-nginx` to remove ingress-nginx service.