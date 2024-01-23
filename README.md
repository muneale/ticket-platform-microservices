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
- `kubectl port-forward <pod-name> <local-port>:<pod-port>` to port-forward the service to the localhost through a simple command (intead of a NodePort K8S service).

### Helm
- `helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace` to run ingress-nginx service.
- `helm uninstall ingress-nginx --namespace ingress-nginx` to remove ingress-nginx service.

## Chrome
- If you get the "Connection not secure" error you can bypass it by clicking anywhere in Chrome window where you see the error, and type `thisisunsafe`.

## NextJS
- [How to use "use server" with NextJS 14](https://www.youtube.com/watch?v=5MRLO-7O2So)
- [Useful ORM called Prisma](https://www.prisma.io/)