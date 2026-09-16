import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  getHealth() {
    return {
      service: "moviepass-api",
      phase: 1,
      status: "ok",
      timestamp: new Date().toISOString()
    };
  }
}
