import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../app.js";

describe("api endpoints", () => {
  it("returns health payload", async () => {
    const response = await request(createApp()).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("returns movies list", async () => {
    const response = await request(createApp()).get("/api/movies");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("returns movie detail", async () => {
    const listResponse = await request(createApp()).get("/api/movies");
    const firstId = listResponse.body[0].id as string;

    const response = await request(createApp()).get(`/api/movies/${firstId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(firstId);
  });

  it("returns 404 for invalid movie id", async () => {
    const response = await request(createApp()).get("/api/movies/not-found");

    expect(response.status).toBe(404);
  });

  it("returns 404 for unknown route", async () => {
    const response = await request(createApp()).get("/api/unknown");

    expect(response.status).toBe(404);
  });
});