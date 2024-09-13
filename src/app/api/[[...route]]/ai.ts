import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { replicate } from "../../../lib/replicate";

const app = new Hono()
  .post(
    "/generate-image",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const input = {
        cfg: 3.5,
        steps: 28,
        prompt: "a photo of vibrant artistic graffiti on a wall saying \"SD3 medium\"",
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "prompt",
        prompt_strength: 0.85
      };
      
      const output = await replicate.run("stability-ai/stable-diffusion-3", { input });
      console.log(output);

      const res = output as Array<string>

      return c.json({ data: res[0] });
    },
  );

export default app;
