#!bin/bash

aws appmesh update-route \
  --mesh-name app \
  --route-name servicea \
  --spec 

    # ColorServerRoute:
    # Type: AWS::AppMesh::Route
    # DependsOn:
    #   - ColorServerVirtualRouter
    #   - ColorServerWhiteVirtualNode
    # Properties:
    #   MeshName: !Ref AppMeshName
    #   VirtualRouterName: colorserver-vr
    #   RouteName: colorserver-route
    #   Spec:
    #     HttpRoute:
    #       Action:
    #         WeightedTargets:
    #           - VirtualNode: colorserver-white-vn
    #             Weight: 1
    #       Match:
    #         Prefix: "/"