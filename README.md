# Silver Peak SD-WAN Sequence Diagram

This directory contains a PlantUML sequence diagram illustrating the Silver Peak SD-WAN architecture and data flow.

## Diagram Overview

The diagram (`sdwan.plantuml`) depicts the complete lifecycle of SD-WAN operations, from initial deployment through ongoing monitoring.

## Components

| Component | Description |
|-----------|-------------|
| **Admin** | Network administrator managing SD-WAN policies |
| **Orchestrator** | Central management platform for SD-WAN configuration and analytics |
| **Branch EdgeConnect** | SD-WAN edge device deployed at branch locations |
| **DC EdgeConnect** | SD-WAN edge device deployed at data center locations |
| **Internet/MPLS** | Wide area network transport (public internet and MPLS) |
| **Application Server** | Backend application servers hosted in data center |

## Process Phases

### 1. Deployment Phase
- Admin defines SD-WAN policies (business intent, QoS rules) via Orchestrator
- Orchestrator pushes Zero Touch Provisioning (ZTP) configuration to branch and DC EdgeConnect devices
- Edge devices register back with Orchestrator for ongoing management

### 2. Tunnel Establishment
- Branch and DC EdgeConnect devices establish IPsec tunnels over Internet/MPLS
- Multiple tunnels may be created across different transport paths (Internet, MPLS)

### 3. Application Flow
- **Deep Packet Inspection (DPI)** identifies applications traversing the network
- **Business Intent Policies** are applied based on admin-defined rules
- **SLA-based Path Selection** chooses optimal path based on:
  - Latency
  - Packet loss
  - Jitter
- **Path Conditioning** techniques applied:
  - Forward Error Correction (FEC)
  - Packet duplication

### 4. Monitoring
- Edge devices send telemetry (SLA metrics) to Orchestrator
- Orchestrator provides dashboard and analytics to Admin

## Rendering the Diagram

To render the PlantUML diagram to an image:

```bash
plantuml sdwan.plantuml
```

Or using Docker:
```bash
docker run --rm -v $(pwd):/input plantuml/plantuml:latest /input/sdwan.plantuml
```

## Requirements

- PlantUML server or CLI tool
- Graphviz (optional, for advanced layouts)